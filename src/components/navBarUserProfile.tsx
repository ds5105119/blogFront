"use client"

import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { AuthType, Profile } from "@/types/auth";
import { getAuth } from "@/lib/authToken";

const defaultAuthValue: AuthType = {
  pk: 0,
  handle: "",
  email: "",
};

const defaultProfileValue: Profile = {
  user: {
    handle: "",
    username: "",
    email: "",
    created_at: "",
    updated_at: "",
    is_staff: false,
    follows_count: 0,
    followers_count: 0,
  },
  bio: "",
  link: "",
  profile_image: "",
};

type UserProfileProps = {
  className?: string;
};

const UserProfile: React.FC<UserProfileProps> = ({ className = "" }) => {
  const queryClient = useQueryClient();
  const auth = getAuth() || defaultAuthValue;
  const user =
    queryClient.getQueryData<Profile>(["user", auth.handle]) ||
    defaultProfileValue;
  const profileURL = user.profile_image || "/defaultUserIcon.png";

  return (
    <div className={`relative rounded-full overflow-hidden ${className}`}>
      <Image
        src={profileURL}
        alt={`${user.user.username}'s profile`}
        width={50}
        height={50}
        className="object-cover w-full h-full"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = profileURL;
        }}
      />
    </div>
  );
};

export default UserProfile;
