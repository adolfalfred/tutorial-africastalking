"use server";

import axios from "axios";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";
// import { redirect } from "next/navigation";

export default async function getAction(model: string, q: string) {
  // const session = await getServerSession(authOptions);
  // if (!session) redirect("/login?order=asc");

  try {
    const { data } = await axios.get(
      `${process.env.BACKEND_URL}/${model}?${q}`
    );
    return data;
  } catch (error: any) {
    if (error.response?.data) return error.response.data;
    else return { error: "Network error!" };
  }
}
