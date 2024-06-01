"use client";

import { Button } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";

interface SelectSortProps {
  headers: any[];
  showSort: boolean;
  selected: { head: string; value: string };
  setSelected: (selected: { head: string; value: string }) => void;
  setShowSort: (selected: boolean) => void;
}

const SelectSort: FC<SelectSortProps> = (props) => {
  const { headers, showSort, selected, setSelected, setShowSort } = props;

  const selecting = (value: any) => {
    setSelected(value);
    setTimeout(() => {
      setShowSort(false);
    }, 0);
  };

  return (
    <>
      <Button
        onClick={() => setShowSort(true)}
        onKeyDown={() => setShowSort(true)}
        className="w-20 md:w-[120px] text-xs truncate text-secondary dark:text-white bg-secondary/30 rounded-lg h-8"
      >
        {selected.value ? selected.head : "Sort by"}
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
              {headers.length > 0 && (
                <>
                  {headers.map((header) => (
                    <button
                      key={header.value}
                      className="w-full py-2 px-3 text-xs cursor-pointer bg-secondary/30 truncate hover:text-secondary dark:hover:text-white hover:underline transition ring-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      onClick={() => selecting(header)}
                    >
                      {header.head}
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

export default SelectSort;
