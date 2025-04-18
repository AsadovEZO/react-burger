import { useState, useEffect } from "react";
import styles from "./App.module.css";

import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import { useUserBurger } from "./hooks/use-user-burger";

function App() {
  // Кастомный хук для упрощения кода в App.jsx
  const { selectedIngredients, handleAdd, handleRemove } = useUserBurger();

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  // Получение данных
  const url = "https://norma.nomoreparties.space/api/ingredients";

  const getData = () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(url)
      .then((res) => res.json())
      .then((data) =>
        setState({
          ...state,
          data: data.data,
          hasError: !data.success,
          isLoading: false,
        })
      )
      .catch((e) => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // Если на каком-то этапе возникла ошибка (получили флаг в state.hasError) - возвращаем уведомлеие для пользователей
  if (state.hasError) {
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
        <section className={styles.leftBlock}>
          <BurgerIngredients
            ingredients={state.data}
            onAdd={handleAdd}
            selectedIngredients={selectedIngredients}
          />
        </section>
        <section className={styles.rightBlock}>
          <BurgerConstructor
            selectedIngredients={selectedIngredients}
            onRemove={handleRemove}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
