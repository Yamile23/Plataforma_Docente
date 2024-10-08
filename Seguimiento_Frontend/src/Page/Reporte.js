
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router";
import { usuarioTienePermisos } from '../utils/roleUtils';
import { Link } from "react-router-dom";

const Reporte = () => {
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
        SetpermisoUser(usuarioTienePermisos("modificar dato", JSON.parse(permisos)));
        

    }, [permisos]);

    useEffect(() => {
        ObtenerAsistenciaGeneral();
    }, []);
    const ObtenerAsistenciaGeneral = () => {
        //debugger;
        setCargando(true);
        axios.get('http://127.0.0.1:8000/api/reporte/general')
            .then(reponse => {
                setCargando(false);
                setmaterias(reponse.data)
            }).catch(error => {
                console.log(error);
            });
    }
    return (
        <div>
            <div>
                {cargando === true && <h1>Cargando...</h1>}
                {cargando === false &&
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>Reporte de Asistencia</Card.Title>
                            <table className="table" id="tablaAsistencia">
                            
                                <thead className='table-static'>
                                    <tr>
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
                                            <td>{item.periodo}</td>
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