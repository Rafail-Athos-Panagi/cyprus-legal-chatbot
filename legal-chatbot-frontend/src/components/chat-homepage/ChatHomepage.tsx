"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import TextAreaResponsive from "../input-field/TextAreaResponsive";
import ChatInterface from "./ChatInterface";
import { useSession } from "next-auth/react";
import { GET_CHAT } from "@/app/api/auth/model/model";
import { usePathname } from "next/navigation";
import LoadingPage from "@/app/loading";

interface chatHistoryType {
  role: string;
  content: string;
  file?: any;
}

const ChatHomepage = () => {
  const [chatHistory, setChatHistory] = useState<chatHistoryType[]>([]);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [loadingResult, setLoadingResult] = useState<boolean>(false);

  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const scrollDown = () => {
    if (scrollableDivRef.current) {
      const scrollableDiv = scrollableDivRef.current;
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
  };

  useEffect(() => {
    const lastPart = pathname.substring(pathname.lastIndexOf("/") + 1);

    const getChats = async () => {
      setChatHistory(
        await GET_CHAT(session!.backendTokens.access_token, lastPart)
      );
    };
    if (status === "authenticated") getChats();
  }, [status , loadingResult]);

  const addQueryHandler = (query: string) => {
    setLoadingResult(true);
    const newQueryObject = {
      role: "user",
      content: query,
    };

    const newTempResult = {
      role: "assistant",
      content: "",
    };
    const newChatHistory = [...chatHistory, newQueryObject, newTempResult];
    setChatHistory(newChatHistory);
    scrollDown();
  };

  const addResultHandler = (result: string, fileUrlDownload: any) => {
    /* ψonst newChatHistory = [...chatHistory];
    
    newChatHistory.pop()

    const newResultObject = {
      role: "assistant",
      content: result,
      file: fileUrlDownload,
    };

    const newResultHistory = [...newChatHistory , newResultObject]

    setChatHistory(newResultHistory); */
    setLoadingResult(false);
    scrollDown();
  };

  if (status === "loading") {
    return (
      <>
        <div className="flex flex-row items-center w-full p-10 justify-center">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
          <div className="flex flex-col xl:w-1/2 w-full">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-1/4 mb-6"></div>
            <div className="p-8 rounded-lg dark:bg-very_dark shadow-lg bg-gray-100">
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-4"></div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-4"></div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-4"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center w-full p-10 justify-center">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
          <div className="flex flex-col xl:w-1/2 w-full">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-1/4 mb-6"></div>
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
    <div className="min-h-86vh">
      <div
        ref={scrollableDivRef}
        className="overflow-y-auto max-h-[615px] overflow-x-hidden"
        style={{
          resize: "none",
          scrollbarWidth: "thin",
          msScrollbarTrackColor: "very_dark",
          scrollbarColor: "very_dark",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div>
          <Suspense fallback={<LoadingPage />}>
            {chatHistory.map((chat, index) => {
              const special = chat.role === "assistant" ? true : false;
              const title =
                chat.role === "assistant"
                  ? "Legal Bot"
                  : session!.user.name + " " + session!.user.surname;
              return (
                <ChatInterface
                  key={index}
                  title={title}
                  text={chat.content}
                  special={special}
                  status={status}
                  file={chat.file}
                  loadingResult={
                    chatHistory.length - 1 === index && loadingResult && special
                  }
                />
              );
            })}
          </Suspense>
        </div>
      </div>
      {chatHistory.length !== 0 && (
        <div className="flex justify-center items-center">
          <TextAreaResponsive
            onAddQuery={addQueryHandler}
            onAddResult={addResultHandler}
          />
        </div>
      )}
    </div>
  );
};

export default ChatHomepage;
