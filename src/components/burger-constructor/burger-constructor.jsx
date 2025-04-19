import PropTypes from "prop-types";
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor.module.css";
import { IngredientType } from "../../utils/types.js";
import { useModal } from "../../hooks/show-modal";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor({ selectedIngredients, onRemove }) {
  const [isShowingModal, toggleModal] = useModal();
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
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={toggleModal}
        >
          Оформить заказ
        </Button>
      </section>
      {isShowingModal && (
        <Modal
          onCloseButtonClick={toggleModal}
          content={<OrderDetails />}
          type="order"
        />
      )}
    </div>
  );
}

BurgerConstructor.propTypes = {
  selectedIngredients: PropTypes.arrayOf(IngredientType).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default BurgerConstructor;
