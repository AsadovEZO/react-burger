import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import styles from "../App.module.css";
import AuthStyles from "../Auth.module.css";
import AppHeader from "../components/app-header/app-header";
import { useForm } from "../hooks/useForm";
import { ENDPOINTS } from "../utils/api";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const { values, handleChange } = useForm({
    password: "",
    token: "",
  });

  useEffect(() => {
    const isAllowedFromState = location.state?.allowed === true;

    if (!isAllowedFromState) {
      navigate("/forgot-password", { replace: true });
    }
  }, [navigate, location.state]);

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(ENDPOINTS.passwordResetConfirm, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log(response);
      if (!response.ok) {
        setError(`Ошибка ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Ошибка при сбросе пароля");
        return;
      }
      navigate("/login", { state: { allowed: false } });
      return data;
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <main className={styles.app}>
      <AppHeader />
      <div className={AuthStyles.main}>
        <section className={AuthStyles.loginContainer}>
          <form className={AuthStyles.form} onSubmit={handleResetSubmit}>
            <h1 className="text text_type_main-medium">
              Восстановление пароля
            </h1>
            <PasswordInput
              onChange={handleChange}
              value={values.password}
              placeholder={"Введите новый пароль"}
              name={"password"}
              extraClass="mb-2"
            />
            <Input
              type={"text"}
              placeholder={"Введите код из письма"}
              onChange={handleChange}
              value={values.token}
              name={"token"}
              error={!!error}
              errorText={error}
              size={"default"}
              extraClass="ml-1"
            />
            {error && (
              <p className="text text_type_main-default text_color_error">
                {error}
              </p>
            )}
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </form>

          <div className={AuthStyles.links}>
            <p className="text text_type_main-default text_color_inactive pl-2">
              Вспомнили пароль? <Link to="/login">Войти</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
