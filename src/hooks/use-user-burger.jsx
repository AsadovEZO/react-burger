import { useState } from "react";

export const useUserBurger = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Добавление ингредиентов в бургер
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

  // Удаление ингредиентов
  const handleRemove = (ingredientToRemove) => {
    const newIngredients = selectedIngredients.filter(
      (item) => item.uniqueId !== ingredientToRemove.uniqueId
    );
    setSelectedIngredients(newIngredients);
  };

  return {
    selectedIngredients,
    handleAdd,
    handleRemove,
  };
};
