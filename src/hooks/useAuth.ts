import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import { setAccessToken, clearTokens } from "@/lib/authToken";
import { User, LoginType, UseLoginReturn } from "@/types/auth";

// 로그인 함수
const login = async (code: string, url: string): Promise<LoginType> => {
  const response = await axios.post<LoginType>(
    url,
    { code: code },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (response.status !== 200) {
    throw new Error("Login failed");
  }

  return response.data;
};

// 커스텀 훅: useLogin
export const useLogin = (): UseLoginReturn => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (variables: { code: string; url: string }) =>
      login(variables.code, variables.url),
    onSuccess: (data) => {
      // 토큰 저장
      const { access, user } = data;
      setAccessToken(access);
      // 정보 저장
      queryClient.setQueryData(["user"], user);
    },
    onError: (error) => {
      console.error("로그인 오류:", error);
    },
  });

  return {
    mutate,
    isPending,
    isError,
    error,
    isSuccess,
  };
};
