import { useTheme } from "next-themes";
import { useState } from "react";
import { CgFileDocument } from "react-icons/cg";
import { HiMiniXMark } from "react-icons/hi2";
import { FaEye } from "react-icons/fa";

const File = ({
  pdf,
  onRemoveFile,
  index,
}: {
  pdf: string;
  onRemoveFile: (index: number) => void;
  index: number;
}) => {
  const [isHoveredCross, setIsHoveredCross] = useState(false);
  const [isHoveredView, setIsHoveredView] = useState(false);
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex flex-col justify-between items-center p-4 m-4 order border dark:border-white rounded dark:bg-light border-gray-300">
      <div className="flex flex-row items-center">
        <CgFileDocument size={50} color="grey" />
        <div className="flex ml-10">
          <div
            className="cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-very_dark p-2 rounded-lg"
            onMouseEnter={() => setIsHoveredCross(true)}
            onMouseLeave={() => setIsHoveredCross(false)}
            onClick={() => onRemoveFile(index)}
          >
            <HiMiniXMark
              color={
                isHoveredCross
                  ? resolvedTheme === "dark"
                    ? "white"
                    : "black"
                  : "grey"
              }
              size={20}
            />
          </div>
          <div
            className="cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-very_dark p-2 rounded-lg"
            onMouseEnter={() => setIsHoveredView(true)}
            onMouseLeave={() => setIsHoveredView(false)}
          >
            <FaEye
              color={
                isHoveredView
                  ? resolvedTheme === "dark"
                    ? "white"
                    : "black"
                  : "grey"
              }
              size={20}
            />
          </div>
        </div>
      </div>
      <div>
        <label className="text-xs mt-4">{pdf}</label>
      </div>
    </div>
  );
};

export default File;
