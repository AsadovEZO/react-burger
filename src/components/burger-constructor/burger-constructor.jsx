import PropTypes from "prop-types";
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor.module.css";

function BurgerConstructor({ selectedIngredients, onRemove }) {
  const bun = selectedIngredients.find((item) => item.type === "bun");
  const otherIngredients = selectedIngredients.filter(
    (item) => item.type !== "bun"
  );

  const totalPrice = selectedIngredients.reduce((acc, item) => {
    const price = item.type === "bun" ? item.price * 2 : item.price;
    return acc + price;
  }, 0);

  return (
    <div className={constructorStyles.constructor}>
      {bun ? (
        <section className={constructorStyles.bun}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </section>
      ) : (
        <section className={constructorStyles.bunPlaceholder}>
          <p className="text text_type_main-medium">Выберите булку</p>
        </section>
      )}

      <section className={constructorStyles.ingredientsList}>
        {otherIngredients.length > 0 ? (
          otherIngredients.map((ingredient, index) => (
            <div
              key={ingredient.uniqueId}
              className={constructorStyles.ingredientItem}
            >
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => onRemove(ingredient)}
              />
            </div>
          ))
        ) : (
          <p
            className="text text_type_main-medium"
            style={{ textAlign: "center" }}
          >
            Добавьте ингредиенты
          </p>
        )}
      </section>

      {bun ? (
        <section className={constructorStyles.bun}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </section>
      ) : (
        <section className={constructorStyles.bunPlaceholder}>
          <p className="text text_type_main-medium">Выберите булку</p>
        </section>
      )}

      <section className={constructorStyles.total}>
        <section className={constructorStyles.price}>
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </section>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </section>
    </div>
  );
}

BurgerConstructor.propTypes = {
  selectedIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default BurgerConstructor;
