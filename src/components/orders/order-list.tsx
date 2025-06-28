import feedStyles from "./orders.module.css";
import { TOrder } from "../../utils/types";
import OrderCard from "./order-card";

interface IOrderList {
  orderList: TOrder[];
  showStatus?: boolean;
}

const OrderList = ({ orderList, showStatus = false }: IOrderList) => {
  const sortedOrders = [...orderList].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <section className={feedStyles.scrollableContainer}>
      {sortedOrders.length === 0 ? (
        <p className={feedStyles.noOrdersMessage}>Заказы отсутствуют</p>
      ) : (
        <ul>
          {sortedOrders.map((order) => (
            <OrderCard order={order} key={order._id} showStatus={showStatus} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default OrderList;
