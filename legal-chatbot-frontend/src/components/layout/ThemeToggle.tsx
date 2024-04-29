"use client";

import { useEffect, useState } from "react";
import { LuMoonStar } from "react-icons/lu";
import { FiSun } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { CHANGE_THEME } from "@/app/api/user-config/user-config";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  /*  const changeTheme = (flag:string) => {
    const res: any = await CHANGE_THEME(theme , session!.userConfig.theme);
    
    if (res.status !== 200) {
      return;
    }
  } */

  if (!mounted)
    return (
      <div className="bg-gray-300 rounded-full dark:bg-gray-600 w-16 h-8"></div>
    );

  if (resolvedTheme === "dark") {
    return (
      <div
        className="relative w-16 h-8 flex items-center bg-gray-900 cursor-pointer rounded-full p-1"
        onClick={() => setTheme("light")}
      >
        <div
          className="absolute bg-medium w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
          style={{ left: "2px" }}
        ></div>
        <FiSun className="ml-auto text-yellow-400" size={18} />
      </div>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <div
        className="relative w-16 h-8 flex items-center bg-blue-400 cursor-pointer rounded-full p-1"
        onClick={() => setTheme("dark")}
      >
        <LuMoonStar className="text-white" size={18} />
        <div
          className="absolute bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
          style={{ right: "2px" }}
        ></div>
      </div>
    );
  }
};
export default ThemeToggle;
