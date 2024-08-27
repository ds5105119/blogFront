"use client";

import { useAuth } from "@/hooks/useAuth";
import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { setAccessToken, setRefreshToken, clearTokens } from "@/lib/authToken";
import axios from "axios";
import GoogleLoginButton from "@/components/googleLoginButton";
import NavBar from "@/components/navBar";
import AnimatedGradientText from "@/components/animatedGradientText";
import { generateRandomString, openCenteredWindow } from "@/lib/tools";

type GoogleLoginEvent = {
  type: "GOOGLE_LOGIN";
  code: string;
};

const texts = ["안녕하세요", "Hello", "Bonjour", "你好", "こんにちは"];

const gradients = [
  "from-purple-400 via-pink-500 to-red-500",
  "from-blue-400 via-green-500 to-yellow-500",
  "from-indigo-400 via-purple-500 to-pink-500",
  "from-green-400 via-blue-500 to-purple-500",
  "from-yellow-400 via-red-500 to-pink-500",
];

const login = async (authCode: string) => {
  const { data } = await axiosInstance.post<{
    access: string;
    refresh: string;
  }>("/accounts/google/login/", { code: authCode });
  setAccessToken(data.access);
  setRefreshToken(data.refresh);
  return data;
};

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/login/callback/`;
    const scope = "email+profile";
    const state = generateRandomString(16);
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=${scope}&state=${state}&client_id=${clientId}&redirect_uri=${redirectUri}`;

    const popup: Window | null = openCenteredWindow(authUrl, 600, 700);
    console.log(popup);

    if (!popup) {
      setIsLoading(false);
    }

    const checkPopup = setInterval(() => {
      if (popup && popup.closed) {
        clearInterval(checkPopup);
        setIsLoading(false);

        // 팝업이 닫힌 후 localStorage에서 인증 코드 확인
        const code = localStorage.getItem("googleAuthCode");
        const receivedState = localStorage.getItem("googleAuthState");

        if (code && receivedState === state) {
          localStorage.removeItem("googleAuthCode");
          localStorage.removeItem("googleAuthState");
        }
      }
    }, 300);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <div className="flex flex-col items-center justify-center flex-grow ">
        <div className="bg-white p-8 rounded-2xl shadow-primary max-w-md w-full mx-4 transform hover:scale-[1.02] transition-all duration-300">
          <div className="text-center">
            <p className="text-gray-600 mb-8">
              Start using IIH for yourself or your team
            </p>
            <div className="flex items-center align-middle justify-center mb-8">
              <AnimatedGradientText texts={texts} gradients={gradients} />
            </div>
            <p className="text-gray-600 mb-8">Google 계정으로 로그인하세요</p>
          </div>
          <div>
            <GoogleLoginButton
              isLoading={isLoading}
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              Google로 로그인
            </GoogleLoginButton>
          </div>
          <p className="mt-6 text-center text-sm text-gray-600">
            계정이 없으신가요?{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300"
            >
              회원가입
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
