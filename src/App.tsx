import { Route, Routes } from "react-router"
import Home from "./pages/home"
import CreateNote from "./pages/createNote"
import NoteDetails from "./pages/noteDetails"

function App() {

  return (
    <main className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<CreateNote/>}/>
        <Route path="/note/:id" element={<NoteDetails/>}/>
      </Routes>
    </main>
  )
}

export default App
