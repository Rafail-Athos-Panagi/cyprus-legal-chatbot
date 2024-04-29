"use client"

import React, { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import useScreenSize from "@/app/hooks/use-screen-size";

const MainNavigation = () => {
  const isMobile = useScreenSize({ screenSize: 640 });
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex justify-between items-center mx-auto px-4 text-white dark:border-none border border-bottom-blue-200 ${
        isSticky ? "sticky top-0 bg-white dark:bg-dark_blue" : ""
      } bg-white dark:bg-dark_blue z-1`}
    >
      <h1 className="w-full text-4xl font-bold text-black dark:text-white">
        LEGINET
      </h1>
      <ul className="flex dark:text-white text-gray-900">
        <div className="p-3">
          <LanguageToggle />
        </div>
        <div className="p-3">
          <ThemeToggle />
        </div>
      </ul>
    </div>
  );
};

export default MainNavigation;
