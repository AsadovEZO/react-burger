import { createAsyncThunk } from '@reduxjs/toolkit';

import { type User } from '../../utils/types';
import { getCookie, setCookie, deleteCookie } from './cookie-utils';

interface UserResponce {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: User;
  message: string
}

export const register = createAsyncThunk<User, { name: string; email: string; password: string }>(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const url = "https://norma.nomoreparties.space/api/auth/register"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email, password: password }),
      });
      const data = (await response.json()) as UserResponce;
      if (!response.ok) {
        return rejectWithValue(data.message || 'Ошибка регистрации');
      }

      const user = data.user;
      if (!user) {
        return rejectWithValue('Ошибка получения данных пользователя');
      }
      if (data.accessToken && data.refreshToken) {
        setCookie('accessToken', data.accessToken, null);
        setCookie('refreshToken', data.refreshToken, null);
      }

      return user;
    } catch (err) {
      return rejectWithValue('Ошибка сети или сервера');
    }
  }
);

export const login = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const url = "https://norma.nomoreparties.space/api/auth/login"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      
      const data = (await response.json()) as UserResponce;
      console.log(data)
      if (!response.ok) {
        return rejectWithValue(data.message || 'Ошибка авторизации');
      }

      const user = data.user;
      if (!user) {
        return rejectWithValue('Ошибка получения данных пользователя');
      }
      if (data.accessToken && data.refreshToken) {
        setCookie('accessToken', data.accessToken, null);
        setCookie('refreshToken', data.refreshToken, null);
      }

      return user;
    } catch (err) {
      return rejectWithValue('Ошибка сети или сервера');
    }
  }
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = getCookie('refreshToken')
      if (!refreshToken) {
        return rejectWithValue('Токен не найден');
      }
      const url = "https://norma.nomoreparties.space/api/auth/logout"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }),
      });
      
      const data = (await response.json()) as UserResponce;
      
      if (!response.ok) {
        return rejectWithValue(data.message || 'Ошибка авторизации');
      }

      if (!data.success) {
        return rejectWithValue(data.message);
      }
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      return;
    } catch (err) {
      return rejectWithValue('Ошибка сети или сервера');
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
    console.log('refreshTokenValue', refreshTokenValue)
    const url = "https://norma.nomoreparties.space/api/auth/token";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshTokenValue }),
    });

    const data = (await response.json()) as UserResponce;

    if (!response.ok) {
      return rejectWithValue(data.message || "Ошибка обновления токена");
    }

    if (!data.success) {
      return rejectWithValue(data.message);
    }

    setCookie("accessToken", data.accessToken, null);
    setCookie("refreshToken", data.refreshToken, null);

    return { accessToken: data.accessToken, refreshToken: data.refreshToken };
  } catch (err) {
    return rejectWithValue("Ошибка сети или сервера");
  }
});

export const getUser = createAsyncThunk<User, void, { rejectValue: string }>(
  'user/get',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = getCookie('accessToken')
      console.log('Проверяем пользователя:', accessToken)
      if (!accessToken) {
        return rejectWithValue("Токен не найден");
      }

      const url = "https://norma.nomoreparties.space/api/auth/user"
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken
        },
      });
      
      const data = (await response.json()) as UserResponce;
      
      if (!response.ok) {
        return rejectWithValue(data.message || 'Ошибка получения данных пользователя');
      }

      const user = data.user;
      if (!user) {
        return rejectWithValue('Ошибка получения данных пользователя');
      }

      return user;
    } catch (err) {
      return rejectWithValue('Ошибка сети или сервера');
    }
  }
);

export const updateUser = createAsyncThunk<
  User,
  {
    email: string;
    name: string;
    password?: string;
  } , { rejectValue: string }
>('user/update', async ({ email, name, password }, { rejectWithValue }) => {
  try {
    const accessToken = getCookie('accessToken')
    if (!accessToken) {
      return rejectWithValue("Токен не найден");
    }

    console.log( email, name, password )
    const body = password ? { email, name, password } : { email, name };
    
    const url = "https://norma.nomoreparties.space/api/auth/user"
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken
      },
      body: JSON.stringify(body),
    });
    const data = (await response.json()) as UserResponce;
    console.log(data)
    if (!response.ok) {
      return rejectWithValue(data.message || "Ошибка обновления данных пользователя");
    }

    if (!data.success) {
      return rejectWithValue(data.message);
    }

    return data.user;
  } catch (err) {
    return rejectWithValue("Ошибка сети или сервера");
  }
});