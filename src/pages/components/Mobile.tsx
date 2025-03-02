/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, CalendarDots, BoxArrowDown, Trash } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/logo/logo.png";
import NoteForm from "./NoteForm";
import { useState } from "react";

interface Props {
    show: boolean;
    handleClose: () => void;
}

const Mobile = ({show, handleClose}: Props) => {
    const { pathname } = useLocation();
    const [showNoteForm, setShowNoteForm] = useState(false);
    
    const handleParentClose = (ev: any) => {
        const parentElement = ev.target as HTMLDivElement;
        if(parentElement.tagName === "DIV" && parentElement.className.includes("mobile")){
            handleClose();
        }
    }

    const handleNoteForm = () => {
        setShowNoteForm(true);
        handleClose();
    }

    return (
        <>
            {/* Add Note Form */}
            <NoteForm 
                show={showNoteForm}
                handleClose={() => setShowNoteForm(false)}
            />

            <div onClick={handleParentClose} className={`mobile w-full h-screen bg-[#33333399] backdrop-blur-sm fixed top-0 left-0 ${show ? "translate-x-0" : "-translate-x-[120vw]"} cursor-pointer transition-all duration-700 z-50`}>
                <div className={`w-[200px] h-screen overflow-y-auto bg-white cursor-default absolute top-0 right-0 p-4 delay-500 transition-all duration-700 ${show ? "opacity-100" : "opacity-0"} `}>
                    <Link onClick={handleClose} to="/" className="block w-full mb-10">
                        <img src={logo} alt="Logo" className="w-full h-full object-contain" loading="lazy" />
                    </Link>

                    <Link onClick={handleNoteForm} to="#" className="flex justify-start items-center gap-2 mb-6">
                        <Plus size={22} weight="bold" className="bg-gray-200 rounded-full p-1" />
                        <span>Add Note</span>
                    </Link>

                    <Link onClick={handleClose} to="calendar" className={`flex justify-start items-center gap-2 transition-all duration-300 mb-6 ${pathname === "/calendar" ? "text-primary" : ""}`}>
                        <CalendarDots size={22} weight="regular" />
                        <span>Calendar</span>
                    </Link>

                    <Link onClick={handleClose} to="archive" className={`flex justify-start items-center gap-2 transition-all duration-300 mb-6 ${pathname === "/archive" ? "text-primary" : ""}`}>
                        <BoxArrowDown size={22} weight="regular" />
                        <span>Archive</span>
                    </Link>

                    <Link onClick={handleClose} to="trash" className={`flex justify-start items-center gap-2 transition-all duration-300 mb-6 ${pathname === "/trash" ? "text-primary" : ""}`}>
                        <Trash size={22} weight="regular" />
                        <span>Trash</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Mobile;