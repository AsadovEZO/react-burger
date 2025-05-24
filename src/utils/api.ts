export const BASE_URL = "https://norma.nomoreparties.space/api";

export const ENDPOINTS = {
  auth: {
    register: `${BASE_URL}/auth/register`,
    login: `${BASE_URL}/auth/login`,
    logout: `${BASE_URL}/auth/logout`,
    token: `${BASE_URL}/auth/token`,
    user: `${BASE_URL}/auth/user`,
  },
  ingredients: `${BASE_URL}/ingredients`,
  orders: `${BASE_URL}/orders`,
  passwordReset: `${BASE_URL}/password-reset`,
  passwordResetConfirm: `${BASE_URL}/password-reset/reset`,
};