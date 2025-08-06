import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import Navbar from "../components/navbar"
import Notes from "../components/notes"

const Home = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchNotes = async () => {
    try {
      const result = await axios.get("http://localhost:5000/api/notes").then(res => res.data)
      setNotes(result)
    } catch (error) {
      if (error.response?.status === 500) {
        toast.error("Failed to load notes")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <p className="text-center text-primary py-10">Loading notes...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(item =>
            <Notes key={item._id} item={item} setNotes={setNotes} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Home