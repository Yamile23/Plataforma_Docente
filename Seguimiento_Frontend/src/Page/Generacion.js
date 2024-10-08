import axios from "axios";
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const Programacion = () => {
    const [cargando, setCargando] = useState(false);
    const [listaP, setListaP] = useState([]);
    const [periodo, setperiodo] = useState('');
    const [centro, setcentro] = useState('');
    const [dia, setdia] = useState('');
    const [materias, setmaterias] = useState([]);
    const history = useHistory();


    const [Tabperiodo, setTabperiodo] = useState('');
    const [Tabcentro, setTabcentro] = useState('');
    const [Tabcod, setTabcod] = useState('');
    const [Tabdocente, setTabdocente] = useState('');
    const [Tabmateria, setTabmateria] = useState('');
    const [Tabsemana, setTabsemana] = useState('');
    const [Tabgrupo, setTabgrupo] = useState('');
    const [Tabaula, setTabaula] = useState('');
    const [Tabdia, setTabdia] = useState('');
    const [Tabingreso, setTabingreso] = useState('');
    const [Tabsalida, setTabsalida] = useState('');
    const [Tabcarrera, setTabcarrera] = useState('');

    const token = useSelector(state => state.login.token)
    useEffect(() => {
        if (token === null) {
            history.push('/login');
        }

    }, [token]);

    useEffect(() => {
        //debugger;
        ObtenerPeriodo();

    }, []);




    const obtenerMaterias = (params) => {
        //debugger;
        setCargando(true);
        axios.post('http://127.0.0.1:8000/api/Generacion/filtrada', params)
            .then(response => {
                //console.log('response', response.data);
                setmaterias(response.data);
                setCargando(false);
            }).catch(error => {
                console.log('error', error);
                alert("No encuentra");
            });

    }


    const ObtenerPeriodo = () => {
        //debugger;
        axios.get('http://127.0.0.1:8000/api/Generacion/periodo/ver')
            .then(reponse => {
                setListaP(reponse.data)
            }).catch(error => {
                console.log(error);
            });
    }


    const enviarDatos = () => {
        const params = {
            "periodo": periodo,
            "centro": centro
        };
        //debugger;
        if (periodo === "" && centro === "") {
            console.log('error');
            alert("Debe seleccionar periodo y centro");
        } else {
            obtenerMaterias(params);
        }
    }
    const insertar = () => {
        debugger;
        const url = 'http://127.0.0.1:8000/api/programacion/insert';
        const params = {
            "periodo": Tabperiodo,
            "centro": Tabcentro,
            "cod": Tabcod,
            "docente": Tabdocente,
            "materia": Tabmateria,
            "semana": Tabsemana,
            "grupo": Tabgrupo,
            "Aula": Tabaula,
            "dia": Tabcarrera,
            "hr_ingreso": Tabdia,
            "hr_salida": Tabingreso,
            "carrera": Tabsalida,
            "dia": Tabcarrera,
        }
        axios.put(url, params)
            .then(response => {
                history.goBack();
            }).catch(error => {
                console.log(error);
            });

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
                <option value="000" >000-Presencial</option>
                <option value="010" >010-A Distancia</option>
            </select>
            <button className="btn btn-primary mt-3" onClick={enviarDatos}>
                Cargar
            </button>
        </div>

        <div>
            {cargando === true && <h1>Cargando...</h1>}
            {cargando === false &&
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Programacion</Card.Title>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Periodo</th>
                                    <th>Cod</th>
                                    <th>Docente</th>
                                    <th>Materia</th>
                                    <th>Sem</th>
                                    <th>Gr</th>
                                    <th>Aula</th>
                                    <th>Dia</th>
                                    <th>Ingreso</th>
                                    <th>Salida</th>
                                    <th>Carrera</th>
                                </tr>
                            </thead>
                            <tbody>
                                {materias.map(item =>
                                    <tr key={item.id}>
                                        <td >{item.id}</td>
                                        <td>
                                            <input className="form-control" type="text" value={item.periodo} onChange={(e) => {
                                                setTabperiodo(e.target.value);
                                            }} />
                                        </td>
                                        <td>
                                            <input className="form-control" type="text" value={item.cod} onChange={(e) => {
                                                setTabcod(e.target.value);
                                            }} />
                                        </td>
                                        <td>
                                            <input className="form-control" type="text" value={item.docente} onChange={(e) => {
                                                setTabdocente(e.target.value);
                                            }} />
                                        </td>
                                        <td>
                                            <input className="form-control" type="text" value={item.materia} onChange={(e) => {
                                                setTabmateria(e.target.value);
                                            }} />
                                        </td>
                                        <td >
                                            <input className="form-control" type="text" value={item.semana} onChange={(e) => {
                                                setTabsemana(e.target.value);
                                            }} />
                                        </td>
                                        <td>
                                            <input className="form-control" type="text" value={item.grupo} onChange={(e) => {
                                                setTabgrupo(e.target.value);
                                            }} />
                                        </td>
                                        <td >
                                            <input className="form-control" type="text" value={item.Aula} onChange={(e) => {
                                                setTabaula(e.target.value);
                                            }} />
                                        </td>
                                        <td>
                                            <input className="form-control" type="text" value={item.dia} onChange={(e) => {
                                                setTabdia(e.target.value);
                                            }} />
                                        </td>
                                        <td >
                                            <input className="form-control" type="text" value={item.hr_ingreso} onChange={(e) => {
                                                setTabingreso(e.target.value);
                                            }} />
                                        </td>
                                        <td>
                                            <input className="form-control" type="text" value={item.hr_salida} onChange={(e) => {
                                                setTabsalida(e.target.value);
                                            }} />
                                        </td>
                                        <td>
                                            <input className="form-control" type="text" value={item.carrera} onChange={(e) => {
                                                setTabcarrera(e.target.value);
                                            }} />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            }
        </div>
        <div>
            <button className="btn btn-primary mt-3" id="btn-generacion" onClick={insertar}>
                Generar
            </button>
        </div>
    </div>
    );

}

export default Programacion;


