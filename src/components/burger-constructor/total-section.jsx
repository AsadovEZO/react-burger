import PropTypes from "prop-types";

import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

function TotalSection({ totalPrice, onOrder }) {
  return (
    <section className={styles.total}>
      <section className={styles.price}>
        <span className="text text_type_digits-medium">{totalPrice}</span>
        <CurrencyIcon type="primary" />
      </section>
      <Button htmlType="button" type="primary" size="medium" onClick={onOrder}>
        Оформить заказ
      </Button>
    </section>
  );
}

TotalSection.propTypes = {
  totalPrice: PropTypes.number,
  onOrder: PropTypes.func.isRequired,
};

export default TotalSection;
