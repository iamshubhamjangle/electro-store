"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/app/(client)/_components/providers/theme-provider";
// import { TooltipProvider } from "@/component/tooltip";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <Toaster />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
