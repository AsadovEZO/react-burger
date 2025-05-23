import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import burgerConstructorReducer from "./burger-constructor-slice";
import burgerIngredientsReducer from "./burger-ingredients-slice";
import ingredientDetailsReducer from "./ingredient-details-slice";
import orderDetailsReducer from "./order-details-slice";
import userReducer from "./user/slice";

export const store = configureStore({
  reducer: {
    burgerConstructor: burgerConstructorReducer,
    burgerIngredients: burgerIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;