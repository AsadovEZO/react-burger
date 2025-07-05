import { Ingredient } from "../../utils/types";

import styles from "./burger-constructor.module.css";
import IngredientElement from "./ingredient-element";

interface IIngredientsList {
  ingredients: Ingredient[];
}

function IngredientsList({ ingredients }: IIngredientsList) {
  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return (
      <p className="text text_type_main-medium" style={{ textAlign: "center" }}>
        Добавьте ингредиенты
      </p>
    );
  }

  return (
    <section
      className={styles.ingredientsList}
      data-test-id="constructor-ingredients"
    >
      {ingredients.map((ingredient, index) => (
        <IngredientElement
          key={ingredient.uniqueId || `${ingredient._id}-${index}`}
          ingredient={ingredient}
          newIndex={index}
        />
      ))}
    </section>
  );
}

export default IngredientsList;
