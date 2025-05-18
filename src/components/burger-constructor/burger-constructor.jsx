import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";

import Modal from "../modal/modal";
import BunElement from "./bun-element";
import IngredientsList from "./ingredients-list";
import TotalSection from "./total-section";
import constructorStyles from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import { postOrder, hideOrderModal } from "../../services/order-details-slice";
import { handleAdd } from "../../services/burger-constructor-slice";

function BurgerConstructor() {
  const selectedIngredients = useSelector((state) => state.burgerConstructor);
  const bun = selectedIngredients.find((item) => item.type === "bun");
  const otherIngredients = selectedIngredients.filter(
    (item) => item.type !== "bun"
  );

  const isShowingOrderModal = useSelector(
    (state) => state.orderDetails.isShowingModal
  );

  const dispatch = useDispatch();

  const handleOrderClick = () => {
    dispatch(
      postOrder(selectedIngredients.map((ingredient) => ingredient._id))
    );
  };

  const [{ isHover }, dropNew] = useDrop({
    accept: "addIngredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop({ ingredient }) {
      dispatch(handleAdd(ingredient));
    },
  });

  const totalPrice = selectedIngredients.reduce((acc, item) => {
    const price = item
      ? item.type === "bun"
        ? item.price * 2
        : item.price
      : 0;
    return acc + price;
  }, 0);

  return (
    <div
      className={constructorStyles.constructor}
      ref={dropNew}
      style={{ isHover }}
    >
      <BunElement bun={bun} position="top" />
      <IngredientsList ingredients={otherIngredients} />
      <BunElement bun={bun} position="bottom" />

      <TotalSection totalPrice={totalPrice} onOrder={handleOrderClick} />

      {isShowingOrderModal && (
        <Modal
          onCloseButtonClick={() => dispatch(hideOrderModal())}
          type="order"
          children={<OrderDetails />}
        />
      )}
    </div>
  );
}

export default BurgerConstructor;
