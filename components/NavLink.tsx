import Link from "next/link";
import { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Tooltip } from "@nextui-org/react";

interface NavLinkProps {
  children: string;
  url: string;
  icon: ReactNode;
  isMobile: boolean;
  dashboard?: boolean;
}

const NavLink: FC<NavLinkProps> = (props) => {
  const { children, url, icon, isMobile, dashboard } = props;

  const path = usePathname();
  const link = url.split("?")[0];

  let mobile;
  if (dashboard) mobile = path === link;
  else mobile = path.startsWith(link);

  return (
    <Tooltip
      showArrow
      isDisabled={!isMobile}
      placement="right"
      content={
        <Link href={url} className="p-2 w-40">
          {children}
        </Link>
      }
      className="bg-secondary text-white"
      classNames={{
        base: ["before:bg-secondary dark:before:bg-secondary"],
      }}
    >
      <Link
        href={url}
        className={`group ${
          mobile
            ? "bg-secondary/80"
            : "bg-gray-400/0 dark:bg-gray-700/0 hover:bg-slate-200/60 hover:dark:bg-black"
        } flex items-center transition-colors ${
          isMobile
            ? "rounded-lg justify-center h-11 mx-0.5"
            : "rounded-full h-8 text-sm w-full"
        } active:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-secondary/70 dark:ring-secondary`}
      >
        <div className={`${isMobile ? "hidden md:block scale-90" : "hidden"}`}>
          {icon}
        </div>
        <p
          className={`${
            isMobile ? "hidden" : "block"
          } w-full text-center transition-none ${mobile && "text-white"}`}
        >
          {children}
        </p>
      </Link>
    </Tooltip>
  );
};

export default NavLink;
