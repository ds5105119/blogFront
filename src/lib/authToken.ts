import { jwtDecode } from "jwt-decode";
import { AuthType } from "@/types/auth";

export const getAccessToken = (): string | null =>
  localStorage.getItem("accessToken");

export const setAccessToken = (token: string): void =>
  localStorage.setItem("accessToken", token);

export const getAuth = (): AuthType | null => {
  if (typeof window !== "undefined") {
    const objJSON = localStorage.getItem("auth");
    if (!!objJSON) {
      const obj = JSON.parse(objJSON);
      if (new Date().getTime() > obj.expiration) {
        localStorage.removeItem("auth");
        return null;
      } else {
        const auth = obj.value as AuthType;
        return auth;
      }
    }
  }
  return null;
};

export const setAuth = (auth: AuthType): void => {
  const expirationDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 7;
  const obj = {
    value: auth,
    expire: expirationDate,
  };
  localStorage.setItem("auth", JSON.stringify(obj));
};

export const clearTokens = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("auth");
};
