import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Calendario() {
    const [listacalendario, setcalendario] = useState([]);
    /*  const [Posicion, setPosicion] = useState([]);
     const [DIALITERAL, setDIALITERAL] = useState(['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']);
     const [listaClas, setlistaClas] = useState([]);
     const [diaTexto, setdiaTexto] = useState([]); */
    const [Combinacion, setCombinacion] = useState([]);
    const [DiasClases, setDiasClases] = useState([]);
    const [año, setaño] = useState([]);
    const [festiva, setfestiva] = useState([]);

    useEffect(() => {
        Obtenerfecha();
    }, [])

    const dias = (año) => {
        var año = año.año;
        var dia = 0;
        var lista = [];

        for (let mesindex = 1; mesindex <= 12; mesindex++) {
            var diasMes = new Date(año, mesindex, 0).getDate();
            var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            for (var dia = 1; dia <= diasMes; dia++) {
                // Ojo, hay que restarle 1 para obtener el mes correcto
                var indice = new Date(año, mesindex - 1, dia).getDay();
                //console.log(`El día número ${dia} del mes ${mesindex} del año ${año} es ${diasSemana[indice]}`);
                lista.push({ mes: mesindex, dia: dia, dialiteral: diasSemana[indice], diaespecifico: indice });
            }

        }
        //console.log(lista);
        setcalendario(lista);
    };
    const ObtenerCombinacion = () => {
        //debugger;
        axios.get('http://127.0.0.1:8000/api/Combinacion')
            .then(reponse => {
                setCombinacion(reponse.data);
                //console.log(Combinacion);
            }).catch(error => {
                console.log(error);
            });
    }
    const ObtenerClases = () => {
        //debugger;
        axios.get('http://127.0.0.1:8000/api/Union')
            .then(reponse => {
                setDiasClases(reponse.data);
                //console.log(Combinacion);
            }).catch(error => {
                console.log(error);
            });
    }

    const Obtenerfecha = () => {
        //debugger;
        axios.get('http://127.0.0.1:8000/api/festivas/')
            .then(reponse => {
                //debugger;
                setfestiva(reponse.data);
            }).catch(error => {
                console.log(error);
            });
    }
    const enviarDatos = () => {
        //debugger;
        const params = {
            "año": año
        };

        dias(params);
        ObtenerCombinacion();
        ObtenerClases();
    }
    return (
        <div>
            <div className="filtro">
                <input className="form-control-mes" type="number" value={año} onChange={(e) => {
                    setaño(e.target.value);
                }} />
                <div className='filtro'>
                    <button className="btn btn-primary mt-3" onClick={enviarDatos}>
                        Filtrar
                    </button>
                </div>
            </div>
            <table className="table">

                <thead className='table-static'>
                    <tr>
                        <th>No</th>
                        <th>fecha</th>
                        <th>dia</th>
                        {Combinacion.map(convin =>
                            <th>{convin.Titulo}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {listacalendario.map((calendario) => {
                        let unaVez = 0;
                        let diasferiadosComponent;
                        let diasferiadosliteral;
                        let mes = '';
                        let dia = '';
                        let cantidadDiasCombinados = Combinacion.length;
                        var activo = Boolean(true);
                        var semi = Boolean(true);
                        if ((calendario.mes) < 10) {
                            mes = '0';
                        }
                        if ((calendario.dia) < 10) {
                            dia = '0';
                        }

                        {
                            //debugger;
                            let fechaRecorrida = `${año}-${mes + '' + calendario.mes}-${dia + '' + calendario.dia}`;
                            let isDateFestive = festiva.find(e => e.fecha == fechaRecorrida)
                            if (isDateFestive != undefined) {
                                diasferiadosComponent = <td style={{ color: 'red' }}>{año + '/' + calendario.mes + '/' + calendario.dia}</td>
                                diasferiadosliteral = <td style={{ color: 'red' }}>{calendario.dialiteral}</td>
                                activo = false;
                            } else {
                                diasferiadosComponent = <td>{año + '/' + calendario.mes + '/' + calendario.dia}</td>
                                diasferiadosliteral = <td>{calendario.dialiteral}</td>
                            }
                        }

                        return <tr>

                            <td >1</td>
                            {diasferiadosComponent}
                            {diasferiadosliteral}
                            {DiasClases.map((combinacion) => {
                                debugger;
                                if (activo) {
                                    let fechaInicio = new Date(combinacion.inicio);
                                    let IsInicioFecha = false;
                                    let splifecha = combinacion.inicio.split("-");
                                    if (año >= fechaInicio.getFullYear()) {
                                        if (`${mes}${calendario.mes}` >= splifecha[1]) {
                                            if (`${dia}${calendario.dia}` >= splifecha[2]) {
                                                IsInicioFecha = true;
                                            }
                                        }

                                    }

                                    if (!IsInicioFecha)
                                        return <td></td>
                                    if (combinacion.numero == (calendario.diaespecifico)) {
                                        unaVez = 0
                                            return <td>{combinacion.Session}</td> 

                                    } else {
                                        unaVez++
                                    }

                                    switch (combinacion.Session) {

                                        case "32":
                                            if (unaVez == 2) {
                                                unaVez = 0
                                                return <td></td>
                                            }
                                            break;
                                        case "16":
                                            if (unaVez == 1) {
                                                unaVez = 0
                                                return <td></td>
                                            }
                                            break;
                                        case "9":
                                            if (unaVez == 1) {
                                                unaVez = 0
                                                return <td></td>
                                            }
                                            break;
                                       /* default:
                                            if (!IsInicioFecha)
                                                return <td></td>
                                            if (combinacion.numero == (calendario.diaespecifico)) {
                                                unaVez = 0
                                                return <td>{combinacion.Session}</td>
                                            } else {
                                                unaVez++
                                            }
                                            break;*/
                                    }

                                } else {
                                    // se verifica la cantidad de combinaciones para cada dia, saber si retornar una columna con backgruod rojo
                                    if (cantidadDiasCombinados > 0) {
                                        cantidadDiasCombinados--;
                                        return <td style={{ background: 'red' }}></td>
                                    }

                                }
                            })}
                        </tr>
                    }
                    )}
                </tbody>

            </table>

        </div>
    )
}

export default Calendario