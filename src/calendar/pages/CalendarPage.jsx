/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEvent, CalendarModal, Navbar } from "../";

import { localizer, getMessagesES } from "../../helpers";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { FavAddNew } from "../components/FavAddNew";
import { FavDelete } from "../components/FavDelete";
import { useAuthStore } from "../../hooks/useAuthStore";

export const CalendarPage = () => {

  const { user } = useAuthStore()
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()
  const { openDateModal } = useUiStore()

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week' )

  const eventStyleGetter = ( event, start, end , isSelected ) => {

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid )

    const style = {
      backgroundColor: isMyEvent ? '#347cf7': '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }


  }
  
  const onDoubleClick = ( event )  => {
    openDateModal()
  }

  const onSelect = ( event )  => {
    setActiveEvent( event )
  }

  const onViewChanged = ( event )  => {
    localStorage.setItem('lastView', event )
    setLastView( event )
  }

  useEffect(() => {
    
    startLoadingEvents()

  }, [])
  

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal  />
      <FavAddNew /> 
      <FavDelete />
    </>
  );
};
///