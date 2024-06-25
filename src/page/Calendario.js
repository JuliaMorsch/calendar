import React, { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./components/Components-Calendario-css.css";
import EventsPattern from "./components/EventsPattern";
import EventModal from "./components/modalEvent/EventModal";
import Adicionar from "./components/adicionar/Adicionar";
import CustomToolbar from "./components/customCalendar/CustomToolbar";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function Calendario() {

    const [eventos, setEventos] = useState(EventsPattern);
    const [eventoSelecionado, setEventoSelecionado] = useState(null);

    const EventStyle = (event) => ({
        style:{
            backgroundColor: event.color,
        }
    })

    const onEventDrop = (data) => {
        const {start, end} = data;
        const updatedEvents = eventos.map((event) => {
            if(event.id === data.event.id){
                return {
                    ...event, 
                    start: new Date(start), 
                    end: new Date(end)
                };
            }
            return event;
        });
        setEventos(updatedEvents)
    }
           
    const onEventResize = (data) => {
        const {start, end} = data;
        const updatedEvents = eventos.map((event) => {
            if(event.id === data.event.id){
                return {
                    ...event, 
                    start: new Date(start), 
                    end: new Date(end)
                };
            }
            return event;
        });
        setEventos(updatedEvents)
    }

    const handleEventClick = (evento) =>{
        setEventoSelecionado(evento);
    }

    const handleEventClose = () =>{
        setEventoSelecionado(null);

    }

    const handleAdicionar = (novoEvento) =>{
        setEventos([...eventos, {...novoEvento, id:eventos.length + 1}]);
    }

    const handleEventDelete = (eventId) => {
        const updatedEvents = eventos.filter((event) => event.id !== eventId) 
        setEventos(updatedEvents);
        setEventoSelecionado(null);
    }

    const handleEventUpdate = (updatedEvent) => {
        const updatedEvents = eventos.map((event) => {
            if(event.id === updatedEvent.id){
                return updatedEvent;
            }
            return event;
        });
        setEventos(updatedEvents);
        setEventoSelecionado(null);
    }

    return (
        <div className="tela">
            <div className="toolbar p-4">
                <Adicionar onAdicionar={handleAdicionar}/>
            </div>
        <div className="calendar">
            <DragAndDropCalendar
                defaultDate={moment().toDate()}
                defaultView="month" //mostra os meses
                events={eventos}
                localizer={localizer}
                resizable
                onEventDrop={onEventDrop}
                onEventResize={onEventResize}
                onSelectEvent={handleEventClick}
                eventPropGetter={EventStyle}
                components={{
                    toolbar: CustomToolbar,
                }}
            />
        </div>
            {eventoSelecionado && (
                <EventModal
                evento={eventoSelecionado}
                onClose={handleEventClose}
                onDelete={handleEventDelete}
                onUpdate={handleEventUpdate}
                />
            )}
       </div>
    )
}

export default Calendario;