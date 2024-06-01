"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginatorProps {
  page: string | string[];
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

const Paginator: FC<PaginatorProps> = (props) => {
  const { page, totalPages, hasPrevPage, hasNextPage } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minNum, setMinNum] = useState<number>(1);
  const [maxNum, setMaxNum] = useState<number>(5);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      //@ts-ignore
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleChangePage = (direction: boolean) => {
    const pg = searchParams.get("page");
    const next = pg ? parseInt(pg) : 1;
    if (direction && hasNextPage) {
      const param = String(next + 1);
      router.push(pathname + "?" + createQueryString("page", param));
    }
    if (!direction && hasPrevPage) {
      const param = String(next - 1);
      router.push(pathname + "?" + createQueryString("page", param));
    }
  };

  if (maxNum > totalPages) setMaxNum(totalPages);
  const buttons: ReactNode[] = [];

  useEffect(() => {
    if (totalPages > 5 && Number(page) >= 3) {
      if (totalPages === Number(page) + 1) setMinNum(Number(page) - 3);
      else if (totalPages === Number(page)) setMinNum(Number(page) - 4);
      else setMinNum(Number(page) - 2);
      setMaxNum(Number(page) + 2);
    }
  }, [page, totalPages]);

  for (let i = minNum; i <= maxNum; i++) {
    buttons.push(
      <button
        key={i}
        className={`py-1 px-2 h-full rounded-md border-2 ${
          Number(page) === i
            ? "bg-secondary/80 dark:bg-secondary text-white border-secondary/30 dark:border-secondary hover:bg-secondary/50 dark:hover:bg-secondary/70 hover:border-secondary/10 dark:hover:border-secondary/20"
            : "bg-inherit border-gray-700/0 hover:border-secondary hover:dark:border-secondary"
        }`}
        onClick={() => {
          const param = String(i);
          router.push(pathname + "?" + createQueryString("page", param));
        }}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="w-full p-3 md:p-4 flex flex-col items-center justify-center">
      <div className="flex items-center rounded-lg shadow dark:shadow-none bg-gray-700/30 overflow-hidden transition">
        <button
          disabled={!hasPrevPage}
          onClick={() => handleChangePage(false)}
          className="group hover:bg-secondary/80 active:bg-secondary active:dark:bg-secondary transition hover:disabled:bg-inherit hover:disabled:dark:bg-inherit disabled:cursor-not-allowed disabled:opacity-20"
        >
          <IoIosArrowBack
            size={35}
            className="text-black dark:text-white group-hover:text-white group-active:text-black group-active:dark:text-black p-2"
          />
        </button>
        <div className="text-center h-full">{buttons}</div>
        <button
          disabled={!hasNextPage}
          onClick={() => handleChangePage(true)}
          className="group hover:bg-secondary/80 active:bg-secondary active:dark:bg-secondary transition hover:disabled:bg-inherit hover:disabled:dark:bg-inherit disabled:cursor-not-allowed disabled:opacity-20"
        >
          <IoIosArrowForward
            size={35}
            className="text-black dark:text-white group-hover:text-white group-active:text-black group-active:dark:text-black p-2"
          />
        </button>
      </div>
      <p className="text-sm mt-1">
        <span className="text-[9px] md:text-xs">page</span>{" "}
        <span className="text-xs md:text-base font-semibold dark:font-normal text-primary dark:text-light">
          {page}
        </span>{" "}
        <span className="text-xs md:text-base font-semibold dark:font-normal">
          /
        </span>{" "}
        <span className="text-xs md:text-base font-semibold dark:font-normal text-primary dark:text-light">
          {totalPages}
        </span>{" "}
        <span className="text-[9px] md:text-xs">pages</span>
      </p>
    </div>
  );
};

export default Paginator;
