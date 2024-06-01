"use client";

import "../scrollbar.css";
import Aside from "./Aside";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const path = usePathname();

  const handleResize = useMemo(() => {
    return () => {
      if (window.innerWidth < 1280) setIsMobile(true);
    };
  }, []);

  useEffect(() => {
    handleResize();
  }, [handleResize, path]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <main className="w-screen h-screen bg-slate-200 dark:bg-neutral-950 relative text-black dark:text-white transition-colors">
      <div className="flex fixed inset-0 md:pl-10 lg:pl-0">
        <Aside isMobile={isMobile} setIsMobile={setIsMobile} />
        <div
          className={`flex-grow py-2 max-w-[100vw] md:max-w-[96vw] ${
            isMobile
              ? "lg:max-w-[calc(100vw-46px)]"
              : "lg:max-w-[calc(100vw-270px)] 2xl:max-w-[calc(100vw-300px)]"
          } transition-all`}
        >
          {children}
        </div>
      </div>
    </main>
  );
}
