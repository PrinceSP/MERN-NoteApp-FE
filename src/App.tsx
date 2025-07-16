import { Route, Routes } from "react-router"
import Home from "./pages/home"
import CreateNote from "./pages/createNote"
import NoteDetails from "./pages/noteDetails"
import toast from "react-hot-toast"

function App() {

  return (
    <>
      <button onClick={()=>toast.success("success hahaha")}>test</button>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<CreateNote/>}/>
        <Route path="/details" element={<NoteDetails/>}/>
      </Routes>
    </>
  )
}

export default App
