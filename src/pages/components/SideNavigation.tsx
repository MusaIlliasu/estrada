import { BoxArrowDown, CalendarDots, Plus, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NoteForm from "./NoteForm";

const SideNavigation = () => {
  const { pathname } = useLocation();
  const [showNoteForm, setShowNoteForm] = useState(false);

  return (
    <>
      {/* Add Note Form */}
      <NoteForm
          show={showNoteForm}
          handleClose={() => setShowNoteForm(false)}
      />

      <Link onClick={() => setShowNoteForm(true)} to="#" className="flex justify-start items-center gap-2 mb-8">
        <Plus size={22} weight="bold" className="bg-gray-200 rounded-full p-1" />
        <span>Add Note</span>
      </Link>

      <Link to="calendar" className={`flex justify-start items-center gap-2 transition-all duration-300 mb-6 ${pathname === "/calendar" ? "text-primary" : ""}`}>
        <CalendarDots size={22} weight="regular" />
        <span>Calendar</span>
      </Link>

      <Link to="archive" className={`flex justify-start items-center gap-2 transition-all duration-300 mb-6 ${pathname === "/archive" ? "text-primary" : ""}`}>
        <BoxArrowDown size={22} weight="regular" />
        <span>Archive</span>
      </Link>

      <Link to="trash" className={`flex justify-start items-center gap-2 transition-all duration-300 mb-6 ${pathname === "/trash" ? "text-primary" : ""}`}>
        <Trash size={22} weight="regular" />
        <span>Trash</span>
      </Link>
    </>
  )
}

export default SideNavigation;