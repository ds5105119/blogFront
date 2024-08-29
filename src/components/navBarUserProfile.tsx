import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { User } from "@/types/auth";

const useUserdStatus = () => {
  return useQuery<User>({
    queryKey: ["user"],
    initialData: {
      username: "",
      email: "",
      profileImageURL: "/defaultUserIcon.png",
      handel: "",
    },
    enabled: false,
    staleTime: 1000 * 60 * 60 * 24 * 1,
  });
};

const UserProfile = () => {
  const { data: user } = useUserdStatus();

  return (
    <div className="relative rounded-full overflow-hidden w-full h-full aspect-square">
      <Image
        src={user.profileImageURL}
        alt={`${user.username}'s profile`}
        className="object-cover w-full h-full"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = user.profileImageURL;
        }}
      />
    </div>
  );
};
