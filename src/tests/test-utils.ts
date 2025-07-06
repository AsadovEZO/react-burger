import { configureStore } from "@reduxjs/toolkit";
import { Reducer } from "redux";

export const createTestStore = (reducer: Reducer) =>
  configureStore({
    reducer: { testReducer: reducer },
  });
