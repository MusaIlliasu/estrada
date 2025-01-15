import logo from "../../assets/logo/logo.png";

const Loader = () => {

  return (
    <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 bg-white z-[500] p-4">
        <div className="w-[120px] animate-pulse">
            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
        </div>
    </div>
  )
}

export default Loader;