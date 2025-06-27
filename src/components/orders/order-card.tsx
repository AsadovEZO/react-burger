import { useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { Ingredient, TOrder } from "../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";

import feedStyles from "./orders.module.css";
import { calculateOrderPrice } from "../../utils/price-calculator";
import { getOrderStatus } from "../../utils/order-status";
import { getOrderDetailsPath } from "../../utils/order-details-path";
import { showOrder } from "../../services/order-preview-slice";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

interface IOrder {
  order: TOrder;
  showStatus?: boolean;
}

const OrderCard = ({ order, showStatus = false }: IOrder) => {
  const { createdAt, ingredients, name, number } = order;
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.burgerIngredients.data);
  const location = useLocation();
  const path = getOrderDetailsPath(location.pathname, order.number);

  const price = calculateOrderPrice(ingredients, data);

  const uniqueIngredients = ingredients
    .map((id) => data.find((item) => item._id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const renderIngredient = (
    ingredient: Ingredient,
    index: number,
    hiddenCount: number
  ) => {
    const zIndex = 6 - index;
    const isLast = index === 5;

    return (
      <div
        key={`${order._id}-${ingredient._id}-${index}`}
        className={feedStyles.ingredient}
        style={{ left: `${index * -10}px`, zIndex }}
      >
        <img src={ingredient.image} alt={ingredient.name} />
        {isLast && hiddenCount > 0 && (
          <div className={feedStyles.overlay}>+{hiddenCount}</div>
        )}
      </div>
    );
  };

  const handleClick = () => {
    dispatch(showOrder(order));
  };

  return (
    <Link
      to={path}
      state={{ background: location }}
      className={feedStyles.cardLink}
      onClick={handleClick}
    >
      <div className={feedStyles.card}>
        <div className={feedStyles.cardHeader}>
          <span className="text text_type_digits-default">#{number}</span>
          <span className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(createdAt)} />
          </span>
        </div>
        <p className="text text_type_main-medium">{name}</p>
        {showStatus && (
          <p
            className="text text_type_main-small"
            style={{ color: getOrderStatus(order.status).color }}
          >
            {getOrderStatus(order.status).label}
          </p>
        )}
        <div className={feedStyles.cardFooter}>
          <div className={feedStyles.ingredients}>
            {uniqueIngredients
              .slice(0, 6)
              .map((ingredient, index) =>
                renderIngredient(
                  ingredient,
                  index,
                  uniqueIngredients.length - 6
                )
              )}
          </div>
          <div className={`${feedStyles.price} text text_type_digits-default`}>
            {price} <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
