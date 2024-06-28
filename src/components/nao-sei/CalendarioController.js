// src/controllers/CalendarController.js

import { useEventModel } from "../models/EventModel";

export function useCalendarController() {
  const {
    Eventos,
    EventoSelecionado,
    EventosFiltrados,
    setEventoSelecionado,
    onEventDrop,
    handleAdicionar,
    handleEventDelete,
    handleEventUpdate,
    handleSelecionarAtividades,
  } = useEventModel();

  const handleEventClick = (evento) => {
    setEventoSelecionado(evento);
  };

  const handleEventClose = () => {
    setEventoSelecionado(null);
  };

  return {
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
  };
}
