"use server";

import axios from "axios";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";
// import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export default async function deleteAction(model: string, id: string) {
  // const session = await getServerSession(authOptions);
  // if (!session) redirect("/login?order=asc");

  try {
    const { data } = await axios.delete(
      `${process.env.BACKEND_URL}/${model}/${id}`
    );
    revalidateTag(`get-${model}-${id}`);
    return data;
  } catch (error: any) {
    if (error.response?.data) return error.response.data;
    else return { error: "Network error!" };
  }
}
