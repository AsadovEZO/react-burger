import PropTypes from "prop-types";

import { IngredientType } from "../../utils/types.js";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

function BunElement({ bun, position }) {
  if (!bun) {
    return (
      <section className={styles.bunPlaceholder}>
        <p className="text text_type_main-medium">Выберите булку</p>
      </section>
    );
  }

  const type = position === "top" ? "top" : "bottom";
  const label = position === "top" ? "(верх)" : "(низ)";

  return (
    <section className={styles.bun}>
      <ConstructorElement
        type={type}
        isLocked
        text={`${bun.name} ${label}`}
        price={bun.price}
        thumbnail={bun.image}
      />
    </section>
  );
}

BunElement.propTypes = {
  bun: IngredientType,
  position: PropTypes.oneOf(["top", "bottom"]),
};

export default BunElement;
