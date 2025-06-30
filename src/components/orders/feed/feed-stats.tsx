import { TOrder } from "../../../utils/types";
import feedStyles from "../orders.module.css";

interface IFeedStats {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

const filterOrdersByStatus = (orders: TOrder[], status: string) => {
  return orders.filter((order) => order.status === status);
};

const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const FeedStats = ({ orders, total, totalToday }: IFeedStats) => {
  const readyOrders = filterOrdersByStatus(orders, "done").slice(0, 50);
  const pendingOrders = filterOrdersByStatus(orders, "pending").slice(0, 50);

  const chunkSize = 10;
  const readyChunks = chunkArray(readyOrders, chunkSize);
  const pendingChunks = chunkArray(pendingOrders, chunkSize);

  return (
    <section className={feedStyles.stats}>
      <section className={feedStyles.statusContainer}>
        <article className={feedStyles.statBlock}>
          <h3 className="text text_type_main-medium">Готовы:</h3>
          <div className={feedStyles.columns}>
            {readyChunks.map((chunk, index) => (
              <ul key={index} className={feedStyles.column}>
                {chunk.map((order) => (
                  <li
                    key={order._id}
                    className={`${feedStyles.orderNumber} ${feedStyles.readyNumber} text text_type_digits-default`}
                  >
                    {order.number}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </article>
        <article className={feedStyles.statBlock}>
          <h3 className="text text_type_main-medium">В работе:</h3>
          <div className={feedStyles.columns}>
            {pendingChunks.map((chunk, index) => (
              <ul key={index} className={feedStyles.column}>
                {chunk.map((order) => (
                  <li
                    key={order._id}
                    className={`${feedStyles.orderNumber} ${feedStyles.pendingNumber} text text_type_digits-default`}
                  >
                    {order.number}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </article>
      </section>

      <article className={feedStyles.statBlock}>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p className={`${feedStyles.number} text text_type_digits-large`}>
          {total}
        </p>
      </article>
      <article className={feedStyles.statBlock}>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p className={`${feedStyles.number} text text_type_digits-large`}>
          {totalToday}
        </p>
      </article>
    </section>
  );
};

export default FeedStats;
