// 유저
export type User = {
  handle: string;
  username: string;
  email: string;
  created_at: string; // ISO 8601
  updated_at: string; // ISO 8601
  is_staff: boolean;
  follows_count: number;
  followers_count: number;
};

// 토큰 및 유저
export type LoginType = {
  access: string;
  user: {
    pk: number;
    handle: string;
    email: string;
  };
};

// useAuth Login hook
export type UseLoginReturn = {
  mutate: (variables: { code: string; url: string }) => void;
  isPending: boolean;
  isError: boolean;
  error: unknown;
  isSuccess: boolean;
};
