import React, { useState } from "react";
import {Button, Form, Row, Col, Collapse} from 'react-bootstrap';

function Adicionar (onAdicionar){
    const [novoEvento, setNovoEvento] = useState({
        title: '',
        start: '', 
        end: '',
        desc: '',
        color: '',
        tipo: '',
    });
    const [expanded, setExpanded] = useState(false);
    
    const handleChange = (e) => {
        const {nome, value} = e.target;
        setNovoEvento({...novoEvento, [nome]:value});
    }

    const handleToggleExpanded = (e) => {
        e.stopPropagation();
        setExpanded(!expanded)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }
    
    return(
        <div className="adicionar p-3 rounded border border-white">
            <h3>Adicionar Evento</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controllId='formBasicTitle'>
                    <Form.Label>Título do Evento</Form.Label>
                    <Form.Control type='text' placeholder="Digite o Título" name="title" value={novoEvento.title} onChange={handleChange}/>
                </Form.Group>
                <Row>
                    <Col xs={6}>
                        <Form.Group constrolId='formBasicStart'>
                            <Form.Label>Início</Form.Label>
                            <Form.Control type="datetime-local" name='start' value={novoEvento.start} onChange={handleChange}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Adicionar;