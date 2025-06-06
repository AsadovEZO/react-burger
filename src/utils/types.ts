export interface Ingredient {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uniqueId?: string; 
  }

  export interface BurgerIngredientsState {
  isLoading: boolean;
  data: Ingredient[];
  hasError: boolean;
}

export interface RootState {
  burgerIngredients: BurgerIngredientsState;
}
  
export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
};

export type TActiveTab = "bun" | "sauce" | "main"