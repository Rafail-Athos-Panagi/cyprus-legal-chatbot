"use client";

import { useUserContext } from "./context/UserContext";

const NotFoundPage = () => {
  const { isGreek } = useUserContext();

  return (
    <main className="relative flex flex-col items-center justify-center min-h-86vh overflow-hidden dark:bg-light">
      <h1 className="dark:bg-light text-[#3399FF] text-8xl">
        {isGreek ? "Δεν βρέθηκε" : "Not Found"}
      </h1>
      <p className="dark:text-gray-300 text-2xl mt-4">
        {isGreek
          ? "Δυστυχώς, δεν μπορέσαμε να βρούμε τη σελίδα ή τον πόρο που ζητήθηκε."
          : "Unfortunately, we could not find the requested page or resource."}
      </p>
    </main>
  );
};

export default NotFoundPage;
