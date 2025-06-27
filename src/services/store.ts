import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import burgerConstructorReducer from "./burger-constructor-slice";
import burgerIngredientsReducer from "./burger-ingredients-slice";
import ingredientDetailsReducer from "./ingredient-details-slice";
import newOrderReducer from "./new-order-slice";
import userReducer from "./user/slice";
import orderPreviewReducer from "./order-preview-slice";
import wsOrdersReducer from "./websocket/slice";
import { createSocketMiddleware } from "./websocket/ws-middleware";

export const store = configureStore({
  reducer: {
    burgerConstructor: burgerConstructorReducer,
    burgerIngredients: burgerIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    newOrder: newOrderReducer,
    user: userReducer,
    orderPreview: orderPreviewReducer,
    wsOrders: wsOrdersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      createSocketMiddleware({
        wsUrl: "wss://norma.nomoreparties.space/orders/all",
        wsType: "feed",
      }),
      createSocketMiddleware({
        wsUrl: "wss://norma.nomoreparties.space/orders",
        wsType: "profile",
        withToken: true,
      })
    ),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;