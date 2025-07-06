import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

interface IIngredientElement {
  totalPrice: number;
  onOrder: () => void;
}

function TotalSection({ totalPrice, onOrder }: IIngredientElement) {
  return (
    <section className={styles.total}>
      <section className={styles.price}>
        <span className="text text_type_digits-medium">{totalPrice}</span>
        <CurrencyIcon type="primary" />
      </section>
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        onClick={onOrder}
        data-test-id="order-button"
      >
        Оформить заказ
      </Button>
    </section>
  );
}

export default TotalSection;
