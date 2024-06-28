// src/views/Calendario.js

import moment from "moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Adicionar from "../adicionar-evento/Adicionar";
import { useCalendarController } from "../controllers/CalendarController";
import CustomToolbar from "../custom-toolbar/CustomToolbar";
import EventModal from "../event-modal/EventModal";
import FiltroAtividades from "../nao-sei/FiltroAtividades";
import "./Calendario.css";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function Calendario() {
  const {
    Eventos,
    EventoSelecionado,
    EventosFiltrados,
    onEventDrop,
    handleEventClick,
    handleEventClose,
    handleAdicionar,
    handleEventDelete,
    handleEventUpdate,
    handleSelecionarAtividades,
  } = useCalendarController();

  const eventStyle = (event) => ({
    style: {
      backgroundColor: event.color,
    },
  });

  return (
    <div className="tela">
      <div className="toolbar" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
        <Adicionar onAdicionar={handleAdicionar} />
        <FiltroAtividades atividades={Eventos} onSelecionarAtividades={handleSelecionarAtividades} />
      </div>
      <div className="calendario">
        <DragAndDropCalendar
          defaultDate={moment().toDate()}
          defaultView="month"
          events={EventosFiltrados}
          localizer={localizer}
          resizable
          onEventDrop={onEventDrop}
          onEventResize={onEventDrop}
          onSelectEvent={handleEventClick}
          eventPropGetter={eventStyle}
          components={{
            toolbar: CustomToolbar,
          }}
          className="calendar"
        />
      </div>
      {EventoSelecionado && (
        <EventModal
          evento={EventoSelecionado}
          onClose={handleEventClose}
          onDelete={handleEventDelete}
          onUpdate={handleEventUpdate}
        />
      )}
    </div>
  );
}

export default Calendario;
