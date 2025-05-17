import Modal from "../modal/modal";
import { useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import IngredientDetails from "../ingredient-details/ingredient-details";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientsMenu from "./ingredients-menu/ingredients-menu";
import IngredientItem from "./ingredients-item/ingredients-item";
import useScrollSection from "../../hooks/use-scroll-section";
import { hideIngredient } from "../../services/ingredient-details-slice";

function BurgerIngredients() {
  const selectedIngredients = useSelector((state) => state.burgerConstructor);
  const ingredientDetails = useSelector((state) => state.ingredientDetails);

  const data = useSelector((state) => state.burgerIngredients.data);
  const { buns, sauces, mains } = useMemo(() => {
    const buns = data.filter((item) => item.type === "bun");
    const sauces = data.filter((item) => item.type === "sauce");
    const mains = data.filter((item) => item.type === "main");
    return { buns, sauces, mains };
  }, [data]);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideIngredient());
  };

  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const getIngredientCount = (ingredient) => {
    return selectedIngredients.filter((item) => item._id === ingredient._id)
      .length;
  };

  const { activeTab, scrollToSection } = useScrollSection(
    containerRef,
    bunRef,
    sauceRef,
    mainRef
  );

  return (
    <div className={ingredientsStyles.mainBlock}>
      <section className={ingredientsStyles.header}>
        <article className="text text_type_main-large">Соберите бургер</article>
      </section>
      <IngredientsMenu activeTab={activeTab} setActiveTab={scrollToSection} />
      <section
        ref={containerRef}
        className={ingredientsStyles.scrollableContainer}
      >
        <section ref={bunRef}>
          <article className="text text_type_main-medium">Булки</article>
          <ul className={ingredientsStyles.itemsGrid}>
            {buns.map((ingredient) => (
              <IngredientItem
                key={ingredient._id}
                ingredient={ingredient}
                count={getIngredientCount(ingredient) * 2}
              />
            ))}
          </ul>
        </section>
        <section ref={sauceRef}>
          <article className="text text_type_main-medium">Соусы</article>
          <ul className={ingredientsStyles.itemsGrid}>
            {sauces.map((ingredient) => (
              <IngredientItem
                key={ingredient._id}
                ingredient={ingredient}
                count={getIngredientCount(ingredient)}
              />
            ))}
          </ul>
        </section>
        <section ref={mainRef}>
          <article className="text text_type_main-medium">Начинки</article>
          <ul className={ingredientsStyles.itemsGrid}>
            {mains.map((ingredient) => (
              <IngredientItem
                key={ingredient._id}
                ingredient={ingredient}
                count={getIngredientCount(ingredient)}
              />
            ))}
          </ul>
        </section>
      </section>

      {ingredientDetails.isShowingModal &&
        ingredientDetails.selectedIngredient && (
          <Modal
            show={ingredientDetails.isShowingModal}
            onCloseButtonClick={closeModal}
            headerText="Детали ингредиента"
            type="ingredient"
          >
            <IngredientDetails />
          </Modal>
        )}
    </div>
  );
}

export default BurgerIngredients;
