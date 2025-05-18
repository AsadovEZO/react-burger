import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import { IngredientType } from "../../utils/types.js";
import {
  handleMove,
  handleRemove,
} from "../../services/burger-constructor-slice";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function IngredientElement({ ingredient, newIndex }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ opacity }, drag] = useDrag({
    type: "moveIngredient",
    item: { ingredient, index: newIndex },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [, drop] = useDrop({
    accept: "moveIngredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    hover(draggedItem) {
      dispatch(
        handleMove({
          ingredient: draggedItem.ingredient,
          toIndex: newIndex,
        })
      );
    },
  });

  drag(drop(ref));

  if (!ingredient) {
    return null;
  }

  return (
    <section className={styles.ingredientsList} style={{ opacity }} ref={ref}>
      <div key={ingredient.uniqueId} className={styles.ingredientItem}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => dispatch(handleRemove(ingredient))}
        />
      </div>
    </section>
  );
}

IngredientElement.propTypes = {
  ingredient: IngredientType,
  newIndex: PropTypes.number.isRequired,
};

export default IngredientElement;
