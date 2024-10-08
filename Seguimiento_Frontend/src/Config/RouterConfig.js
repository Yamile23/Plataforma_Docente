import React from "react";
import { Route, Switch } from "react-router";
import FormAsistencia from "../Page/FormAsistencia";
import Inicio from "../Page/Inicio";
import Login from "../Page/Login";
import ProgramacionMacadoM from "../Page/ProgramacionMarcadoM";
import ProgramacionMacadoR from "../Page/ProgramacionMarcadoR";
import Registro from "../Page/Registro";
import Reporte from "../Page/Reporte";
import Reportexmes from "../Page/Reportexmes";
import User from "../Page/User";
import EditUser from "../Page/EditUser";
import UserConfig from "../Page/UserConfig";
import FormAsistenciaAdm from "../Page/FormAsistenciaAdm";
import ReportexCarrera from "../Page/ReportexCarrera";
import ReportexDocente from  "../Page/ReportexDocente";
import ReportexPerido from "../Page/ReportePeriodo";
import TabPermisos from "../Page/TabPermisos";
import Generacion from "../Page/Generacion";
import Calendario from "../Page/Calendario";
import FormCombinacion from "../Page/FormCombinacion";
import ListaCombinacion from "../Page/ListaCombinacion";
import FormDiasC from "../Page/FormDiasC";
import Vertical from "../Page/Vertical";
import FormFestivo from "../Page/FormFestivo";
import ListaFeriados from "../Page/ListaFeriados";
const RouterConfig = () => {
    return (
        <Switch>
            <Route path="/FechasFestivas/:id" component={FormFestivo}>
            </Route>
            <Route path="/FechasFestivas" exact>
                <FormFestivo/>
            </Route>
            <Route path="/Feriados/" exact>
                <ListaFeriados />
            </Route>
            <Route path="/DiasAsignado/:id" component={FormDiasC}>
            </Route>
            <Route path="/Combinaciones/" exact>
                <ListaCombinacion />
            </Route>
            <Route path="/CrearCombinacion/" exact>
                <FormCombinacion />
            </Route>
            <Route path="/calendario/" exact>
                <Calendario />
            </Route>
            <Route path="/Generacion/" exact>
                <Generacion />
            </Route>
            <Route path="/asistencia/" exact>
                <FormAsistencia />
            </Route>
            <Route path="/asistencia/create/:id" component={FormAsistencia}>
            </Route>
            <Route path="/reporte/" exact>
                <Reporte />
            </Route>
            <Route path="/reporte/docente" exact>
                <ReportexDocente />
            </Route>
            <Route path="/reporteDetalleMes/" exact>
                <Reportexmes />
            </Route>
            <Route path="/reporteCarrera/" exact>
                <ReportexCarrera />
            </Route>
            <Route path="/reportePeriodo/" exact>
                <ReportexPerido />
            </Route>
            <Route path="/registro/" exact>
                <Registro />
            </Route>
            <Route path="/registro/edit/:id" component={EditUser}>
            </Route>
            <Route path="/Admin/edit/:id" component={FormAsistenciaAdm}>
            </Route>
            <Route path="/listauser/" exact>
                <User />
            </Route>
            <Route path="/programacion/" exact>
                <ProgramacionMacadoM />
            </Route>
            <Route path="/programacionRapido/" exact>
                <ProgramacionMacadoR />
            </Route>
            <Route path="/TablaPermisos/" exact>
                <TabPermisos/>
            </Route>
            <Route path="/passconfig/" exact>
                <UserConfig/>
            </Route>
            <Route path="/Inicio/" exact>
                <Inicio />
            </Route>
            <Route path="/">
                <Login />
            </Route>
        </Switch>
    );
}

export default RouterConfig;