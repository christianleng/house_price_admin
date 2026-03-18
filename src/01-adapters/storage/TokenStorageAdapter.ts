import type { ITokenStorage } from "@/00-domain/ports";
import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";

export const tokenStorage: ITokenStorage = {
  getToken: () => {
    return Cookies.get(TOKEN_KEY);
  },
  setToken: (token: string) => {
    Cookies.set(TOKEN_KEY, token, {
      expires: 7,
      secure: import.meta.env.PROD,
      sameSite: "Strict",
    });
  },
  clearToken: () => {
    return Cookies.remove(TOKEN_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!Cookies.get(TOKEN_KEY);
  },
};
