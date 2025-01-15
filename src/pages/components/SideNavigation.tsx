import { BoxArrowDown, CalendarDots, Plus, Trash } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";

const SideNavigation = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Link to="#" className="flex justify-start items-center gap-2 mb-10">
        <Plus size={22} weight="bold" className="bg-gray-200 rounded-full p-1" />
        <span>Add Note</span>
      </Link>

      <Link to="calendar" className={`flex justify-start items-center gap-2 transition-all duration-300 mb-6 ${pathname === "/calendar" ? "py-2 px-4 bg-gray-100 text-primary" : ""}`}>
        <CalendarDots size={22} weight="regular" />
        <span>Calendar</span>
      </Link>

      <Link to="archive" className={`flex justify-start items-center gap-2 transition-all duration-300 mb-6 ${pathname === "/archive" ? "py-2 px-4 bg-gray-100 text-primary" : ""}`}>
        <BoxArrowDown size={22} weight="regular" />
        <span>Archive</span>
      </Link>

      <Link to="trash" className={`flex justify-start items-center gap-2 transition-all duration-300 mb-6 ${pathname === "/trash" ? "py-2 px-4 bg-gray-100 text-primary" : ""}`}>
        <Trash size={22} weight="regular" />
        <span>Trash</span>
      </Link>
    </>
  )
}

export default SideNavigation;