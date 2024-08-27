"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import LoadingAnimation from "@/components/loadingAnimation";

export default function Callback() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    if (code && state) {
      localStorage.setItem("googleAuthCode", code);
      localStorage.setItem("googleAuthState", state);
      window.close();
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-12 h-12 relative" role="status" aria-label="로딩 중">
        <LoadingAnimation />
      </div>
    </div>
  );
}
