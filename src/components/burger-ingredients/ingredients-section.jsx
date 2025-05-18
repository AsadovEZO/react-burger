import PropTypes from "prop-types";

import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientItem from "./ingredients-item/ingredients-item";
import { IngredientType } from "../../utils/types.js";

const IngredientSection = ({ sectionRef, ingredientsList, name, counts }) => {
  const getIngredientCount = (ingredient) => counts?.[ingredient._id] || 0;

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

IngredientSection.propTypes = {
  sectionRef: PropTypes.shape({
    current: PropTypes.any,
  }),
  ingredientsList: PropTypes.arrayOf(IngredientType).isRequired,
  name: PropTypes.string.isRequired,
  counts: PropTypes.object,
};

export default IngredientSection;
