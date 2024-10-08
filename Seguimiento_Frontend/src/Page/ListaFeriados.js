import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ListaFeriados = () => {

    const [Lista, setLista] = useState([]);
    const [cargando, setCargando] = useState(false);
    const token = useSelector(state => state.login.token)

    useEffect(() => {
        obtenerLista();
    });

    const obtenerLista = () => {
        debugger;
        axios.get('http://127.0.0.1:8000/api/festivas/')
            .then(response => {
                setLista(response.data);
            }).catch(error => {
                console.log('error', error);
            });

    }
    const Destroy = (id) => {
        const confirmation = window.confirm('¿Estas seguro que desea eliminar?');
        if (!confirmation) {
            return;
        }
        const url = 'http://127.0.0.1:8000/api/festivas/' + id + '/';
        axios.delete(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then((response) => {
                obtenerLista();
            }).catch(error => {
                console.log('error', error);
            });
    }

    return (

        <div>
            {cargando === true && <h1>Cargando...</h1>}
            {cargando === false &&
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Reporte de Feriados</Card.Title>
                        <table className="table" id="tablaAsistencia">

                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Detalle</th>
                                    <th>Fecha</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Lista.map(item =>
                                    <tr key={"item-" + item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.Detalle}</td>
                                        <td>{item.fecha}</td>
                                        <td>
                                            <Link className="btn btn-primary" to={"/FechasFestivas/" + item.id}>Editar</Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => { Destroy(item.id) }}>Eliminar</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            }
        </div>

    );
}

export default ListaFeriados;