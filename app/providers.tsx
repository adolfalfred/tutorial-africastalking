"use client";

import { NextUIProvider } from "@nextui-org/react";
// import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { StateProvider } from "./context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // <SessionProvider>
    <StateProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <NextUIProvider>
          <Toaster />
          {children}
        </NextUIProvider>
      </ThemeProvider>
    </StateProvider>
    // </SessionProvider>
  );
}
