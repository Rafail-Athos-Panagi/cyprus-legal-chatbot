"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useUserContext } from "@/app/context/UserContext";

const LanguageToggle = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { isGreek, changeIsGreek } = useUserContext();
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

  if (isGreek) {
    return (
      <div
        className="relative w-16 h-8 flex items-center dark:bg-gray-900 bg-blue-400 cursor-pointer rounded-full p-1"
        onClick={() => changeIsGreek(false)}
      >
        <div
          className="absolute bg-white dark:bg-medium w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
          style={{ left: "2px" }}
        ></div>
        <Image
          src="/flags/united_kingdom_round_icon_64.png"
          alt="united_kingdom_flag_icon"
          width={30}
          height={30}
          className="ml-auto"
        />
        {/* <GiGreekTemple className="ml-auto text-yellow-400" size={18} /> */}
      </div>
    );
  }

  if (!isGreek) {
    return (
      <div
        className="relative w-16 h-8 flex items-center dark:bg-gray-900 bg-blue-400 cursor-pointer rounded-full p-1"
        onClick={() => changeIsGreek(false)}
      >
        <Image
          src="/flags/greece_round_icon_64.png"
          alt="greece_flag_icon"
          width={30}
          height={30}
        />
        {/*  <FaFlagUsa className="text-white" size={18} /> */}
        <div
          className="absolute bg-white dark:bg-medium w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
          style={{ right: "2px" }}
        ></div>
      </div>
    );
  }
};
export default LanguageToggle;
