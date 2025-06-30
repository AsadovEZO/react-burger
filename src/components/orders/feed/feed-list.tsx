import { TOrder } from "../../../utils/types";
import feedStyles from "../orders.module.css";
import OrderList from "../order-list";

interface IFeedList {
  orders: TOrder[];
}

function FeedList({ orders }: IFeedList) {
  return (
    <div className={feedStyles.mainBlock}>
      <section className={feedStyles.header}>
        <article className="text text_type_main-large">Лента заказов</article>
      </section>
      <OrderList orderList={orders} />
    </div>
  );
}

export default FeedList;
