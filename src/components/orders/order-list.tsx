import feedStyles from "./orders.module.css";
import { TOrder } from "../../utils/types";
import OrderCard from "./order-card";

interface IOrderList {
  orderList: TOrder[];
  showStatus?: boolean;
}

const OrderList = ({ orderList, showStatus = false }: IOrderList) => {
  return (
    <section className={feedStyles.scrollableContainer}>
      {orderList.length === 0 ? (
        <p className={feedStyles.noOrdersMessage}>Заказы отсутствуют</p>
      ) : (
        <ul>
          {orderList.map((order) => (
            <OrderCard order={order} key={order._id} showStatus={showStatus} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default OrderList;
