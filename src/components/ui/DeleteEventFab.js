import { eventDeleted } from "actions/events"
import { useDispatch } from "react-redux"

const DeleteEventFab = () => {

  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(eventDeleted())
  }
  

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
    >
      <i className="fas fa-trash"></i>
      <span> Borrar evento</span>
    </button>
  )
}

export default DeleteEventFab
