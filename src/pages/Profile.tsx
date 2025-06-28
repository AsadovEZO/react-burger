import { useEffect, FormEvent, SyntheticEvent } from "react";

import styles from "../App.module.css";
import AuthStyles from "../Auth.module.css";
import AppHeader from "../components/app-header/app-header";
import { updateUser } from "../services/user/thunks";
import { useForm } from "../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../services/store";
import CustomInput from "../components/customInput";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileMenu } from "../components/profile/profile-menu";

export function Profile() {
  const dispatch = useAppDispatch();

  const { user, isLoading } = useAppSelector((state) => state.user);

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

  const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(updateUser(values)).unwrap();
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    user && setValues({ name: user.name, email: user.email, password: "" });
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
          <ProfileMenu description="В этом разделе вы можете изменить свои персональные данные" />
          <section className={AuthStyles.loginContainer}>
            <form className={AuthStyles.form} onSubmit={handleUpdateUser}>
              <CustomInput
                type={"text"}
                placeholder={"Имя"}
                onChange={handleChange}
                value={values.name}
                name={"name"}
                error={false}
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
              {user &&
                (values.password ||
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
