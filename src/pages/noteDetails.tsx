import { ArrowLeft, LoaderIcon, Trash2 } from "lucide-react"
import { useEffect, useState, type FormEvent, type MouseEvent } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate, useParams } from "react-router"
import RateLimited from "../components/rateLimited"
import api from "../lib/axios"

const INPUTCLASS = "border-1 border-zinc-400 rounded-xl w-full p-4 mt-2"

interface noteData {
  title: string;
  content: string;
  _id?:string;
}

const NoteDetails = () => {
  const [note, setNote] = useState<noteData>({ title: "", content: "" })
  const [loading, setLoading] = useState<boolean>(true)
  const [isLimited, setLimited] = useState<boolean>(false)
  const navigate = useNavigate()
  const { id } = useParams()

  const getNote = async (noteId: string | undefined) => {
    try {
      await api.get(`/notes/${noteId}`).then(result => setNote(result.data))
    } catch (error) {
      toast.error("Can't get your note")
    } finally {
      setLoading(false)
    }
  }

  const deleteNote = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, noteId: string | undefined) => {
    e.preventDefault()

    if (!window.confirm("Are you sure want to delete this note?")) return

    try {
      await api.delete(`/notes/${noteId}`)
      toast.success("Successfully delete your note!")
    } catch (error) {
      toast.error("Can't delete your note!")
      setLimited(true)
    } finally {
      navigate("/")
    }
  }

  const updateNote = async (e: FormEvent<HTMLFormElement>, noteId: string | undefined) => {
    e.preventDefault()
    if (!note?.title.trim() || !note?.content.trim()) {
      toast.error("Please add a title or content")
      return
    }
    if (!window.confirm("Are you sure want to update this note?")) return

    setLoading(true)
    try {
      await api.put(`/notes/${noteId}`, { ...note })
      toast.success("Successfully updating your note!")
    } catch (error) {
      toast.error("Can't update your note")
    } finally {
      setLoading(false)
      navigate("/")
    }
  }

  useEffect(() => {
    getNote(id)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-base-200">
      {isLimited ? <RateLimited /> :
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="relative flex items-center gap-2 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">
                <ArrowLeft className="size-5 text-zinc-300" />
                <span className="text-zinc-300">Back to Notes</span>
              </Link>
              <button className="btn btn-error btn-outline" onClick={(e) => deleteNote(e, id)}>
                <Trash2 className="size-5" />
                <span>Delete note</span>
              </button>
            </div>
            <form className="flex flex-col h-auto" onSubmit={e => updateNote(e, id)}>
              <label htmlFor="title" className="text-white/70">Title</label>
              <input type="text" name="title" placeholder="Note title" defaultValue={note?.title} className={`${INPUTCLASS} mb-6`} onChange={title => setNote({ ...note, title: title.currentTarget.value })} />
              <label htmlFor="content" className="text-white/70">Content</label>
              <textarea name="content" placeholder="Write your note here..." rows={5} defaultValue={note?.content} className={INPUTCLASS} onChange={content => setNote({ ...note, content: content.currentTarget.value })} />
              <div className="card-actions mt-8">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Saving notes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </section >
  )
}

export default NoteDetails