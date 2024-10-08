
import { Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import logo from './../img/logo.jpg';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

const UserConfig = (props) => {
    const token = useSelector(state => state.login.token)
    const history = useHistory();
    const [password,setPassword] = useState('');
    useEffect(() => {
        console.log("valor por defecto " + token);
        if (token === null) {
            history.push('/login');
        }
        console.log(token);
    }, [token]);

    const cambiarPassword = () =>{
        var params = {
            "password":password
        };
        console.log(token);
        const url = 'http://localhost:8000/api/usuario/update/password';
        axios.post(url,params, {
            headers: {
                "Authorization": "Bearer " + token
            }}
            )
            .then(response => {
                console.log('se cambio el  password correctamente' + response);
                history.push('/Inicio/');
            }).catch(error => {
                console.log(error);
            });
    };
return(
    <div>

<Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mt-3">

                    <Card.Body>
                    <img className='img'  src={logo} alt='logo'/>
                        <Card.Title>Registro</Card.Title>

                        <div><label>Contraseña:</label></div>
                        <div><input className="form-control" type="password" value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }} /></div>
                

                        <button className="btn btn-primary mt-3" onClick={cambiarPassword}>
                            Guardar
                        </button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

    </div>
)
}
 
export default UserConfig;