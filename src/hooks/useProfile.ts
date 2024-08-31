import { useQuery } from "@tanstack/react-query";
import { Profile } from "@/types/auth";
import { profileFn } from "@/lib/api";

const useProfile = (handle: string | undefined) => {
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery<Profile, Error>({
    queryKey: ["profile", handle],
    queryFn: () => profileFn(handle!),
    enabled: !!handle,
    staleTime: 1000 * 60 * 10,
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    profile,
    isLoading,
    isError,
    error,
  };
};

export default useProfile;
