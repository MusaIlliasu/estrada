import { MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { Note } from "../../../types/types";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

const SearchComponent = () => {
  const { notes } = useAppSelector(state => state.notes);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState("");
  const delay = 500; // milliseconds
  const [isTyping, setIsTyping] = useState(false);


  useEffect(() => {

    if(query === ""){ return setFilteredNotes([]) }

    const clear = setTimeout(() => {
      setIsTyping(false);
      return setFilteredNotes(
        notes.filter(
          note => note.title.toLowerCase().includes(query.trim().toLowerCase()) ||
          note.body.toLowerCase().includes(query.trim().toLowerCase())
        )
      );
    }, delay);

    setIsTyping(true);
    return () => clearInterval(clear);

  }, [query, notes]);


  const handleClearSearch = () => {
    setQuery("");
    setFilteredNotes([]);
  }

  return (
    <div className="hidden md:inline-block">
        <input type="search" placeholder="Search"
            className="rounded bg-[#F4F4F4] border border-[#F4F4F4] outline-none focus:border-primary transition-colors py-2 pl-10 pr-4" 
            value={query}
            onChange={(ev) => setQuery(ev.target.value)}
        />
        <MagnifyingGlass size={24} weight="regular" color="#868686" className="absolute top-2 left-2" />
        
        {
          (query || filteredNotes.length) ? (
            <div className="w-full max-w-[300px] min-h-[150px] border bg-white absolute top-10 left-0 p-4 z-10">
              
              {/* Display a loader if a user is typing and filtered notes is empty */}
              {isTyping && !filteredNotes.length ? <div className="text-center mt-4"><Spinner color="purple" /></div> : null}
              
              {/* If query, a user is not typing and filtered notes is empty, display 'No record found' */}
              {query && !isTyping && !filteredNotes.length ? <p className="text-center text-secondary mt-8">No record found</p> : (
                filteredNotes.map((note, index) => (
                  <Link onClick={handleClearSearch} key={note.id} to={`/notes/${note.id}`} className={`block text-xs ${(filteredNotes.length - 1) !== index ? "mb-2" : ""} hover:bg-gray-100 transition-colors py-2 px-3`}>
                    <h2 className="font-semibold mb-1">{note.title}</h2>
                    <p>{note.body.length > 20 ? note.body.slice(0, 25) : note.body}</p>
                  </Link>
                ))
              )}

            </div>
          ) : null
        }
    </div>
  )
}

export default SearchComponent;