"use client";

import Sidebar from "@/components/chat-homepage/Sidebar";
import { SidebarMobilePanel } from "@/components/chat-homepage/SidebarMobilePanel";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import useScreenSize from "./hooks/use-screen-size";
import { SidebarSkeleton } from "@/components/chat-homepage/SidebarSkeleton";
import { usePathname } from "next/navigation";

const NavigationApp = ({ children }: any) => {
  const { data: session, status } = useSession();
  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const isMobile = useScreenSize({ screenSize: 768 });
  const pathname = usePathname();

  const changeToFalse = () => {
    setOpenPanel(false);
  };

  const SidebarMobileRender = openPanel ? (
    <SidebarMobilePanel openSide={openPanel} changeState={changeToFalse} />
  ) : (
    <div className="bg-transparent p-4 fixed top-15 left-0 z-50">
      <BsArrowLeftShort
        className="bg-white text-3xl rounded-full border border-black cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-medium dark:text-white rotate-180"
        onClick={() => setOpenPanel(true)}
      ></BsArrowLeftShort>
    </div>
  );

  return (
    <div className="flex">
      {!isMobile &&
      status === "loading" &&
      pathname.startsWith("/chat-homepage") ? (
        <SidebarSkeleton />
      ) : null}
      {session &&
        pathname.startsWith("/chat-homepage") &&
        (isMobile ? SidebarMobileRender : <Sidebar />)}
      <main className="flex-grow: 1 w-full dark:bg-light">{children}</main>
    </div>
  );
};

export default NavigationApp;
