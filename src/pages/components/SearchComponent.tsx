import { MagnifyingGlass } from "@phosphor-icons/react";

const SearchComponent = () => {

  return (
    <div className="hidden md:inline-block">
        <input type="search" placeholder="Search"
            className="rounded bg-[#F4F4F4] border border-[#F4F4F4] outline-none focus:border-primary transition-colors py-2 pl-10 pr-4" 
        />
        <MagnifyingGlass size={24} weight="regular" color="#868686" className="absolute top-2 left-2" />
    </div>
  )
}

export default SearchComponent;