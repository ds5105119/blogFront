import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { setAuth, setAccessToken } from "@/lib/authToken";
import { LoginType, Profile, useAuthReturn } from "@/types/auth";
import { profileFn } from "@/lib/api";

// 로그인 함수
const loginFn = async (code: string, url: string): Promise<LoginType> => {
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

// 커스텀 훅: useAuth
export const useAuth = (): useAuthReturn => {
  const queryClient = useQueryClient();
  const [handle, setHandle] = useState("");

  const {
    data: user,
    isError,
    isLoading,
    error,
    isSuccess,
  } = useQuery<Profile, unknown, Profile, [string, string]>({
    queryKey: ["user", handle],
    queryFn: () => profileFn(handle),
    enabled: !!handle,
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
  });

  const login = useMutation({
    mutationFn: (variables: { code: string; url: string }) =>
      loginFn(variables.code, variables.url),
    onSuccess: (data) => {
      // 정보 저장
      const { access, user: auth } = data;
      setAccessToken(access);
      setHandle(auth.handle);
      setAuth(auth);

      // 유저 정보 업데이트
      queryClient
        .fetchQuery({
          queryKey: ["user", auth.handle],
          queryFn: () => profileFn(auth.handle),
        })
        .then((profileData) => {
          queryClient.setQueryData(["user", auth.handle], profileData);
        });
    },
    onError: (error) => {
      console.error("로그인 오류:", error);
    },
  });

  return {
    user,
    isError,
    isLoading,
    error,
    isSuccess,
    login,
  };
};
