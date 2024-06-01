"use server";

import postAction from "@/actions/post";
import updateAction from "@/actions/update";
import { revalidateTag } from "next/cache";
import getOneAction from "@/actions/getOne";

export async function fetchAdditional(
  model: string,
  id: string,
  returned: string,
  returned2?: string
) {
  const res = await getOneAction(model, id);
  if (res?.error) return "Error!";
  if (
    res &&
    res.hasOwnProperty(returned) &&
    res[returned] !== null &&
    res[returned] !== undefined &&
    res[returned] !== ""
  )
    return res[returned];
  else if (
    returned2 &&
    res &&
    res.hasOwnProperty(returned2) &&
    res[returned2] !== null &&
    res[returned2] !== undefined &&
    res[returned2] !== ""
  )
    return res[returned2];
  else return "Not Found!";
}

export async function fetchClientName(id: string) {
  const res = await getOneAction("client", id);
  if (res?.error) return "Error!";
  if (res)
    return res?.middleName
      ? `${res?.firstName} ${res?.middleName} ${res?.lastName}`
      : `${res?.firstName} ${res?.lastName}`;
  else return "Not Found!";
}

export async function postAdditional(
  model: string,
  req: any,
  returned: string,
  returned2?: string
) {
  const res = await postAction(model, req);
  if (
    res &&
    res.hasOwnProperty(returned) &&
    res[returned] !== null &&
    res[returned] !== undefined &&
    res[returned] !== ""
  )
    return res[returned];
  else if (
    returned2 &&
    res &&
    res.hasOwnProperty(returned2) &&
    res[returned2] !== null &&
    res[returned2] !== undefined &&
    res[returned2] !== ""
  )
    return res[returned2];
  else return "Error!";
}

export async function updateAdditional(
  model: string,
  id: string,
  req: any,
  returned: string,
  returned2?: string
) {
  const res = await updateAction(model, id, req);
  if (
    res &&
    res.hasOwnProperty(returned) &&
    res[returned] !== null &&
    res[returned] !== undefined
  )
    return res[returned];
  else if (
    returned2 &&
    res &&
    res.hasOwnProperty(returned2) &&
    res[returned2] !== null &&
    res[returned2] !== undefined
  )
    return res[returned2];
  else return "Error!";
}

export async function revalidator(url: string) {
  revalidateTag(url);
}
