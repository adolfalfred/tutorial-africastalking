"use server";

import axios from "axios";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";
// import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export default async function updateAction(
  model: string,
  id: string,
  req: any,
  query?: string
) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) redirect("/login?order=asc");

    const { data } = await axios.put(
      `${process.env.BACKEND_URL}/${model}/${id}?${query}`,
      req
    );
    revalidateTag(`get-${model}-${id}`);
    return data;
  } catch (error: any) {
    if (error.response?.data) return error.response.data;
    else return { error: "Network error!" };
  }
}
