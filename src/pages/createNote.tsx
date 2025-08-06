import axios from "axios"
import { ArrowLeft } from "lucide-react"
import { useState, type SyntheticEvent } from "react"
import { Link, useNavigate } from "react-router"
import RateLimited from "../components/rateLimited"
import toast from "react-hot-toast"

const INPUTCLASS = "border-1 border-zinc-400 rounded-xl w-full p-4 mt-2"

const CreateNote = () => {
  const [postData, setPostData] = useState({ title: "", content: "" })
  const [isLimited, setLimited] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function createNote(e: SyntheticEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    if (!postData.title.trim() && !postData.content.trim()) {
      toast.error("All fields are required")
      return;
    }

    setLoading(true)
    try {
      await axios.post('http://localhost:5000/api/notes', { ...postData }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      toast.success("Note created successfully!")
    } catch (error) {
      if (error?.response?.status! === 429) {
        setLimited(true)
      } else {
        toast.error("Failed to create notes")
      }
    } finally {
      setLoading(false)
      navigate("/")
    }
  }

  return (
    <main data-theme="dracula" className="w-full min-h-screen flex flex-col p-8">
      <section className="w-full md:w-[90%] m-auto">
        <div className="flex items-center gap-4">
          <Link to="/" className="relative flex items-center gap-2 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">
            <ArrowLeft className="size-5 text-zinc-300" />
            <span className="text-zinc-300">Back to Notes</span>
          </Link>
        </div>
        {isLimited && <RateLimited />}
        {!isLimited && <section className="rounded-xl p-8 bg-base-300 mt-10 flex flex-col gap-8">
          <h1 className="text-3xl text-zinc-300">Create New Note</h1>
          <form className="flex flex-col h-auto" onSubmit={createNote}>
            <label htmlFor="title" className="text-white/70">Title</label>
            <input type="text" name="title" placeholder="Note title" value={postData?.title} className={`${INPUTCLASS} mb-6`} onChange={title => setPostData({ ...postData, title: title.currentTarget.value })} />
            <label htmlFor="content" className="text-white/70">Content</label>
            <textarea name="content" placeholder="Write your note here..." rows={5} value={postData?.content} className={INPUTCLASS} onChange={content => setPostData({ ...postData, content: content.currentTarget.value })} />
            <div className="card-actions mt-8">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Creating..." : "Create Note"}
              </button>
            </div>
          </form>
        </section>}
      </section>
    </main>
  )
}

export default CreateNote