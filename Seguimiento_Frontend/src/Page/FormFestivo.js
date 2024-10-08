import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';

const FormFestivo = () => {
    const { id } = useParams();
    const history = useHistory();
    const [ setLista] = useState([]);
    const [Detalle, setDetalle] = useState('');
    const [fecha, setfecha] = useState('');
    const [insert, setInsert] = useState(false);

    useEffect(() => {
        obtenerLista();
        fetchDatos(id);
    }, [id]);

    const fetchDatos = (id) => {
        
        const url = 'http://127.0.0.1:8000/api/festivas/'+id;
        axios.get(url)
            .then((response) => {
                const ObjFeriado = response.data;
                setDetalle(ObjFeriado.Detalle);
                setfecha(ObjFeriado.fecha);
                
                setInsert(false);
                
            }).catch(error => {
                setInsert(true);
                console.log('error', error);
            });
    }

    const obtenerLista = () => {
        axios.get('http://127.0.0.1:8000/api/festivas/')
            .then(response => {
                setLista(response.data);
            }).catch(error => {
                console.log('error', error);
            });

    }
    const enviarDatos = () => {
        const params = {
            "Detalle": Detalle,
            "fecha": fecha,
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
        const url = 'http://127.0.0.1:8000/api/festivas/insert';
        axios.post(url, params)
            .then(response => {
                history.push('/Feriados/');
            }).catch(error => {
                alert('Debe llenar todos los espacios');
                console.log(error);
            });
    }
    const Actualizar = (params) => {
        //debugger;
        const url = 'http://127.0.0.1:8000/api/festivas/' + id + "/";
        axios.put(url, params)
            .then(response => {
                history.push('/Feriados/');
            }).catch(error => {
                console.log(error);
            });
    }

    return (

        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Crear Ferioados</Card.Title>
                        <div><label>Detalle:</label></div>
                        <div><input className="form-control" type="text" value={Detalle} onChange={(e) => {
                            setDetalle(e.target.value);
                        }} /></div>
                        <div><label>Fecha:</label></div>
                        <div><input className="form-control" type="date" value={fecha} onChange={(e) => {
                            setfecha(e.target.value);
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

export default FormFestivo;