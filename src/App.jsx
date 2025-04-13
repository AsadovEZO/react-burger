import { useState } from "react";
import styles from "./App.module.css";

import { data } from "./utils/data";
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleAdd = (ingredient) => {
    const uniqueId = `${ingredient._id}-${Date.now()}`;
    const ingredientWithId = { ...ingredient, uniqueId };

    if (ingredient.type === "bun") {
      const currentBun = selectedIngredients.find(
        (item) => item.type === "bun"
      );

      if (currentBun && currentBun._id === ingredient._id) {
        return;
      }

      if (currentBun) {
        const newIngredients = selectedIngredients.filter(
          (item) => item.type !== "bun"
        );
        setSelectedIngredients([...newIngredients, ingredientWithId]);
      } else {
        setSelectedIngredients([...selectedIngredients, ingredientWithId]);
      }
    } else {
      setSelectedIngredients([...selectedIngredients, ingredientWithId]);
    }
  };

  const handleRemove = (ingredientToRemove) => {
    const newIngredients = selectedIngredients.filter(
      (item) => item.uniqueId !== ingredientToRemove.uniqueId
    );
    setSelectedIngredients(newIngredients);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.leftBlock}>
          <BurgerIngredients
            ingredients={data}
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
