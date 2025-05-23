import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import IngredientDetails from "../components/ingredient-details/ingredient-details";
import styles from "../App.module.css";
import AppHeader from "../components/app-header/app-header";
import { Ingredient, RootState } from "../utils/types";
import { showIngredient } from "../services/ingredient-details-slice";

export function IngredientPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.burgerIngredients.data);
  const isLoading = useSelector((state: RootState) => state.burgerIngredients.isLoading);
  const hasError = useSelector((state: RootState) => state.burgerIngredients.hasError);

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