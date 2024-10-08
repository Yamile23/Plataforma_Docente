import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';
import { useSelector } from "react-redux";

const User = (props) => {
    const { id } = props.match ? props.match.params : { id: 0 };
    const [lista, setLista] = useState([]);
    const [cargando, setCargando] = useState(false);
    const history = useHistory();
    

    const token = useSelector(state => state.login.token)
    useEffect(() => {
        console.log("valor por defecto " + token);
        if (token === null) {
            history.push('/login');
        }
    }, [token]);
    useEffect(() => {
        ObtenerLista();
        
    }, []);
   

    const ObtenerLista = () => {
        setCargando(true);
        axios.get('http://127.0.0.1:8000/api/ListaUser/',{
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(reponse => {
                setCargando(false);
                setLista(reponse.data)
            }).catch(error => {
                if (error.response.status === 401) {
                    history.push('/login');
                }
            });
    }
    const Destroy = (id) => {
        const confirmation = window.confirm('¿Estas seguro que desea eliminar?');
        if (!confirmation) {
            return;
        }
        const url = 'http://127.0.0.1:8000/api/User/' + id + '/';
        axios.delete(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then((response) => {
                ObtenerLista();
            }).catch(error => {
                console.log('error', error);
            });
    }
    return( <div>
        {cargando === true && <h1>Cargando...</h1>}
        {cargando === false &&
            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>Usuarios</Card.Title>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista.map(item =>
                                <tr key={"item-" + item.users}>
                                    <td>{item.users}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.name}</td>
                                    <td>
                                    <Link className="btn btn-primary" to={"/registro/edit/"+item.users}>Editar</Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => { Destroy(item.users) }}>Eliminar</button>
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
export default User;