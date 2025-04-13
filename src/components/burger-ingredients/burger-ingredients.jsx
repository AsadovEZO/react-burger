import PropTypes from "prop-types";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientsMenu from "./ingredients-menu/ingredients-menu";
import IngredientItem from "./ingredients-item/ingredients-item";
import { IngredientType } from "../../utils/types.js";

function BurgerIngredients({ ingredients, onAdd, selectedIngredients }) {
  const buns = ingredients.filter((item) => item.type === "bun");
  const sauces = ingredients.filter((item) => item.type === "sauce");
  const mains = ingredients.filter((item) => item.type === "main");

  const getIngredientCount = (ingredient) => {
    return selectedIngredients.filter((item) => item._id === ingredient._id)
      .length;
  };

  return (
    <div className={ingredientsStyles.mainBlock}>
      <section className={ingredientsStyles.header}>
        <article className="text text_type_main-large">Соберите бургер</article>
      </section>
      <IngredientsMenu />
      <section className={ingredientsStyles.scrollableContainer}>
        <section>
          <article className="text text_type_main-medium">Булки</article>
          <ul className={ingredientsStyles.itemsGrid}>
            {buns.map((ingredient) => (
              <IngredientItem
                key={ingredient._id}
                ingredient={ingredient}
                onAdd={onAdd}
                count={getIngredientCount(ingredient)}
              />
            ))}
          </ul>
        </section>
        <section>
          <article className="text text_type_main-medium">Соусы</article>
          <ul className={ingredientsStyles.itemsGrid}>
            {sauces.map((ingredient) => (
              <IngredientItem
                key={ingredient._id}
                ingredient={ingredient}
                onAdd={onAdd}
                count={getIngredientCount(ingredient)}
              />
            ))}
          </ul>
        </section>
        <section>
          <article className="text text_type_main-medium">Начинки</article>
          <ul className={ingredientsStyles.itemsGrid}>
            {mains.map((ingredient) => (
              <IngredientItem
                key={ingredient._id}
                ingredient={ingredient}
                onAdd={onAdd}
                count={getIngredientCount(ingredient)}
              />
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientType).isRequired,
  onAdd: PropTypes.func.isRequired,
  selectedIngredients:  PropTypes.arrayOf(IngredientType),
};

export default BurgerIngredients;
