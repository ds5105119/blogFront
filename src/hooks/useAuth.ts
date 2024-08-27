import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { setAccessToken, setRefreshToken, clearTokens } from "@/lib/authToken";

// 유저 타입 정의
interface User {
  id: string;
  username: string;
  email: string;
  profileImageURL: string;
}

// 토큰 타입 정의
type Tokens = {
  access: string;
  refresh: string;
};

// useAuth 훅 반환 타입 정의
type UseLoginReturn = {
  mutate: (variables: { code: string; url: string }) => void;
  isPending: boolean;
  isError: boolean;
  error: unknown;
  isSuccess: boolean;
};

// 로그인 함수
const login = async (code: string, url: string): Promise<Tokens> => {
  const response = await axiosInstance.post<Tokens>(
    url,
    { access_token: "", code: code, id_token: "" },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  console.log(response.data);

  return response.data;
};

// 커스텀 훅: useLogin
export const useLogin = (): UseLoginReturn => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (variables: { code: string; url: string }) =>
      login(variables.code, variables.url),
    onSuccess: (data) => {
      const { access, refresh } = data;
      setAccessToken(access);
      setRefreshToken(refresh);
    },
    onError: (error) => {
      console.error("로그인 오류:", error);
      // 여기에 추가적인 에러 처리 로직을 구현할 수 있습니다.
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
