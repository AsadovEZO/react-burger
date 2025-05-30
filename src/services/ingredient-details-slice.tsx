import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "../utils/types";

type IngredientState = {
  isShowingModal: boolean,
  selectedIngredient: Ingredient | null;
};

const initialState: IngredientState = {
  isShowingModal: false,
  selectedIngredient: null,
};

export const ingredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    showIngredient: (state, action: PayloadAction<Ingredient>) => {
      return {
        isShowingModal: true,
        selectedIngredient: action.payload,
      };
    },
    hideIngredient: (state) => {
      state.isShowingModal = false;
      state.selectedIngredient = null;
    },
  },
});

export const { showIngredient, hideIngredient } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;