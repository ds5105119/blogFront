// Auth Type
export type AuthType = {
  pk: number;
  handle: string;
  email: string;
};

// Access Token and USer
export type LoginType = {
  access: string;
  user: AuthType;
};

// User
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

// Profile
export type Profile = {
  user: User;
  bio: string;
  link: string;
  profile_image: string;
};

export type useAuthReturn = {
  user: Profile | undefined;
  isError: boolean;
  isLoading: boolean;
  error: unknown;
  isSuccess: boolean;
  login: UseMutationResult<
    { code: string },
    AxiosError,
    {
      access: string;
      user: User;
    }
  >;
};
