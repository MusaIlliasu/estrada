import { DotsThreeOutline, Folder } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
    title: string;
    date: string;
    bgColor: string;
    iconColor: string;
}

const FolderCard = ({title, date, bgColor, iconColor}: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div style={{backgroundColor: bgColor}} className="w-full min-h-[150px] rounded-2xl bg-gray-300 p-5">
        <div className="flex justify-between items-start gap-4 flex-wrap mb-10">
            <Folder size={40} weight="fill" color={iconColor} />

            <div tabIndex={0} onBlur={() => setTimeout(() => setShowMenu(false), 200)} onClick={() => setShowMenu(!showMenu)} className="inline-block">
                <DotsThreeOutline size={20} weight="fill" className="cursor-pointer" />

                {
                    showMenu ? (
                        <div className="w-max border bg-white absolute top-5 -right-4 p-2 z-10">
                            <Link to="#" className="block py-2 px-4 hover:bg-gray-100 hover:text-primary">Edit</Link>
                            <Link to="#" className="block py-2 px-4 hover:bg-gray-100 hover:text-primary">Delete</Link>
                        </div>
                    ) : null
                }
            </div>
        </div>

        <h2 className="font-bold text-lg md:text-xl mb-2">{title}</h2>
        <p className="text-xs">{date}</p>
    </div>
  )
}

export default FolderCard;