import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { getUser, refreshToken } from "./thunks";
import { getCookie } from "./cookie-utils";
import { useAppDispatch, RootState } from "../store";

export default function useAuthCheck() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useSelector((state: RootState) => state.user);

  const hasChecked = useRef(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (hasChecked.current) return;
      hasChecked.current = true;

      const accessToken = getCookie("accessToken");
      if (accessToken) {
        try {
          await dispatch(getUser()).unwrap();
        } catch (err) {
          // Если токен просрочен, пробуем обновить
          try {
            await dispatch(refreshToken()).unwrap();
            await dispatch(getUser()).unwrap();
          } catch (refreshErr) {
            // Если обновление токена не удалось, пользователь не авторизован
            console.error("Не удалось обновить токен:", refreshErr);
          }
        }
      }
    };

    checkAuth();
  }, [dispatch]);

  return { user, isLoading };
}
