import { Middleware, MiddlewareAPI, Dispatch } from "@reduxjs/toolkit";
import { RootState, WsResponse } from "../../utils/types";
import { getCookie } from "../user/cookie-utils";

type WsConfig = {
  wsUrl: string;
  wsType: "feed" | "profile";
  withToken?: boolean;
};

export const createSocketMiddleware = (
  config: WsConfig
): Middleware<{}, RootState> => {
  return (store: MiddlewareAPI<Dispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let isManuallyClosed = false;
    const { wsUrl, wsType, withToken = false } = config;
    const actions = {
      feed: {
        wsInit: "WS_FEED_INIT",
        onOpen: "WS_FEED_OPEN",
        onClose: "WS_FEED_CLOSE",
        onError: "WS_FEED_ERROR",
        onMessage: "WS_FEED_MESSAGE",
      },
      profile: {
        wsInit: "WS_PROFILE_INIT",
        onOpen: "WS_PROFILE_OPEN",
        onClose: "WS_PROFILE_CLOSE",
        onError: "WS_PROFILE_ERROR",
        onMessage: "WS_PROFILE_MESSAGE",
      },
    }[wsType];

    return (next) => (action: any) => {
      const { dispatch } = store;
      const accessToken = getCookie("accessToken");
      // console.log(`Получено действие для ${wsType}:`, action.type, "Токен:", accessToken?.length);

      if (action.type === actions.wsInit) {
        console.log(`Начало инициализации WebSocket для ${wsType}`);
        if (!socket || socket.readyState === WebSocket.CLOSED) {
          if (withToken && !accessToken) {
            console.error(`Ошибка: Токен для ${wsType} отсутствует`);
            dispatch({
              type: actions.onError,
              payload: "Отсутствует токен авторизации",
            });
            return next(action);
          }
          const token = accessToken || "";
          // console.log(token)
          const url = withToken && token ? `${wsUrl}?token=${token}` : wsUrl;
          // console.log(`🧩 Создание WebSocket для ${wsType}:`, url);
          socket = new WebSocket(url);
          isManuallyClosed = false;

          socket.onopen = () => {
            // console.log(`✅ WebSocket для ${wsType} открыт`);
            dispatch({ type: actions.onOpen });
          };

          socket.onerror = (event) => {
            // console.log(`❌ WebSocket ошибка для ${wsType}:`, event);
            if (!isManuallyClosed) {
              dispatch({
                type: actions.onError,
                payload: "Ошибка соединения с WebSocket",
              });
            }
          };

          socket.onmessage = (event) => {
            try {
              const data: WsResponse = JSON.parse(event.data);
              // console.log(`Получено сообщение для ${wsType}:`, data);
              if (data.success && Array.isArray(data.orders)) {
                const validOrders = data.orders.filter(
                  (order) =>
                    typeof order.number === "number" &&
                    Array.isArray(order.ingredients) &&
                    order.ingredients.every((id) => typeof id === "string") &&
                    [
                      "created",
                      "pending",
                      "done",
                      "canceled",
                      "cancelled",
                    ].includes(order.status) &&
                    typeof order.name === "string" &&
                    typeof order.createdAt === "string" &&
                    typeof order.updatedAt === "string"
                );
                dispatch({
                  type: actions.onMessage,
                  payload: { ...data, orders: validOrders },
                });
              } else {
                dispatch({
                  type: actions.onError,
                  payload: data.message || "Ошибка в сообщении",
                });
              }
            } catch (e) {
              // console.error(`Ошибка парсинга для ${wsType}:`, e);
              dispatch({
                type: actions.onError,
                payload: "Ошибка обработки данных от WebSocket",
              });
            }
          };

          socket.onclose = (event) => {
            // console.log(`📴 WebSocket для ${wsType} закрыт, код:`, event.code, "причина:", event.reason);
            socket = null;
            dispatch({ type: actions.onClose });
          };
        }
      }

      if (action.type === actions.onClose) {
        // console.log(`🔌 Закрытие WebSocket для ${wsType} вручную`);
        if (socket && socket.readyState === WebSocket.CONNECTING) {
          isManuallyClosed = true;
        } else if (socket && socket.readyState === WebSocket.OPEN) {
          isManuallyClosed = true;
          socket.close();
        } else {
          // console.warn(`⚠️ Сокет для ${wsType} уже закрыт или не инициализирован`);
        }
      }

      return next(action);
    };
  };
};
