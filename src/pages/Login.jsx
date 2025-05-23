import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

import styles from "../App.module.css";
import AppHeader from "../components/app-header/app-header";
import AuthStyles from "../Auth.module.css";
import { login } from "../services/user/thunks";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const userError = useSelector((state) => state.user.error);

  const from = location.state?.from?.pathname || "/";

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Введите email");
      return;
    }
    if (!password) {
      setError("Введите пароль");
      return;
    }
    try {
      await dispatch(login({ email, password })).unwrap();
      setError("");
      navigate(from, { replace: true });
    } catch (err) {
      if (typeof err === "string") {
        setError(err);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Произошла ошибка при авторизации");
      }
    }
  };

  return (
    <main className={styles.app}>
      <AppHeader />
      <div className={AuthStyles.main}>
        <section className={AuthStyles.loginContainer}>
          <form className={AuthStyles.form} onSubmit={handleSubmit}>
            <h1 className="text text_type_main-medium">Вход</h1>
            <EmailInput
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name={"email"}
              isIcon={false}
            />
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name={"password"}
              extraClass="mb-2"
            />
            {error || userError ? (
              <p className="text text_type_main-default text_color_error">
                {error || userError}
              </p>
            ) : null}
            <Button htmlType="submit" type="primary" size="medium">
              Войти
            </Button>
          </form>

          <div className={AuthStyles.links}>
            <p className="text text_type_main-default text_color_inactive pl-2">
              Вы - новый пользователь?{" "}
              <Link to="/register">Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-default text_color_inactive pl-2">
              Забыли пароль?{" "}
              <Link to="/forgot-password">Восстановить пароль</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
