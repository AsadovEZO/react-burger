import PropTypes from "prop-types";

import { IngredientType } from "../../utils/types.js";

import styles from "./burger-constructor.module.css";
import IngredientElement from "./ingredient-element.jsx";

function IngredientsList({ ingredients }) {
  if (ingredients.length === 0) {
    return (
      <p className="text text_type_main-medium" style={{ textAlign: "center" }}>
        Добавьте ингредиенты
      </p>
    );
  }

  return (
    <section className={styles.ingredientsList}>
      {ingredients.map((ingredient, index) => (
        <IngredientElement
          key={ingredient.uniqueId}
          ingredient={ingredient}
          newIndex={index}
        />
      ))}
    </section>
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientType).isRequired,
};

export default IngredientsList;
