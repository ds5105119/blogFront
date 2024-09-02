import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPostViaHandle, getPostViaUUID } from "@/lib/api";
import { postType } from "@/types/api";

interface PostResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: postType[];
}

export const useInfinitePosts = (handle: string | null) => {
  return useInfiniteQuery<PostResponse, Error>({
    queryKey: ["posts", handle],
    queryFn: ({ pageParam }) => getPostViaHandle(handle, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.next ? nextPage : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      const prevPage = allPages.length - 1;
      return firstPage.previous ? prevPage : undefined;
    },
  });
};

export const usePost = (uuid: string) => {
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery<postType, Error>({
    queryKey: ["post", uuid],
    queryFn: () => getPostViaUUID(uuid),
    enabled: !!uuid,
    staleTime: 1000 * 60 * 60,
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    post,
    isLoading,
    isError,
    error,
  };
};
