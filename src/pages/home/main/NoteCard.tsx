import { DotsThreeOutline } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Note } from "../../../types/types";
import Modal from "../../components/Modal";
import { useAppDispatch } from "../../../hooks/hooks";
import { deleteNote } from "../../../store/features/NotesReducer";
import NoteForm from "../../components/NoteForm";
import { toast } from "react-toastify";

const NoteCard = (note : Note) => {
    const [showMenu, setShowMenu] = useState(false);
    const [noteInfo, setNoteInfo] = useState({show: false, note: {} as Note });
    const [deleteInfo, setDeleteInfo] = useState({show: false, loading: false, id: 0});
    const dispatch = useAppDispatch();

    const handleDeleteNote = () => {
        if(deleteInfo.loading){ return; }

        setDeleteInfo({...deleteInfo, loading: true});
        toast.success("Note deleted");
        return setTimeout(() => {
            dispatch(deleteNote({ id: note.id }));
            return setDeleteInfo({...deleteInfo, loading: false, id: 0, show: false});
        }, 2000);
    }

    return (
        <>
            {/* Update Note Modal */}
            <NoteForm 
                show={noteInfo.show}
                note={noteInfo.note ?? null}
                handleClose={() => setNoteInfo({...noteInfo, show: false, note: {} as Note})}
            />

            {/* Delete Note Modal */}
            <Modal 
                show={deleteInfo.show}
                message="Did you want to delete this note?"
                loading={deleteInfo.loading}
                handleProceed={handleDeleteNote}
                handleClose={() => setDeleteInfo({...deleteInfo, id: 0, show: false})}
            />

            <div className="w-full min-h-[150px] rounded-2xl bg-[#EBEBEB]">
                <div className="flex justify-between items-start gap-4 flex-wrap mb-2 p-5 border-b border-b-gray-300">
                    <div>
                        <h2 className="font-semibold text-lg mb-1">{note.title}</h2>
                        <p className="text-xs">{new Date(note.createdAt).toLocaleDateString()}</p>
                    </div>
                    
                    <div tabIndex={0} onBlur={() => setTimeout(() => setShowMenu(false), 200)} onClick={() => setShowMenu(!showMenu)} className="inline-block">
                        <DotsThreeOutline size={20} weight="fill" className="cursor-pointer" />

                        {
                            showMenu ? (
                                <div className="w-max border bg-white absolute top-5 -right-4 p-2 z-10">
                                    <Link onClick={() => setNoteInfo({...noteInfo, note, show: true})} to="#" className="block py-2 px-4 hover:bg-gray-100 hover:text-primary">Edit</Link>
                                    <Link onClick={() => setDeleteInfo({...deleteInfo, id: note.id, show: true})} to="#" className="block py-2 px-4 hover:bg-gray-100 hover:text-primary">Delete</Link>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
                
                <div className="pb-5 px-5">{note.body}</div>
            </div>
        </>
    )
}

export default NoteCard;