import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";

interface Props {
    selected: string | number;
    handleChange: (val: string | number) => void;
    options: string[] | number[];
    className?: string;
    label?: string;
    optionOffset?: string;
}

const Dropdown = ({ selected, options, label, className, optionOffset, handleChange }: Props) => {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <>
            {label ? <p className="mb-1">{label}</p> : null}
            <div tabIndex={0} onBlur={() => setTimeout(() => setShowOptions(false), 200)} onClick={() => setShowOptions(!showOptions)}
                className={`w-full py-2 px-4 border rounded outline-none focus:border-primary transition-colors flex justify-between items-center gap-4 cursor-pointer ${className}`}>
                <span className="capitalize">{selected || "Select option"}</span>
                <CaretDown size={20} className={` transition-all duration-300 ${showOptions ? "-rotate-180" : ""} `} />

                {
                    showOptions ? (
                        <ul className={`w-full min-w-max max-h-[200px] overflow-y-auto border bg-white absolute left-0 ${optionOffset ?? "top-10"} p-4 z-10`}>
                            {
                                options.map((option, index) => (
                                    <li key={option} onClick={() => handleChange(option)}
                                        className={`capitalize ${selected === option ? "bg-primary text-white" : "hover:bg-gray-100"} py-2 px-4 ${(options.length) - 1 !== index ? "mb-1" : ""}`}>
                                        {option}
                                    </li>
                                ))
                            }
                        </ul>
                    ) : null
                }
            </div>
        </>
    )
}

export default Dropdown;