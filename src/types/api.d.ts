export type presignedUrlType = {
  url: string;
  fields: {
    key: string;
    AWSAccessKeyId: string;
    policy: string;
    signature: string;
  };
};

export type postType = {
  uuid: string;
  user: {
    handle: string;
    profile_image: string;
  };
  category: null;
  status: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  created_at: string;
  views_count: number;
  likes_count: number;
};
