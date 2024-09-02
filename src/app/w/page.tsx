"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import NavbarCol from "@/components/navbar/navBarCol";
import Editor from "@/components/editor/editor";
import LoadingAnimation from "@/components/loadingAnimation";
import { HiOutlinePaperClip } from "react-icons/hi";
import { uploadPost } from "@/lib/api";
import { postType } from "@/types/api";
import extractDataFromMarkdownWithMatter from "@/lib/\beditor/extractor";

export default function write() {
  const router = useRouter();
  const [MDX, setMDX] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [postUUID, setPostUUID] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMDXChange = (newMDX: string) => {
    setMDX(newMDX);
  };

  const handleSubmit = async () => {
    const parsedMDX = await extractDataFromMarkdownWithMatter(MDX);

    await uploadPost({
      status: "published",
      title: parsedMDX.content,
      excerpt: parsedMDX.content,
      content: MDX,
      tags: parsedMDX.tags,
    });
  };

  const handleRedrict = async () => {
    router.push(`/p/${postUUID}`);
  };

  return (
    <main className="flex h-screen max-h-screen items-center">
      <NavbarCol />
      <div className="flex flex-col h-screen max-h-screen w-full justify-center items-center">
        <div className="flex w-full h-24 items-center justify-center">
          <button
            onClick={handleSubmit}
            className="group flex justify-center items-center space-x-2 cursor-pointer w-28 h-12 bg-gray-50 rounded-lg hover:brightness-95 transition-all duration-150"
          >
            <HiOutlinePaperClip className="w-6 h-6 group-hover:w-7 group-hover:h-7 transition-all duration-200 ease-in" />
            <div>포스트</div>
          </button>
        </div>
        <div
          className={`flex flex-col bg-white h-full px-12 space-y-6 rounded-t-2xl shadow-secondary justify-center items-center w-[768px] transition-all duration-75 ease-in transform ${
            isVisible ? "translate-y-0 animate-slide-up" : "translate-y-full"
          }`}
        >
          <div className="flex flex-col pt-12 pb-6 h-full max-h-screen w-full space-y-6">
            <Suspense fallback={<LoadingAnimation />}>
              <Editor
                markdown={MDX}
                placeholder="글을 작성하세요. 이미지는 드래그 앤 드롭으로도 올릴 수 있습니다..."
                onChange={handleMDXChange}
                className="w-full h-full overflow-auto"
              />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
