import { useState } from "react";
import Dropdown from "../../components/Dropdown";
import NoteCard from "./NoteCard";
import { Plus } from "@phosphor-icons/react";
import NoteForm from "../../components/NoteForm";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import useNotes from "../../../hooks/useNotes";
import { toast } from "react-toastify";
import { clearAllNotes } from "../../../store/features/NotesReducer";
import Modal from "../../components/Modal";


const Notes = () => {
    const { notes } = useAppSelector(state => state.notes);
    const [showNoteForm, setShowNoteForm] = useState(false);
    const [filterOption, setFilterOption] = useState("any");
    const [sortOption, setSortOption] = useState("any");
    const { sortedNotes } = useNotes({filterOption, sortOption, initialNotes: notes});
    const [clearNoteInfo, setClearNoteInfo] = useState({show: false, loading: false});
    const dispatch = useAppDispatch();

    const handleClearNotes = () => {
        if(clearNoteInfo.loading){ return; }

        setClearNoteInfo({...clearNoteInfo, loading: true});
        toast.success("Notes deleted");
        return setTimeout(() => {
            dispatch(clearAllNotes());
            return setClearNoteInfo({show: false, loading: false});
        }, 2000);
    }

    return (
        <>
            {/* Add Note Form Modal */}
            <NoteForm 
                show={showNoteForm}
                handleClose={() => setShowNoteForm(false)}
            />

            {/* Clear Notes Modal */}
            <Modal 
                show={clearNoteInfo.show}
                message="Are you sure you want to delete all notes?"
                loading={clearNoteInfo.loading}
                handleProceed={handleClearNotes}
                handleClose={() => setClearNoteInfo({...clearNoteInfo, show: false})}
            />

            <div className={`w-full flex ${(notes.length || sortedNotes.length) ? "justify-between" : "justify-end"}  items-start gap-4 text-xs md:text-sm flex-wrap mb-6`}>
                {
                    (notes.length || sortedNotes.length) ? (
                        <div className="flex justify-start items-start gap-2 flex-wrap flex-col">
                            <div className="flex justify-start items-center gap-1">
                                <span>Filter By:</span>
                                <Dropdown 
                                    selected={filterOption}
                                    handleChange={(val) => setFilterOption(val as string)}
                                    options={["any", "today", "this week", "this month"]}
                                    className="w-max whitespace-nowrap"
                                />
                            </div>

                            <div className="flex justify-start items-center gap-1">
                                <span>Sort By:</span>
                                <Dropdown
                                    selected={sortOption}
                                    handleChange={(val) => setSortOption(val as string)}
                                    options={["any", "title", "creation date", "updated date"]}
                                    className="w-max whitespace-nowrap"
                                />
                            </div>
                        </div>
                    ) : null
                }

                <div className="flex justify-start items-center gap-4 flex-wrap">
                    <button onClick={() => setShowNoteForm(true)} className="flex justify-start items-center gap-2 rounded transition-all duration-300 bg-primary text-white hover:-translate-y-1 py-2 px-4">
                        <Plus size={18} weight="bold" />
                        <span>Add Note</span>
                    </button>

                    {
                        notes.length ? (
                            <button onClick={() => setClearNoteInfo({...clearNoteInfo, show: true})} className="flex justify-start items-center gap-2 rounded transition-all duration-300 bg-secondary text-white hover:-translate-y-1 py-2 px-4">
                                Clear Notes
                            </button>
                        ) : null
                    }
                </div>
            </div>

            {
                sortedNotes.length ? (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {
                            sortedNotes.map(note => (
                                <NoteCard 
                                    key={note.id}
                                    {...note}
                                />
                            ))
                        }
                    </div>
                ) : (
                    <p className="text-center text-secondary mt-8">No record found</p>
                )
            }
        </>
    )
}

export default Notes;