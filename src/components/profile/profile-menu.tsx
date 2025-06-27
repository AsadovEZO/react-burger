import { MouseEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { logout } from "../../services/user/thunks";
import styles from "./profile.module.css";
import { useAppDispatch } from "../../services/store";

interface IProfileMenu {
  description?: string;
}

export function ProfileMenu({ description }: IProfileMenu) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (err) {
      if (typeof err === "string") {
        setError(err);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Произошла ошибка при регистрации");
      }
    }
  };

  return (
    <nav className={styles.profileNav}>
      <div className={styles.profileNavItem}>
        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            `${
              isActive ? styles.profileLinkActive : styles.profileLink
            } text text_type_main-medium`
          }
        >
          Профиль
        </NavLink>
      </div>
      <div className={styles.profileNavItem}>
        <NavLink
          to="/profile/orders"
          className={({ isActive }) =>
            `${
              isActive ? styles.profileLinkActive : styles.profileLink
            } text text_type_main-medium`
          }
        >
          История заказов
        </NavLink>
      </div>
      <div className={styles.profileNavItem}>
        <button
          onClick={handleLogout}
          className="text text_type_main-medium text_color_inactive"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Выход
        </button>
      </div>
      {error && (
        <p className="text text_type_main-default text_color_error">{error}</p>
      )}
      <p
        className="text text_type_main-small text_color_inactive"
        style={{
          marginTop: "80px",
        }}
      >
        {description}
      </p>
    </nav>
  );
}
