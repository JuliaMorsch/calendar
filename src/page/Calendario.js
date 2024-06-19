import React, { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import './components/Components-Calendario-css.css';
import EventsPattern from "./components/EventsPattern";
import EventModal from "./components/EventModal";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function Calendario() {

    const [eventos, setEventos] = useState(EventsPattern);
    const [eventosSelecionados, setEventosSelecionados] = useState(null);

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
        setEventosSelecionados(evento);
    }

    const handleEventClose = () =>{
        setEventosSelecionados(null);

    }

    return (
        <div className="tela">
        <div className="tollbar">
            <p>Ferramentas</p>
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
                    tollbar: CustomTollbar,
                }}
            />
        </div>
            {eventosSelecionados && (
                <EventModal
                evento={eventosSelecionados}
                onClose={handleEventClose}
                />
            )}
       </div>
    )
}

const CustomTollbar = ({label, onView, onNavigate, views}) =>{
    const handleNavigate = (action) =>{
        onNavigate(action);
    }

    const [itemText, setItemText] = useState('month');

    return(
        <div className="tollbar-container">
            <h1 className="mesAno">{label}</h1>

            <div className="dirtop">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="buttom" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        {itemText}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {views.map((view, index) => (
                            <div key={index}>
                                <li>
                                    <button className="dropdown-item" onClick={() =>onView(views)}>{view}</button>
                                </li>
                            </div>
                        ))
                    }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Calendario;