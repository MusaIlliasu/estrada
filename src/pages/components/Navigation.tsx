import { Link } from "react-router-dom";
import SearchComponent from "./search/SearchComponent";

import logo from "../../assets/logo/logo.png";
import profileImage from "../../assets/images/profile.png";
import { List } from "@phosphor-icons/react";
import Mobile from "./Mobile";
import { useState } from "react";

const Navigation = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <>
      {/* Mobile Navigation */}
      <Mobile 
        show={showMobileNav}
        handleClose={() => setShowMobileNav(false)}
      />
    
      <div className="w-full flex justify-between items-center gap-4">
        <div className="flex justify-start items-center gap-16">
          <Link to="/" className="inline-block w-[80px] md:w-[120px]">
            <img src={logo} alt="Logo" className="w-full h-full object-cover" loading="lazy" />
          </Link>

          <strong className="hidden md:inline-block font-extrabold text-xl md:text-2xl">My Notes</strong>

          <SearchComponent />
        </div>

        <div className="flex justify-start items-center gap-4">
          <Link to="#" className="flex justify-start items-center gap-3">
            <span className="hidden md:inline-block font-semibold">Akinremi Adebayo</span>
            <span className="inline-block w-10 md:w-12 h-10 md:h-12 border rounded-full overflow-hidden">
              <img src={profileImage} alt="Image" className="w-full h-full object-cover" loading="lazy" />
            </span>
          </Link>

          <List onClick={() => setShowMobileNav(true)} size={28} weight="regular" className="inline-block md:hidden cursor-pointer" />
        </div>
      </div>
    </>
  )
}

export default Navigation;