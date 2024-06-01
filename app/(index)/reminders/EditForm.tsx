"use client";

import { FC, useEffect, useState } from "react";
import { updating } from "./actions";
import { toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Checkbox, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { BsFillCheckCircleFill } from "react-icons/bs";
import getAction from "@/actions/get";
import TypeProps from "@/types/type";

interface EditFormProps {
  editId: any | null;
  setEditId: (editId: any | null) => void;
  editOpen: boolean;
  setEditOpen: (editOpen: boolean) => void;
}

const EditForm: FC<EditFormProps> = (props) => {
  const router = useRouter();
  const { editId, setEditId, editOpen, setEditOpen } = props;
  const [isSelected, setIsSelected] = useState(false);

  const [type, setType] = useState<string[]>([]);
  const [types, setTypes] = useState<TypeProps[] | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      const guard = await getAction("type", "limit=1000");
      if (!guard?.error) setTypes(guard?.data);
    };
    fetcher();
  }, []);

  const setTypeFxn = (id: string) => {
    if (type.includes(id)) {
      const newArray = type.filter((item) => item !== id);
      setType(newArray);
    } else setType([...type, id]);
  };

  const action = async (e: FormData) => {
    const title = e.get("title")?.toString();
    const description = e.get("description")?.toString();
    const time = e.get("time")?.toString();
    const day = e.get("day")?.toString();
    const res = await updating(editId._id, {
      title,
      description,
      time,
      day,
      repeats: isSelected ? "true" : "false",
      type,
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
      toast.success(`Reminder updated sucessfully`);
      setEditOpen(false);
    }
  };

  useEffect(() => {
    setIsSelected(editId?.repeats === "true" ? true : false);
    setType(editId?.type || []);
  }, [editId]);

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
                Edit Reminder Data
              </h2>
              <div className="mb-5 overflow-auto">
                <div className="w-full p-1 mt-4">
                  <Input
                    label="TITLE"
                    id="title"
                    name="title"
                    onChange={(e) =>
                      setEditId({ ...editId, title: e.target.value })
                    }
                    value={editId.title}
                  />
                </div>
                <div className="w-full p-1 mt-4">
                  <Textarea
                    label="DESCRIPTION"
                    id="description"
                    name="description"
                    onChange={(e) =>
                      setEditId({ ...editId, description: e.target.value })
                    }
                    value={editId.description}
                  />
                </div>
                <div className="w-full p-1 mt-4 flex gap-2">
                  <Input
                    label="DAY"
                    type="date"
                    id="day"
                    name="day"
                    onChange={(e) =>
                      setEditId({ ...editId, day: e.target.value })
                    }
                    value={editId.day}
                  />
                  <Input
                    label="TIME"
                    type="time"
                    id="time"
                    name="time"
                    onChange={(e) =>
                      setEditId({ ...editId, time: e.target.value })
                    }
                    value={editId.time}
                  />
                </div>
                <div className="w-full p-1 mt-2">
                  <p className="text-neutral-100 text-sm pb-1 dark:text-neutral-400 px-2">
                    SELECT TYPE
                  </p>
                  <div className="max-h-40 overflow-auto flex justify-between flex-wrap">
                    {types ? (
                      <>
                        {types.length > 0 ? (
                          <>
                            {types.map((pst) => (
                              <div
                                key={pst._id}
                                onClick={() => setTypeFxn(pst._id)}
                                className={`w-full cursor-pointer active:scale-95 transition rounded-full py-1 px-2 mb-1 flex justify-between space-x-2 items-center ${
                                  type.length > 0 && type.includes(pst._id)
                                    ? "bg-secondary/70 text-white"
                                    : "text-neutral-600 dark:text-neutral-400 bg-white dark:bg-zinc-800 hover:bg-white/80 hover:dark:bg-zinc-500/90"
                                }`}
                              >
                                <p className="w-7/12">{pst?.name}</p>
                                {type.length > 0 && type.includes(pst._id) ? (
                                  <BsFillCheckCircleFill className="fill-success shrink-0" />
                                ) : (
                                  <BsFillCheckCircleFill className="fill-neutral-500 dark:fill-black shrink-0" />
                                )}
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className="rounded-xl bg-white/90 dark:bg-zinc-800 flex items-center justify-center p-4 w-full h-24">
                            <p className="mx-auto w-fit text-secondary">
                              No type accounts found!
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="rounded-xl bg-white/70 dark:bg-zinc-800 flex items-center justify-center animate-pulse p-4 w-full h-24">
                        <p className="mx-auto w-fit italic text-secondary">
                          Loading...
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full p-1 mt-4">
                  <Checkbox
                    defaultSelected
                    isSelected={isSelected}
                    onValueChange={setIsSelected}
                    size="md"
                  >
                    REPEATS
                  </Checkbox>
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
