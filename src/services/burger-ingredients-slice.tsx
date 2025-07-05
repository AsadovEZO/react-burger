import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { Ingredient, BurgerIngredientsState } from "../utils/types";
import { request, ENDPOINTS } from "../utils/api";

interface IngredientsApiResponse {
  success: boolean;
  data: Ingredient[];
}

const initialState: BurgerIngredientsState = {
  isLoading: false,
  data: [],
  hasError: false,
};

export const fetchIngredients = createAsyncThunk<
  Ingredient[],
  void,
  { rejectValue: string }
>("burgerIngredients/fetchIngredients", async (_, { rejectWithValue }) => {
  try {
    const data = await request<IngredientsApiResponse>(ENDPOINTS.ingredients);
    return data.data;
  } catch (err: unknown) {
    return rejectWithValue(
      err instanceof Error ? err.message : "Ошибка сети или сервера"
    );
  }
});

export const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(
      fetchIngredients.fulfilled,
      (state, action: PayloadAction<Ingredient[]>) => {
        state.isLoading = false;
        state.hasError = false;
        state.data = action.payload;
      }
    );
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      state.data = [];
      // console.error("Ошибка при загрузке данных:", action.payload);
    });
  },
});

export default burgerIngredientsSlice.reducer;
