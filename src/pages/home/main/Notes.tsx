import { useState } from "react";
import Dropdown from "../../components/Dropdown";
import NoteCard from "./NoteCard";
import { Plus } from "@phosphor-icons/react";
import NoteForm from "../../components/NoteForm";
import { useAppSelector } from "../../../hooks/hooks";
import useNotes from "../../../hooks/useNotes";


const Notes = () => {
    const { notes } = useAppSelector(state => state.notes);
    const [showNoteForm, setShowNoteForm] = useState(false);
    const [filterOption, setFilterOption] = useState("today");
    const [sortOption, setSortOption] = useState("title");

    const { sortedNotes } = useNotes({filterOption, sortOption, initialNotes: notes});

    return (
        <>
            {/* Add Note Form Modal */}
            <NoteForm 
                show={showNoteForm}
                handleClose={() => setShowNoteForm(false)}
            />

            <div className={`w-full flex ${sortedNotes.length ? "justify-between" : "justify-end"}  items-start gap-4 mb-6`}>
                {
                    sortedNotes.length ? (
                        <div className="flex justify-start items-start gap-2 flex-col">
                            <div className="flex justify-start items-center gap-1">
                                <span>Filter By:</span>
                                <Dropdown 
                                    selected={filterOption}
                                    handleChange={(val) => setFilterOption(val as string)}
                                    options={["today", "this week", "this month"]}
                                    className="w-max whitespace-nowrap"
                                />
                            </div>

                            <div className="flex justify-start items-center gap-1">
                                <span>Sort By:</span>
                                <Dropdown

                                    selected={sortOption}
                                    handleChange={(val) => setSortOption(val as string)}
                                    options={["title", "creation date", "updated date"]}
                                    className="w-max whitespace-nowrap"
                                />
                            </div>
                        </div>
                    ) : null
                }

                <button onClick={() => setShowNoteForm(true)} className="flex justify-start items-center gap-2 rounded transition-all bg-primary text-white py-2 px-4">
                    <Plus size={18} weight="bold" />
                    <span>Add Note</span>
                </button>
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