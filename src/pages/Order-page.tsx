import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "../App.module.css";
import AppHeader from "../components/app-header/app-header";
import OrderDetails from "../components/orders/order-details";
import { getOrderByNumber } from "../utils/get-order-by-number";
import { TOrder } from "../utils/types";
import { RootState } from "../services/store";

export function OrderPage() {
  const { number } = useParams<{ number: string }>();
  const location = useLocation();

  const isProfileOrder = location.pathname.startsWith("/profile/orders/");
  const socketOrders = useSelector(
    (state: RootState) =>
      (isProfileOrder
        ? state.wsOrders.profile.orders
        : state.wsOrders.feed.orders) || []
  );

  const [order, setOrder] = useState<TOrder | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!number) return;

    const numericNumber = parseInt(number);
    const fromSocket = socketOrders.find((o) => o.number === numericNumber);

    if (fromSocket) {
      setOrder(fromSocket);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    getOrderByNumber(number)
      .then((data) => {
        setOrder(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Не удалось загрузить заказ");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [number, socketOrders]);

  return (
    <main className={styles.app}>
      <AppHeader />
      {isLoading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}
      {order && <OrderDetails order={order} />}
    </main>
  );
}

export default OrderPage;
