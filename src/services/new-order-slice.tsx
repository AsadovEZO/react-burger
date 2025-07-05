import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { ENDPOINTS, request } from "../utils/api";
import { getCookie } from "./user/cookie-utils";
import { OrderData, OrderState } from "../utils/types";

const initialState: OrderState = {
  isShowingModal: false,
  data: null,
  isLoading: false,
  hasError: false,
};

export const postOrder = createAsyncThunk<
  OrderData,
  string[],
  { rejectValue: string }
>("orderDetails/postOrder", async (ingredients, { rejectWithValue }) => {
  try {
    const accessToken = getCookie("accessToken");
    const data = await request<OrderData>(ENDPOINTS.orders, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ingredients }),
    });
    if (!data.success) {
      throw new Error("Не удалось создать заказ");
    }
    return data;
  } catch (err: unknown) {
    return rejectWithValue(
      err instanceof Error ? err.message : "Ошибка сети или сервера"
    );
  }
});

export const newOrderSlice = createSlice({
  name: "newOrder",
  initialState,
  reducers: {
    hideOrderModal: (state) => {
      state.isShowingModal = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(
      postOrder.fulfilled,
      (state, action: PayloadAction<OrderData>) => {
        state.isLoading = false;
        state.hasError = false;
        state.data = action.payload;
        state.isShowingModal = true;
      }
    );
    builder.addCase(postOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      state.data = null;
      // console.error("Ошибка при загрузке данных:", action.payload);
    });
  },
});

export const { hideOrderModal } = newOrderSlice.actions;
export default newOrderSlice.reducer;
