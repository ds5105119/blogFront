import { jwtDecode } from "jwt-decode";

export const getAccessToken = (): string | null =>
  localStorage.getItem("accessToken");

export const setAccessToken = (token: string): void =>
  localStorage.setItem("accessToken", token);

export const clearTokens = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token) as {
      exp: number;
    };
    const expirationDatetimeInSeconds = exp * 1000;
    return Date.now() >= expirationDatetimeInSeconds;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};
