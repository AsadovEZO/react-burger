import { useNavigate, useLocation } from "react-router-dom";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";

function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  const isConstructorActive = location.pathname === "/";
  const isFeedActive = location.pathname.startsWith("/feed");
  const isProfileActive = location.pathname.startsWith("/profile");

  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.left}>
        <button
          className={`${headerStyles.navItem} ${headerStyles.navButton} mr-2`}
          onClick={() => navigate("/")}
        >
          <BurgerIcon type={isConstructorActive ? "primary" : "secondary"} />
          <span
            className={`text text_type_main-default pl-2 ${
              !isConstructorActive && "text_color_inactive"
            }`}
          >
            Конструктор
          </span>
        </button>
        <button
          className={`${headerStyles.navItem} ${headerStyles.navButton} mr-2`}
          onClick={() => navigate("/feed")}
        >
          <ListIcon type={isFeedActive ? "primary" : "secondary"} />
          <span
            className={`text text_type_main-default pl-2 ${
              !isFeedActive && "text_color_inactive"
            }`}
          >
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
          onClick={() => navigate("/profile")}
        >
          <ProfileIcon type={isProfileActive ? "primary" : "secondary"} />
          <span
            className={`text text_type_main-default pl-2 ${
              !isProfileActive && "text_color_inactive"
            }`}
          >
            Личный кабинет
          </span>
        </button>
      </nav>
    </header>
  );
}

export default AppHeader;
