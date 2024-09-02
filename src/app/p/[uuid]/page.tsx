"use client";

import React from "react";
import { useEffect, useState } from "react";
import { usePost } from "@/hooks/usePost";
import NavbarCol from "@/components/navbar/navBarCol";
import Markdown from "react-markdown";
import clsx from "clsx";
import rehypeHighlight from "rehype-highlight";
import { getAuth } from "@/lib/authToken";
import { AuthType } from "@/types/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deletePost, createComment, getCommentViaUUID } from "@/lib/api";

const DynamicPage = async ({ params }: { params: { uuid: string } }) => {
  const router = useRouter();
  const { uuid } = params;
  const { post, isLoading, isError, error } = usePost(uuid as string);
  const [auth, setAuth] = useState<AuthType | null>(null);
  const [profileURL, setProfileURL] = useState<string>("/defaultUserIcon.png");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Object | null>(null);

  useEffect(() => {
    setAuth(getAuth());
    getCommentViaUUID(uuid).then((res) => setComment(res));
  }, []);

  useEffect(() => {
    setProfileURL(post?.user.profile_image || "/defaultUserIcon.png");
  }, [post]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !post) {
    console.log(error);
    return <div>Error loading content</div>;
  }

  if (!post) {
    return <div>No content</div>;
  }

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/${post.user.handle}`);
  };

  const handleDeletePost = () => {
    const userResponse = window.confirm("예 또는 아니오를 선택하세요.");

    if (userResponse) {
      deletePost(uuid);
      router.push(`/${post.user.handle}`);
    }
  };

  const handleCommentSubmit = () => {
    createComment(uuid, comment);
    router.push(`/p/${uuid}`);
  };

  return (
    <main className="flex h-screen max-h-screen items-center">
      <NavbarCol currentTab={{}} />
      <div className="flex flex-col h-screen max-h-screen w-full justify-center items-center pt-16">
        <div
          className={`overflow-auto flex flex-col bg-white h-full px-12 rounded-t-2xl shadow-secondary w-[768px] transition-all duration-75 ease-in transform`}
        >
          <div className="flex w-full px-12 pt-20 pb-10 justify-between">
            <div
              onClick={handleProfileClick}
              className="flex items-center cursor-pointer"
            >
              <Image
                src={profileURL}
                alt={`${post.user.handle}'s profile`}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <span className="font-semibold text-gray-700">
                {post.user.handle}
              </span>
            </div>
            {auth?.handle == post.user.handle ? (
              <div onClick={handleDeletePost}>삭제하기</div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex w-full px-12">
            <div className={clsx("prose", "prose-lg", "mx-auto", "my-8")}>
              <Markdown rehypePlugins={[rehypeHighlight]} className="w-full">
                {post.content}
              </Markdown>
            </div>
          </div>

          <input
            onChange={(event) => {
              setComment(event.currentTarget.value);
            }}
            value={comment}
          />
          <button onClick={() => handleCommentSubmit()}>댓글 작성하기</button>
        </div>
      </div>
    </main>
  );
};

export default DynamicPage;
