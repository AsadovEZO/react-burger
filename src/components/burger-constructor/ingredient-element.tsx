import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { Ingredient } from "../../utils/types";
import { useAppDispatch } from "../../services/store";
import {
  handleMove,
  handleRemove,
} from "../../services/burger-constructor-slice";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

interface IIngredientElement {
  ingredient: Ingredient;
  newIndex: number;
}

function IngredientElement({ ingredient, newIndex }: IIngredientElement) {
  const dispatch = useAppDispatch();
  const ref = useRef(null);

  const [{ opacity }, drag] = useDrag({
    type: "moveIngredient",
    item: { ingredient, index: newIndex },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [, drop] = useDrop<
    { ingredient: Ingredient },
    unknown,
    { isHover: boolean }
  >({
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
    <div
      className={styles.ingredientItem}
      style={{ opacity }}
      ref={ref}
      data-test-id="ingredient-element"
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() =>
          dispatch(handleRemove({ uniqueId: ingredient.uniqueId! }))
        }
      />
    </div>
  );
}

export default IngredientElement;
