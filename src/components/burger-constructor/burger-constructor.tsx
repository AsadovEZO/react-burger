import { useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";

import Modal from "../modal/modal";
import BunElement from "./bun-element";
import IngredientsList from "./ingredients-list";
import TotalSection from "./total-section";
import constructorStyles from "./burger-constructor.module.css";
import OrderDetails from "../orders/new-order/new-order";
import { postOrder, hideOrderModal } from "../../services/new-order-slice";
import { handleAdd } from "../../services/burger-constructor-slice";
import { useAppDispatch, RootState } from "../../services/store";
import { Ingredient } from "../../utils/types";
import { calculateTotalPrice } from "../../utils/price-calculator";

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
    (state: RootState) => state.newOrder.isShowingModal
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

  const totalPrice = calculateTotalPrice(selectedIngredients);

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
