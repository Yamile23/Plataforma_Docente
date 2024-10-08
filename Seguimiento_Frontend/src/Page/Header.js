
import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  sesionCerrada } from '../redux/loginSlice';
import { useHistory } from 'react-router';
import { usuarioTienePermisos } from '../utils/roleUtils';
import axios from 'axios';

const Header = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState('');
    const history = useHistory();
    const token = useSelector(state => state.login.token);
    const permisos = useSelector(state => state.login.permisos_storage);
    const [permisoAdmin, SetpermisoAdmin] = useState(false);
    const [permisoUser, SetpermisoUser] = useState(false);
    const [permisoModel, SetpermisoUserModel] = useState(false);
    useEffect(() => {
        if (!token) {
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
        SetpermisoAdmin(usuarioTienePermisos("universal", JSON.parse(permisos)));
        SetpermisoUser(usuarioTienePermisos("modificar dato", JSON.parse(permisos)));
        SetpermisoUserModel(usuarioTienePermisos("insertar seguimiento docente",JSON.parse(permisos)));
        obtenerUser();
    }, [permisos]);

    const obtenerUser = () => {
        const url = 'http://127.0.0.1:8000/api/user';
        axios.get(url,{
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((response) => {
            const user = response.data;
            setUser(user.name);
        
        }).catch(error => {
            console.log('error', error);
        });
    }
    const cerrarSesion = () => {
        dispatch(sesionCerrada());
        window.location.reload(false);
    }

    

    

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                {token &&
                    <Container fluid>
                        <Navbar.Brand href="#">Seguimiento Docente</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link href="/Inicio/">Inicio</Nav.Link>
                                {(permisoModel) ? <div className='registro_listauser'>
                                <NavDropdown expand="lg" title="Programacion">
                                <NavDropdown.Item eventKey="2.3" className='programacion' href='/programacion/'>Asistencia Manual</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="2.3" className='programacion' href='/programacionRapido/'>Asistencia Rapida</NavDropdown.Item>
                                </NavDropdown>
                                </div> : ""}
                                <div id='content'>
                                <NavDropdown expand="lg" title="Asistencias">
                                {(permisoModel) ? <div className='registro_listauser'>
                                <NavDropdown.Item eventKey="2.1" className="reporteGeneral" href='/reporte/'>Asistencia General</NavDropdown.Item>
                                </div> : ""}
                                     <NavDropdown.Item eventKey="2.1" className="reporteDocente" href='/reporte/docente'>Asistencia por Docente</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="2.2" className="reporteCarrera" href='/reporteCarrera/'>Asistencia por Carrera</NavDropdown.Item>
                                </NavDropdown>
                                </div>
                                <div id='content'>
                                <NavDropdown expand="lg" title="Reportes">
                                <NavDropdown.Item eventKey="2.3" className='reporteDetalleMes' href='/reporteDetalleMes/'>Faltas y atrasos x Mes</NavDropdown.Item>
                                <NavDropdown.Item eventKey="2.3" className='reporteDetallePeriodo' href='/reportePeriodo/'>Faltas y atrasos x Periodo</NavDropdown.Item>
                                </NavDropdown>
                                </div>
                                
                                
                                {(permisoUser) ? <div className='administracion'>
                                <div id='content'>
                                <NavDropdown expand="lg" title="Administracion">
                                {(permisoAdmin) ? <div className='administracion'>
                                <NavDropdown.Item eventKey="2.3"  href="/registro/">Registro</NavDropdown.Item>
                                <NavDropdown.Item eventKey="2.3"  href="/TablaPermisos/">Permisos</NavDropdown.Item>
                                <NavDropdown.Item eventKey="2.3" href="/listauser/">Usuarios</NavDropdown.Item>
                                </div> : ""}
                                <NavDropdown.Item eventKey="2.3" href="/Generacion/">Generar Programacion</NavDropdown.Item>
                                </NavDropdown>
                                </div>
                                </div> : ""}
                                <div id='content'>
                                <NavDropdown expand="lg" title="Planificacion">
                                <NavDropdown.Item eventKey="2.3" href="/FechasFestivas">Crear Feriados</NavDropdown.Item>
                                <NavDropdown.Item eventKey="2.3" href="/CrearCombinacion/">Crear Combinacion</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="2.3" href="/Feriados/">Feriados</NavDropdown.Item>
                                <NavDropdown.Item eventKey="2.3" href="/Combinaciones/">Combinaciones</NavDropdown.Item>
                                <NavDropdown.Item eventKey="2.3" href="/calendario/">Calendario</NavDropdown.Item>
                                </NavDropdown>
                                </div>
                                
                                <div >
                                    
                                </div>
                                <div className="d-flex"id='content'>
                                <NavDropdown expand="lg" title={user}>
                                    <NavDropdown.Item eventKey="2.1"><button className="btn btn-link" onClick={cerrarSesion}>Cerrar sesión</button></NavDropdown.Item>
                                    <NavDropdown.Item eventKey="2.2" className='passconfig' href='/passconfig/'>User</NavDropdown.Item>
                                </NavDropdown>
                                </div>
                                
                            </Nav>
                            
                            
                        </Navbar.Collapse>
                    </Container>
                }

            </Navbar>
        </div>
    );
}

export default Header;

