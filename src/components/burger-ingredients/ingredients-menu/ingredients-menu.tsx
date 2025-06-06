import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import menuStyles from "./ingredienst-menu.module.css";
import { TActiveTab } from "../../../utils/types";

interface IIngredientsMenu {
  activeTab: TActiveTab;
  setActiveTab: (type: TActiveTab) => void;
}

const IngredientsMenu = ({ activeTab, setActiveTab }: IIngredientsMenu) => {
  const handleTabClick = (value: string) => {
    if (["bun", "sauce", "main"].includes(value)) {
      setActiveTab(value as TActiveTab);
    }
  };

  return (
    <div className={`${menuStyles.menu} p-5`}>
      <Tab value="bun" active={activeTab === "bun"} onClick={handleTabClick}>
        Булки
      </Tab>
      <Tab
        value="sauce"
        active={activeTab === "sauce"}
        onClick={handleTabClick}
      >
        Соусы
      </Tab>
      <Tab value="main" active={activeTab === "main"} onClick={handleTabClick}>
        Начинки
      </Tab>
    </div>
  );
};

export default IngredientsMenu;
