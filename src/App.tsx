import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import Home from "./pages/home/Home";
import Main from "./pages/home/main/Main";
import Calendar from "./pages/home/Calendar";
import Archive from "./pages/home/Archive";
import Trash from "./pages/home/Trash";
import Loader from "./pages/components/Loader";
import SearchDetail from "./pages/components/search/SearchDetail";

const HomePage = lazy(() => import("./pages/home/Home"));

const App = () => {

  return (
    <>

      <BrowserRouter>
        <ToastContainer position="top-center" autoClose={3000} />

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route index element={<Main />} />
              <Route path="notes/:id" element={<SearchDetail />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="archive" element={<Archive />} />
              <Route path="trash" element={<Trash />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App;