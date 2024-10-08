<?php

use App\Http\Controllers\AsistenciaController;
use App\Http\Controllers\Authorization;
use App\Http\Controllers\CombinacionController;
use App\Http\Controllers\DiacombinadoController;
use App\Http\Controllers\DiasSemanaController;
use App\Http\Controllers\FestivaController;
use App\Http\Controllers\GeneracionController;
use App\Http\Controllers\ProgramacionController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\UsuarioController;
use App\Models\DiasSemana;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user();
    $dbUser = User::with('roles.permissions')->find($user->id);

    return $dbUser;
});
Route::get('roles',[RolesController::class,'index']);
Route::get("/showPermisos/",[RolesController::class,'showPermiso']);
Route::middleware('auth:sanctum')->get('/id', function (Request $request) {
    $user = $request->user();
    $dbUser = User::with('roles.permissions')->find($user->id);

    return $dbUser->id;
});

Route::middleware('auth:sanctum')->post('/usuario/update/password',[UsuarioController::class, 'updatePassword']);
Route::middleware('auth:sanctum')->post('/usuario/showlogin',[UsuarioController::class, 'ShowLogin']);


Route::get("/ListaUser/",[Authorization::class,'index']);
Route::post('/register/', [Authorization::class, 'create'])->name('create');
Route::match(['PUT','PATCH'],"/update/{id}",[Authorization::class,'update']);
Route::get("/Lista/User/{id}",[Authorization::class,'show']);
Route::get("/restablcer/{id}",[Authorization::class,'Restablecer']);
Route::post('/login', [Authorization::class, 'login'])->name('login');
Route::delete("/User/{id}",[Authorization::class,'destroy']);

//Generacion

Route::get("/Generacion/",[GeneracionController::class,'index']);
Route::post("/Generacion/filtrada",[GeneracionController::class,'getMateria']);
Route::get("/Generacion/periodo/ver",[GeneracionController::class,'periodo']);
//Programacion

Route::post("/programacion/insert",[ProgramacionController::class,'store']);
Route::get("/programacion/",[ProgramacionController::class,'index']);
Route::match(['PUT','PATCH'],"/programacion/{id}",[ProgramacionController::class,'update']);
Route::delete("/programacion/{id}",[ProgramacionController::class,'destroy']);
Route::get("/programacion/{id}",[ProgramacionController::class,'show']);
Route::get("/programacion/docente/ver",[ProgramacionController::class,'verDocenteProgramacion']);
Route::get("/programacion/periodo/ver",[ProgramacionController::class,'periodo']);
Route::get("/programacion/centro/ver",[ProgramacionController::class,'centro']);
Route::get("/programacion/dia/ver",[ProgramacionController::class,'dia']);
Route::post("/programacion/filtrada",[ProgramacionController::class,'getMateria']);
Route::get("/programacion/carreras/ver",[ProgramacionController::class,'VerCarreras']);

//Reportes
Route::get("/reporte/general",[ReporteController::class,'index']);
Route::post("/reporte/carreras",[ReporteController::class,'showCarrera']);
Route::post("/reporte/ver",[ReporteController::class,'showReporte']);

//Reporte x mes
Route::post("/reporte/minutos",[ReporteController::class,'getMinutos']);
Route::post("/reporte/faltas",[ReporteController::class,'getFaltas']);
Route::post("/reporte/detallefaltas",[ReporteController::class,'getDetallefalta']);
Route::post("/reporte/detalleMinutos",[ReporteController::class,'getDetalleMincontra']);

//Reporte x Periodo
Route::post("/reporte/minutos/Periodo",[ReporteController::class,'getMinutosPeriodo']);
Route::post("/reporte/faltas/Periodo",[ReporteController::class,'getFaltasPeriodo']);
Route::post("/reporte/detallefaltas/Periodo",[ReporteController::class,'getDetallefaltaPeriodo']);
Route::post("/reporte/detalleMinutos/Periodo",[ReporteController::class,'getDetalleMincontraPeriodo']);

//Seguimiento

Route::post("/asistencia/",[AsistenciaController::class,'store']);
Route::get("/asistencia/",[AsistenciaController::class,'index']);
Route::match(['PUT','PATCH'],"/asistencia/update/{id}",[AsistenciaController::class,'update']);
Route::delete("/asistencia/{id}",[AsistenciaController::class,'destroy']);
Route::get("/asistencia/{id}",[AsistenciaController::class,'show']);
Route::get("/asistencia/programacion/{id}",[AsistenciaController::class,'showAsistenciaProgramacion']);
Route::match(['PUT','PATCH'],"/admin/Update/{id}",[AsistenciaController::class,'updateAsis']);
Route::post("/Buscarapido/",[AsistenciaController::class,"SeachFlash"]);
//roles

Route::get("/ListaRoles/{id}",[RolesController::class,'showro']);

//Fechas festivas

Route::post("/festivas/insert",[FestivaController::class,'store']);
Route::get("/festivas/",[FestivaController::class,'index']);
Route::match(['PUT','PATCH'],"/festivas/{id}",[FestivaController::class,'update']);
Route::delete("/festivas/{id}",[FestivaController::class,'destroy']);
Route::get("/festivas/{id}",[FestivaController::class,'show']);
Route::post("/festivas/fechas",[FestivaController::class,'getFecha']);

//Dias de la combinacion

Route::post("/Diascombinados/insert",[DiacombinadoController::class,'store']);
Route::get("/Diascombinados/",[DiacombinadoController::class,'index']);
Route::get("/Diascombinados/{id}",[DiacombinadoController::class,'show']);
Route::match(['PUT','PATCH'],"/Diascombinados/{id}",[DiacombinadoController::class,'update']);
Route::delete("/Diascombinados/{id}",[DiacombinadoController::class,'destroy']);


//Combinacion

Route::post("/Combinacion/insert",[CombinacionController::class,'store']);
Route::get("/Combinacion/",[CombinacionController::class,'index']);
Route::match(['PUT','PATCH'],"/Combinacion/{id}",[CombinacionController::class,'update']);
Route::delete("/Combinacion/{id}",[CombinacionController::class,'destroy']);
Route::get("/Combinacion/{id}",[CombinacionController::class,'show']);
Route::get("/Union",[CombinacionController::class,'Union']);
Route::get("/Grupo",[CombinacionController::class,'Grupo']);
Route::get("/Grupo2",[CombinacionController::class,'Grupo2']);

//Dias de la semana

Route::post("/Dias/insert",[DiasSemanaController::class,'store']);
Route::get("/Dias/",[DiasSemanaController::class,'index']);
Route::get("/Dias/{id}",[DiasSemanaController::class,'show']);
