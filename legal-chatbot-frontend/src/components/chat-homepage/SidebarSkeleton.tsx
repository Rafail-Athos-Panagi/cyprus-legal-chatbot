import React from "react";
import ProfileSkeleton from "./profile/ProfileSkeleton";

export const SidebarSkeleton = () => {
  const Menus: any = [
    { title: "Dashboard" },
    {
      title: "Conversations",
      submenu: true,
      submenuItems: [
        { title: "Submenu1" },
        { title: "Submenu2" },
        { title: "Submenu3" },
        { title: "Submenu1" },
        { title: "Submenu2" },
        { title: "Submenu3" },
        { title: "Submenu1" },
        { title: "Submenu2" },
        { title: "Submenu3" },
      ],
    },
    { title: "Analytics" },
    { title: "Inbox" },
    { title: "Profile", spacing: true },
    {
      title: "Logout",
    },
  ];

  return (
    <div
      className={`p-5 pt-8 min-h-86vh dark:bg-very_dark border-r border-r-gray-900 w-72 duration-300 relative`}
    >
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
      <div className="inline-flex">
        <h1 className="text-white origin-left font-medium text-2xl duration-300">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        </h1>
      </div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
      <ul
        className="pt-2 overflow-y-auto max-h-[550px] overflow-x-hidden"
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
              className={`dark:text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 dark:hover:bg-medium rounded-md hover:bg-light ${
                menu.spacing ? "mt-9" : "mt-2"
              }`}
            >
              <span className="text-2xl block float-left"></span>
              <span className="text-base font-medium flex-1">
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              </span>
            </li>
          </React.Fragment>
        ))}
      </ul>
      <ProfileSkeleton />
    </div>
  );
};
