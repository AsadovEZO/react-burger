import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../App.module.css";
import AuthStyles from "../Auth.module.css";
import AppHeader from "../components/app-header/app-header";
import { useForm } from "../hooks/useForm";
import { ENDPOINTS, request } from "../utils/api";
import CustomInput from "../components/customInput";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

interface ForgotPasswordResponse {
  success: boolean;
  message?: string;
}

export function ForgotPassword() {
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    email: "",
  });
  const [error, setError] = useState("");

  const handleForgotSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await request<ForgotPasswordResponse>(
        ENDPOINTS.passwordReset,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (!data.success) {
        throw new Error(
          data.message || "Не удалось отправить запрос на восстановление"
        );
      }
      setError("");
      navigate("/reset-password", { state: { allowed: true } });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
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
            <CustomInput
              type={"email"}
              placeholder={"Укажите e-mail"}
              onChange={handleChange}
              value={values.email}
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
