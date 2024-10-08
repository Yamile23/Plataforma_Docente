import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useHistory } from 'react-router-dom';

const FormCombinacion = (props) => {
    const { id } = props.match ? props.match.params : { id: 0 };
    const history = useHistory();
    const [ setLista] = useState([]);
    const [Titulo, setTitulo] = useState('');
    const [Session, setSession] = useState('');
    const [Inicio, setInicio] = useState('');
    const [insert, setInsert] = useState(false);

    useEffect(() => {
        obtenerLista();
        fetchDatos(id);
    }, [id]);

    const fetchDatos = (id) => {
        
        const url = 'http://127.0.0.1:8000/api/Combinacion/'+id;
        axios.get(url)
            .then((response) => {
                const ObjCombinacion = response.data;
                setTitulo(ObjCombinacion.Titulo);
                setSession(ObjCombinacion.Session);
                setInicio(ObjCombinacion.Inicio);
                
                setInsert(false);
                
            }).catch(error => {
                setInsert(true);
                console.log('error', error);
            });
    }

    const obtenerLista = () => {
        axios.get('http://127.0.0.1:8000/api/Combinacion/')
            .then(response => {
                setLista(response.data);
            }).catch(error => {
                console.log('error', error);
            });

    }
    const enviarDatos = () => {
        const params = {
            "Titulo": Titulo,
            "Session": Session,
            "inicio": Inicio,
        };
        debugger;
        if (insert === true) {
            Insertar(params);
        } else {
            Actualizar(params);

        }
    }
    const Insertar = (params) => {
        //debugger;
        const url = 'http://127.0.0.1:8000/api/Combinacion/insert';
        axios.post(url, params)
            .then(response => {
                history.push('/Combinaciones/');
            }).catch(error => {
                alert('Debe llenar todos los espacios');
                console.log(error);
            });
    }
    const Actualizar = (params) => {
        //debugger;
        const url = 'http://127.0.0.1:8000/api/Combinacion/' + id + "/";
        axios.put(url, params)
            .then(response => {
                history.push('/Combinaciones/');
            }).catch(error => {
                console.log(error);
            });
    }

    return (

        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Crear combinaciones</Card.Title>
                        <div><label>Titulo:</label></div>
                        <div><input className="form-control" type="text" value={Titulo} onChange={(e) => {
                            setTitulo(e.target.value);
                        }} /></div>
                        <div><label>Sessiones:</label></div>
                        <div>
                            <input className="form-control" type="number" value={Session} onChange={(e) => {
                                setSession(e.target.value);
                            }} /> </div>
                        <div><label>Fecha de inicio:</label></div>
                        <div><input className="form-control" type="date" value={Inicio} onChange={(e) => {
                            setInicio(e.target.value);
                        }} /></div>
                        
                        <button className="btn btn-primary mt-3" onClick={enviarDatos}>
                            Guardar
                        </button>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default FormCombinacion;