"use client";

import { GET_FILE, QUERY_CHAT } from "@/app/api/auth/model/model";
import { QueryData } from "@/app/lib/interfaces/QueryData";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { MdOutlineInput } from "react-icons/md";
import { MdCancel } from "react-icons/md";
interface Props {
  onAddQuery: (query: string) => void;
  onAddResult: (result: string , fileUrlDownload: any) => void;
}

const TextAreaResponsive: React.FC<Props> = ({ onAddQuery, onAddResult }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { resolvedTheme } = useTheme();
  const [files, setFiles] = useState<File[]>([]);
  const [query, setQuery] = useState<string>("");
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setUploadLoading(true);
    e.preventDefault();

    const lastPart = pathname.substring(pathname.lastIndexOf("/") + 1);

    const queryData = {
      token: session!.backendTokens.access_token,
      query: query,
      chatID: lastPart,
    } as QueryData;

    onAddQuery(query);
    const res: any = await QUERY_CHAT(queryData);
    setQuery("");
    console.log(res.response_data.file_name)
    const res1: any = await GET_FILE(res.response_data.file_name , session!.backendTokens.access_token);
    onAddResult(res.response_data.response , res1);
    setUploadLoading(false);
    /* if (res.responseStatus !== 200) {
      setTimeout(() => {
        setUploadLoading(false);
      }, 2000);
      return;
    } else {
      setTimeout(() => {
        console.log(res.response_data.response)
        onAddResult(res.response_data.response)        
        setQuery("");
      }, 1000);
      setTimeout(() => {
        setUploadLoading(false);
      }, 2000);
    } */

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
    <form
      className="ml-4 mr-4 2xl:mx-0 xl:w-3/5 w-full mb-8 md:mb-8"
      onSubmit={submitHandler}
    >
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>
      <div className="flex items-center px-3 py-2 rounded-lg bg-gray-200 dark:bg-very_dark">
        <label
          htmlFor="file-upload"
          className="inline-flex items-center cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 p-2 rounded-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FaFileAlt
            className="text-gray-500 cursor-pointer"
            style={{ color: isHovered ? "black" : "grey" }}
            size={20}
          />
          <input id="file-upload" className="sr-only" type="file" />
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
          value={query}
          onChange={(e: any) => setQuery(e.target.value)}
          rows={3}
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
    </form>
  );
};

export default TextAreaResponsive;
