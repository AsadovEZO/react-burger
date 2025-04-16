import PropTypes from "prop-types";
import styles from "./ingredients-item.module.css";
import { IngredientType } from "../../../utils/types.js";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientItem = ({ ingredient, onAdd, count }) => {
  const { name, price, image } = ingredient;
  return (
    <div className={styles.card}>
      <button className={styles.addButton} onClick={() => onAdd(ingredient)}>
        {count > 0 && (
          <div className={styles.counter}>
            <Counter count={count} size="default" extraClass="m-1" />
          </div>
        )}
        <img src={image} alt={name} className={styles.image} />
        <p className={`${styles.price} text text_type_digits-default`}>
          {price}{" "}
          <span className={styles.currencyIcon}>
            <CurrencyIcon type="primary" />
          </span>
        </p>
        <p className={`${styles.name} text text_type_main-default`}>{name}</p>
      </button>
    </div>
  );
};

IngredientItem.propTypes = {
  ingredient: IngredientType.isRequired,
  onAdd: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default IngredientItem;
