import styles from "./ingredient-details.module.css";
import { IngredientType } from "../../utils/types.js";

const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={styles.container}>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className={styles.image}
      />
      <p className={`${styles.name} text text_type_main-medium`}>
        {ingredient.name}
      </p>
      <div className={styles.nutrition}>
        <div className={styles.nutritionItem}>
          <p className="text text_type_main-small">Калории, ккал</p>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </div>
        <div className={styles.nutritionItem}>
          <p className="text text_type_main-small">Белки, г</p>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </div>
        <div className={styles.nutritionItem}>
          <p className="text text_type_main-small">Жиры, г</p>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </div>
        <div className={styles.nutritionItem}>
          <p className="text text_type_main-small">Углеводы, г</p>
          <p className="text text_type_digits-default">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: IngredientType.isRequired,
};

export default IngredientDetails;
