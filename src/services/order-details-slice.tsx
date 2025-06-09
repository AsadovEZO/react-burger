import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { ENDPOINTS, request } from "../utils/api";

type OrderDetails = {
  number: number;
};

type OrderData = {
  name: string;
  order: OrderDetails;
  success: boolean;
};

type OrderState = {
  isShowingModal: boolean;
  data: OrderData | null;
  isLoading: boolean;
  hasError: boolean;
};

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
    const data = await request<OrderData>(ENDPOINTS.orders, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
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
      console.error("Ошибка при загрузке данных:", action.payload);
    });
  },
});

export const { hideOrderModal } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
