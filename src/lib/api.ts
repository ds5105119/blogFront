import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "@/types/auth";
import axiosInstance from "./axiosInstance";
import { clearTokens } from "./authToken";
import { presignedUrlType, postType } from "@/types/api";

/**
 * 유저 관련
 * logoutFn OK
 * profileFn OK
 * getFollowFn
 * followFn
 */

export const logoutFn = async () => {
  const response = await axiosInstance.post(
    `${process.env.NEXT_PUBLIC_LOGOUT_URI}`,
  );

  if (response.status !== 200) {
    throw new Error("fetch failed");
  } else {
    clearTokens();
  }
};

export const profileFn = async (handle: string): Promise<Profile> => {
  const response = await axios.post<Profile>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_PROFILE_DETAIL_URI}`,
    { handle: handle },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (response.status !== 200) {
    throw new Error("fetch failed");
  }

  const profile = response.data as Profile;
  profile.profile_image = profile.profile_image || "/defaultUserIcon.png";
  return profile;
};

export const getFollowFn = async (handle: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_PROFILE_URI}handle=${handle}`,
  );

  if (response.status !== 200) {
    throw new Error("fetch failed");
  }
  return response.data;
};

export const followFn = async (handle: string) => {
  const response = await axiosInstance.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_PROFILE_URI}`,
    { handle: handle },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (response.status !== 200) {
    throw new Error("fetch failed");
  }
};

/**
 * 파일 및 AWS 관련
 * getPresignedUrl OK
 * uploadFileToS3 OK
 */

export async function getPresignedUrl() {
  const response = await axiosInstance.post(
    `${process.env.NEXT_PUBLIC_PRESIGNED_URI}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (response.status !== 200) {
    throw new Error("fetch failed");
  }
  return response.data as presignedUrlType;
}

export async function uploadFileToS3(
  presignedPostData: presignedUrlType,
  file: File,
) {
  const formData = new FormData();
  const fields = presignedPostData.fields as Record<string, string>;

  Object.keys(fields).forEach((key) => {
    formData.append(key, fields[key]);
  });
  formData.append("file", file);

  const response = await axios.post(presignedPostData.url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log(response);
  return `${presignedPostData.url}${presignedPostData.fields.key}`;
}

/**
 * 포스팅 관련
 * getPostViaHandle OK
 * uploadPost OK
 */

export const getPostViaHandle = async (handle: string | null, page?: any) => {
  const url = new URL(
    `http://127.0.0.1:8000/posts/latest/${handle ? handle : ""}${handle ? "/" : ""}`,
  );
  url.searchParams.append("page", page.toString());

  const response = await axios.get(url.toString(), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error("fetch failed");
  }
  return response.data;
};

export const getPostViaUUID = async (uuid: string) => {
  const response = await axios.get(`http://127.0.0.1:8000/posts/p/${uuid}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error("fetch failed");
  }
  return response.data;
};

export const uploadPost = async (post: any) => {
  const response = await axiosInstance.post(
    `${process.env.NEXT_PUBLIC_POST_URI}`,
    { ...post },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (response.status !== 201) {
    throw new Error("fetch failed");
  }
};

export const deletePost = async (uuid: string) => {
  const response = await axiosInstance.delete(
    `${process.env.NEXT_PUBLIC_POST_URI}${uuid}/`,
  );

  if (response.status !== 204) {
    throw new Error("fetch failed");
  }
};

/**
 */

export const getCommentViaUUID = async (uuid: string) => {
  const response = await axios.get(
    `http://127.0.0.1:8000/comments/?uuid=${uuid}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (response.status !== 200) {
    throw new Error("fetch failed");
  }
  return response.data;
};

export const createComment = async (uuid: string, content: string) => {
  const response = await axiosInstance.post(
    `/comments/`,
    {
      uuid: uuid,
      content: content,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (response.status !== 201) {
    throw new Error("fetch failed");
  }
};
