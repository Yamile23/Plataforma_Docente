import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import axios from "axios";
const FormAsistenciaAdm = (props) => {
    const { id } = props.match ? props.match.params : { id: 0 };
    const history = useHistory();


    const [hr_llegada, sethr_llegada] = useState('');
    const [llegada_obs, setllegada_obs] = useState('');
    const [hr_salidas, sethr_salida] = useState('');
    const [salida_obs, setsalida_obs] = useState('');
    const [Observaciones, setObservaciones] = useState('');
    const [fecha_class, setfecha_class] = useState('');
    const [cargando_id,setCargando] = useState(false);
    const [insert, setInsert] = useState(false);
    const [ setLista] = useState([]);

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
    }, [id]);

    const fetchDatos = (id) => {
        
        const url = 'http://127.0.0.1:8000/api/asistencia/programacion/'+id+'/';
        axios.get(url)
            .then((response) => {
                debugger
                const objseguimiento = response.data;
                sethr_llegada(objseguimiento.hr_llegada);
                setllegada_obs(objseguimiento.llegada_obs);
                sethr_salida(objseguimiento.hr_salidas);
                setsalida_obs(objseguimiento.salida_obs);
                setObservaciones(objseguimiento.Observaciones);
                setfecha_class(objseguimiento.fecha_class);
                setInsert(false);
            }).catch(error => {
                debugger
                setInsert(true);
                console.log('error', error);
            });
    }

    const obtenerLista = () => {
        axios.get('http://127.0.0.1:8000/api/asistencia/')
            .then(response => {
                setLista(response.data);
                setCargando(false);
            }).catch(error => {
                console.log('error', error);
            });

    }

    const enviarDatos = () => {
        const url = 'http://127.0.0.1:8000/api/admin/Update/'+id+"/";
        const params = {
             "hr_llegada":hr_llegada,
             "llegada_obs":llegada_obs,
             "hr_salidas":hr_salidas,
            "salida_obs": salida_obs,
            "Observaciones":Observaciones,
             "fecha_class":fecha_class,
        }
        axios.put(url, params)
            .then(response => {
                history.goBack();
            }).catch(error => {
                console.log(error);
            });
         
    }
    
    return (
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Seguimiento</Card.Title>
                        <div>
                            {id}
                        </div>
                        <div><label>Estado de llegada:</label></div>
                        <div>
                            <select className="form-select" value={hr_llegada} onChange={(e) => {
                                sethr_llegada(e.currentTarget.value);
                            }}>
                                <option value="" disabled>Definir estado</option>
                                <option value="CH">Cumple Horario: CH</option>
                                <option value="CF">Clase fuera de Aula : CF</option>
                                <option value="CS">Clase Suspendida: CS</option>
                                <option value="F">Falta : F</option>
                                <option value="SA">Salida Anticipada: SA</option>
                                <option value="CR">Clase Reprogramada: CR</option>
                            </select>
                        </div>
                        <div><label>Obs. Llegada:</label></div>
                        <div>
                            <input className="form-control" type="number" value={llegada_obs} onChange={(e) => {
                                setllegada_obs(e.target.value);
                            }} /> </div>
                        <div><label>Estado de salida:</label></div>
                        <div>
                        <select className="form-select" value={hr_salidas} onChange={(e) => {
                                sethr_salida(e.currentTarget.value);
                            }}>
                                <option value="" disabled>Definir estado</option>
                                <option value="CH">Cumple Horario: CH</option>
                                <option value="CF">Clase fuera de Aula : CF</option>
                                <option value="CS">Clase Suspendida: CS</option>                                                                                                                                                                                                              <option value="F">Falta : F</option>
                                <option value="SA">Salida Anticipada: SA</option>
                                <option value="CR">Clase Reprogramada: CR</option>
                            </select>
                        </div>
                        <div><label>Obj. Salida:</label></div>
                        <div>
                            <input className="form-control" type="number" value={salida_obs} onChange={(e) => {
                                setsalida_obs(e.target.value);
                            }} />
                        </div>
                        <div><label>Observaciones:</label></div>
                        <div><input className="form-control" type="text" value={Observaciones} onChange={(e) => {
                            setObservaciones(e.target.value);
                        }} /></div>
                        <div><label>fecha:</label></div>
                        <div><input className="form-control" type="date"  value={fecha_class} onChange={(e) => {
                            setfecha_class(e.target.value);
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

export default FormAsistenciaAdm;