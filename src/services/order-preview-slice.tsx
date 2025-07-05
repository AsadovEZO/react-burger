import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderPreviewState, TOrder } from "../utils/types";

const initialState: OrderPreviewState = {
  isShowingModal: false,
  selectedOrder: null,
};

export const orderPreviewSlice = createSlice({
  name: "orderPreview",
  initialState,
  reducers: {
    showOrder: (state, action: PayloadAction<TOrder>) => {
      state.isShowingModal = true;
      state.selectedOrder = action.payload;
    },
    hideOrder: (state) => {
      state.isShowingModal = false;
      state.selectedOrder = null;
    },
  },
});

export const { showOrder, hideOrder } = orderPreviewSlice.actions;
export default orderPreviewSlice.reducer;
