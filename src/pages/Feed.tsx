import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

import styles from "../App.module.css";
import AppHeader from "../components/app-header/app-header";
import FeedList from "../components/orders/feed/feed-list";
import { RootState } from "../services/store";
import FeedStats from "../components/orders/feed/feed-stats";
import { wsFeedClose, wsFeedInit } from "../services/websocket/slice";

type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;

export function Feed() {
  const dispatch = useDispatch<AppDispatch>();
  const initialized = useRef(false);

  const { orders, total, totalToday, error } = useSelector(
    (state: RootState) => state.wsOrders.feed
  );

  useEffect(() => {
    if (!initialized.current) {
      console.log("Инициализация WebSocket в Feed");
      dispatch(wsFeedInit());
      initialized.current = true;
    }

    return () => {
      console.log("Закрытие WebSocket в Feed");
      dispatch(wsFeedClose());
    };
  }, [dispatch]);

  if (error) return <div>Ошибка: {error}</div>;

  return (
    <main className={styles.app}>
      <AppHeader />
      <div className={styles.main}>
        <section className={styles.leftBlock}>
          <FeedList orders={orders} />
        </section>
        <section className={styles.rightBlock}>
          <FeedStats orders={orders} total={total} totalToday={totalToday} />
        </section>
      </div>
    </main>
  );
}

export default Feed;
