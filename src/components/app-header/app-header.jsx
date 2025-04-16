import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.left}>
        <button
          className={`${headerStyles.navItem} ${headerStyles.navButton} mr-2`}
        >
          <BurgerIcon type="primary" />
          <span className="text text_type_main-default pl-2">Конструктор</span>
        </button>
        <button
          className={`${headerStyles.navItem} ${headerStyles.navButton} mr-2`}
        >
          <ListIcon type="secondary" />
          <span className="text text_type_main-default text_color_inactive pl-2">
            Лента заказов
          </span>
        </button>
      </nav>

      <div className={headerStyles.center}>
        <Logo />
      </div>

      <nav className={headerStyles.right}>
        <button
          className={`${headerStyles.navItem} ${headerStyles.navButton} mr-2`}
        >
          <ProfileIcon type="secondary" />
          <span className="text text_type_main-default text_color_inactive pl-2">
            Личный кабинет
          </span>
        </button>
      </nav>
    </header>
  );
}

export default AppHeader;
