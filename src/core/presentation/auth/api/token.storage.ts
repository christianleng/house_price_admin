import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";

export const tokenStorage = {
  getToken: () => {
    return Cookies.get(TOKEN_KEY);
  },
  setToken: (token: string) => {
    Cookies.set(TOKEN_KEY, token, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
  },
  clearToken: () => {
    Cookies.remove(TOKEN_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!Cookies.get(TOKEN_KEY);
  },
};
