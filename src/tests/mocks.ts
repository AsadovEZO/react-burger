import {
  Ingredient,
  OrderData,
  TOrder,
  User,
  WsResponse,
} from "../utils/types";

export const firstBunIngredient: Ingredient = {
  calories: 643,
  carbohydrates: 85,
  fat: 26,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  name: "Флюоресцентная булка R2-D3",
  price: 988,
  proteins: 44,
  type: "bun",
  uniqueId: "643d69a5c3f7b9001cfa093d-1751371241662",
  __v: 0,
  _id: "643d69a5c3f7b9001cfa093d",
};

export const secondBunIngredient: Ingredient = {
  calories: 420,
  carbohydrates: 53,
  fat: 24,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  name: "Краторная булка N-200i",
  price: 1255,
  proteins: 80,
  type: "bun",
  uniqueId: "643d69a5c3f7b9001cfa093c-1751373905305",
  __v: 0,
  _id: "643d69a5c3f7b9001cfa093c",
};

export const sauseIngredient: Ingredient = {
  calories: 14,
  carbohydrates: 11,
  fat: 22,
  image: "https://code.s3.yandex.net/react/code/sauce-04.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
  name: "Соус фирменный Space Sauce",
  price: 80,
  proteins: 50,
  type: "sauce",
  uniqueId: "643d69a5c3f7b9001cfa0943-1751371243698",
  __v: 0,
  _id: "643d69a5c3f7b9001cfa0943",
};

export const mainIngredient: Ingredient = {
  calories: 4242,
  carbohydrates: 242,
  fat: 142,
  image: "https://code.s3.yandex.net/react/code/meat-01.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  name: "Биокотлета из марсианской Магнолии",
  price: 424,
  proteins: 420,
  type: "main",
  uniqueId: "643d69a5c3f7b9001cfa0941-1751371248068",
  __v: 0,
  _id: "643d69a5c3f7b9001cfa0941",
};

export const mockIngredients: Ingredient[] = [
  firstBunIngredient,
  secondBunIngredient,
  sauseIngredient,
  mainIngredient,
];

export const mockApiResponse = {
  success: true,
  data: mockIngredients,
};

export const mockError = "Ошибка сети";

export const mockOrderData: OrderData = {
  name: "Test Order",
  order: { number: 12345 },
  success: true,
};

export const mockResponse = {
  success: true,
  name: "Test Order",
  order: { number: 12345 },
};

export const mockUser: User = {
  email: "lavrwcz@yandex.ru",
  name: "User",
  password: "password",
  id: "12345",
};

export const mockOrder: TOrder = {
  ingredients: [
    firstBunIngredient._id,
    sauseIngredient._id,
    mainIngredient._id,
  ],
  _id: "686546315a54df001b6db267",
  status: "done",
  number: 83315,
  createdAt: "2025-07-02T14:46:09.246Z",
  updatedAt: "2025-07-02T14:46:09.986Z",
  name: "Space флюоресцентный антарианский бургер",
};

export const mockWsResponse: WsResponse = {
  success: true,
  orders: [mockOrder],
  total: 100,
  totalToday: 10,
};
