import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";
import { Note } from "../../../types/types";
import { useAppSelector } from "../../../hooks/hooks";
import { ArrowLeft } from "@phosphor-icons/react";

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
        <div className="w-full md:max-w-[500px] mx-auto">
            <div className="flex justify-start items-center mb-4">
                <Link to="/" className="rounded-md flex justify-start items-center gap-1 hover:text-primary transition-colors">
                    <ArrowLeft size={20} weight="regular" />
                    <span>Go Back</span>
                </Link>
            </div>

            <div className="w-full bg-white rounded-lg p-6">
                <h2 className="font-semibold text-lg md:text-2xl mb-2">{note.title}</h2>
                <p className="text-xs pb-2 border-b-2 mb-5">{new Date(note.createdAt).toLocaleDateString()}</p>
                
                <p>{note.body}</p>
            </div>

        </div>
    )
}

export default SearchDetail;