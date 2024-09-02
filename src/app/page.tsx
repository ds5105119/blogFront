"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import NavBar from "@/components/navbar/navBar";
import { AuthType } from "@/types/auth";
import { getAuth } from "@/lib/authToken";
import NavbarCol from "@/components/navbar/navBarCol";

const Editor = dynamic(
  () => import("@/components/editor/initializedMDXEditor"),
  {
    ssr: false,
  },
);

export default function Home() {
  const currentTab = {
    Home: true,
  };

  const [isClient, setIsClient] = useState(false);
  const [auth, setAuth] = useState<AuthType | null>(null);

  useEffect(() => {
    setIsClient(true);
    setAuth(getAuth());
  }, []);

  return (
    <main className="flex h-dvh items-center justify-between">
      <NavbarCol currentTab={currentTab}></NavbarCol>

      <div className="flex flex-col w-full"></div>
    </main>
  );
}
