import { useParams } from "react-router-dom";
import { useEffect } from "react";

import IngredientDetails from "../components/ingredient-details/ingredient-details";
import styles from "../App.module.css";
import AppHeader from "../components/app-header/app-header";
import { Ingredient } from "../utils/types";
import { showIngredient } from "../services/ingredient-details-slice";
import { useAppDispatch, useAppSelector } from "../services/store";

export function IngredientPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.burgerIngredients.data);
  const isLoading = useAppSelector(
    (state) => state.burgerIngredients.isLoading
  );
  const hasError = useAppSelector((state) => state.burgerIngredients.hasError);

  useEffect(() => {
    const ingredient = data.find((item: Ingredient) => item._id === id);
    if (ingredient) {
      dispatch(showIngredient(ingredient));
    }
  }, [id, data, dispatch]);

  if (isLoading) {
    return (
      <div className={styles.app}>
        <AppHeader />
        <h1>Загрузка...</h1>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={styles.app}>
        <AppHeader />
        <h1>Ошибка загрузки данных</h1>
      </div>
    );
  }

  const ingredient = data.find((item: Ingredient) => item._id === id);

  if (!ingredient) {
    return (
      <div className={styles.app}>
        <AppHeader />
        <h1>Ингредиент не найден</h1>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <IngredientDetails />
    </div>
  );
}
