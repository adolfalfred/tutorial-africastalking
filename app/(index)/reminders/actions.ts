"use server";

import deleteAction from "@/actions/delete";
import postAction from "@/actions/post";
import updateAction from "@/actions/update";
import { revalidateTag } from "next/cache";

export const deletion = async (id: string) => {
  const res = await deleteAction("reminder", id);
  if (!res?.error) {
    revalidateTag(`reminder`);
    revalidateTag(`reminders`);
    revalidateTag(`reminder-${id}`);
    revalidateTag(`reminders-${id}`);
    revalidateTag(`reports-write-${id}`);
    if (res?.guardian && Array.isArray(res.guardian)) {
      res.guardian.forEach((g: string) => {
        revalidateTag(`user-guardian-${g}`);
      });
    }
  }
  return res;
};

export const posting = async (req: any) => {
  const res = await postAction("reminder", req);
  if (!res?.error) {
    revalidateTag("reminder");
    revalidateTag("reminders");
    revalidateTag(`reminder-${res?._id}`);
    revalidateTag(`reminders-${res?._id}`);
    revalidateTag(`reports-write-${res?._id}`);
    if (res?.guardian && Array.isArray(res.guardian)) {
      res.guardian.forEach((g: string) => {
        revalidateTag(`user-guardian-${g}`);
      });
    }
  }
  return res;
};

export const updating = async (id: string, req: any) => {
  const res = await updateAction("reminder", id, req);
  if (!res?.error) {
    revalidateTag("reminder");
    revalidateTag("reminders");
    revalidateTag(`reminder-${id}`);
    revalidateTag(`reminders-${id}`);
    revalidateTag(`reports-write-${id}`);
    if (res?.guardian && Array.isArray(res.guardian)) {
      res.guardian.forEach((g: string) => {
        revalidateTag(`user-guardian-${g}`);
      });
    }
  }
  return res;
};
