import { uiOpenModal } from "actions/ui"
import { useDispatch } from "react-redux"

const AddNewFab = () => {

  const dispatch = useDispatch()

  const handleButtonClick = () => {
    dispatch(uiOpenModal())
  }
  
  
  return (
    <button
      className="btn btn-primary fab"
      onClick={handleButtonClick}
    >
      <i className="fas fa-plus"></i>
    </button>
  )
}

export default AddNewFab
