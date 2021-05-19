import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const now = moment().minute(0).seconds(0).add(1, 'hours')
const nowPlusOne = now.clone().add(1, 'hours')

const CalendarModal = () => {

  const [dateStart, setDateStart] = useState(now.toDate())
  const [dateEnd, setDateEnd] = useState(nowPlusOne.toDate())

  const closeModal = () => {};

  const handleStartDateChange = e => {
    setDateStart(e)
    console.log(e)
  }
  
  const handleEndDateChange = e => {
    setDateEnd(e)
    console.log(e)
  }
  

  return (
    <Modal
      isOpen={true}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container">
        <div className="mb-3">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange} 
            value={dateStart} 
            className="form-control"
            format="y-MM-dd h:mm:ss a"
          />
        </div>

        <div className="mb-3">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange} 
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
            format="y-MM-dd h:mm:ss a"
          />
        </div>

        <hr />
        <div className="mb-3">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="mb-3">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

export default CalendarModal;
