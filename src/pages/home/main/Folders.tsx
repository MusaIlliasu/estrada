import { useState } from "react";
import Dropdown from "../../components/Dropdown";
import FolderCard from "./FolderCard";
import { Plus } from "@phosphor-icons/react";
import { toast } from "react-toastify";

const Folders = () => {
    const [filter, setFilter] = useState("Today");
    const folders = [
        {
            title: "Product Review",
            date: "1/15/2025",
            bgColor: "#FFE2E8",
            iconColor: "#D5768A"
        },
        {
            title: "Product Review",
            date: "1/15/2025",
            bgColor: "#EBE8FF",
            iconColor: "#A9A2D8"
        },
        {
            title: "Product Review",
            date: "1/15/2025",
            bgColor: "#FFFEE2",
            iconColor: "#B0AC57"
        },
        {
            title: "Product Review",
            date: "1/15/2025",
            bgColor: "#FFE2E8",
            iconColor: "#D5768A"
        }
    ];

    return (
        <>
            <div className="w-full flex justify-between items-center gap-4 text-xs md:text-sm flex-wrap mb-6">
                <div className="flex justify-start items-center gap-1">
                    <span>Filter:</span>
                    <Dropdown 
                        selected={filter}
                        handleChange={(val) => setFilter(val as string)}
                        options={["Today", "This week", "This month"]}
                        className="w-max whitespace-nowrap"
                    />
                </div>

                <button onClick={() => toast.info("Coming soon...")} className="flex justify-start items-center gap-2 rounded transition-all duration-300 bg-primary text-white hover:-translate-y-1 py-2 px-4">
                    <Plus size={18} weight="bold" className="" />
                    <span>Add Folder</span>
                </button>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {
                    folders.map((folder, index) => (
                        <FolderCard 
                            key={index}
                            title={folder.title}
                            date={folder.date}
                            bgColor={folder.bgColor}
                            iconColor={folder.iconColor}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default Folders;