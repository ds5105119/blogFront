import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "@/types/auth";
import axiosInstance from "./axiosInstance";
import { clearTokens } from "./authToken";
import { presignedUrlType } from "@/types/api";

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
  return response.data as Profile;
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
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_PROFILE_URI}`,
    { handle: handle },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

export async function getPresignedUrl() {
  const response = await axiosInstance.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_PRESIGNED_URI}`,
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
