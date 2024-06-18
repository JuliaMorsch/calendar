import React, { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import './components/Components-Calendario-css.css';
import EventsPattern from "./components/EventsPattern";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function Calendario() {

    const [eventos, setEventos] = useState(EventsPattern)



    return (
       <div className="calendar">
            <DragAndDropCalendar
                defaultDate={moment().toDate()}
                defaultView="month" //mostra os meses
                events={eventos}
                localizer={localizer}
                resizable
            />
       </div>
    )
}

export default Calendario;