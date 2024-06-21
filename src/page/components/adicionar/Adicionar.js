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
    const [expanded, setExpanded] = useState(true);
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setNovoEvento({...novoEvento, [name]:value});
    }

    const handleToggleExpanded = (e) => {
        e.stopPropagation();
        setExpanded(!expanded)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(novoEvento.title && novoEvento.start && novoEvento.end){
            const startDate = new Date(novoEvento.start);
            const endDate = new Date(novoEvento.end);

            if(startDate => endDate){
                alert("A data de início do evento deve ser anterior à data de término.");
                return;
            }
            onAdicionar(novoEvento);
            setNovoEvento({
                title: '',
                start: '', 
                end: '',
                desc: '',
                color: '',
                tipo: '',
            })
        }
    }
    
    return(
        <div className="adicionar p-3 rounded border border-white" style={{backgroundColor: '#e9ecef', color: '#212529'}}>
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
                    <Col xs={6}>
                    <Form.Group constrolId='formBasicEnd'>
                            <Form.Label>Término</Form.Label>
                            <Form.Control type="datetime-local" name='end' value={novoEvento.end} onChange={handleChange}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                    <Collapse in={expanded}>
                        <div>
                            <div>
                                <Form.Group controlId="formBasicDesc">
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control type="text" placeholder="Digite a Descrição" name="desc" value={novoEvento.desc} onChange={handleChange}></Form.Control>
                                </Form.Group>
                            </div>
                            <Row>
                                <Col xs={3}>
                                    <Form.Group controlId="formBasicColor">
                                        <Form.Label>Cor</Form.Label>
                                        <Form.Control type="color" name="color" value={novoEvento.color} onChange={handleChange}></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={9}>
                                    <Form.Group controlId="formBasicTipo">
                                        <Form.Label>Tipo</Form.Label>
                                        <Form.Control type="text" placeholder="Digite o Tipo" name="tipo" value={novoEvento.tipo} onChange={handleChange}></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </Collapse>
                    <Button
                        variant='primary'
                        type='button'
                        onClick={handleToggleExpanded}
                        style={{marginTop: '10px', float: 'right'}}>
                            {expanded ? <i class="bi bi-chevron-double-up"></i>:<i class="bi bi-chevron-double-down"></i>}
                    </Button>
                    <Button
                        variant="success"
                        type="submit"
                        style={{marginTop: '10px', marginRight:'10px'}}
                        disabled={!novoEvento.title || !novoEvento.start || novoEvento.end}
                    >Salvar</Button>
            </Form>
        </div>
    )
}

export default Adicionar;