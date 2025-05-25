import { useRef, useMemo } from "react";
import { useSelector } from "react-redux";

import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientsMenu from "./ingredients-menu/ingredients-menu";
import IngredientSection from "./ingredients-section";
import useScrollSection from "../../hooks/use-scroll-section";

function BurgerIngredients() {
  const selectedIngredients = useSelector((state) => state.burgerConstructor);

  const data = useSelector((state) => state.burgerIngredients.data);
  const { buns, sauces, mains } = useMemo(() => {
    const buns = data.filter((item) => item.type === "bun");
    const sauces = data.filter((item) => item.type === "sauce");
    const mains = data.filter((item) => item.type === "main");
    return { buns, sauces, mains };
  }, [data]);

  const counts = useMemo(() => {
    const countsMap = {};
    selectedIngredients.forEach((item) => {
      const count = item.type === "bun" ? 2 : 1;
      countsMap[item._id] = (countsMap[item._id] || 0) + count;
    });
    return countsMap;
  }, [selectedIngredients]);

  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

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
        <IngredientSection
          sectionRef={bunRef}
          ingredientsList={buns}
          name="Булки"
          counts={counts}
        />
        <IngredientSection
          sectionRef={sauceRef}
          ingredientsList={sauces}
          name="Соусы"
          counts={counts}
        />
        <IngredientSection
          sectionRef={mainRef}
          ingredientsList={mains}
          name="Начинки"
          counts={counts}
        />
      </section>
    </div>
  );
}

export default BurgerIngredients;
