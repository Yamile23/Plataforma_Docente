import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ListaCombinacion = () => {

    const [Lista, setLista] = useState([]);
    const [cargando, setCargando] = useState(false);
    const token = useSelector(state => state.login.token)

    useEffect(() => {
        obtenerLista();
    });

    const obtenerLista = () => {
        debugger;
        axios.get('http://127.0.0.1:8000/api/Union/')
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
        const url = 'http://127.0.0.1:8000/api/Combinacion/' + id + '/';
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
                        <Card.Title>Reporte de Combinaciones</Card.Title>
                        <table className="table" id="tablaAsistencia">

                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Titulo</th>
                                    <th>Sesion</th>
                                    <th>Inicio</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Lista.map(item =>
                                    <tr key={"item-" + item.id}>
                                        <td>{item.id_com}</td>
                                        <td>{item.Titulo}</td>
                                        <td>{item.Session}</td>
                                        <td>{item.inicio}</td>
                                        <td>{item.Dia}</td>
                                        <td>
                                            <Link className="btn btn-primary" to={"/DiasAsignado/" + item.id_com}>Dia</Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => { Destroy(item.id_com) }}>Eliminar</button>
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

export default ListaCombinacion;