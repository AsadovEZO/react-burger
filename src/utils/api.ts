export const BASE_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  throw new Error(res.statusText || 'Ошибка сети или сервера');
};

const checkSuccess = <T>(res: T): T => {
  if (res && (res as any).success) {
    return res;
  }
  throw new Error(`Ответ не success: ${JSON.stringify(res)}`);
};

export const ENDPOINTS = {
  ingredients: "/ingredients",
  orders: "/orders",
  passwordReset: "/password-reset",
  passwordResetConfirm: "/password-reset/reset",
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    token: "/auth/token",
    user: "/auth/user",
  },
} as const;

type EndpointPath = typeof ENDPOINTS[keyof typeof ENDPOINTS] | (typeof ENDPOINTS)["auth"][keyof (typeof ENDPOINTS)["auth"]];

export const request = async <T>(
  endpoint: EndpointPath,
  options?: RequestInit
): Promise<T> => {
  try {
    const fullUrl = `${BASE_URL}${endpoint}`;
    const response = await fetch(fullUrl, options);
    const data = await checkResponse(response);
    return checkSuccess(data);
  } catch (error) {
    throw error;
  }
};