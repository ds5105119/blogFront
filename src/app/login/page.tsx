"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AnimatedGradientText from "@/components/animatedGradientText";
import GoogleLoginButton from "@/components/googleLoginButton";
import NavBar from "@/components/navBar";
import { generateRandomString, openCenteredWindow } from "@/lib/tools";
import { useLogin } from "@/hooks/useAuth";

const texts = ["안녕하세요", "Hello", "Bonjour", "你好", "こんにちは"];
const gradients = [
  "from-purple-400 via-pink-500 to-red-500",
  "from-blue-400 via-green-500 to-yellow-500",
  "from-indigo-400 via-purple-500 to-pink-500",
  "from-green-400 via-blue-500 to-purple-500",
  "from-yellow-400 via-red-500 to-pink-500",
];

export default function Login() {
  // 이전 URL
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl =
    searchParams.get("returnUrl") ?? process.env.NEXT_PUBLIC_BASE_URL;

  // code 관련
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  // token 관련
  const { mutate, isPending, isError, error, isSuccess } = useLogin();

  // 로그인 성공시 redirect
  const handleLoginSuccess = () => {
    if (returnUrl) {
      router.push(decodeURIComponent(returnUrl));
    } else {
      router.push("/");
    }
  };

  // Get JWT Token(for Google Users)
  const handelGetGoogleToken = () => {
    setIsLoading(true);
    mutate({
      code: code,
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URI}`,
    });
    setIsLoading(false);
    if (isSuccess && !isError && !isPending) {
      // handleLoginSuccess();
    }
  };

  // Get Google Login Code
  const handelGetGoogleCode = () => {
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

        const receivedCode = localStorage.getItem("googleAuthCode");
        const receivedState = localStorage.getItem("googleAuthState");

        if (receivedCode && receivedState === state) {
          setCode(receivedCode);
          localStorage.removeItem("googleAuthCode");
          localStorage.removeItem("googleAuthState");
          handelGetGoogleToken();
        }
      }
    }, 500);
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
              onClick={handelGetGoogleCode}
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
