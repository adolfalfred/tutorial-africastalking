"use server";

import axios from "axios";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";
// import { redirect } from "next/navigation";
// import { revalidateTag } from "next/cache";

export default async function postAction(
  model: string,
  req: any,
  important?: boolean
) {
  // const session = await getServerSession(authOptions);
  // if (!session && !important) redirect("/login?order=asc");

  try {
    const { data } = await axios.post(
      `${process.env.BACKEND_URL}/${model}`,
      req
    );
    // revalidateTag(`get-${model}-${data?._id}`);
    return data;
  } catch (error: any) {
    if (error.response?.data) return error.response.data;
    else return { error: "Network error!" };
  }
}
