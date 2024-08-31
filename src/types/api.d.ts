export type presignedUrlType = {
  url: string;
  fields: {
    key: string;
    AWSAccessKeyId: string;
    policy: string;
    signature: string;
  };
};
