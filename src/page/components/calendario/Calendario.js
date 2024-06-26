import React, { useState } from "react";
import moment from "moment"; //biblioteca que manipula as datas e horas 
import { Calendar, momentLocalizer } from "react-big-calendar"; //momentLocalizer altera a formatação de data para dd/mm/aaaa
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "../cssComponents/Components-Calendario-css.css";
import EventsPattern from "../eventosPadrao/EventsPattern"; 
import EventModal from "../modalEvent/EventModal";
import Adicionar from "../adicionar/Adicionar";
import CustomToolbar from "../customCalendar/CustomToolbar";
import FiltroAtividades from "../filtro/FiltroAtividades";

const DragAndDropCalendar = withDragAndDrop(Calendar);  //Interatividade de arrastar e soltar aplicada ao calendar da biblioteca
const localizer = momentLocalizer(moment);  // ferramenta que formata datas, horas e textos específicos que implementa a biblioteca moment para melhor tratar as configurações de datas

function Calendario() {
    const [Eventos, setEventos] = useState(EventsPattern);
    const [EventoSelecionado, setEventoSelecionado] = useState(null);
    const [EventosFiltrados, setEventosFiltrados] = useState(EventsPattern);

    const eventStyle = (event) => ({
        style:{
            backgroundColor: event.color,
        },
    });

    const onEventDrop = (data) => {
        const {start, end} = data;
        const updatedEvents = Eventos.map((event) => {
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
    };

    const handleEventClick = (evento) => {
        setEventoSelecionado(evento);
    };

    const handleEventClose = () => {
        setEventoSelecionado(null);

    };

    const handleAdicionar = (novoEvento) => {
        setEventos([...Eventos, {...novoEvento, id:Eventos.length + 1}]);
    };

    const handleEventDelete = (eventId) => {
        const updatedEvents = Eventos.filter((event) => event.id !== eventId) 
        setEventos(updatedEvents);
        setEventoSelecionado(null);
    };

    const handleEventUpdate = (updatedEvent) => {
        const updatedEvents = Eventos.map((event) => {
            if(event.id === updatedEvent.id){
                return updatedEvent;
            }
            return event;
        });
        setEventos(updatedEvents);
        setEventoSelecionado(null);
    };

    const handleSelecionarAtividades = (AtividadesSelecionadas) => {
        setEventosFiltrados(AtividadesSelecionadas);
    };

    return (
        <div className="tela">
            <div className="toolbar" style={{maxHeight: '100vh', overflowY: 'auto'}}>
                <Adicionar onAdicionar={handleAdicionar}/>
                <FiltroAtividades atividades={Eventos} onSelecionarAtividades={handleSelecionarAtividades}/>
            </div>
        <div className="calendario">
            <DragAndDropCalendar
                defaultDate={moment().toDate()}
                defaultView='month' //mostra os meses
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