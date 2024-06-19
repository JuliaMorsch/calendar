import React from "react";
import './Components-Calendario-css.css';

const EventModal = ({evento, onClose}) => {
    return(
        <div className="modal">
            <div className="modal-content">
                <h2>{evento.title}</h2>
                <p>{evento.desc}</p>
                <p>Início: {evento.start.toLocaleString()}</p> 
                <p>Fim: {evento.end.toLocaleString()}</p>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    )
}

export default EventModal;
// toLocaleString() trará os dados de forma mais legível quando clicado no evento
