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

export type IngredientState = {
  isShowingModal: boolean;
  selectedIngredient: Ingredient | null;
};

export interface RootState {
  burgerIngredients: BurgerIngredientsState;
}

export type OrderDetails = {
  number: number;
};

export type OrderData = {
  name: string;
  order: OrderDetails;
  success: boolean;
};

export type OrderState = {
  isShowingModal: boolean;
  data: OrderData | null;
  isLoading: boolean;
  hasError: boolean;
};

export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
};

export type UserState = {
  user: User | null;
  isLoading: boolean;
  error: string;
};

export type TOrder = {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export type OrderPreviewState = {
  isShowingModal: boolean;
  selectedOrder: TOrder | null;
};

export type WsResponse = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  message?: string;
};

export type WsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  wsConnected: boolean;
  error: string | null;
};

export type TActiveTab = "bun" | "sauce" | "main";
