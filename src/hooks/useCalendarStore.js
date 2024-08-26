import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdatedEvent } from "../store/calendar/calendarSlice"
import calendarApi from "../api/calendarApi"

export const useCalendarStore = () => {

  const dispatch = useDispatch()

    const { events, activeEvent } = useSelector( state => state.calendar )
    const { user } = useSelector( state => state.auth )

    const setActiveEvent = ( calendarEvent ) => {

      dispatch( onSetActiveEvent( calendarEvent ) )

    }

    const startSavingEvent = async( calendarEvent ) => {
     //TODO: update event
      //* Todo Bien
      if( calendarEvent._id) {
          dispatch( onUpdatedEvent({...calendarEvent }))
      } else {

        const { data } =  await calendarApi.post('/events', calendarEvent);
        dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) )
        
      }
    }

    const startDeletingEvent = () => {
      dispatch( onDeleteEvent() )
    }

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,


    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  }
}
