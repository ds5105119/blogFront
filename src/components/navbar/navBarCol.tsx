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
import IIH from "@/assets/svg/IIH.svg";

type booleanObject = {
  [key: string]: boolean;
};

type navBarProps = {
  currentTab?: booleanObject;
  auth?: AuthType;
};

const NavBarCol = ({ currentTab, auth }: navBarProps) => {
  const router = useRouter();
  const tabStatus: booleanObject = currentTab ?? {};
  const profileURL = !!auth ? `/${auth.handle}` : `/login`;

  const toggleExploreTab = () => {
    router.push("/explore");
  };
  const toggleHomeTab = () => {
    router.push("/");
  };
  const toggleSearchTab = () => {
    router.push("/search");
  };
  const toggleProfileTab = () => {
    router.push(profileURL);
  };
  const toggleMenu = () => {
    // TODO
  };

  return (
    <nav className="h-screen w-24 bg-white shadow-primary">
      <div className="h-full mx-auto px-5">
        <div className="flex flex-col h-full justify-between items-center">
          {/* Logo */}
          <div className="flex w-full py-16 items-center justify-center">
            <button onClick={toggleHomeTab} type="button">
              <IIH className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center space-y-4">
            <NavBarButton onClick={toggleProfileTab} className="w-20 h-14">
              <span className="sr-only">프로필 버튼</span>
              {tabStatus["Profile"] ? (
                <UserProfile className="cursor-pointer pointer-events-none border-gray-700 border-[2.5px] w-[27px] h-[27px] group-hover:w-[29px] group-hover:h-[29px] transition-all duration-150" />
              ) : (
                <UserProfile className="cursor-pointer pointer-events-none border-gray-300 border-[2px] w-[27px] h-[27px] group-hover:w-[29px] group-hover:h-[29px] transition-all duration-150" />
              )}
            </NavBarButton>
            <NavBarButton onClick={toggleHomeTab} className="w-20 h-14">
              <span className="sr-only">홈 버튼</span>
              {tabStatus["Home"] ? (
                <GoHomeFill className="cursor-pointer w-[28px] h-[28px] group-hover:w-[30px] group-hover:h-[30px] transition-all duration-150" />
              ) : (
                <GoHome className="cursor-pointer w-[28px] h-[28px] stroke-[0.2px] group-hover:w-[30px] group-hover:h-[30px] transition-all duration-150" />
              )}
            </NavBarButton>
            <NavBarButton onClick={toggleExploreTab} className="w-20 h-14">
              <span className="sr-only">탐색 버튼</span>
              {tabStatus["Explore"] ? (
                <FaCompass className="cursor-pointer w-[24px] h-[24px] group-hover:w-[26px] group-hover:h-[26px] transition-all duration-150" />
              ) : (
                <FaRegCompass className="cursor-pointer w-[24px] h-[24px] group-hover:w-[26px] group-hover:h-[26px] transition-all duration-150" />
              )}
            </NavBarButton>
            <NavBarButton onClick={toggleSearchTab} className="w-20 h-14">
              <span className="sr-only">검색 버튼</span>
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
              <span className="sr-only">메뉴 버튼</span>
              <HiMenuAlt3 className="cursor-pointer w-[27px] h-[27px] group-hover:w-[29px] group-hover:h-[29px] transition-all duration-150" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarCol;
