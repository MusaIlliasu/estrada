import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import SideNavigation from "../components/SideNavigation";

const Home = () => {

  return (
    <>
      {/* Top Navigation */}
      <nav className="w-full h-[80px] bg-white text-[#5F5F5F] sticky top-0 left-0 flex justify-center items-center z-40 py-2 px-6 text-sm">
        <Navigation />
      </nav>

      {/* Side Navigation */}
      <aside className="hidden md:block w-[200px] h-[calc(100vh-80px)] overflow-y-auto bg-white text-[#5F5F5F] absolute top-[80px] left-0 transition-all duration-300 p-6 text-sm">
        <SideNavigation />
      </aside>

      {/* Main Section */}
      <main className="w-full md:w-[calc(100%-200px)] h-[calc(100vh-80px)] overflow-y-auto text-[#5F5F5F] absolute top-[80px] left-0 md:left-[200px] transition-all duration-300 p-6 text-sm">
        <Outlet />
      </main>
    </>
  );
}

export default Home;