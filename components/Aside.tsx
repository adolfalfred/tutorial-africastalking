"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FC, ReactNode } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import Logo from "../public/logo.webp";
import { Divider } from "@nextui-org/react";
// import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
// import Account from "./Account";

interface AsideGlobalProps {
  children: ReactNode;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

const AsideGlobal: FC<AsideGlobalProps> = (props) => {
  const path = usePathname();
  const { isMobile, setIsMobile, children } = props;
  // const { data } = useSession();

  return (
    <>
      <AnimatePresence>
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 block lg:hidden"
            onClick={() => setIsMobile(!isMobile)}
          ></motion.div>
        )}
      </AnimatePresence>
      <aside
        className={`${
          isMobile
            ? "w-0 md:w-12"
            : "lg:-mr-4 rounded-r-3xl w-3/4 sm:w-1/2 lg:w-72 2xl:w-80 bg-neutral-100 dark:bg-dark lg:bg-inherit dark:lg:bg-inherit"
        } h-full overflow-visible transition-all duration-200 shrink-0 absolute left-0 lg:left-auto lg:relative z-50 flex flex-col`}
      >
        <button
          onClick={() => setIsMobile(!isMobile)}
          title="Menu"
          aria-label="Menu"
          className={`group absolute transition hover:scale-110 top-5 ${
            isMobile
              ? "-right-10 md:right-2 bg-light dark:bg-gray-700/30 md:bg-slate-200 dark:md:bg-black"
              : "right-5 bg-light dark:bg-gray-700/40"
          } rounded-full ring-secondary ring-offset-gray-200 dark:ring-offset-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
        >
          <GiHamburgerMenu
            className={`m-2 transition fill-secondary/90 dark:fill-white/90`}
          />
        </button>
        <AnimatePresence>
          {!isMobile && (
            <motion.div
              initial={{ scale: 0, opacity: 0, height: 0 }}
              animate={{ scale: 1, opacity: 1, height: "fit-content" }}
              exit={{ scale: 0, opacity: 0, height: 0 }}
              transition={{ duration: 0.15, type: "tween" }}
              className="w-full h-fit"
            >
              <div className="pt-14 flex flex-col items-center">
                <div className="w-36 h-fit rounded-full">
                  <Image
                    src={Logo}
                    alt="logo"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover object-center"
                    priority
                  />
                </div>
                <p className="text-lg font-bold my-2 text-center">Re-mind</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <nav
          className={`w-full ${
            isMobile ? "pt-20 bg-gray-400 dark:bg-dark" : "pr-2 pt-5"
          } overflow-y-auto overflow-x-hidden transition-all duration-200 h-full flex flex-col justify-between`}
        >
          <div
            className={`${
              !isMobile &&
              "rounded-xl pt-10 h-fit bg-gray-400 dark:bg-gray-700/30 mx-2.5"
            } transition-all`}
          >
            <div
              className={`${
                isMobile ? "hidden" : "border-t border-secondary h-2 mx-3"
              } transition-all`}
            ></div>
            {children}
          </div>
          <div
            className={`${
              !isMobile
                ? "mt-2 block rounded-t-xl pb-5 h-fit bg-gray-400 dark:bg-gray-700/30 mx-2.5"
                : "bg-inherit dark:bg-inherit"
            } transition-all relative`}
          >
            <div
              className={`-mt-7 mb-2 flex items-center justify-center transition`}
            >
              <div
                className={`rounded-full ${
                  isMobile
                    ? "p-0 bg-inherit mb-4"
                    : "bg-slate-200 dark:bg-neutral-950 p-2"
                }`}
              >
                {/* {data?.user ? (
                  <Account
                    user={data.user}
                    isMobile={isMobile}
                    callbackUrl={path}
                  />
                ) : null} */}
              </div>
            </div>
            <Divider
              className={`${isMobile ? "bg-inherit" : "bg-secondary"}`}
            />
          </div>
        </nav>
      </aside>
    </>
  );
};

export default AsideGlobal;
