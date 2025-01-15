import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../../types/types";

const getNotes = () => {
    const notes = localStorage.getItem("notes");
    if(notes){
        const parsedNotes = JSON.parse(notes);
        return (Array.isArray(parsedNotes) ? parsedNotes : []) as Note[];
    }
    return [] as Note[];
}

const initialState = {
    notes: getNotes()
}

const noteSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<Note>) => {
            const updatedNotes = [action.payload, ...state.notes];
            localStorage.setItem("notes", JSON.stringify(updatedNotes));
            state.notes = updatedNotes;
        },
        updateNote: (state, action: PayloadAction<Note>) => {
            const updatedNotes = state.notes.map(note => {
                if(note.id === action.payload.id){
                    return action.payload;
                }
                return note;
            });
            localStorage.setItem("notes", JSON.stringify(updatedNotes));
            state.notes = updatedNotes;
        },
        deleteNote: (state, action: PayloadAction<{id: number}>) => {
            const updatedNotes = state.notes.filter(note => note.id !== action.payload.id);
            localStorage.setItem("notes", JSON.stringify(updatedNotes));
            state.notes = updatedNotes;
        },
        clearAllNotes: (state) => {
            localStorage.removeItem("notes");
            state.notes = [];
        }
    }
});

export const { addNote, updateNote, deleteNote, clearAllNotes } = noteSlice.actions;

export default noteSlice.reducer;