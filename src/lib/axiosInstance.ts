import axios, {
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosError,
  AxiosHeaders,
} from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  clearTokens,
  isTokenExpired,
} from "@/lib/authToken";

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptors
axiosInstance.interceptors.request.use(
  // AccessToken is Valid
  (config: InternalAxiosRequestConfig) => {
    const accessToken: string | null = getAccessToken();

    if (!accessToken) {
      return config;
    }

    if (!isTokenExpired(accessToken)) {
      (config.headers as AxiosHeaders).set(
        "Authorization",
        `Bearer ${accessToken}`,
      );
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// response interceptors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const refreshToken = getRefreshToken();
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      !refreshToken ||
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const response = await axios.post(
      `${process.env.BACKEND_URL}${process.env.REFRESH_TOKEN_URI}`,
      {
        refresh: refreshToken,
      },
    );

    // token refresh sucess
    if (response.status === 200) {
      setAccessToken(response.data.access);
      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${response.data.access}`,
      };
      return axiosInstance(originalRequest);
    } else {
      clearTokens();
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
