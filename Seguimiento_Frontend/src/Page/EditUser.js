import React, { useEffect, useState } from 'react'
import logo from './../img/logo.jpg'
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
const EditUser = (props) => {
    const { id } = props.match ? props.match.params : { id: 0 };
    const [rol, setRol] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [lista, setLista] = useState([]);
    const [insert, setInsert] = useState(false);
    const history = useHistory();

    const token = useSelector(state => state.login.token)
    useEffect(() => {
     
        if (token === null) {
            history.push('/login');
        }
    }, [token]);

    useEffect(() => {
        if (id === 0) {
            obtenerLista();
            return;
        }
        obtenerLista();
        fetchDatos(id);
        obtenerRol();
    }, [id]);

    const fetchDatos = (id) => {
        
        const url = 'http://127.0.0.1:8000/api/Lista/User/'+id;
        axios.get(url)
            .then((response) => {
                //debugger;
                const objUser = response.data;
                setName(objUser.username);
                setEmail(objUser.email);
                setRol(objUser.rol);
                setInsert(false);

            }).catch(error => {
                setInsert(true);
                console.log('error', error);
            });
    }
    const Restablecer =()=>{
        alert("Usuario Restablecido");
        const url = 'http://127.0.0.1:8000/api/restablcer/'+id+"/";
        axios.get(url)
            .then(response => {
                console.log('recibido', response.data);
                history.goBack();
            }).catch(error => {
                console.log(error);
            });
    }
   

    const obtenerLista = () => {
        axios.get('http://127.0.0.1:8000/api/ListaUser/')
            .then(response => {
                setLista(response.data);
            }).catch(error => {
                console.log('error', error);
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
    const enviarDatos = () => {
        //debugger;
        const url = 'http://127.0.0.1:8000/api/update/'+id+"/";
        const params = {
            "name": name,
            "email": email,
            "rol":rol
        }
        axios.put(url, params)
        .then(response => {
            history.goBack();
        }).catch(error => {
            console.log(error);
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
                        <label>{id}</label>
                        <div><label>Nombre:</label></div>
                        <div><input className="form-control" type="text" value={name} onChange={(e) => {
                            setName(e.target.value);
                        }} /></div>

                        <div><label>Email:</label></div>
                        <div><input className="form-control" type="email" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} /></div>

                        <button className="btn btn-primary mt-3" onClick={Restablecer}>
                            Restablecer
                        </button>

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

                        <button className="btn btn-primary mt-3" onClick={enviarDatos}>
                            Guardar
                        </button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
</div>
    );
}
export default EditUser;