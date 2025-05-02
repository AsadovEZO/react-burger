import PropTypes from "prop-types";

import menuStyles from "./ingredienst-menu.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientsMenu = ({ activeTab, setActiveTab }) => {
  return (
    <div className={`${menuStyles.menu} p-5`}>
      <Tab value="bun" active={activeTab === "bun"} onClick={setActiveTab}>
        Булки
      </Tab>
      <Tab value="sauce" active={activeTab === "sauce"} onClick={setActiveTab}>
        Соусы
      </Tab>
      <Tab value="main" active={activeTab === "main"} onClick={setActiveTab}>
        Начинки
      </Tab>
    </div>
  );
};

IngredientsMenu.propTypes = {
  activeTab: PropTypes.oneOf(["bun", "sauce", "main"]),
  setActiveTab: PropTypes.func.isRequired,
};

export default IngredientsMenu;
