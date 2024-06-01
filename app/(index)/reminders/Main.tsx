"use client";

import { FC, useState } from "react";
import Table from "@/components/Table";
import { deletion } from "./actions";
import { toast } from "react-hot-toast";
import EditForm from "./EditForm";
import { useRouter } from "next/navigation";

interface MainProps {
  headers: any[];
  data: any[];
}

const Main: FC<MainProps> = (props) => {
  const router = useRouter();
  const { headers, data } = props;

  const [editId, setEditId] = useState<any | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const deletionAction = async (id: string) => {
    const res = await deletion(id);
    if (res?.error) {
      if (typeof res.error === "string") toast.error(res.error);
      if (
        res?.attribute &&
        Array.isArray(res.attribute) &&
        res.attribute.includes("auth")
      )
        router.push(`/login?order=asc`);
      else toast.error("A server error occured!");
    } else {
      toast.success(`Reminder deleted sucessfully`);
    }
  };

  return (
    <>
      <Table
        headers={headers}
        data={data}
        setEditId={setEditId}
        setEditOpen={setEditOpen}
        deletion={deletionAction}
        up
      />
      <EditForm
        editId={editId}
        setEditId={setEditId}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </>
  );
};

export default Main;
