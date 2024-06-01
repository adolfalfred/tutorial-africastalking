"use client";

import { Button } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";

interface TableProps {
  headers: any[];
  data: any[];
  deletion: (id: string) => void;
  setEditId: (id: any) => void;
  setEditOpen: (editOpen: boolean) => void;
  up?: boolean;
  deletable?: boolean;
  editable?: boolean;
  delName?: string;
}

const Table: FC<TableProps> = (props) => {
  const {
    headers,
    data,
    deletion,
    setEditId,
    setEditOpen,
    up = false,
    deletable = true,
    editable = true,
    delName,
  } = props;

  const [open, setOpen] = useState(false);
  const [temp, setTemp] = useState<string | null>(null);

  const editOpener = (value: any) => {
    setEditId(value);
    setTimeout(() => {
      setEditOpen(true);
    }, 0);
  };

  const deleteOpener = (value: string) => {
    setTemp(value);
    setTimeout(() => {
      setOpen(true);
    }, 0);
  };

  return (
    <>
      <div className="overflow-auto rounded-xl text-xs xl:text-sm table-height transition-all">
        <table className="min-w-full text-black/80 dark:text-white/70">
          <motion.thead
            animate={{ opacity: 1 }}
            className="sticky z-[1] top-0 bg-secondary/70 text-white"
          >
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="py-2 px-4 text-left whitespace-nowrap"
                >
                  {header.head}
                </th>
              ))}
              {(editable || deletable) && (
                <th className="py-2 px-4 text-center whitespace-nowrap">
                  Actions
                </th>
              )}
            </tr>
          </motion.thead>
          <AnimatePresence>
            <motion.tbody
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "fit-content" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <AnimatePresence>
                {data &&
                  data.map((value, rowIndex) => (
                    <motion.tr
                      initial={{ height: 0 }}
                      animate={{ height: "fit-content" }}
                      exit={{ height: 0 }}
                      key={rowIndex}
                      className="bg-gray-400/70 dark:bg-gray-700/30 hover:bg-gray-400/90 transition dark:hover:bg-gray-700/10"
                    >
                      {headers.map((header, colIndex) => (
                        <td
                          key={colIndex}
                          className={`${up && "align-top"} py-2 px-4`}
                        >
                          {value[header.value]}
                        </td>
                      ))}
                      {(editable || deletable) && (
                        <td
                          key={rowIndex}
                          className={`${
                            up && "align-top"
                          } py-2 px-4 whitespace-nowrap`}
                        >
                          {editable && (
                            <Button
                              size="sm"
                              variant="solid"
                              onClick={() => editOpener(value)}
                              className="w-16 h-6 mr-0.5 text-emerald-600 dark:text-green-600 bg-gray-300 dark:bg-black/60 hover:bg-gray-300 hover:dark:bg-white/20 transition"
                            >
                              Edit
                            </Button>
                          )}
                          {deletable && (
                            <Button
                              type="button"
                              size="sm"
                              variant="solid"
                              onClick={() => deleteOpener(value._id)}
                              className="w-16 h-6 ml-0.5 text-rose-600 dark:text-rose-400 bg-gray-300 dark:bg-black/60 hover:bg-gray-300 hover:dark:bg-white/20 transition"
                            >
                              {delName || "Delete"}
                            </Button>
                          )}
                        </td>
                      )}
                    </motion.tr>
                  ))}
              </AnimatePresence>
            </motion.tbody>
          </AnimatePresence>
        </table>
      </div>
      <AnimatePresence>
        {open && temp && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/20 dark:bg-black/5 cursor-pointer backdrop-blur-md dark:backdrop-blur-xl"
              onClick={() => setOpen(false)}
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, top: 0 }}
              animate={{ opacity: 1, top: "40%" }}
              exit={{ opacity: 0, top: 0 }}
              className="absolute z-50 bg-gray-400 dark:bg-gray-900 text-white rounded-xl shadow-xl p-3 md:p-5 max-h-[94vh] h-fit w-[90vw] md:w-[500px] transform -translate-x-1/2 -translate-y-1/2 top-[40%] left-1/2 overflow-auto"
            >
              <h2 className="text-center text-lg md:text-2xl text-primary/90 dark:text-white font-semibold mb-2">
                Delete?
              </h2>
              <p className="my-4 text-center font-semibold dark:font-normal">
                Are you sure you want to {delName || "delete"}?
              </p>
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  size="sm"
                  className="w-28 bg-primary/70 font-semibold text-white"
                  onClick={() => {
                    deletion(temp);
                    setOpen(false);
                  }}
                >
                  {delName || "Delete"}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="bordered"
                  className="w-28 text-white"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Table;
