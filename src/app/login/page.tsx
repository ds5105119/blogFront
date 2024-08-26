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

function openCenteredWindow(url: string, width: number, height: number): void {
  // 화면의 가로, 세로 크기
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // 새 창의 크기
  const left = screenWidth / 2 - width / 2;
  const top = screenHeight / 2 - height / 2;

  // 새 창 열기
  window.open(
    url,
    "_blank",
    `noopener,noreferrer,width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`,
  );
}

function TypingEffect({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");
  const typingSpeed = 100; // 타이핑 속도 (밀리초 단위)

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [text]);

  return (
    <h2 className="text-3xl font-semibold mb-6 h-12">
      {displayText}
      <span className="animate-blink">|</span>
    </h2>
  );
}

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/login/callback/`;
    const scope = "openid%20email%20profile";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    openCenteredWindow(authUrl, 800, 600);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-purple-50-50">
      <NavBar />
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full mx-4 transform hover:scale-105 transition-all duration-300">
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
            {!isLoading ? (
              <GoogleLoginButton
                status={isLoading}
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                Google로 로그인
              </GoogleLoginButton>
            ) : (
              <div>제발</div>
            )}
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
