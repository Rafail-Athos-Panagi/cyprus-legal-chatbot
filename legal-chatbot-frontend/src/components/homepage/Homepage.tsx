"use client";

import Link from "next/link";
import { useUserContext } from "@/app/context/UserContext";

const Homepage = () => {
  const { isGreek } = useUserContext();

  return (
    <>
      <div className="dark:bg-light">
        <div className="text-center flex flex-col justify-center min-h-86vh">
          <p className="dark:text-[#ffffff] text-black font-bold p-2">
            {isGreek ? "Κυπριακή Νομοθεσία" : "Cyprus Legislation"}
          </p>
          <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6 text-[#3399FF]">
            {isGreek ? "Η Ολοκληρωμενη Τραπεζα" : "The Integrated Legal"}
          </h1>
          <div className="flex justify-center items-center text-[#3399FF]">
            <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
              {isGreek ? "Νομικης Πληροφορησης" : "Information Bank"}
            </p>
          </div>
          <p className="md:text-2xl text-xl font-bold dark:text-[#B0B8C4] text-1F262E">
            {isGreek
              ? "Απελευθέρωση του δυναμικού της νομοθετικής καινοτομίας στην Κύπρο"
              : "Unlocking the Potential of Legislative Innovation in Cyprus"}
          </p>
          <div className="flex items-center justify-center p-4">
            <Link
              href="/login"
              className="hover:bg-gray-300 text-black border border-slate-700 w-[200px] rounded-md font-medium my-6 py-3 box-shadow: rgb(11, 13, 14) px-2 dark:bg-[#1F262E] dark:text-[#DAE0E7] dark:hover:bg-gray-700"
            >
              <span>{isGreek ? "ΕΙΣΟΔΟΣ" : "LOG IN"}</span>
            </Link>
            <Link
              href="/register"
              className="hover:bg-gray-300 text-black border border-slate-700 w-[200px] rounded-md font-medium my-6 py-3 box-shadow: rgb(11, 13, 14) mx-6 dark:bg-[#1F262E] dark:text-[#DAE0E7] dark:hover:bg-gray-700"
            >
              <span>{isGreek ? "ΕΓΓΡΑΦΗ" : "REGISTER"} </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
