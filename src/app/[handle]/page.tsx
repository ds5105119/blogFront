"use client";

import { notFound } from "next/navigation";
import NavbarCol from "@/components/navbar/navBarCol";
import { Profile } from "@/types/auth";
import Image from "next/image";
import { useEffect, useState, Fragment } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useProfile from "@/hooks/useProfile";
import { AuthType } from "@/types/auth";
import { getAuth } from "@/lib/authToken";
import { getPostViaHandle } from "@/lib/api";
import { useInView } from "react-intersection-observer";
import { useInfinitePosts } from "@/hooks/usePost";
import BlogPostComponent from "@/components/postPreview";
import { postType } from "@/types/api";

const DynamicPage = ({ params }: { params: { handle: string } }) => {
  const currentTab = { Profile: true };
  const queryClient = useQueryClient();
  const { handle } = params;
  const [activeTab, setActiveTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [ref, inView] = useInView();
  const {
    data: posts,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfinitePosts(handle);
  const auth: AuthType = getAuth() ?? {
    pk: 0,
    handle: "",
    email: "",
  };
  const {
    profile,
    isLoading: profileIsLoading,
    isError: profileIsError,
    error: profileError,
  } = useProfile(handle);

  if (status === "error") return <div>에러: {error.message}</div>;
  if (profileIsLoading) return <div>Loading...</div>;
  if (!profile) return <div>Profile not found</div>;

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <main className="flex h-screen max-h-screen items-center">
      <NavbarCol currentTab={currentTab} />
      <div className="flex flex-col h-screen max-h-screen w-full justify-center items-center pt-16">
        <div
          className={`overflow-auto flex flex-col bg-white h-full px-12 rounded-t-2xl shadow-secondary w-[768px] transition-all duration-75 ease-in transform`}
        >
          <div className="flex min-h-72 w-full px-4">
            <div className="pt-12">
              <Image
                src={profile.profile_image}
                alt={`${profile.user.handle}'s profile`}
                width={140}
                height={140}
                className="rounded-full mr-3"
              />
            </div>
            <div className="flex flex-col pt-8 pl-8">
              <div className="font-bold text-xl">@{profile.user.handle}</div>
              <div className="font-normal text-base text-gray-900">
                {profile.user.username}
              </div>
              <div className="font-bold text-xl">{profile.bio}</div>
              <div className="font-bold text-xl">{profile.link}</div>
              <div className="font-bold text-xl">
                {profile.user.followers_count}
              </div>
              <div className="font-bold text-xl">
                {profile.user.follows_count}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {posts?.pages.map((group, i) => (
              <Fragment key={i}>
                {group.results.map((post) => (
                  <BlogPostComponent props={post} />
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DynamicPage;
