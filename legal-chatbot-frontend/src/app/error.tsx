"use client";

import { useUserContext } from "./context/UserContext";

const ErrorPage = () => {
  const { isGreek } = useUserContext();

  return (
    <main className="relative flex flex-col items-center justify-center min-h-86vh overflow-hidden dark:bg-light">
      <h1 className="dark:bg-light text-[#3399FF] text-8xl">
        {isGreek ? "Εμφανίστηκε σφάλμα!" : "An error has occurred!"}
      </h1>
      <p className="dark:text-gray-300 text-2xl mt-4">
        {isGreek
          ? "Προσπαθήστε να ξαναφορτώσετε τη σελίδα ή προσπαθήστε ξανά αργότερα"
          : "Try to reload the page or try again later"}
      </p>
    </main>
  );
};

export default ErrorPage;
