import React, { useEffect, useState } from 'react'
import logo from './../img/logo.jpg'
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
const Registro = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('');
    const [lista, setLista] = useState([]);
    const history = useHistory();

    const token = useSelector(state => state.login.token)
    useEffect(() => {

        if (token === null) {
            history.push('/login');
        }
    }, [token]);
    useEffect(() => {
        obtenerRol();
    }, []);
    const enviarDatos = () => {
        const url = 'http://127.0.0.1:8000/api/register/';
        const params = {
           "name": name,
            "email":email,
            "rol":rol
        }
        axios.post(url, params)
            .then(response => {
                history.push('/ListaUser/');
            }).catch(error => {
                alert('Debe llenar todos los espacios');
                console.log(error);
            });
    }
    
    const obtenerRol = () => {
        axios.get('http://127.0.0.1:8000/api/roles')
            .then(response => {
                setLista(response.data);
            }).catch(error => {
                console.log('error', error);
            });
    }

    return(
<div>
<Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mt-3">

                    <Card.Body>
                    <img className='img'  src={logo} alt='logo'/>
                        <Card.Title>Registro</Card.Title>

                        <div><label>Nombre:</label></div>
                        <div><input className="form-control" type="text" value={name} onChange={(e) => {
                            setName(e.target.value);
                        }} /></div>

                        <div><label>Email:</label></div>
                        <div><input className="form-control" type="email" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} /></div>
                        <div>
                        <select className="form-select" value={rol} onChange={(e) => {
                               setRol(e.currentTarget.value);
                         }}>
                             <option value="" disabled>Roles</option>
                        {lista.map(item =>
                        <option value={item.name}>
                            {item.name}
                        </option>
                      )}
                </select>
                        </div>
                        <button className="btn btn-primary mt-3" onClick={enviarDatos}>
                            Registrar
                        </button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
</div>
    );
}
export default Registro;