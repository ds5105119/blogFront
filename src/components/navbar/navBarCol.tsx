"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCompass, FaRegCompass } from "react-icons/fa6";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiCommandFill } from "react-icons/ri";
import { HiMenuAlt3 } from "react-icons/hi";
import UserProfile from "../navBarUserProfile";
import NavBarButton from "./navBarButton";
import NavBarMenu from "./navBarMenu";
import { AuthType } from "@/types/auth";
import { getAuth, clearTokens } from "@/lib/authToken";

type StringIndexedArray<T> = {
  [key: string]: T;
};

export default function NavbarCol(props: {
  currentTab?: StringIndexedArray<boolean>;
}) {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthType | null>(null);
  const [profileURL, setProfileURL] = useState(
    `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
  );
  const tabStatus: StringIndexedArray<boolean> = props.currentTab ?? {};

  const toggleExploreTab = () => {};
  const toggleHomeTab = () => {
    router.push(process.env.NEXT_PUBLIC_BASE_URL || "/");
  };
  const toggleSearchTab = () => {};
  const toggleProfileTab = () => {
    router.push(profileURL);
  };

  useEffect(() => {
    setAuth(getAuth);
  }, []);

  useEffect(() => {
    setProfileURL(
      !!auth
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/${auth.handle}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    );
  }, [auth]);

  useEffect(() => {
    console.log(profileURL);
  }, [profileURL]);

  return (
    <nav className="h-screen w-24 bg-white shadow-primary">
      <div className="mx-auto px-5 h-full">
        <div className="flex flex-col justify-between h-full items-center">
          {/* Logo */}
          <div className="w-full py-8 flex items-center justify-center">
            <div className="w-full py-8 flex items-center justify-center">
              <button
                onClick={toggleHomeTab}
                type="button"
                className="flex-shrink-0"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 550 317"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 63.1547C0 41.8691 0 21.0835 0 0.0904541C27.8233 0.0904541 55.2384 0.0904541 82.9512 0.0904541C82.9512 105.392 82.9512 210.599 82.9512 316.117C55.4326 316.117 27.9032 316.117 0 316.117C0 231.86 0 147.757 0 63.1547Z"
                    fill="black"
                  />
                  <path
                    d="M188.67 316.208C175.525 316.208 162.879 316.208 149.951 316.208C149.951 210.778 149.951 105.543 149.951 0C177.478 0 205 0 232.717 0C232.717 105.361 232.717 210.576 232.717 316.208C218.066 316.208 203.618 316.208 188.67 316.208Z"
                    fill="black"
                  />
                  <path
                    d="M299.717 142.11C299.717 94.4823 299.717 47.3548 299.717 0.0275879C327.549 0.0275879 354.964 0.0275879 382.86 0.0275879C382.86 38.7471 382.86 77.3188 382.86 116.105C410.897 116.105 438.455 116.105 466.35 116.105C466.35 77.4068 466.35 38.9654 466.35 0.179993C494.223 0.179993 521.76 0.179993 549.506 0.179993C549.506 105.489 549.506 210.732 549.506 316.18C521.877 316.18 494.456 316.18 466.523 316.18C466.523 277.495 466.523 238.932 466.523 200.114C438.571 200.114 411.128 200.114 383.204 200.114C383.204 238.574 383.204 277.127 383.204 316.035C355.195 316.035 327.665 316.035 299.717 316.035C299.717 258.197 299.717 200.404 299.717 142.11Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center space-y-4">
            <NavBarButton onClick={toggleProfileTab} className="w-20 h-14">
              <span className="sr-only">프로필</span>
              {tabStatus["Profile"] ? (
                <UserProfile className="cursor-pointer border-gray-700 border-[2.5px] w-[27px] h-[27px] group-hover:w-[29px] group-hover:h-[29px] transition-all duration-150" />
              ) : (
                <UserProfile className="cursor-pointer border-gray-300 border-[2px] w-[27px] h-[27px] group-hover:w-[29px] group-hover:h-[29px] transition-all duration-150" />
              )}
            </NavBarButton>
            <NavBarButton onClick={toggleHomeTab} className="w-20 h-14">
              <span className="sr-only">홈</span>
              {tabStatus["Home"] ? (
                <GoHomeFill className="cursor-pointer w-[28px] h-[28px] group-hover:w-[30px] group-hover:h-[30px] transition-all duration-150" />
              ) : (
                <GoHome className="cursor-pointer w-[28px] h-[28px] stroke-[0.2px] group-hover:w-[30px] group-hover:h-[30px] transition-all duration-150" />
              )}
            </NavBarButton>
            <NavBarButton onClick={toggleExploreTab} className="w-20 h-14">
              <span className="sr-only">탐색</span>
              {tabStatus["Explore"] ? (
                <FaCompass className="cursor-pointer w-[24px] h-[24px] group-hover:w-[26px] group-hover:h-[26px] transition-all duration-150" />
              ) : (
                <FaRegCompass className="cursor-pointer w-[24px] h-[24px] group-hover:w-[26px] group-hover:h-[26px] transition-all duration-150" />
              )}
            </NavBarButton>
            <NavBarButton onClick={toggleSearchTab} className="w-20 h-14">
              <span className="sr-only">검색</span>
              {tabStatus["Search"] ? (
                <RiCommandFill className="cursor-pointer w-[27px] h-[27px] stroke-[0.8px] group-hover:w-[29px] group-hover:h-[29px] transition-all duration-150" />
              ) : (
                <RiCommandFill className="cursor-pointer w-[27px] h-[27px] group-hover:w-[29px] group-hover:h-[29px] transition-all duration-150" />
              )}
            </NavBarButton>
          </div>

          {/* Menu */}
          <div className="flex my-12 w-20 h-14 group align-middle items-center justify-center bg-white rounded-lg hover:brightness-95 transition duration-250">
            <div className="flex align-middle items-center justify-center p-3 rounded-md text-black hover:text-gray-600 transition duration-300">
              <span className="sr-only">검색</span>
              <HiMenuAlt3 className="cursor-pointer w-[27px] h-[27px] group-hover:w-[29px] group-hover:h-[29px] transition-all duration-150" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
