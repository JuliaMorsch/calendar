import React, { useState } from "react";
import { Modal, Button, Form, Collapse } from "react-bootstrap";

const EventModal = ({evento, onClose, onDelete, onUpdate}) => {
    
    const [EditedEvent, setEditedEvent] = useState({...evento});
    const [Collapsed, setCollapsed] = useState(true);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditedEvent({...EditedEvent, [name]:value});
    };

    const handleColorChange = (e) => {
        setEditedEvent({...EditedEvent, color:e.target.value});
    };

    const handleStartDateChange = (e) => {
        const startDate = new Date(e.target.value);
        if(startDate <= EditedEvent.end){
            setEditedEvent({...EditedEvent, start:startDate});
        }
    };

    const handleEndtDateChange = (e) => {
        const endDate = new Date(e.target.value);
        if(endDate >= EditedEvent.start){
            setEditedEvent({...EditedEvent, end:endDate});
        }
    };

    const handleDelete = () => {
        onDelete(evento.id)
    };

    const handleUpdate = () => {
        onUpdate(EditedEvent);
        onClose();
    };

    const adjustDate = (date) => {
        const adjustedDate = new Date(date);
        adjustedDate.setHours(adjustedDate.getHours() - 3);
        return adjustedDate.toISOString().slice(0,-8);
    };

    return(
        <Modal show={true} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>{EditedEvent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId='formTitle'>
                        <Form.Label>Título</Form.Label>
                        <Form.Control type='text' name='title' value={EditedEvent.title} onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId='formDesc'>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as='textarea' rows={3} name='desc' value={EditedEvent.desc} onChange={handleInputChange}/>
                    </Form.Group>
                    <Collapse in={!Collapsed}>
                        <div>
                        <Form.Group controlId='formInicio'>
                            <Form.Label>Início</Form.Label>
                            <Form.Control type='datetime-local' name='start' value={adjustDate(EditedEvent.start)} onChange={handleStartDateChange}/>
                        </Form.Group> 
                        <Form.Group controlId='formEnd'>
                            <Form.Label>Fim</Form.Label>
                            <Form.Control type='datetime-local' name='end' value={adjustDate(EditedEvent.end)} onChange={handleEndtDateChange}/>
                        </Form.Group>
                        <Form.Group controlId='formColor'>
                            <Form.Label>Cor</Form.Label>
                            <Form.Control type='color' name='color' value={EditedEvent.color} onChange={handleColorChange}/>
                        </Form.Group>
                        <Form.Group controlId='formTipo'>
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control type='text' name='tipo' value={EditedEvent.tipo} onChange={handleInputChange}/>
                        </Form.Group>
                        </div>
                    </Collapse>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                <Button variant="secondary" onClick={() => setCollapsed(!Collapsed)}>
                    {!Collapsed ? 'Ocultar Detalhes' : 'Mostrar Detalhes'}
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Apagar
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Salvar Alterações
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EventModal;