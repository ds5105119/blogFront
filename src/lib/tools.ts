import { randomBytes } from "crypto";

export const generateRandomString = (length: number): string => {
  return randomBytes(length).toString("hex").slice(0, length);
};

export const openCenteredWindow = (
  url: string,
  width: number,
  height: number,
): Window | null => {
  // 화면의 가로, 세로 크기
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // 새 창의 크기
  const left = screenWidth / 2 - width / 2;
  const top = screenHeight / 2 - height / 2;

  // 새 창 열기
  return window.open(
    url,
    "_blank",
    `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`,
  );
};
