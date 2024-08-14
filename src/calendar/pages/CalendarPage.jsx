/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Calendar } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from "date-fns";
import { CalendarEvent, CalendarModal, Navbar } from "../";

import { localizer, getMessagesES } from "../../helpers";
import { useUiStore } from "../../hooks/useUiStore";

const events = [{
  title : 'Cum del jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Fernando'
  }
}]

export const CalendarPage = () => {

  const { openDateModal } = useUiStore()

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week' )

  const eventStyleGetter = ( event, start, end , isSelected ) => {

    const style = {
      backgroundColor: '#347cf7',
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
    console.log({ click: event });
  }

  const onViewChanged = ( event )  => {
    localStorage.setItem('lastView', event )
    setLastView( event )
  }

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
    </>
  );
};
///