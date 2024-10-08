import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';

const FormDiasC = () => {
    const { id } = useParams();
    const history = useHistory();
    const [setLista] = useState([]);
    const [Dia, setDia] = useState('');
    const [NumeralDia, setNumeralDia] = useState('');
    const [insert, setInsert] = useState(false);
    const [Semana, setSemana] = useState([]);

    useEffect(() => {
        ObtenerSemana();
    }, []);
    const ObtenerSemana = () => {
        //debugger;
        axios.get('http://127.0.0.1:8000/api/Dias/')
            .then(reponse => {
                setSemana(reponse.data);
            }).catch(error => {
                console.log(error);
            });
    }
    const enviarDatos = () => {
        const params = {
            "dia_id": Dia,
            "combinar_id": id,
        };
        debugger;
        Insertar(params);
    }
    const Insertar = (params) => {
        //debugger;
        const url = 'http://127.0.0.1:8000/api/Diascombinados/insert';
        axios.post(url, params)
            .then(response => {
                history.push('/Combinaciones/');
            }).catch(error => {
                alert('Debe llenar todos los espacios');
                console.log(error);
            });
    }

    return (

        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Dia de combinaciones</Card.Title>
                        <div><label>Titulo:</label></div>
                        <div>
                            <select className="form-select" value={Dia} onChange={(e) => {
                                setDia(e.currentTarget.value);
                            }}>
                                <option value="" disabled>Dia</option>
                                {Semana.map(item =>
                                    <option value={item.id}>
                                        {item.Dia}
                                    </option>
                                )}
                            </select>
                        </div>

                        <button className="btn btn-primary mt-3" onClick={enviarDatos}>
                            Guardar
                        </button>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default FormDiasC;