import { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import Navbar from "components/ui/Navbar"
import { messages } from 'helpers/calendar-messages-es'
import CalendarEvent from 'components/calendar/CalendarEvent'
import CalendarModal from './CalendarModal'

import { uiOpenModal } from 'actions/ui'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'
import { eventClearActive, eventSetActive, eventStartLoading } from 'actions/events'
import AddNewFab from 'components/ui/AddNewFab'
import DeleteEventFab from 'components/ui/DeleteEventFab'

moment.locale('es')

const localizer = momentLocalizer(moment)

const CalendarScreen = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')
  const dispatch = useDispatch()
  const {events, activeEvent} = useSelector(state => state.calendar)
  const {uid} = useSelector(state => state.auth)

  useEffect(() => {
    
    dispatch(eventStartLoading())

  }, [dispatch])

  const onDoubleClick = () => {
    dispatch(uiOpenModal())
  }

  const onSelectEvent = e => {
    dispatch(eventSetActive(e))
  }

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e)
  }
  
  const onSelectSlot = (e) => {
    // console.log(e)
    dispatch(eventClearActive())
  }

  const eventStyleGetter = (event) => {

    const style = {
      backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }

    return {
      style
    }
  }

  return (
    <div className="calendar-screen">

      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
        components={{
          event: CalendarEvent
        }}
      />

      <AddNewFab />

      {
        activeEvent &&
        <DeleteEventFab />
      }
      
      <CalendarModal />
      
    </div>
  )
}

export default CalendarScreen
