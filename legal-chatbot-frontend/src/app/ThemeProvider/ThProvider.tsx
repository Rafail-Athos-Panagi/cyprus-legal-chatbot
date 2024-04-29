"use client";

import { ThemeProvider } from "next-themes";
/* import { useSession } from "next-auth/react"; */

const ThProvider = ({ children }: { children: React.ReactNode }) => {
  /* const { data: session } = useSession();

  console.log(session); */
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default ThProvider;
