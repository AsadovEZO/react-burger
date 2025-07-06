import { Ingredient } from "../../utils/types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

interface IBunElement {
  bun: Ingredient | undefined;
  position: "top" | "bottom";
}

function BunElement({ bun, position }: IBunElement) {
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
    <section className={styles.bun} data-test-id="constructor-bun">
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

export default BunElement;
