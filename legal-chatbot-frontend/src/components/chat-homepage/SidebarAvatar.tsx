"use client";

import { useSession } from "next-auth/react";

const SidebarAvatar = ({ open }: any) => {
  const { data: session } = useSession();

  return (
    <div
      className={`flex min-w-0 gap-x-4 mt-7 items-center dark:hover:bg-medium rounded-md border hover:bg-blue-100 border-gray-100 dark:border-none hover:border-blue-500 rounded cursor-pointer ${
        open && "px-4"
      }`}
    >
      <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300 ">
          {session!.user.name.charAt(0).toUpperCase()}
          {session!.user.surname.charAt(0).toUpperCase()}
        </span>
      </div>
      {open && (
        <div className="min-w-0 flex-auto">
          <p className="text-sm truncate font-semibold leading-6 dark:text-gray-300 text-gray-600">
            {session!.user.name} {session!.user.surname}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {session!.user.email}
          </p>
        </div>
      )}
    </div>
  );
};

export default SidebarAvatar;
