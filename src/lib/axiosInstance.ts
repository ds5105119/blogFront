import axios, {
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosError,
  AxiosHeaders,
} from "axios";
import {
  getAccessToken,
  setAccessToken,
  clearTokens,
  isTokenExpired,
} from "@/lib/authToken";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.REFRESH_TOKEN_URI}`,
        {},
        { withCredentials: true },
      );

      if (response.status === 200) {
        setAccessToken(response.data.access);
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${response.data.access}`,
        };
        return axiosInstance(originalRequest);
      }
    } catch (refreshError) {
      clearTokens();
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
