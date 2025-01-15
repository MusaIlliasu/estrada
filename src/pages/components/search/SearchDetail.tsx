import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";
import { Note } from "../../../types/types";
import { useAppSelector } from "../../../hooks/hooks";

const SearchDetail = () => {
    const { notes } = useAppSelector(state => state.notes);
    const [loading, setLoading] = useState(true);
    const [note, setNote] = useState({} as Note);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const id = params.id || "";
        const nt = notes.find(n => n.id === +id);
        if(nt){
            setNote(nt);
            return setLoading(false);
        }

        navigate("/");

    }, [params.id, notes, navigate]);

    // Return loader while searching the note with the specified id. 
    if(loading){ return <Loader />}

    return (
        <div className="w-full md:max-w-[500px] bg-white rounded-lg mx-auto p-6">
            <h2 className="font-semibold text-lg md:text-2xl mb-2">{note.title}</h2>
            <p className="text-xs pb-2 border-b-2 mb-5">{new Date(note.createdAt).toLocaleDateString()}</p>
            
            <p>{note.body}</p>
        </div>
    )
}

export default SearchDetail;