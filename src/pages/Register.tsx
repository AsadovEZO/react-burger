import { useState, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import styles from "../App.module.css";
import AuthStyles from "../Auth.module.css";
import AppHeader from "../components/app-header/app-header";
import { register } from "../services/user/thunks";
import { useForm } from "../hooks/useForm";
import { useAppDispatch } from "../services/store";
import CustomInput from "../components/customInput";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

type IRegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

export function Register() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const [error, setError] = useState("");
  const { values, handleChange } = useForm<IRegisterFormValues>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.name) {
      setError("Введите имя");
      return;
    }
    if (!values.email) {
      setError("Введите email");
      return;
    }
    if (!values.password) {
      setError("Введите пароль");
      return;
    }
    try {
      await dispatch(register(values)).unwrap();
      setError("");
      navigate(from, { replace: true });
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
    <main className={styles.app}>
      <AppHeader />
      <div className={AuthStyles.main}>
        <section className={AuthStyles.loginContainer}>
          <form className={AuthStyles.form} onSubmit={handleSubmit}>
            <h1 className="text text_type_main-medium">Регистрация</h1>
            <CustomInput
              type={"text"}
              placeholder={"Имя"}
              onChange={handleChange}
              value={values.name}
              name={"name"}
              size={"default"}
              extraClass="ml-1"
            />
            <EmailInput
              onChange={handleChange}
              value={values.email}
              name={"email"}
              isIcon={false}
            />
            <PasswordInput
              onChange={handleChange}
              value={values.password}
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
