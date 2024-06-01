import TypeProps from "@/types/type";
import { notFound, redirect } from "next/navigation";
import { convertISOToReadable } from "@/lib/utils";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";
import Paginator from "@/components/Paginator";
import Filter from "@/components/Filter";
import Form from "./Form";
import Main from "./Main";

export default async function Type({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const limit = searchParams["limit"] ?? "20";
  const search = searchParams["s"] ?? "";
  const sort = searchParams["sort"] ?? "updatedAt";
  const order = searchParams["order"] ?? "asc";

  //   const session = await getServerSession(authOptions);
  //   if (
  //     !session ||
  //     !session?.user?.token ||
  //     !session?.user?.type ||
  //     session?.user?.type !== "admin"
  //   )
  //     redirect("/login");

  async function fetchType() {
    const res = await fetch(
      `${process.env.BACKEND_URL}/type?s=${search}&sort=${sort}&order=${order}&limit=${limit}&page=${page}`,
      {
        cache: "force-cache",
        next: {
          tags: ["type"],
        },
      }
    );
    if (!res.ok) return undefined;
    return res.json();
  }

  const typeData = await fetchType();
  if (!typeData) return notFound();
  const count = typeData.count;
  const totalPages = typeData.totalPages;
  const hasPrevPage = typeData.hasPrevPage;
  const hasNextPage = typeData.hasNextPage;
  const types: TypeProps[] = typeData.data;

  const filters = [
    {
      head: "Name",
      value: "name",
    },
    {
      head: "Date Created",
      value: "createdAt",
    },
    {
      head: "Date Updated",
      value: "updatedAt",
    },
  ];

  const headers = [
    {
      head: "No.",
      value: "id",
    },
    {
      head: "Name",
      value: "name",
    },
    {
      head: "Date Created",
      value: "createdAt",
    },
    {
      head: "Date Updated",
      value: "updatedAt",
    },
  ];

  const start = (Number(page) - 1) * Number(limit) + 1;

  //@ts-ignore
  const data: TypeProps[] = await Promise.all(
    types.map(async (type, index) => ({
      ...type,
      id: String(index + start),
      createdAt: convertISOToReadable(type.createdAt),
      updatedAt: convertISOToReadable(type.updatedAt),
    }))
  );

  return (
    <>
      <header className="h-12 pt-20 md:pt-0 flex items-center justify-between w-full px-3 md:px-5 relative">
        <Filter headers={filters} placeholder="Type" />
      </header>
      <main className="w-full h-[calc(100vh-48px)] p-3 md:p-5 relative">
        <h1 className="text-center text-lg md:text-xl xl:text-2xl text-primary/70 font-bold">
          TYPES
        </h1>
        <Form />
        {count && count > 0 ? (
          <>
            <p className="text-center text-sm">
              Total ={" "}
              <span className="text-black dark:text-white font-bold">
                {count}
              </span>
            </p>
            <Main headers={headers} data={data} />
          </>
        ) : (
          <p
            className="text-center pt-20 text-primary text-shadow"
            style={{ textShadow: "0px 0px 1px gray" }}
          >
            No results found!
          </p>
        )}
        {totalPages > 1 && (
          <Paginator
            page={page}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
        )}
      </main>
    </>
  );
}
