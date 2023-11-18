"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/app/(client)/_components/providers/theme-provider";
import { EdgeStoreProvider } from "@/app/_lib/edgestore";
// import { TooltipProvider } from "@/component/tooltip";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <EdgeStoreProvider>
        <Toaster />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </EdgeStoreProvider>
    </SessionProvider>
  );
};

export default Providers;
