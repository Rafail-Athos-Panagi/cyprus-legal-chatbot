"use client";

import useScreenSize from "@/app/hooks/use-screen-size";
import { useTheme } from "next-themes";
import { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import FilesInterface from "../UI/FilesInterface";
import { v4 as uuidv4 } from "uuid";
import { QueryData } from "@/app/lib/interfaces/QueryData";
import { NEW_CHAT } from "@/app/api/auth/model/model";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const TextAreaResponsiveNew = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { resolvedTheme } = useTheme();
  const [files, setFiles] = useState<File[]>([]);
  const [query, setQuery] = useState<string>("");
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  /*  const isMobile = useScreenSize({ screenSize: 640 }); */

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setUploadLoading(true);
    e.preventDefault();

    const randomId = uuidv4();

    const queryData = {
      token: session!.backendTokens.access_token,
      query: query,
      chatID: randomId,
    } as QueryData;

    const res: any = await NEW_CHAT(queryData);
    if (res !== 200) {
      setTimeout(() => {
        setUploadLoading(false);
      }, 2000);
      return;
    } else {
      setTimeout(() => {
        setQuery("");
        router.push(`/chat-homepage/${randomId}`);
      }, 1000);
      setTimeout(() => {
        setUploadLoading(false);
      }, 2000);
    }

    /* setUploadLoading(true);  
    if (!files.length) return;

    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`${file.name}`, file);
    });

    await fetch("/api/files-upload", {
      method: "POST",
      body: formData,
    });

    setFiles([]);

    setUploadLoading(false); */
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    const newFiles = selectedFiles.filter(
      (file) => !files.some((f) => f.name === file.name && f.size === file.size)
    );

    setFiles([...files, ...newFiles]);
  };

  const removeFileHandler = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const readFileContent = async (file: File) => {
    return new Promise<string | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string | null;
        resolve(content);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  return (
    <form className="2xl:mx-0 md:mx-10 mx-2" onSubmit={submitHandler}>
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>
      <div className="flex items-center px-3 py-2 rounded-lg bg-gray-100 dark:bg-very_dark bg-gray-200 dark:bg-very_dark">
        <label
          htmlFor="file-upload"
          className="inline-flex items-center cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 p-2 rounded-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FaFileAlt
            className="text-gray-500 cursor-pointer"
            size={20}
            color={
              isHovered
                ? resolvedTheme === "dark"
                  ? "white"
                  : "black"
                : "grey"
            }
          />
          <input
            id="file-upload"
            className="sr-only"
            type="file"
            onChange={handleFileChange}
            multiple
          />
        </label>
        {/*  <button
          type="button"
          className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
            />
          </svg>
          <span className="sr-only">Add emoji</span>
        </button> */}
        <textarea
          id="chat"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          rows={4}
          className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-light dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          placeholder="Your message..."
          style={{
            resize: "none",
            scrollbarWidth: "thin",
            msScrollbarTrackColor: "very_dark",
            scrollbarColor: "very_dark",
            WebkitOverflowScrolling: "touch",
          }}
        ></textarea>
        {uploadLoading && (
          <button className="inline-flex justify-center bg:transparent">
            <div
              className="dark:text-sky-400/100 text:dark inline-block mt-12 p-3.5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          </button>
        )}
        {!uploadLoading && (
          <button
            type="submit"
            className="inline-flex justify-center mt-12 p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            onClick={() => readFileContent}
          >
            <svg
              className="w-5 h-5 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
            <span className="sr-only">Send message</span>
          </button>
        )}
      </div>
      {files.length > 0 && files && (
        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-very_dark mt-6">
          <FilesInterface files={files} onRemoveFiles={removeFileHandler} />
        </div>
      )}
    </form>
  );
};

export default TextAreaResponsiveNew;
