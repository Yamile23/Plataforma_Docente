import React, { useEffect, useState } from 'react'
import logo from './../img/logo.jpg'
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { guardarPermisos, sesionIniciada } from '../redux/loginSlice';
const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const token = useSelector(state => state.login.token)
    useEffect(() => {
        if (token === null) {

        }
    }, [token]);


    const enviarLogin = () => {


        const url = 'http://localhost:8000/api/login';
        const params = {
            email,
            password
        }
        axios.post(url, params)
            .then(response => {
                const token = response.data.access_token;
                dispatch(sesionIniciada(token));
                obtenerPermisos(token);
                history.push('/Inicio/');
            }).catch(error => {
                console.log(error);
                if (email && password) {
                    alert("Email o password incorrecto");
                } else {
                    alert("llene los campos requeridos");
                }

            });
    }
    const obtenerPermisos = (token) => {
        const url = 'http://127.0.0.1:8000/api/user';
        axios.get(url, {
            headers: {
                "Authorization": "Bearer " + token
                
            }
        })
            .then(response => {
                const roles = response.data.roles;
                let permisos = [];
                roles.forEach(rol => {
                    const permissions = rol.permissions.map(item => {
                        return {
                            id: item.id,
                            name: item.name
                        }
                    });
                    permissions.forEach(permiso => {
                        if (!permisos.includes(permiso)) {
                            permisos.push(permiso);
                        }
                    });
                });
                dispatch(guardarPermisos(permisos))
                //console.log("su permiso es "+roles)

                history.push('/Inicio/');
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mt-3">

                    <Card.Body>
                    <img className='img' src={logo} alt='logo'/>
                        <Card.Title>Iniciar Sesión</Card.Title>

                        <div><label>Email:</label></div>
                        <div><input className="form-control" type="email" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} /></div>
                        <div><label>Contraseña:</label></div>
                        <div><input className="form-control" type="password" value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }} /></div>

                        <button className="btn btn-primary mt-3" onClick={enviarLogin}>
                            Iniciar Sesión
                        </button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

    );
}

export default Login;