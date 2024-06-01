"use client";

import { NextUIProvider } from "@nextui-org/react";
// import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // <SessionProvider>
    <ThemeProvider attribute="class" defaultTheme="light">
      <NextUIProvider>
        <Toaster />
        {children}
      </NextUIProvider>
    </ThemeProvider>
    // </SessionProvider>
  );
}
