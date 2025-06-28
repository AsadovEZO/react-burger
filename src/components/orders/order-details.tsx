import { TOrder, Ingredient } from "../../utils/types";
import feedStyles from "./orders.module.css";
import { useAppSelector } from "../../services/store";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { calculateTotalPrice } from "../../utils/price-calculator";
import { getOrderStatus } from "../../utils/order-status";

interface IOrder {
  order: TOrder;
}

function OrderDetails({ order }: IOrder) {
  const data = useAppSelector((state) => state.burgerIngredients.data);

  const detailedIngredients: (Ingredient | null)[] = order.ingredients.map(
    (id) => data.find((item) => item._id === id) || null
  );

  const uniqueIngredientsMap = new Map<
    string,
    { item: Ingredient; count: number }
  >();
  for (const ing of detailedIngredients) {
    if (ing) {
      if (uniqueIngredientsMap.has(ing._id)) {
        uniqueIngredientsMap.get(ing._id)!.count += ing.type === "bun" ? 2 : 1; // 1,
      } else {
        uniqueIngredientsMap.set(ing._id, {
          item: ing,
          count: ing.type === "bun" ? 2 : 1, // 1,
        });
      }
    }
  }

  const totalPrice = calculateTotalPrice(detailedIngredients);

  return (
    <div className={feedStyles.centeredCard}>
      <span
        className="text text_type_digits-default mt-5 mb-2"
        style={{ textAlign: "center" }}
      >
        #{order.number}
      </span>

      <div className={feedStyles.headerLeft}>
        <h1 className="text text_type_main-medium mb-2">{order.name}</h1>
        <p
          className="text text_type_main-small"
          style={{ color: getOrderStatus(order.status).color }}
        >
          {getOrderStatus(order.status).label}
        </p>
      </div>

      <h2 className="text text_type_main-medium mt-10 mb-4">Состав:</h2>
      <ul className={feedStyles.ingredientList}>
        {Array.from(uniqueIngredientsMap.values()).map(({ item, count }) => (
          <li className={feedStyles.ingredientRow} key={item._id}>
            <div className={feedStyles.ingredient}>
              <img src={item.image} alt={item.name} />
            </div>
            <span
              className={`${feedStyles.ingredientName} text text_type_main-default`}
            >
              {item.name}
            </span>
            <div className={feedStyles.ingredientPrice}>
              <span className="text text_type_digits-default mr-2">
                {count} x {item.price}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>

      <div className={feedStyles.bottomRow}>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </span>
        <div className={`${feedStyles.price} text text_type_digits-default`}>
          {totalPrice} <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
