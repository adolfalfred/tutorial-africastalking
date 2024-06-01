"use client";

import { ReportOptions } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";

interface TypeFilterProps {}

const TypeFilter: FC<TypeFilterProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showSort, setShowSort] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const options = ["All", ...ReportOptions];

  const selecting = (value: any) => {
    setSelected(value);
    setTimeout(() => {
      setShowSort(false);
    }, 0);
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    selected &&
      router.push(pathname + "?" + createQueryString("type", selected));
  }, [createQueryString, pathname, router, selected]);

  return (
    <>
      <Button
        onClick={() => setShowSort(true)}
        className="w-20 md:w-[120px] text-xs truncate text-secondary dark:text-white bg-secondary/30 rounded-lg h-8"
      >
        {selected ? selected : "Report Type"}
      </Button>
      <AnimatePresence>
        {showSort && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/10 dark:bg-black/5 cursor-pointer"
              onClick={() => setShowSort(false)}
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "fit-content" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute z-50 top-24 md:top-10 bg-slate-200 dark:bg-black w-28 shadow-xl dark:shadow-md dark:shadow-neutral-800 rounded-lg overflow-hidden"
            >
              {options.length > 0 && (
                <>
                  {options.map((header) => (
                    <button
                      key={header}
                      className="w-full py-2 px-3 text-xs cursor-pointer bg-secondary/30 truncate hover:text-secondary dark:hover:text-white hover:underline transition"
                      onClick={() => selecting(header)}
                    >
                      {header}
                    </button>
                  ))}
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default TypeFilter;
