import { Ingredient } from './types';


export const calculateItemPrice = (item: Ingredient | null): number => {
  if (!item) return 0;
  return item.type === 'bun' ? item.price * 2 : item.price; //item.price 
};

export const calculateTotalPrice = (ingredients: (Ingredient | null)[]): number => {
  return ingredients.reduce((acc, item) => acc + calculateItemPrice(item), 0);
};

export const calculateOrderPrice = (
  ingredientIds: string[],
  allIngredients: Ingredient[]
): number => {
  const ingredients = ingredientIds.map(id => 
    allIngredients.find(ing => ing._id === id) || null
  );
  return calculateTotalPrice(ingredients);
};
