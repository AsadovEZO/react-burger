import { useEffect, useState } from "react";

import { getUser, refreshToken } from "./thunks";
import { getCookie } from "./cookie-utils";
import { useAppDispatch, useAppSelector } from "../store";

export default function useAuthCheck() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [authChecked, setAuthChecked] = useState(false);

useEffect(() => {
  const checkAuth = async () => {
    const aToken = getCookie("accessToken");
    const rToken = getCookie("refreshToken");
    // console.log("Проверка авторизации:", { aToken, rToken }, "текущее время:", new Date().toISOString());
    if (aToken) {
      try {
        await dispatch(getUser()).unwrap();
      } catch (err) {
        console.error("Ошибка получения пользователя:", err);
        if (rToken && typeof rToken === "string") {
          try {
            await dispatch(refreshToken()).unwrap() 
            await dispatch(getUser()).unwrap();
          } catch (refreshErr) {
            console.error("Не удалось обновить токен:", refreshErr);
          }
        } else {
          console.error("refreshToken отсутствует или не является строкой:", rToken);
        }
      }
    }
    else {
      if (rToken) {
        try {
          await dispatch(refreshToken()).unwrap() 
          await dispatch(getUser()).unwrap();
        } catch (refreshErr) {
          console.error("Не удалось обновить токен:", refreshErr);
        }
      } 
    }
    setAuthChecked(true);
  };
  checkAuth();
}, [dispatch]);

  return { user, isLoading: !authChecked };
}
