import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Ingredient } from "../utils/types";

interface MoveIngredientPayload {
  ingredient: Ingredient;
  toIndex: number;
}

const initialState: Ingredient[] = [];

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    handleAdd: {
      reducer: (state, action: PayloadAction<Ingredient>) => {
        const ingredient = action.payload;
        if (ingredient.type === "bun") {
          const currentBun = state.find((item) => item.type === "bun");

          if (currentBun && currentBun._id === ingredient._id) {
            return;
          }

          if (currentBun) {
            const filtered = state.filter((item) => item.type !== "bun");
            return [ingredient, ...filtered];
          }

          return [ingredient, ...state];
        } else {
          state.push(ingredient);
        }
      },
      prepare: (ingredient: Ingredient) => {
        return {
          payload: {
            ...ingredient,
            uniqueId: `${ingredient._id}-${Date.now()}`,
          },
        };
      },
    },
    handleMove: (state, action: PayloadAction<MoveIngredientPayload>) => {
      const { ingredient, toIndex } = action.payload;

      const ingredientIndex = state.findIndex(
        (item) => item.uniqueId === ingredient.uniqueId
      );
      if (ingredientIndex === -1) return;

      const bun = state.find((item) => item.type === "bun") || null!;
      const fillings = state.filter((item) => item.type !== "bun");

      if (fillings.length === 0) return;

      const fromIndex = fillings.findIndex(
        (item) => item.uniqueId === ingredient.uniqueId
      );
      if (fromIndex === -1 || fromIndex === toIndex) return;

      const [moved] = fillings.splice(fromIndex, 1);
      fillings.splice(toIndex, 0, moved);

      return bun ? [bun, ...fillings] : [...fillings];
    },
    handleRemove: (state, action: PayloadAction<{ uniqueId: string }>) => {
      return state.filter((item) => item.uniqueId !== action.payload.uniqueId);
    },
  },
});

export const { handleAdd, handleMove, handleRemove } =
  burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
