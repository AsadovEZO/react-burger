import { useRef } from "react";
import { useDrag } from "react-dnd";
import { useNavigate, useLocation } from "react-router-dom";

import { Ingredient } from "../../../utils/types";
import { useAppDispatch } from "../../../services/store";
import styles from "./ingredients-item.module.css";
import { showIngredient } from "../../../services/ingredient-details-slice";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

interface IIngredientItem {
  ingredient: Ingredient;
  count: number;
}

const IngredientItem = ({ ingredient, count }: IIngredientItem) => {
  const { name, price, image, _id } = ingredient;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    dispatch(showIngredient(ingredient));
    navigate(`/ingredients/${_id}`, { state: { background: location } });
  };

  const ref = useRef<HTMLDivElement>(null);

  const [{ opacity }, dragRef] = useDrag({
    type: "addIngredient",
    item: { ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  dragRef(ref);

  return (
    <div className={styles.card} style={{ opacity }} ref={ref}>
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

export default IngredientItem;
