/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, X } from "@phosphor-icons/react";
import { Note } from "../../types/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useAppDispatch } from "../../hooks/hooks";
import { addNote, updateNote } from "../../store/features/NotesReducer";
import { toast } from "react-toastify";


interface Props {
    show: boolean;
    note?: Note | null;
    handleClose: () => void;
}

interface FormProps {
    title: string;
    body: string;
}

const NoteForm = ({ show, note, handleClose }: Props) => {
    const {register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormProps>();
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    // Setting the values in case of an update, since the note is optional, 
    // the defaultValue does not work efficiently.
    useEffect(() => {

        if(note){
            setValue("title", note.title);
            setValue("body", note.body);
        }

    }, [note, setValue]);

    const handleParentClose = (ev: any) => {
        const parentElement = ev.target as HTMLDivElement;
        if(parentElement.tagName === "DIV" && parentElement.className.includes("parent")){
            reset();
            handleClose();
        }
    }

    const handleFormSubmit: SubmitHandler<FormProps> = (formData) => {
        if(loading){ return; }

        const {title, body} = formData;
        setLoading(true);

        // Update an existing note.
        if(note){
            toast.success("Note updated");
            return setTimeout(() => {
                const date = new Date().getTime();
                dispatch(updateNote({
                    ...note,
                    title,
                    body,
                    updatedAt: date
                }));
                setLoading(false);
                reset();
                return handleClose();
            }, 2000);
        }

        // Add a new note.
        toast.success("Note added");
        return setTimeout(() => {
            const date = new Date().getTime();
            dispatch(addNote({
                id: date,
                title,
                body,
                createdAt: date,
                updatedAt: date
            }));
            setLoading(false);
            reset();
            return handleClose();
        }, 2000);
    }

    const handleCancel = () => {
        reset();
        return handleClose();
    }

    return (
        <div onClick={handleParentClose} className={`parent w-full h-screen bg-[#33333399] backdrop-blur-sm flex justify-start md:justify-center items-center fixed top-0 left-0 ${show ? "translate-y-0" : "-translate-y-[120vh]"} cursor- transition-all duration-700 p-6 z-50`}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className={`w-full md:max-w-[450px] min-h-[300px] bg-white rounded-lg cursor-default p-4 md:p-6 delay-500 transition-all duration-700 ${show ? "opacity-100" : "opacity-0"} `}>
                <div className="flex justify-between items-start gap-4 mb-6">
                    <h2 className="font-semibold text-lg">New Note</h2>
                    <X size={24} weight="regular" onClick={handleClose} className="cursor-pointer hover:text-secondary transition-colors" />
                </div>
                
                <div className="mb-4">
                    <input type="text" id="title" placeholder="Enter Note Title"
                        className="w-full border-b-2 outline-none transition-all focus:border-b-primary focus:bg-gray-100 p-2"
                        // defaultValue={note?.title}
                        {...register("title", {required: true})}
                        required
                    />
                    {errors.title ? <p className="text-xs text-secondary pt-2">Title field is required</p> : null}
                </div>

                <div className="mb-4">
                    <textarea id="body" placeholder="Type Notes here..."
                        className="w-full h-[200px] outline-none resize-none focus:bg-gray-100 focus:border-primaryx p-2 transition-all"
                        // defaultValue={note?.body}
                        {...register("body", {required: true})}
                        required
                    ></textarea>
                    {errors.body ? <p className="text-xs text-secondary pt-2">Note field is required</p> : null}
                </div>

                <div className="flex justify-start items-center gap-4 flex-wrap">
                    <button className="flex justify-start items-center gap-2 rounded transition-all bg-primary text-white py-2 px-4">
                        {
                            note ? <span>Update</span> : (
                                <>
                                    <Plus size={18} weight="bold" className="" />
                                    <span>Save Note</span>
                                </>
                            )
                        }
                        {loading ? <Spinner size={14} /> : null}
                    </button>

                    <span onClick={handleCancel} className="flex justify-start items-center gap-2 rounded transition-all bg-gray-300 cursor-pointer py-2 px-4">
                        Cancel
                    </span>
                </div>
            </form>
        </div>
    )
}

export default NoteForm;