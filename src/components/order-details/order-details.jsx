import { useSelector } from "react-redux";

import styles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderDetails = () => {
  const orderDetails = useSelector((state) => state.orderDetails.data);
  return (
    <div className={styles.container}>
      <h2 className={`${styles.orderNumber} text text_type_digits-large`}>
        {orderDetails?.order?.number}
      </h2>
      <p className={`${styles.orderId} text text_type_main-medium`}>
        Идентификатор заказа
      </p>
      <div className={styles.checkmark}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className={`${styles.status} text text_type_main-default`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`${styles.instruction} text text_type_main-default text_color_inactive`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
