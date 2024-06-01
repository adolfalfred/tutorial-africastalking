import { FC } from "react";
import NavLink from "@/components/NavLink";
import AsideGlobal from "@/components/Aside";
import { BiCategoryAlt } from "react-icons/bi";
import { usePathname } from "next/navigation";
import {
  MdOutlinePsychology,
  MdOutlineSupervisorAccount,
  MdPendingActions,
} from "react-icons/md";
import { LiaSmsSolid } from "react-icons/lia";
import { IoBookOutline } from "react-icons/io5";
import { FaCommentSms, FaRegUser } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";

interface SidePanelProps {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

const SidePanel: FC<SidePanelProps> = ({ isMobile, setIsMobile }) => {
  const path = usePathname();

  return (
    <AsideGlobal isMobile={isMobile} setIsMobile={setIsMobile}>
      <NavLink
        url={`/`}
        isMobile={isMobile}
        dashboard
        icon={
          <RxDashboard
            size={27}
            className={`${
              path === `/` ? "text-white/90" : "text-secondary"
            } dark:text-white`}
          />
        }
      >
        DASHBOARD
      </NavLink>
      <NavLink
        url={"/reminders"}
        isMobile={isMobile}
        icon={
          <BiCategoryAlt
            size={28}
            className={`${
              path.includes("/reminders") ? "fill-white/90" : "fill-secondary"
            } dark:fill-white`}
          />
        }
      >
        REMINDERS
      </NavLink>
      <NavLink
        url={"/types"}
        isMobile={isMobile}
        icon={
          <BiCategoryAlt
            size={28}
            className={`${
              path.includes("/types") ? "fill-white/90" : "fill-secondary"
            } dark:fill-white`}
          />
        }
      >
        TYPES
      </NavLink>
    </AsideGlobal>
  );
};

export default SidePanel;
