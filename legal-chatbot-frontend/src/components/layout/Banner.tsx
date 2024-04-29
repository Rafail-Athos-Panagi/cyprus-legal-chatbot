"use client";

import { useUserContext } from "@/app/context/UserContext";

const Banner = () => {
  const { isGreek } = useUserContext();

  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden dark:bg-very_dark px-6 py-2.5 sm:px-3.5 sm:before:flex-1 h-30 md:h-16 border-t border-slate-400 sm:h-22">
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      ></div>
      <div
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      ></div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 flex-col">
        <p className="text-xs leading-6 dark:text-white text-gray-900 sm:text-sm">
          <strong className="font-semibold">
            {isGreek ? "Πνευματικά δικαιώματα ©" : "Copyright 2024 ©"}
          </strong>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            aria-hidden="true"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          {isGreek
            ? "Νομοθετικές γνώσεις της Κύπρου. Όλα τα δικαιώματα διατηρούνται."
            : "Cyprus Legislative Insights. All Rights Reserved."}
        </p>
        <p className="text-xs leading-6 dark:text-white text-gray-900 sm:text-sm">
          {isGreek
            ? " Δημιουργήθηκε από τον Ραφαήλ Άθω Παναγή."
            : "Created by Raphael Athos Panayi"}
        </p>
        {/* <Link
          href="/register"
          className="flex-none rounded-full bg-[#1F262E] border border-slate-700 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          <span>Register now</span>
        </Link> */}
      </div>
      <div className="flex flex-1 justify-end"></div>
    </div>
  );
};

export default Banner;
