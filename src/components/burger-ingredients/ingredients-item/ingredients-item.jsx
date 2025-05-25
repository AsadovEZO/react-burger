import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";

import { IngredientType } from "../../../utils/types.js";
import styles from "./ingredients-item.module.css";
import { showIngredient } from "../../../services/ingredient-details-slice";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientItem = ({ ingredient, count }) => {
  const { name, price, image, _id } = ingredient;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    dispatch(showIngredient(ingredient));
    navigate(`/ingredients/${_id}`, { state: { background: location } });
  };

  const [{ opacity }, dragRef] = useDrag({
    type: "addIngredient",
    item: { ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div className={styles.card} style={{ opacity }} ref={dragRef}>
      <button className={styles.addButton} onClick={handleClick}>
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
  count: PropTypes.number.isRequired,
};

export default IngredientItem;
