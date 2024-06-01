"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { posting } from "./actions";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Form: FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const action = async (e: FormData) => {
    const name = e.get("name")?.toString();
    const res = await posting({
      name,
    });
    if (res?.error) {
      if (typeof res.error === "string") toast.error(res.error);
      if (
        res?.attribute &&
        Array.isArray(res.attribute) &&
        res.attribute.includes("auth")
      )
        router.push(`/login?order=asc`);
      if (typeof res.error !== "string") toast.error("A server error occured!");
    } else {
      toast.success(`${res?.name} added sucessfully`);
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant="solid"
        className="w-20 absolute top-5 left-3 md:left-5 h-8 font-semibold text-secondary dark:text-white bg-secondary/30"
        onClick={() => setOpen(true)}
      >
        Add
      </Button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/10 dark:bg-black/5 cursor-pointer backdrop-blur-md dark:backdrop-blur-xl"
              onClick={() => setOpen(false)}
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, right: "-100%" }}
              animate={{ opacity: 1, right: 0 }}
              exit={{ opacity: 0, right: "-100%" }}
              className="fixed top-0 bottom-0 z-50 bg-gray-400 dark:bg-gray-900 text-white shadow-xl rounded-l-2xl dark:shadow-none p-2 md:p-4 h-full w-[90vw] md:w-[500px] xl:w-[600px] overflow-auto"
            >
              <form action={action} className="w-full mt-8 mb-2">
                <h2 className="text-center text-lg md:text-2xl text-primary/90 dark:text-white font-semibold mb-2">
                  Add Type
                </h2>
                <div className="mb-5 overflow-auto">
                  <div className="w-full p-1 mt-4 relative">
                    <Input
                      label="NAME"
                      id="name"
                      type="text"
                      name="name"
                      required
                    />
                  </div>
                </div>
                <div className="p-1">
                  <Button
                    type="submit"
                    size="sm"
                    className="w-full h-10 bg-secondary text-white"
                  >
                    ADD
                  </Button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Form;
