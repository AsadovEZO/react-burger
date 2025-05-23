import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

import styles from "../App.module.css";
import AuthStyles from "../Auth.module.css";
import AppHeader from "../components/app-header/app-header";
import { register } from "../services/user/thunks";
import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function Register() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Введите имя");
      return;
    }
    if (!email) {
      setError("Введите email");
      return;
    }
    if (!password) {
      setError("Введите пароль");
      return;
    }
    try {
      await dispatch(register({ name, email, password })).unwrap();
      setError("");
      navigate(from, { replace: true });
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

  return (
    <main className={styles.app}>
      <AppHeader />
      <div className={AuthStyles.main}>
        <section className={AuthStyles.loginContainer}>
          <form className={AuthStyles.form} onSubmit={handleSubmit}>
            <h1 className="text text_type_main-medium">Регистрация</h1>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={(e) => setName(e.target.value)}
              value={name}
              name={"name"}
              size={"default"}
              extraClass="ml-1"
            />
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
            {error && (
              <p className="text text_type_main-default text_color_error">
                {error}
              </p>
            )}

            <Button htmlType="submit" type="primary" size="medium">
              Зарегистрироваться
            </Button>
          </form>
          <div className={AuthStyles.links}>
            <p className="text text_type_main-default text_color_inactive pl-2">
              Уже зарегистрированы? <Link to="/login">Войти</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
