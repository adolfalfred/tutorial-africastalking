"use client";

import { FC } from "react";
import { updating } from "./actions";
import { toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface EditFormProps {
  editId: any | null;
  setEditId: (editId: any | null) => void;
  editOpen: boolean;
  setEditOpen: (editOpen: boolean) => void;
}

const EditForm: FC<EditFormProps> = (props) => {
  const router = useRouter();
  const { editId, setEditId, editOpen, setEditOpen } = props;

  const action = async (e: FormData) => {
    const name = e.get("name")?.toString();
    const res = await updating(editId._id, {
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
      toast.success(`${res.name} updated sucessfully`);
      setEditOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {editOpen && editId && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/10 dark:bg-black/5 cursor-pointer backdrop-blur-md dark:backdrop-blur-xl"
            onClick={() => setEditOpen(false)}
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, right: "-100%" }}
            animate={{ opacity: 1, right: 0 }}
            exit={{ opacity: 0, right: "-100%" }}
            className="fixed top-0 bottom-0 z-50 bg-gray-400 dark:bg-gray-900 text-white shadow-xl rounded-l-2xl dark:shadow-none p-2 md:p-4 h-full w-[90vw] md:w-[500px] xl:w-[600px] overflow-auto"
          >
            <form action={action} className="w-full mt-8 mb-2">
              <h2 className="text-center text-lg md:text-2xl text-primary/90 dark:text-white font-semibold mb-2">
                Edit Type Data
              </h2>
              <div className="mb-5 overflow-auto">
                <div className="w-full p-1 mt-4">
                  <Input
                    label="NAME"
                    id="name"
                    name="name"
                    onChange={(e) =>
                      setEditId({ ...editId, name: e.target.value })
                    }
                    value={editId.name}
                  />
                </div>
              </div>
              <div className="p-1">
                <Button
                  type="submit"
                  size="sm"
                  className="w-full h-10 bg-secondary text-white"
                >
                  EDIT
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditForm;
