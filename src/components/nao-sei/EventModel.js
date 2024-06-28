// src/models/EventModel.js

import { useState } from "react";
import EventsPattern from "../../components/eventosPadrão/EventsPattern";

export function useEventModel() {
  const [Eventos, setEventos] = useState(EventsPattern);
  const [EventoSelecionado, setEventoSelecionado] = useState(null);
  const [EventosFiltrados, setEventosFiltrados] = useState(EventsPattern);

  const onEventDrop = (data) => {
    const { start, end } = data;
    const updatedEvents = Eventos.map((event) => {
      if (event.id === data.event.id) {
        return {
          ...event,
          start: new Date(start),
          end: new Date(end),
        };
      }
      return event;
    });
    setEventos(updatedEvents);
  };

  const handleAdicionar = (novoEvento) => {
    setEventos([...Eventos, { ...novoEvento, id: Eventos.length + 1 }]);
  };

  const handleEventDelete = (eventId) => {
    const updatedEvents = Eventos.filter((event) => event.id !== eventId);
    setEventos(updatedEvents);
    setEventoSelecionado(null);
  };

  const handleEventUpdate = (updatedEvent) => {
    const updatedEvents = Eventos.map((event) => {
      if (event.id === updatedEvent.id) {
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

  return {
    Eventos,
    EventoSelecionado,
    EventosFiltrados,
    setEventoSelecionado,
    onEventDrop,
    handleAdicionar,
    handleEventDelete,
    handleEventUpdate,
    handleSelecionarAtividades,
  };
}
