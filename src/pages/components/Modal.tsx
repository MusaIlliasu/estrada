/* eslint-disable @typescript-eslint/no-explicit-any */
import Spinner from "./Spinner";

interface Props {
    message: string;
    show: boolean;
    loading: boolean;
    handleClose: () => void;
    handleProceed: () => void;
}

const Modal = ({show, message, loading, handleProceed, handleClose}: Props) => {
    
    const handleParentClose = (ev: any) => {
        const parentElement = ev.target as HTMLDivElement;
        if(parentElement.tagName === "DIV" && parentElement.className.includes("modal")){
            handleClose();
        }
    }

    return (
        <div onClick={handleParentClose} className={`modal w-full h-screen bg-[#33333399] backdrop-blur-sm flex justify-start md:justify-center items-center fixed top-0 left-0  ${show ? "translate-y-0" : "-translate-y-[120vh]"} cursor-pointer transition-all duration-700 p-6 z-50`}>
            <div className={`w-full md:max-w-[400px] bg-white rounded-lg cursor-default p-6 md:p-8 delay-500 transition-all duration-700 ${show ? "opacity-100" : "opacity-0"}`}>
                <h2 className="font-semibold text-center text-lg md:text-xl mb-8">{message}</h2>

                <div className="flex justify-center items-center gap-8 flex-wrap">
                    <button onClick={handleProceed} className="rounded bg-primary text-white flex justify-center items-center gap-1 py-2 px-4">
                        <span>Yes, proceed</span>
                        {loading ? <Spinner size={14} /> : null}
                    </button>
                    <button onClick={handleClose} className="rounded bg-gray-200 py-2 px-4">No, cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;