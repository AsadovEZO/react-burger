import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../App.module.css";
import AuthStyles from "../Auth.module.css";
import AppHeader from "../components/app-header/app-header";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ENDPOINTS } from "../utils/api";

export function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(ENDPOINTS.passwordReset, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Ошибка при восстановлении пароля");
      }
      setError("");
      navigate("/reset-password", { state: { allowed: true } });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className={styles.app}>
      <AppHeader />
      <div className={AuthStyles.main}>
        <section className={AuthStyles.loginContainer}>
          <form className={AuthStyles.form} onSubmit={handleForgotSubmit}>
            <h1 className="text text_type_main-medium">
              Восстановление пароля
            </h1>
            <Input
              type={"email"}
              placeholder={"Укажите e-mail"}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name={"email"}
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
              Восстановить
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
