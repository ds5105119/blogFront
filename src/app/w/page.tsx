"use client";
import React from "react";
import { Suspense, useEffect, useState } from "react";
import Navbar from "@/components/navbar/navBar";
import Editor from "@/components/editor/editor";
import LoadingAnimation from "@/components/loadingAnimation";

export default function write() {
  const [MDX, setMDX] = useState("");

  useEffect(() => {
    console.log("변환 감지 완료");
    console.log(MDX);
  }, [MDX]);

  const handleMDXChange = (newMDX: string) => {
    setMDX(newMDX);
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar></Navbar>
      <Suspense fallback={<LoadingAnimation />}>
        <Editor
          markdown={MDX}
          placeholder="글을 작성하세요..."
          onChange={handleMDXChange}
          className="w-full"
        />
      </Suspense>
    </main>
  );
}
