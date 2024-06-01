import { FC } from "react";
import { CiSearch } from "react-icons/ci";
import { Input } from "@nextui-org/react";
import { cn } from "@/lib/utils";

interface SearchFormProps {
  setResults?: (results: any[]) => void;
  action?: (e: FormData) => Promise<void>;
  placeholder?: string;
  className?: string;
}

const SearchForm: FC<SearchFormProps> = (props) => {
  const { action, placeholder, className } = props;

  return (
    <form className={cn("relative w-full", className)} action={action}>
      <Input
        name="search"
        aria-label="search"
        placeholder={placeholder}
        classNames={{
          inputWrapper: [
            "bg-light dark:bg-dark",
            "data-[hover=true]:bg-gray-700/30",
            "group-data-[focus=true]:bg-gray-700/20",
          ],
        }}
      />
      <button
        type="submit"
        aria-label="Search"
        title="Search"
        className="bg-secondary/70 hover:opacity-80 transition rounded-r-lg px-2 py-1 absolute right-0 top-2"
      >
        <CiSearch color="white" size={28} />
      </button>
    </form>
  );
};

export default SearchForm;
