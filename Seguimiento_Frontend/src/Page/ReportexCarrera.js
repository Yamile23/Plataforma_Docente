
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router";
import { usuarioTienePermisos } from '../utils/roleUtils';
import { Link } from "react-router-dom";

const Reporte = () => {
    const [listaP, setListaP] = useState([]);
    const [listaC, setListaC] = useState([]);
    const [periodo, setperiodo] = useState('');
    const [carrera, setcarrera] = useState('');
    const [materias, setmaterias] = useState([]);
    const [cargando, setCargando] = useState(false);

    const permisos = useSelector(state => state.login.permisos_storage);
    const [permisoUser, SetpermisoUser] = useState(false);

    const history = useHistory();
    const token = useSelector(state => state.login.token)
    useEffect(() => {
        if (token === null) {
            history.push('/login');
        }
    }, [token]);

    useEffect(() => {
        
        if (!permisos) {
            return;
        }
        if (permisos.length === 0) {
            history.push('/login');
            return;
        }
        SetpermisoUser(usuarioTienePermisos("update datos", JSON.parse(permisos)));
        

    }, [permisos]);

    useEffect(() => {
        ObtenerListaCarreras();
        ObtenerPeriodo();
        obtenerMaterias();
    }, []);

    const ObtenerListaCarreras = () => {
        setCargando(true);
        axios.get('http://localhost:8000/api/programacion/carreras/ver')
            .then(reponse => {
                setCargando(false);
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
    const obtenerMaterias = (params) => {
        debugger;
        setCargando(true);
        axios.post('http://127.0.0.1:8000/api/reporte/carreras',params)
            .then(response => {
                setmaterias(response.data);
                setCargando(false);
            }).catch(error => {
                console.log('error', error);
            });

    }
    const enviarDatos = () => {
        const params = {
            "carrera": carrera,
            "periodo": periodo
        };
        if (carrera === "" && periodo === "") {
            console.log('error');
        } else {
            obtenerMaterias(params);
        }
    }
    
    return (
        <div>
            <div className="filtro">
                <select className="form-select" value={carrera} onChange={(e) => {
                    setcarrera(e.currentTarget.value);
                }}>
                    <option value="" disabled>Carrera</option>
                    {listaC.map(item =>
                        <option value={item.id}>
                            {item.carrera}
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
                    <button className="btn btn-primary mt-3" onClick={enviarDatos}>
                            Filtrar
                        </button>
                </div>
            </div>
            <div>
                {cargando === true && <h1>Cargando...</h1>}
                {cargando === false &&
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>Reporte</Card.Title>
                            <table className="table" id="tablaAsistencia">
                            
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Cod</th>
                                        <th>Docente</th>
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
                                        <th>Periodo</th>
                                        <th>Fecha</th>
                                        <th>Operador</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {materias.map(item =>
                                        <tr key={"item-" + item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.cod}</td>
                                            <td>{item.docente}</td>
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
                                            <td>{item.id_user}</td>
                                            {(permisoUser) ? <div className='registro_listauser'>
                                            <Link className="btn btn-primary" to={"/Admin/edit/"+item.id}>Editar</Link>
                                             </div> : ""}
                                            
                                        </tr>
                                    )}
                                </tbody>
                                </table>
                        </Card.Body>
                    </Card>
                }
            </div>

            <div align="center">
                <ReactHtmlTableToExcel 
                id="botonExportarExcel" 
                className="btn btn-success" 
                table="tablaAsistencia" 
                filename="ReporteSeguimiento"
                sheet ="pagina 1"
                buttonText="Exportar a Excel"
                />

            </div>
        </div>


    );
}

export default Reporte;