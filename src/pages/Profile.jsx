import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import styles from "../App.module.css";
import AuthStyles from "../Auth.module.css";
import AppHeader from "../components/app-header/app-header";
import { logout, updateUser } from "../services/user/thunks";
import { useForm } from "../hooks/useForm";
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading } = useSelector((state) => state.user);

  const [error, setError] = useState("");
  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setValues({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user, setValues]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (err) {
      if (typeof err === "string") {
        setError(err);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Произошла ошибка при регистрации");
      }
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    await dispatch(updateUser(values)).unwrap();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setValues({ name: user.name, email: user.email, password: "" });
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      {isLoading ? (
        <div className={AuthStyles.main}>
          <p className="text text_type_main-medium">Загрузка...</p>
        </div>
      ) : (
        <div className={AuthStyles.profilePage}>
          <nav className={AuthStyles.profileNav}>
            <div className={AuthStyles.profileNavItem}>
              <NavLink
                to="/profile"
                end
                className={({ isActive }) =>
                  `${
                    isActive
                      ? AuthStyles.profileLinkActive
                      : AuthStyles.profileLink
                  } text text_type_main-medium`
                }
              >
                Профиль
              </NavLink>
            </div>
            <div className={AuthStyles.profileNavItem}>
              <NavLink
                to="/profile/orders"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? AuthStyles.profileLinkActive
                      : AuthStyles.profileLink
                  } text text_type_main-medium`
                }
              >
                История заказов
              </NavLink>
            </div>
            <div className={AuthStyles.profileNavItem}>
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
              <p className="text text_type_main-default text_color_error">
                {error}
              </p>
            )}
            <p
              className="text text_type_main-small text_color_inactive"
              style={{
                marginTop: "80px",
              }}
            >
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </nav>
          <section className={AuthStyles.loginContainer}>
            <form className={AuthStyles.form} onSubmit={handleUpdateUser}>
              <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={handleChange}
                value={values.name}
                name={"name"}
                error={false}
                // ref={inputRef}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="ml-1"
                icon={"EditIcon"}
              />
              <EmailInput
                onChange={handleChange}
                value={values.email}
                name={"email"}
                isIcon={true}
              />
              <PasswordInput
                onChange={handleChange}
                value={values.password}
                name={"password"}
                extraClass="mb-2"
                icon="EditIcon"
              />
              {(values.password ||
                values.name !== user.name ||
                values.email !== user.email) && (
                <>
                  <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
                  </Button>
                  <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={handleCancel}
                  >
                    Отменить
                  </Button>
                </>
              )}
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
