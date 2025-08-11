import { PenSquareIcon, Trash2 } from 'lucide-react'
import { Link } from 'react-router'
import axios from 'axios'
import toast from 'react-hot-toast'
import type { Dispatch, MouseEvent, SetStateAction } from 'react'
import { formatDate } from "../lib/utils"
import api from '../lib/axios'

interface NoteData {
  title: string;
  content: string;
  _id: string;
  createdAt: string;
}

interface NotesProps {
  item: NoteData
  setNotes: Dispatch<SetStateAction<NoteData[]>>
}

const Notes: React.FC<NotesProps> = ({ item, setNotes }) => {

  const deleteEvent = async (e: MouseEvent<HTMLButtonElement>, noteId: string) => {
    e.preventDefault();

    if (!window.confirm("Are you sure want to delete this note?")) return;

    try {
      await axios.delete(`${api}/notes/${noteId}`)
      setNotes(prevValue => prevValue.filter(note => note._id !== noteId))
      toast.success("Note successfully deleted!")
    } catch (error) {
      toast.error("Failed to delete notes")
    }
  }

  return (
    <Link to={`/note/${item._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
      <div className="card-body">
        <h3 className="card-title text-base-content">{item.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{item.content}</p>
        <div className="card-actions justify-between items-center gap-4">
          <span className="text-sm text-base-content/60">{formatDate(new Date(item.createdAt))}</span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error" onClick={e => deleteEvent(e, item._id)}>
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Notes