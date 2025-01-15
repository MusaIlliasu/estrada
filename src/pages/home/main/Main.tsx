import Folders from "./Folders";
import Notes from "./Notes";

const Main = () => {

  return (
    <>
      <h2 className="font-semibold text-xl mb-4">Recent Folder</h2>
      <Folders />

      <h2 className="font-semibold text-xl mt-10 mb-4">My Notes</h2>
      <Notes />
    </>
  )
}

export default Main;