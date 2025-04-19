import { useState } from "react";
import PropTypes from "prop-types";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientsMenu from "./ingredients-menu/ingredients-menu";
import IngredientItem from "./ingredients-item/ingredients-item";
import { IngredientType } from "../../utils/types.js";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function BurgerIngredients({ ingredients, selectedIngredients }) {
  const buns = ingredients.filter((item) => item.type === "bun");
  const sauces = ingredients.filter((item) => item.type === "sauce");
  const mains = ingredients.filter((item) => item.type === "main");

  const [modalState, setModalState] = useState({
    isShowingModal: false,
    selectedIngredient: null,
  });

  const closeModal = () => {
    setModalState({
      isShowingModal: false,
      selectedIngredient: null,
    });
  };

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
                count={getIngredientCount(ingredient)}
                setModalState={setModalState}
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
                count={getIngredientCount(ingredient)}
                setModalState={setModalState}
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
                count={getIngredientCount(ingredient)}
                setModalState={setModalState}
              />
            ))}
          </ul>
        </section>
      </section>

      {modalState.isShowingModal && modalState.selectedIngredient && (
        <Modal
          show={modalState.isShowingModal}
          onCloseButtonClick={closeModal}
          headerText="Детали ингредиента"
          type="ingredient"
        >
          <IngredientDetails ingredient={modalState.selectedIngredient} />
        </Modal>
      )}
    </div>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientType).isRequired,
  selectedIngredients: PropTypes.arrayOf(IngredientType),
};

export default BurgerIngredients;
