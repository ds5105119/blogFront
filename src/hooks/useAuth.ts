import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { setAccessToken, setRefreshToken, clearTokens } from "@/lib/authToken";

interface User {
  id: string;
  username: string;
  email: string;
  profileImageURL: string;
}

const fetchUserProfile = async (): Promise<User> => {
  const { data } = await axiosInstance.get<User>("/accounts/user/");
  return data;
};

const login = async (authCode: string) => {
  const { data } = await axiosInstance.post<{
    access: string;
    refresh: string;
  }>("/accounts/login/google/", { code: authCode });
  setAccessToken(data.access);
  setRefreshToken(data.refresh);
  return data;
};

export const useAuth = () => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User>({ queryKey: ["user"], queryFn: fetchUserProfile });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]); // 로그인 성공 시 유저 정보 다시 가져옴
    },
  });

  const logout = () => {
    clearTokens();
    queryClient.invalidateQueries(["user"]); // 로그아웃 시 유저 정보 초기화
  };

  return {
    user,
    isLoading,
    isError,
    login: loginMutation.mutate,
    logout,
  };
};
