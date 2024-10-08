
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router";

const Reporte = () => {
    const [docente, setdocente] = useState([]);
    const [mes, setmes] = useState([]);
    const [year, setyear] = useState([]);
    const [lista, setLista] = useState([]);
    const [materias, setmaterias] = useState([]);
    const [contador, setcontador] = useState([]);
    const [suma, setsuma] = useState([]);
    const [minutos, setminutos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [periodo, setperiodo] = useState('');
    const [listaP, setListaP] = useState([]);
    const history = useHistory();
    const token = useSelector(state => state.login.token)
    useEffect(() => {
        if (token === null) {
            history.push('/login');
        }
    }, [token]);

    useEffect(() => {
        ObtenerPeriodo();
        ObtenerListaProgramacion();
    }, []);

    const ObtenerListaProgramacion = () => {
        setCargando(true);
        axios.get('http://127.0.0.1:8000/api/programacion/docente/ver')
            .then(reponse => {
                setCargando(false);
                setLista(reponse.data)
            }).catch(error => {
                console.log(error);
            });
    }
    const obtenerLisFalta = (params) => {
        debugger;
        setCargando(true);
        axios.post('http://127.0.0.1:8000/api/reporte/detallefaltas/Periodo',params)
            .then(response => {
                setmaterias(response.data);
                setCargando(false);
            }).catch(error => {
                console.log('error', error);
            });

    }
    const obtenerFaltas = (params) => {
        debugger;
        setCargando(true);
        axios.post('http://127.0.0.1:8000/api/reporte/faltas/Periodo',params)
            .then(response => {
                setcontador(response.data);
                setCargando(false);
            }).catch(error => {
                console.log('error', error);
            });

    }
    const obtenerMinutos= (params) => {
        debugger;
        setCargando(true);
        axios.post('http://127.0.0.1:8000/api/reporte/minutos/Periodo',params)
            .then(response => {
                setsuma(response.data);
                setCargando(false);
            }).catch(error => {
                console.log('error', error);
            });

    }

    const obtenerLisMin = (params) => {
        debugger;
        setCargando(true);
        axios.post('http://127.0.0.1:8000/api/reporte/detalleMinutos/Periodo',params)
            .then(response => {
                setminutos(response.data);
                setCargando(false);
            }).catch(error => {
                console.log('error', error);
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
    const enviarDatos = () => {
        const params = {
            "docente": docente,
            "periodo": periodo
        };
        if (docente === "" && periodo === "") {
            console.log('error');
        } else {
            obtenerLisFalta(params);
            obtenerFaltas(params);
            obtenerLisMin(params);
            obtenerMinutos(params);
        }
    }
    
    return (
        <div>
            <div className="filtro">
                <select className="form-select" value={docente} onChange={(e) => {
                    setdocente(e.currentTarget.value);
                }}>
                    <option value="" disabled>Docentes</option>
                    {lista.map(item =>
                        <option value={item.id}>
                            {item.docente}
                        </option>
                    )}
                </select>
                
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
                <div className='filtro'>
                <button className="btn btn-primary mt-3"  onClick={enviarDatos}>
                            Filtrar
                        </button>
                </div>
                
            </div>
            <div>
                {cargando === true && <h1>Cargando...</h1>}
                {cargando === false &&
                    <Card className="mt-3">
                        <Card.Body>
                        <table id='Reporte'>
                            <h3>Docente : {docente}</h3>
                            <Card.Title>Faltas:</Card.Title>
                            
                            <table className="table" id="tablaFaltas">
                                <thead>
                                    <tr>
                                        <th>Cod</th>
                                        <th>Periodo</th>
                                        <th>Materia</th>
                                        <th>Sem</th>
                                        <th>Gr</th>
                                        <th>Dia</th>
                                        <th>Ingreso</th>
                                        <th>Duracion</th>
                                        <th>Fecha</th>
                                        <th>Carrera</th>
                                        <th>Operador</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {materias.map(item =>
                                        <tr key={"item-" + item.id}>
                                            <td>{item.cod}</td>
                                            <td>{item.periodo}</td>
                                            <td>{item.materia}</td>
                                            <td>{item.semana}</td>
                                            <td>{item.grupo}</td>
                                            <td>{item.dia}</td>
                                            <td>{item.hr_llegada}</td>
                                            <td>{item.Duracion }</td>
                                            <td>{item.fecha_class}</td>
                                            <td>{item.carrera}</td>
                                            <td>{item.id_user}</td>
                                        </tr>
                                    )}
                                    {contador.map(item =>
                                    <tr>
                                        <td colSpan={5}><strong>Total :</strong></td>
                                        <td><strong>{item.faltas}</strong></td>
                                        <td><strong>{item.suma} hrs</strong></td>
                                    </tr>
                                     )}
                                </tbody>
                                </table>
                                <Card.Title>Minutos en contra:</Card.Title>
                                <table className="table" id="tablaMinutos">
                                <thead>
                                    <tr>
                                        <th>Cod</th>
                                        <th>Periodo</th>
                                        <th>Materia</th>
                                        <th>Sem</th>
                                        <th>Gr</th>
                                        <th>Dia</th>
                                        <th>Ingreso</th>
                                        <th>Obs</th>
                                        <th>salida</th>
                                        <th>Obs</th>
                                        <th>Nota</th>
                                        <th>Carrera</th>
                                        <th>Fecha</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {minutos.map(item =>
                                        <tr key={"item-" + item.id}>
                                            <td>{item.cod}</td>
                                            <td>{item.periodo}</td>
                                            <td>{item.materia}</td>
                                            <td>{item.semana}</td>
                                            <td>{item.grupo}</td>
                                            <td>{item.dia}</td>
                                            <td>{item.hr_llegada}</td>
                                            <td>{item.llegada_obs}</td>
                                            <td>{item.hr_salidas}</td>
                                            <td>{item.salida_obs}</td>
                                            <td>{item.Observaciones}</td>
                                            <td>{item.carrera}</td>
                                            <td>{item.fecha_class}</td>
                                            
                                        </tr>
                                    )}
                                    {suma.map(item =>
                                    <tr>
                                        <td colSpan={6}><strong>Total :</strong></td>
                                        <td><strong>{item.retraso}</strong></td>
                                        <td>+</td>
                                        <td><strong>{item.anticipo}</strong></td>
                                        <td><strong> = {item.total} min</strong></td>
                                    </tr>
                                     )}
                                </tbody>
                                </table>
                                </table>
                        </Card.Body>
                    </Card>
                }
            </div>

            <div align="center">
                <ReactHtmlTableToExcel 
                id="botonExportarExcel" 
                className="btn btn-success" 
                table="Reporte"
                filename="ReporteSeguimiento"
                sheet ="pagina 1"
                buttonText="Exportar a Excel"
                />

            </div>
        </div>


    );
}

export default Reporte;