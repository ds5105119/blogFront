"use client";

import { useAuth } from "@/hooks/useAuth";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { setAccessToken, setRefreshToken, clearTokens } from "@/lib/authToken";
import axios from "axios";

const login = async (authCode: string) => {
  const { data } = await axiosInstance.post<{
    access: string;
    refresh: string;
  }>("/accounts/google/login/", { code: authCode });
  setAccessToken(data.access);
  setRefreshToken(data.refresh);
  return data;
};

const getCode = async () => {
  const reponse = axios.get(
    "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?scope=profile%20email&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Faccounts%2Fgoogle%2Flogin%2Fcallback%2F&client_id=546765224763-07pflg18sm3rqsso8m8nsbd8mhgqon3m.apps.googleusercontent.com&service=lso&o2v=2&ddm=0&flowName=GeneralOAuthFlow",
  );
};

const UserProfile: React.FC = () => {
  const { user, isLoading, isError, logout } = useAuth();

  if (isLoading) return <p>Loading...</p>;
  if (isError || !user) return <FaUser size={24} />; // 로그인 실패 시 기본 아이콘

  return (
    <div>
      <img src={user.profileImageURL} alt="User Profile" />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserProfile;
