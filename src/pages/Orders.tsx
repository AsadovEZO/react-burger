import { useEffect, useRef, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "../App.module.css";
import AuthStyles from "../Auth.module.css";
import { ProfileMenu } from "../components/profile/profile-menu";
import OrderList from "../components/orders/order-list";
import AppHeader from "../components/app-header/app-header";
import { useAppDispatch, useAppSelector } from "../services/store";
import { wsProfileClose, wsProfileInit } from "../services/websocket/slice";
import { getCookie } from "../services/user/cookie-utils";
import { refreshToken } from "../services/user/thunks";

const OrdersComponent = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useRef(false);
  const { wsConnected, error } = useAppSelector(
    (state) => state.wsOrders.profile
  );
  const { orders } = useAppSelector((state) => state.wsOrders.profile);
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    console.log(
      "Компонент Orders смонтирован, wsConnected:",
      wsConnected,
      "Токен:",
      accessToken,
      "Orders:",
      orders
    );
    if (!isInitialized.current && accessToken) {
      console.log("Инициализация WebSocket для персональных заказов");
      dispatch(wsProfileInit());
      isInitialized.current = true;
    } else if (!accessToken) {
      console.error("Токен отсутствует, перенаправление на /login");
      navigate("/login", { state: { from: location } });
    }

    if (error === "Invalid or missing token") {
      console.log("Обнаружена ошибка токена, пытаемся обновить токен");
      const refresh = async () => {
        try {
          await dispatch(refreshToken()).unwrap();
          console.log("Токен обновлен, повторная инициализация WebSocket");
          dispatch(wsProfileClose());
          dispatch(wsProfileInit());
        } catch (refreshErr) {
          console.error("Не удалось обновить токен:", refreshErr);
          navigate("/login", { state: { from: location } });
        }
      };
      refresh();
    }

    return () => {
      console.log("Компонент Orders размонтирован, wsConnected:", wsConnected);
      if (isInitialized.current) {
        dispatch(wsProfileClose());
        isInitialized.current = false;
      }
    };
  }, [dispatch]);

  if (error && error !== "Invalid or missing token") {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <section className={AuthStyles.profilePage}>
        <ProfileMenu description="В этом разделе вы можете посмотреть свою историю заказов" />
        <div className={AuthStyles.ordersContainer}>
          <OrderList orderList={orders} showStatus={true} />
        </div>
      </section>
    </div>
  );
};

export const Orders = memo(OrdersComponent);
