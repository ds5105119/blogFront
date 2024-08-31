"use client";

import { notFound } from "next/navigation";
import Navbar from "@/components/navbar/navBar";
import { Profile } from "@/types/auth";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useProfile from "@/hooks/useProfile";
import { AuthType } from "@/types/auth";
import { getAuth } from "@/lib/authToken";

const DynamicPage = ({ params }: { params: { handle: string } }) => {
  const queryClient = useQueryClient();
  const { handle } = params;
  const [activeTab, setActiveTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);

  const currentTab = {
    Profile: true,
  };

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

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // 여기에 실제 팔로우/언팔로우 API 호출 로직을 추가해야 합니다.
  };

  // 임시 게시물 및 시리즈 데이터
  const posts = Array(9)
    .fill(null)
    .map((_, i) => ({
      id: i,
      imageUrl: `/defaultUserIcon.png?height=300&width=300&text=Post+${i + 1}`,
    }));

  const series = [
    { id: "all", name: "게시물" },
    { id: "series1", name: "시리즈 1" },
    { id: "series2", name: "시리즈 2" },
    { id: "series3", name: "시리즈 3" },
  ];

  if (profileIsLoading) return <div>Loading...</div>;
  if (profileIsError)
    return <div>An error occurred: {profileError?.message}</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar currentTab={currentTab} />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
            <Image
              src={"/defaultUserIcon.png?height=150&width=150"}
              alt={`${profile.user.username}'s profile`}
              width={150}
              height={150}
              style={{
                borderRadius: "50%",
                marginBottom: "1rem",
                marginRight: "2rem",
              }}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">
                  {profile.user.handle}
                </h1>
                {true && (
                  <button
                    onClick={handleFollow}
                    className={`px-4 py-2 rounded-md text-sm font-semibold ${
                      isFollowing
                        ? "bg-gray-200 text-black"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {isFollowing ? "팔로잉" : "팔로우"}
                  </button>
                )}
              </div>
              <div className="flex space-x-8 mb-4">
                <div className="text-center">
                  <span className="font-semibold">{posts.length}</span>
                  <p className="text-gray-600 text-sm">게시물</p>
                </div>
                <div className="text-center">
                  <span className="font-semibold">
                    {profile.user.followers_count}
                  </span>
                  <p className="text-gray-600 text-sm">팔로워</p>
                </div>
                <div className="text-center">
                  <span className="font-semibold">
                    {profile.user.follows_count}
                  </span>
                  <p className="text-gray-600 text-sm">팔로잉</p>
                </div>
              </div>
              <p className="text-sm font-bold mb-1">{profile.user.username}</p>
              <p className="text-sm mb-2">{profile.bio}</p>
              <a
                href={profile.link}
                className="text-blue-500 text-sm font-semibold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.link}
              </a>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <div className="flex justify-around mt-4">
              {series.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveTab(s.id)}
                  className={`text-sm font-semibold py-2 ${
                    activeTab === s.id
                      ? "text-black border-t border-black"
                      : "text-gray-500"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 mt-4">
            {posts.map((post) => (
              <div key={post.id} className="aspect-square">
                <Image
                  src={post.imageUrl}
                  alt={`Post ${post.id + 1}`}
                  width={300}
                  height={300}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DynamicPage;
