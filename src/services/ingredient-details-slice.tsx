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
    hideIngredient: () => { return initialState },
  },
});

export const { showIngredient, hideIngredient } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;