"use client";

import { BsRobot } from "react-icons/bs";
import Avatar from "./Avatar";
import { useRouter } from "next/navigation";

const ChatInterface = ({ text, title, special, file, loadingResult }: any) => {
  const router = useRouter();

  const downloadFile = () => {
    try {
      window.open(file, "_blank");
    } catch (e) {
      return;
    }
  };

  if (loadingResult) {
    return (
      <>
        <div className="flex flex-row items-center w-full p-10 justify-center">
          {special ? (
            <BsRobot
              className="dark:text-blue-900 block mr-4 mb-16"
              size={30}
            />
          ) : (
            <Avatar />
          )}
          <div className="flex flex-col xl:w-1/2 w-full">
            <h3 className="font-bold mb-4 ml-8">{title}</h3>
            <div className="p-8 rounded-lg dark:bg-very_dark shadow-lg bg-gray-100">
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-4"></div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-4"></div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-4"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-row items-center w-full p-10 justify-center">
      {special ? (
        <BsRobot className="dark:text-blue-900 block mr-4 mb-16" size={30} />
      ) : (
        <Avatar />
      )}
      <div className="flex flex-col xl:w-1/2 w-full">
        <h3 className="font-bold mb-4 ml-8">{title}</h3>
        <div className="p-8 rounded-lg dark:bg-very_dark shadow-lg border border-gray-100 dark:border-none border-blue-500 bg-blue-100">
          {file && <button onClick={downloadFile}>OPEN FILE</button>}

          <span className="text-base dark:text-white text-sm">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
