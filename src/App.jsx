import { useEffect } from "react";
import styles from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import { fetchIngredients } from "./services/burger-ingredients-slice";

function App() {
  const dispatch = useDispatch();
  const hasError = useSelector((state) => state.burgerIngredients.hasError);

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
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <section className={styles.leftBlock}>
            <BurgerIngredients />
          </section>
          <section className={styles.rightBlock}>
            <BurgerConstructor />
          </section>
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
