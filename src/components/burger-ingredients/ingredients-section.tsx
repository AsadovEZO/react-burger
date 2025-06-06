import { RefObject } from "react";

import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientItem from "./ingredients-item/ingredients-item";
import { Ingredient } from "../../utils/types";

interface IIngredient {
  sectionRef: RefObject<HTMLElement>;
  ingredientsList: Ingredient[];
  name: "Булки" | "Соусы" | "Начинки";
  counts: { [key: string]: number };
}

const IngredientSection = ({
  sectionRef,
  ingredientsList,
  name,
  counts,
}: IIngredient) => {
  const getIngredientCount = (ingredient: Ingredient) =>
    counts?.[ingredient._id] || 0;

  if (!ingredientsList || ingredientsList.length === 0) {
    return (
      <section ref={sectionRef}>
        <article className="text text_type_main-medium">{name}</article>
        <p className="text text_type_main-default">Нет ингредиентов</p>
      </section>
    );
  }

  return (
    <section ref={sectionRef}>
      <article className="text text_type_main-medium">{name}</article>
      <ul className={ingredientsStyles.itemsGrid}>
        {ingredientsList.map((ingredient) => (
          <IngredientItem
            key={ingredient._id}
            ingredient={ingredient}
            count={getIngredientCount(ingredient)}
          />
        ))}
      </ul>
    </section>
  );
};

export default IngredientSection;
