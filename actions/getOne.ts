"use server";

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";
// import { redirect } from "next/navigation";

export default async function getOneAction(model: string, id: string) {
  // const session = await getServerSession(authOptions);
  // if (!session) redirect("/login?order=asc");

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/${model}/${id}`, {
      cache: "force-cache",
      next: {
        tags: [`get-${model}-${id}`],
      },
    });
    if (!res.ok) return { error: "Network error!" };
    const result = await res.json();
    if (result === null) return { error: "404: Not found!" };
    return result;
  } catch (error: any) {
    if (error.response?.data) return error.response.data;
    else return { error: "Network error!" };
  }
}
