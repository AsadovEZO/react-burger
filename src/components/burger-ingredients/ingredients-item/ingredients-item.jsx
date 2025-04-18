import PropTypes from "prop-types";
import styles from "./ingredients-item.module.css";
import { IngredientType } from "../../../utils/types.js";
import { useModal } from "../../../hooks/show-modal";
import Modal from "../../modal/modal";
import IngredientDetails from "../../ingredient-details/ingredient-details";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientItem = ({ ingredient, count }) => {
  const { name, price, image } = ingredient;
  const [isShowingModal, toggleModal] = useModal();
  return (
    <div className={styles.card}>
      <button className={styles.addButton} onClick={toggleModal}>
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
      <Modal
        show={isShowingModal}
        onCloseButtonClick={toggleModal}
        headerText="Детали ингредиента"
        content={<IngredientDetails ingredient={ingredient} />}
        type="ingredient"
      />
    </div>
  );
};

IngredientItem.propTypes = {
  ingredient: IngredientType.isRequired,
  count: PropTypes.number.isRequired,
};

export default IngredientItem;
