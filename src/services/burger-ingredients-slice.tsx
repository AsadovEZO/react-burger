import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { Ingredient, BurgerIngredientsState } from "../utils/types"

interface IngredientsApiResponse {
  success: boolean;
  data: Ingredient[];
}

const url = "https://norma.nomoreparties.space/api/ingredients";

const initialState: BurgerIngredientsState = {
  isLoading: false,
  data: [],
  hasError: false,
};

export const fetchIngredients = createAsyncThunk<
  Ingredient[], 
  void,  
  { rejectValue: string } 
>(
  "burgerIngredients/fetchIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
      const data: IngredientsApiResponse = await response.json();
      if (!data.success) {
        throw new Error("Данные с сервера не содержат success: true");
      }
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<Ingredient[]>) => {
      state.isLoading = false;
      state.hasError = false;
      state.data = action.payload;
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      state.data = [];
      console.error("Ошибка при загрузке данных:", action.payload);
    });
  },
});

export default burgerIngredientsSlice.reducer;
