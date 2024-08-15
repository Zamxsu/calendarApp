import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent, onUpdatedEvent } from "../store/calendar/calendarSlice"

export const useCalendarStore = () => {

  const dispatch = useDispatch()

    const { events, activeEvent } = useSelector( state => state.calendar )

    const setActiveEvent = ( calendarEvent ) => {

      dispatch( onSetActiveEvent( calendarEvent ) )

    }

    const startSavingEvent = async( calendarEvent ) => {
      // TODO: Llegar al Backend

      //* Todo Bien
      if( calendarEvent._id) {
          dispatch( onUpdatedEvent({...calendarEvent }))
      } else {
        dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) )
      }
    }

  return {
    events,
    activeEvent,

    setActiveEvent,
    startSavingEvent,
  }
}
