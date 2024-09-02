"use client";

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { postType } from "@/types/api";

interface componentProps {
  props: postType;
}

const BlogPostComponent: React.FC<componentProps> = ({ props }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const {
    uuid,
    user,
    category,
    status,
    title,
    excerpt,
    content,
    tags,
    created_at,
    views_count,
    likes_count,
  } = props;

  const profileImage = user.profile_image || "/defaultUserIcon.png";
  const formattedDate = new Date(created_at).toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname !== `/${user.handle}`) {
      router.push(`/${user.handle}`);
    }
  };

  const handlePostClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/p/${uuid}`);
  };

  return (
    <div className="border-t border-b border-gray-200 py-6 hover:bg-gray-50">
      <div className="flex items-center mb-4">
        <div className="flex items-center cursor-pointer">
          <Image
            src={profileImage}
            alt={`${user.handle}'s profile`}
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
          <span className="font-semibold text-gray-700">{user.handle}</span>
        </div>
        <span className="text-gray-500 text-sm ml-auto">{formattedDate}</span>
        <button className="ml-4 text-gray-500 hover:text-gray-700">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
      </div>
      <p
        onClick={handlePostClick}
        className="cursor-pointer text-gray-700 mb-4 hover:underline"
      >
        {excerpt}
      </p>
      <div className="flex items-center text-gray-500 text-sm">
        <span className="flex items-center mr-4">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          {views_count}
        </span>
        <span className="flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {likes_count}
        </span>
      </div>
    </div>
  );
};

export default BlogPostComponent;
