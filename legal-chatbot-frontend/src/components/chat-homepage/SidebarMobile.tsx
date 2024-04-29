"use client";

import { useUserContext } from "@/app/context/UserContext";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillEnvironment } from "react-icons/ai";
import { BsArrowLeftShort, BsChevronDown, BsSearch } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import ProfileSkeleton from "./profile/ProfileSkeleton";
import SidebarAvatar from "./SidebarAvatar";
import { signOut, useSession } from "next-auth/react";
import { LOG_OUT } from "@/app/api/auth/auth";
import { useRouter } from "next/navigation";
import { FiPlusCircle } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { useTheme } from "next-themes";
import { GET_CHAT_TITLES } from "@/app/api/auth/model/model";

const SidebarMobile = ({ closePanel }: any) => {
  const [submenuOpen, setSubmenuOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const { isGreek } = useUserContext();
  const { data: session, status } = useSession();
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const [chats, setChats] = useState<[]>([]);

  useEffect(() => {
    const getChats = async () => {
      setChats(await GET_CHAT_TITLES(session!.backendTokens.access_token));
    };

    if (status === "authenticated") {
      getChats();
    }

    const interval = setInterval(() => {
      if (status === "authenticated") {
        getChats();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [session]);

  const logOutHandler = async () => {
    const result = await LOG_OUT(session!.backendTokens.access_token);
    if (result.status === 200) {
      router.push("http://localhost:3000/login");
    } else {
      console.log(result.status);
    }
    await signOut({ redirect: false });
  };

  const Menus: any = [
    {
      title: `${isGreek ? "Συνομιλίες" : "Conversations"}`,
      icon: <IoChatbubbleEllipses />,
      id: "conversations",
      submenu: chats.length > 0 ? true : false,
    },
    {
      title: `${isGreek ? "Προφίλ" : "Profile"}`,
      spacing: true,
      icon: <CgProfile />,
      id: "profile",
    },
    {
      title: `${isGreek ? "Αποσύνδεση" : "Logout"}`,
      icon: <AiOutlineLogout />,
      id: "logOut",
    },
  ];

  return (
    <div
      className={`p-5 pt-8 h-full bg-white dark:bg-very_dark border-r border-r-gray-900 w-72 duration-300 relative`}
    >
      <BsArrowLeftShort
        className="bg-white text-3xl rounded-full absolute -right-3 top-9 border border-black cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-medium dark:text-white"
        onClick={() => closePanel()}
      ></BsArrowLeftShort>
      <div className="inline-flex">
        <h1
          className={`text-black origin-left font-medium text-2xl duration-300 dark:text-white ${
            !open && "scale-0"
          }`}
        >
          Leginet
        </h1>
      </div>
      <button
        className={`flex justify-center items-center bg-white rounded-md mt-6 dark:bg-light w-full dark:hover:bg-medium border border-black dark:border-none ${
          !open ? "px-2.5" : "px-4"
        } py-2`}
        onClick={() => {
          router.push("/chat-homepage");
          closePanel();
        }}
      >
        <FiPlusCircle
          className={`text-white text-lg block float-left cursor-pointer ${
            open && "mr-4"
          } `}
          size={20}
          color={resolvedTheme === "dark" ? "white" : "black"}
        ></FiPlusCircle>
        <span className="dark:text-gray-300">{`${isGreek ? "Νέα Συνομιλία" : "New Chat"}`}</span>
      </button>
      <ul
        className="pt-2 overflow-y-auto max-h-[440px] overflow-x-hidden"
        style={{
          scrollbarWidth: "thin",
          msScrollbarTrackColor: "very_dark",
          scrollbarColor: "very_dark",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {Menus.map((menu: any, index: number) => (
          <React.Fragment key={index}>
            <li
              className={`dark:text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 dark:hover:bg-medium border hover:bg-blue-100 border-gray-100 dark:border-none hover:border-blue-500 rounded-md ${
                menu.spacing ? "mt-9" : "mt-2"
              }`}
              onClick={() => {
                if (menu.submenu) {
                  setSubmenuOpen(!submenuOpen);
                }

                if (menu.id === "logOut") {
                  logOutHandler();
                }

                if (menu.id === "profile") {
                  router.push("/chat-homepage/profile");
                }

                if (menu.id !== "conversations") {
                  closePanel();
                }
              }}
            >
              <span className="text-2xl block float-left">
                {menu.icon ? menu.icon : <RiDashboardFill />}
              </span>
              <span
                className={`text-base font-medium flex-1 ${!open && "hidden"}`}
              >
                {menu.title}
              </span>
              {menu.submenu && open && (
                <BsChevronDown
                  className={`${submenuOpen && "rotate-180"}`}
                ></BsChevronDown>
              )}
            </li>
            {menu.submenu && submenuOpen && open && (
              <ul>
                {chats.map((submenuItem: any, subIndex: number) => (
                  <li
                    onClick={() => {
                      router.push(`/chat-homepage/${submenuItem.chatStoreKey}`);
                      closePanel();
                    }}
                    key={subIndex}
                    className="text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 mt-2 dark:hover:bg-medium rounded-md border hover:bg-blue-100 border-gray-100 dark:border-none hover:border-blue-500 dark:text-gray-300"
                  >
                    {submenuItem.title}
                  </li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
      {status === "loading" ? (
        <ProfileSkeleton />
      ) : (
        <SidebarAvatar open={open} />
      )}
    </div>
  );
};

export default SidebarMobile;
