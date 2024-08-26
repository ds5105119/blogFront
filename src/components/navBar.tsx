"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCompass, FaRegCompass } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { GoHome, GoHomeFill } from "react-icons/go";

type StringIndexedArray<T> = {
  [key: string]: T;
};

export default function Navbar(props: {
  profileURL?: string;
  isAuth?: boolean;
  currentTab?: StringIndexedArray<boolean>;
}) {
  const { profileURL = null, isAuth = null, currentTab = null } = props;

  const router = useRouter();
  const queryClient = useQueryClient();
  const [tabStatus, setTabStatus] = useState<StringIndexedArray<boolean>>(
    currentTab ??
      queryClient.getQueryData(["tabStatus"]) ?? {
        Explore: false,
        Search: false,
        Home: true,
      },
  );

  const changeTab = (Tab: string) => {
    if (!tabStatus[Tab]) {
      setTabStatus((prevStatus) => {
        const newStatus = { ...prevStatus };
        Object.keys(newStatus).forEach((key) => {
          newStatus[key] = key === Tab;
        });
        return newStatus;
      });

      queryClient.setQueryData(["tabStatus"], tabStatus);
    }
  };

  const toggleExploreTab = () => {
    changeTab("Explore");
  };
  const toggleHomeTab = () => {
    changeTab("Home");
    router.push(process.env.NEXT_PUBLIC_BASE_URL || "/");
  };
  const toggleSearchTab = () => {
    changeTab("Search");
  };

  return (
    <nav className="w-full bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex w-full items-center">
              <button
                onClick={toggleHomeTab}
                type="button"
                className="flex-shrink-0"
              >
                <svg
                  className="w-7 h-7"
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

          {/* Login */}
          <div className="hidden items-center">
            <a
              href="#"
              className="bg-gray-800 text-gray-600 hover:bg-black px-4 py-2 rounded-[19px] text-sm font-medium"
            >
              로그인
            </a>
          </div>

          {/* Navigation */}
          <div className="-mr-2 flex items-center space-x-2">
            <div className="group w-12 h-12 inline-flex items-center justify-center">
              <button
                onClick={toggleHomeTab}
                type="button"
                className="inline-flex items-center justify-center p-3 rounded-md text-black hover:text-gray-600 transition duration-300"
                aria-controls="mobile-menu"
                aria-expanded={tabStatus["Home"]}
              >
                <span className="sr-only">홈</span>
                {tabStatus["Home"] ? (
                  <GoHomeFill className="w-[28px] h-[28px] group-hover:w-[30px] group-hover:h-[30px] transition-all duration-150" />
                ) : (
                  <GoHome className="w-[28px] h-[28px] group-hover:w-[30px] group-hover:h-[30px] transition-all duration-150" />
                )}
              </button>
            </div>
            <div className="group w-12 h-12 inline-flex items-center justify-center">
              <button
                onClick={toggleExploreTab}
                type="button"
                className="inline-flex items-center justify-center p-3 rounded-md text-black hover:text-gray-600 transition duration-300"
                aria-controls="mobile-menu"
                aria-expanded={tabStatus["Explore"]}
              >
                <span className="sr-only">탐색</span>
                {tabStatus["Explore"] ? (
                  <FaCompass className="w-[24px] h-[24px] group-hover:w-[26px] group-hover:h-[26px] transition-all duration-150" />
                ) : (
                  <FaRegCompass className="w-[24px] h-[24px] group-hover:w-[26px] group-hover:h-[26px] transition-all duration-150" />
                )}
              </button>
            </div>
            <div className="group w-12 h-12 inline-flex items-center justify-center">
              <button
                onClick={toggleSearchTab}
                type="button"
                className="inline-flex items-center justify-center p-3 rounded-md text-black hover:text-gray-600 transition duration-300"
                aria-controls="mobile-menu"
                aria-expanded={tabStatus["Search"]}
              >
                <span className="sr-only">검색</span>
                {tabStatus["Search"] ? (
                  <IoSearch className="w-[26px] h-[26px] stroke-[20px] group-hover:w-[28px] group-hover:h-[28px] transition-all duration-150" />
                ) : (
                  <IoSearch className="w-[26px] h-[26px] group-hover:w-[28px] group-hover:h-[28px] transition-all duration-150" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
