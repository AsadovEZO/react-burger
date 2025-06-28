import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from "../App.module.css";
import AppHeader from "../components/app-header/app-header";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { fetchIngredients } from "../services/burger-ingredients-slice";
import { useAppDispatch, useAppSelector } from "../services/store";

export function Home() {
  const dispatch = useAppDispatch();
  const hasError = useAppSelector((state) => state.burgerIngredients.hasError);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (hasError) {
    return (
      <section className={styles.app}>
        <h1 className="text text_type_main-large">Упс! Куда все подевалось?</h1>
        <p className="text text_type_main-medium">
          При загрузке списка ингредиентов произошла ошибка. Пожалуйста,
          перезагрузите страницу.
        </p>
      </section>
    );
  }

  return (
    <main className={styles.app}>
      <AppHeader />
      <div className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <section className={styles.leftBlock}>
            <BurgerIngredients />
          </section>
          <section className={styles.rightBlock}>
            <BurgerConstructor />
          </section>
        </DndProvider>
      </div>
    </main>
  );
}

export default Home;
