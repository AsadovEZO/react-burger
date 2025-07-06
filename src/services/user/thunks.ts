import { createAsyncThunk } from "@reduxjs/toolkit";

import { type User } from "../../utils/types";
import { getCookie, setCookie, deleteCookie } from "./cookie-utils";
import { request, ENDPOINTS } from "../../utils/api";

interface UserResponce {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: User;
  message: string;
}

const accessTokenExpireTime = { expires: 20 * 60 };
const refreshTokenExpireTime = { expires: 7 * 24 * 60 * 60 };

export const register = createAsyncThunk<
  User,
  { name: string; email: string; password: string }
>("user/register", async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const data = await request<UserResponce>(ENDPOINTS.auth.register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    });
    const user = data.user;
    if (!user) {
      return rejectWithValue("Ошибка получения данных пользователя");
    }

    if (data.accessToken && data.refreshToken) {
      setCookie("accessToken", data.accessToken, accessTokenExpireTime);
      setCookie("refreshToken", data.refreshToken, refreshTokenExpireTime);
    }

    return user;
  } catch (err: unknown) {
    return rejectWithValue(
      err instanceof Error ? err.message : "Ошибка сети или сервера"
    );
  }
});

export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("user/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const data = await request<UserResponce>(ENDPOINTS.auth.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    const user = data.user;
    if (!user) {
      return rejectWithValue("Ошибка получения данных пользователя");
    }

    if (data.accessToken && data.refreshToken) {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      setCookie("accessToken", data.accessToken, accessTokenExpireTime);
      setCookie("refreshToken", data.refreshToken, refreshTokenExpireTime);
    }

    return user;
  } catch (err: unknown) {
    return rejectWithValue(
      err instanceof Error ? err.message : "Ошибка сети или сервера"
    );
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = getCookie("refreshToken");
      if (!refreshToken) {
        return rejectWithValue("Токен не найден");
      }
      await request<UserResponce>(ENDPOINTS.auth.logout, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }),
      });

      deleteCookie("accessToken");
      deleteCookie("refreshToken");
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Ошибка сети или сервера"
      );
    }
  }
);

export const refreshToken = createAsyncThunk<
  { accessToken: string; refreshToken: string },
  void,
  { rejectValue: string }
>("user/refreshToken", async (_, { rejectWithValue }) => {
  try {
    const refreshTokenValue = getCookie("refreshToken");
    if (!refreshTokenValue) {
      return rejectWithValue("Токен не найден");
    }
    const data = await request<UserResponce>(ENDPOINTS.auth.token, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshTokenValue }),
    });
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    setCookie("accessToken", data.accessToken, accessTokenExpireTime);
    setCookie("refreshToken", data.refreshToken, refreshTokenExpireTime);

    return { accessToken: data.accessToken, refreshToken: data.refreshToken };
  } catch (err: unknown) {
    return rejectWithValue(
      err instanceof Error ? err.message : "Ошибка сети или сервера"
    );
  }
});

export const getUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "user/get",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = getCookie("accessToken");
      if (!accessToken) {
        return rejectWithValue("Токен не найден");
      }

      const data = await request<UserResponce>(ENDPOINTS.auth.user, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const user = data.user;
      if (!user) {
        return rejectWithValue("Ошибка получения данных пользователя");
      }

      return user;
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Ошибка сети или сервера"
      );
    }
  }
);

export const updateUser = createAsyncThunk<
  User,
  {
    email: string;
    name: string;
    password?: string;
  },
  { rejectValue: string }
>("user/update", async ({ email, name, password }, { rejectWithValue }) => {
  try {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      return rejectWithValue("Токен не найден");
    }
    console.log(accessToken);
    const body = password ? { email, name, password } : { email, name };

    const data = await request<UserResponce>(ENDPOINTS.auth.user, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    return data.user;
  } catch (err: unknown) {
    return rejectWithValue(
      err instanceof Error ? err.message : "Ошибка сети или сервера"
    );
  }
});
