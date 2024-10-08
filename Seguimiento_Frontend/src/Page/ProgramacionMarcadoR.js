import axios from "axios";
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import moment from "moment/moment";

const Programacion = () => {

    const [hr_llegada, sethr_llegada] = useState('');
    const [llegada_obs, setllegada_obs] = useState('');
    const [hr_salidas, sethr_salida] = useState('');
    const [salida_obs, setsalida_obs] = useState('');
    const [Observaciones, setObservaciones] = useState('');
    const [fecha_class, setfecha_class] = useState('');
    const [programacion_id, setprogramacion_id] = useState('');
    const [asisten_id, setasisten_id] = useState('');
    const [insert, setInsert] = useState(false);

    const [cargando, setCargando] = useState(false);
    const [listaP, setListaP] = useState([]);
    const [listaC, setListaC] = useState([]);
    const [listaD, setListaD] = useState([]);
    const [periodo, setperiodo] = useState('');
    const [centro, setcentro] = useState('');
    const [dia, setdia] = useState('');
    const [materias, setmaterias] = useState([]);
    const history = useHistory();
    const [user, setUser] = useState('');
    const token = useSelector(state => state.login.token)
    var estado = "flex";
    useEffect(() => {
        if (token === null) {
            history.push('/login');
        }

    }, [token]);

    useEffect(() => {
        //debugger;
        obtenerUser();
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
    const obtenerUser = () => {
        const url = 'http://127.0.0.1:8000/api/user';
        axios.get(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((response) => {
            const user = response.data;
            setUser(user.id);

        }).catch(error => {
            console.log('error', error);
        });
    }


    const fetchDatos = (id) => {
        debugger;
        let currentTime = new Date();
        let fecha_class = currentTime.toISOString().split('T')[0];
        const params = {
            "fecha_class": fecha_class,
            "programacion_id": id.toString()
        };
        axios.post('http://127.0.0.1:8000/api/Buscarapido/',params)
            .then((response) => {
                //debugger;
                const objseguimiento = response.data;
                setasisten_id(objseguimiento.id)
                sethr_llegada(objseguimiento.hr_llegada);
                setllegada_obs(objseguimiento.llegada_obs);
                sethr_salida(objseguimiento.hr_salidas);
                setsalida_obs(objseguimiento.salida_obs);
                setObservaciones(objseguimiento.Observaciones);
                setfecha_class(objseguimiento.fecha_class);
                setprogramacion_id(objseguimiento.programacion_id);
                setInsert(false);
                const confirmation = window.confirm("Ya Existe");
            if (!confirmation) {
                return;
            }
            }).catch(error => {
                setInsert(true);
                const confirmation = window.confirm("Nuevo");
            if (!confirmation) {
                return;
            }
                console.log('error', error);
            });
    }



    /* const Prueba =(hora,pr)=>{
         debugger;
         let currentTime = new Date();
         let splitdate = hora.split(':')
         let hrs=0;
         let min=0;
         let tex="";
         currentTime.setMinutes(currentTime.getMinutes()-10,59);
         if((currentTime.toLocaleTimeString())<=hora){
             tex="CH";
         }else{
             tex="A";
             min=currentTime.getMinutes()-splitdate[1];
         }
         const confirmation = window.confirm(tex +" "+currentTime.toLocaleTimeString()+" "+hora+" "+min);
         if (!confirmation) {
             return;
         }
     }*/
    const Ingreso = (hora, id) => {
        debugger;
        let currentTime = new Date();
        let fecha_class = currentTime.toISOString().split('T')[0];
        let splitdate = hora.split(':')
        let hrs = 0;
        let min = 0;
        let llegada_obs = 0;
        let hr_llegada = "";
        fetchDatos(id, fecha_class);
        currentTime.setMinutes(currentTime.getMinutes() - 10, 59);
        if ((currentTime.toLocaleTimeString()) <= hora) {
            hr_llegada = "CH";
        } else {
            hr_llegada = "A";
            hrs = (currentTime.getHours() - splitdate[0]) * 60;
            min = currentTime.getMinutes() - splitdate[1];
            llegada_obs = hrs + min;
        }
        const confirmation = window.confirm(hr_llegada + " " + llegada_obs + " " + fecha_class + " " + id + " " + user);
        if (!confirmation) {
            return;
        }
        const params = {
            "hr_llegada": hr_llegada,
            "llegada_obs": llegada_obs,
            "fecha_class": fecha_class,
            "programacion_id": id.toString(),
            "user": user,
        };

        if (insert === true) {
            insertarAsistencia(params);
            const confirmation = window.confirm("Nuevo");
            if (!confirmation) {
                return;
            }
        } else {
            const confirmation = window.confirm("Ya Marco Ingreso");
            if (!confirmation) {
                return;
            }
        }
    }
    const insertarAsistencia = (params) => {
        debugger;
        const url = 'http://127.0.0.1:8000/api/asistencia/';
        axios.post(url, params)
            .then(response => {
                //history.push('/programacionRapido/');
                window.location.reload(false);
            }).catch(error => {
                alert('Debe llenar todos los espacios');
                console.log(error);
            });
    }
    const actualizarAsistencia = (params) => {
        //debugger;
        const url = 'http://127.0.0.1:8000/api/asistencia/update/' + asisten_id + "/";
        axios.put(url, params)
            .then(response => {
                //history.push('/programacionRapido/');
                window.location.reload(false);
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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {materias.map((item, index) =>
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
                                            <button className="btn btn-primary" onClick={() => fetchDatos(item.id)}>Ingreso</button>
                                        </td>
                                        <td>
                                            <Link className="btn btn-primary" to={""}>Salida</Link>
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


