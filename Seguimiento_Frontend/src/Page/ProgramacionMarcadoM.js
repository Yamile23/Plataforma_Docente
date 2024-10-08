import axios from "axios";
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const Programacion = () => {
    const [cargando, setCargando] = useState(false);
    const [listaP, setListaP] = useState([]);
    const [listaC, setListaC] = useState([]);
    const [listaD, setListaD] = useState([]);
    const [periodo, setperiodo] = useState('');
    const [centro, setcentro] = useState('');
    const [dia, setdia] = useState('');
    const [materias, setmaterias] = useState([]);
    const history = useHistory();

    const token = useSelector(state => state.login.token)
    useEffect(() => {
        if (token === null) {
            history.push('/login');
        }
        
    }, [token]);

    useEffect(() => {
        //debugger;
        ObtenerListaProgramacion();
        ObtenerPeriodo();
        ObtenerCentro();
        ObtenerDia();
    }, []);

    const ObtenerListaProgramacion = () => {
        //debugger;
        setCargando(true);
        axios.get('http://127.0.0.1:8000/api/programacion/')
            .then(reponse => {
                setCargando(false);
                setmaterias(reponse.data)
            }).catch(error => {
                console.log(error);
            });
    }


    const obtenerMaterias = (params) => {
        //debugger;
        setCargando(true);
        axios.post('http://127.0.0.1:8000/api/programacion/filtrada', params)
            .then(response => {
                //console.log('response', response.data);
                setmaterias(response.data);
                setCargando(false);
            }).catch(error => {
                console.log('error', error);
                alert("No encuentra");
            });

    }

    const ObtenerCentro = () => {
        ///debugger;
        axios.get('http://127.0.0.1:8000/api/programacion/centro/ver')
            .then(reponse => {
                //console.log('response', reponse.data);
                setListaC(reponse.data)
            }).catch(error => {
                console.log(error);
            });
    }
    const ObtenerPeriodo = () => {
        //debugger;
        axios.get('http://127.0.0.1:8000/api/programacion/periodo/ver')
            .then(reponse => {
                setListaP(reponse.data)
            }).catch(error => {
                console.log(error);
            });
    }
    const ObtenerDia = () => {
        //debugger;
        axios.get('http://127.0.0.1:8000/api/programacion/dia/ver')
            .then(reponse => {
                // console.log('response', reponse.data);
                setListaD(reponse.data)
            }).catch(error => {
                console.log(error);
            });
    }


    const enviarDatos = () => {
        const params = {
            "periodo": periodo,
            "centro": centro,
            "dia": dia
        };
        //debugger;
        if (periodo === "" && centro === "" && dia === "") {
            console.log('error');
            alert("Debe seleccionar periodo , centro y dia");
        } else {
            obtenerMaterias(params);
        }
    }





    return (<div>

        <div className="filtro">
            <select className="form-select" value={periodo} onChange={(e) => {
                setperiodo(e.currentTarget.value);
            }}>
                <option value="" disabled>Periodo</option>
                {listaP.map(item =>
                    <option key={item.id} value={item.id}>
                        {item.periodo}
                    </option>
                )}
            </select>
            <select className="form-select" value={centro} onChange={(e) => {
                setcentro(e.currentTarget.value);
            }}>
                <option value="" disabled>Centro</option>
                {listaC.map(item =>
                    <option key={item.id} value={item.id}>
                        {item.centro}
                    </option>
                )}
            </select>
            <select className="form-select" value={dia} onChange={(e) => {
                setdia(e.currentTarget.value);
            }}>
                <option value="" disabled>Dia</option>
                {listaD.map(item =>
                    <option key={item.id} value={item.id}>
                        {item.dia}
                    </option>
                )}
            </select>
            <button className="btn btn-primary mt-3" onClick={enviarDatos}>
                Filtrar
            </button>
        </div>

        <div>
            {cargando === true && <h1>Cargando...</h1>}
            {cargando === false &&
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Programacion</Card.Title>
                        <table className="table">
                            <thead className='table-static'>
                                <tr>
                                    <th>Cod</th>
                                    <th>Docente</th>
                                    <th>Materia</th>
                                    <th>Gr</th>
                                    <th>Aula</th>
                                    <th>Dia</th>
                                    <th>Ingreso</th>
                                    <th>Salida</th>
                                    <th>Carrera</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {materias.map(item =>
                                    <tr key={item.id}>
                                        <td>{item.cod}</td>
                                        <td>{item.docente}</td>
                                        <td>{item.materia}</td>
                                        <td>{item.grupo}</td>
                                        <td>{item.Aula}</td>
                                        <td>{item.dia}</td>
                                        <td>{item.hr_ingreso}</td>
                                        <td>{item.hr_salida}</td>
                                        <td>{item.carrera}</td>
                                        <td>
                                            <Link className="btn btn-primary" to={"/asistencia/create/" + item.id}>Asistencia</Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            }
        </div>

    </div>
    );

}

export default Programacion;


