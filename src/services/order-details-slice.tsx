import { createSlice, createAsyncThunk, PayloadAction  } from "@reduxjs/toolkit";

type OrderDetails = {
  number: number,
};

type OrderData = {
  name: string,
  order: OrderDetails,
  success: boolean,
};

type OrderState = {
  isShowingModal: boolean,
  data: OrderData | null;
  isLoading: boolean;
  hasError: boolean;
};

// interface OrderApiResponse {
//   success: boolean;
//   data: OrderState;
// }

const url = "https://norma.nomoreparties.space/api/orders";

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
>(
  "orderDetails/postOrder",
  async (ingredients, { rejectWithValue }) => {
    console.log(ingredients)
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      });
  
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
      const data: OrderData = await response.json();
      if (!data.success) {
        throw new Error("Данные с сервера не содержат success: true");
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    hideOrderModal: (state) => { state.isShowingModal = false; },
  },
    extraReducers: (builder) => {
      builder.addCase(postOrder.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      });
      builder.addCase(postOrder.fulfilled, (state, action: PayloadAction<OrderData>) => {
        state.isLoading = false;
        state.hasError = false;
        state.data = action.payload;
        state.isShowingModal = true;
      });
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