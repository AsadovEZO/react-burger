import { useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";

import Modal from "../modal/modal";
import BunElement from "./bun-element";
import IngredientsList from "./ingredients-list";
import TotalSection from "./total-section";
import constructorStyles from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import { postOrder, hideOrderModal } from "../../services/order-details-slice";
import { handleAdd } from "../../services/burger-constructor-slice";
import { useAppDispatch, RootState } from "../../services/store";
import { Ingredient } from "../../utils/types";

function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const selectedIngredients = useSelector(
    (state: RootState) => state.burgerConstructor
  );
  const bun = selectedIngredients.find((item) => item.type === "bun");
  const otherIngredients = selectedIngredients.filter(
    (item) => item.type !== "bun"
  );

  const isShowingOrderModal = useSelector(
    (state: RootState) => state.orderDetails.isShowingModal
  );

  const handleOrderClick = () => {
    if (!user) {
      navigate("/login");
    }
    dispatch(
      postOrder(selectedIngredients.map((ingredient) => ingredient._id))
    );
  };

  const [{ isHover }, dropNew] = useDrop<
    { ingredient: Ingredient },
    unknown,
    { isHover: boolean }
  >({
    accept: "addIngredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop({ ingredient }, monitor) {
      if (!monitor.didDrop()) {
        dispatch(handleAdd(ingredient));
      }
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

  const dropRef = (element: HTMLDivElement | null) => {
    if (element) {
      dropNew(element);
    }
  };

  return (
    <div
      className={constructorStyles.constructorWindow}
      ref={dropRef}
      style={{ backgroundColor: isHover ? "inherit" : "transparent" }}
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
