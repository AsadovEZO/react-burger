import { BASE_URL, ENDPOINTS } from "../utils/api";

type Order = {
  _id: string;
  ingredients: string[];
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
};

type OrderResponse = {
  success: boolean;
  orders: Order[];
};

export const getOrderByNumber = async (orderNumber: string): Promise<Order> => {
  const url = `${BASE_URL}${ENDPOINTS.orders}/${orderNumber}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Ошибка запроса: ${res.status}`);
  }

  const data: OrderResponse = await res.json();
  if (!data.success || !data.orders.length) {
    throw new Error("Заказ не найден");
  }

  return data.orders[0];
};
