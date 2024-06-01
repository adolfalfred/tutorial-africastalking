"use client";

import SearchForm from "./SearchForm";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import SelectSort from "./SelectSort";
import { Button } from "@nextui-org/react";

interface FilterProps {
  headers: any[];
  placeholder: string;
  ord?: string;
  children?: ReactNode;
}

const Filter: FC<FilterProps> = (props) => {
  const { headers, placeholder, ord, children } = props;

  const [refresh, setRefresh] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [order, setOrder] = useState(ord || "asc");
  const [selected, setSelected] = useState({ head: "", value: "" });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const ordering = () => {
    if (order === "asc") {
      setOrder("desc");
    } else setOrder("asc");
  };

  useEffect(() => {
    router.push(pathname + "?" + createQueryString("sort", selected.value));
  }, [createQueryString, pathname, router, selected.value]);

  useEffect(() => {
    router.push(pathname + "?" + createQueryString("order", order));
  }, [createQueryString, order, pathname, router]);

  useEffect(() => {
    if (refresh) {
      router.push(pathname + "?" + createQueryString("page", "1"));
      setRefresh(false);
    }
  }, [createQueryString, pathname, refresh, router]);

  const action = async (e: FormData) => {
    const param = e.get("search")?.toString() || "";
    router.push(pathname + "?" + createQueryString("s", param));
    setRefresh(true);
  };

  return (
    <div className="w-full flex space-x-1 xs:space-x-2 pb-2 items-center justify-between">
      <div className="flex items-center h-8 space-x-1 xs:space-x-2">
        {children ? (
          children
        ) : (
          <SelectSort
            headers={headers}
            showSort={showSort}
            setSelected={setSelected}
            setShowSort={setShowSort}
            selected={selected}
          />
        )}
        <Button
          type="button"
          onClick={ordering}
          className="w-12 xl:w-14 text-xs text-secondary dark:text-white bg-secondary/30 rounded-lg h-8"
        >
          {order.charAt(0).toUpperCase() + order.slice(1)}
        </Button>
      </div>
      <div className="flex items-center rounded-lg overflow-hidden h-8">
        <SearchForm
          action={action}
          className="w-60 md:w-72 lg:w-80 xl:w-96"
          placeholder={`Search ${placeholder}`}
        />
      </div>
    </div>
  );
};

export default Filter;
