<?php

namespace App\Http\Controllers;

use App\Models\Asistencia;
use App\Models\Programacion;
use App\Models\Reporte;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class ReporteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $listamaterias=Programacion::select('*','users.name as id_user')-> join('asistencias','asistencias.programacion_id','=','programacions.id')
            ->join('users','asistencias.user','=','users.id')
            //->groupby('semana')
            ->orderBy('fecha_class','desc')->groupby('semana')
            ->get();
        return response()->json($listamaterias);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Reporte  $reporte
     * @return \Illuminate\Http\Response
     */
    public function show(Reporte $reporte)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Reporte  $reporte
     * @return \Illuminate\Http\Response
     */
    public function edit(Reporte $reporte)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Reporte  $reporte
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Reporte $reporte)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reporte  $reporte
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reporte $reporte)
    {
        //
    }

    public function showReporte(Request $request)
    {
        $validator = Validator::make($request->json()->all(),[
            "docente"=> ['string','required'],
            "periodo"=> ['string','required']
        ]);
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $listamaterias=Programacion::join('asistencias','asistencias.programacion_id','=','programacions.id')
            ->where([
                ['docente','like','%'.$request->docente.'%'],
                ['periodo','=',$request->periodo]
                ])
            ->orderBy('fecha_class','desc') ->get();

        return response()->json($listamaterias);
    }
    public function showCarrera(Request $request)
    {
        $validator = Validator::make($request->json()->all(),[
            "carrera"=> ['string','required'],
            "periodo"=> ['string','required']
        ]);
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $listamaterias=Programacion::join('asistencias','asistencias.programacion_id','=','programacions.id')
            ->where([
                ['carrera','=',$request->carrera],
                ['periodo','=',$request->periodo]
            ])
            ->orderBy('fecha_class','desc') ->get();

        return response()->json($listamaterias);
    }
    public function getMinutos(Request $request)
    {
        $validator = Validator::make($request->json()->all(),[
            "docente"=> ['string']
        ]);
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $sumaLLegada=Asistencia::select(DB::raw('sum(asistencias.llegada_obs) as retraso,
        sum(asistencias.salida_obs)as anticipo , sum(asistencias.llegada_obs)+sum(asistencias.salida_obs) as total'))
            ->join('programacions','asistencias.programacion_id','=','programacions.id')
            ->whereMonth('asistencias.fecha_class','=',$request->mes)
            ->whereYear('asistencias.fecha_class','=',$request->year)
            ->where('programacions.docente','like','%'.$request->docente.'%')
            ->get()
            ;

        return response()->json($sumaLLegada);
    }
    public function getFaltas(Request $request)
    {
        $validator = Validator::make($request->json()->all(),[
            "docente"=> ['string']
        ]);
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $sumaLLegada=Asistencia::select(DB::raw('count(asistencias.hr_llegada)as faltas ,
        SUM(TIME_TO_SEC (TIMEDIFF (hr_salida, hr_ingreso)) / 3600 ) * "1,0" as suma'))
            ->join('programacions','asistencias.programacion_id','=','programacions.id')
            ->whereMonth('asistencias.fecha_class','=',$request->mes)
            ->whereYear('asistencias.fecha_class','=',$request->year)
            ->where([
                ['programacions.docente','like','%'.$request->docente.'%'],
                ['asistencias.hr_llegada','=','F']
            ])->get()
        ;

        return response()->json($sumaLLegada);
    }
    public function getDetallefalta(Request $request)
    {
        $validator = Validator::make($request->json()->all(),[
            "docente"=> ['string']
        ]);
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $sumaLLegada=Asistencia::select('*',DB::raw('TIMEDIFF(hr_salida,hr_ingreso)as Duracion'))
            ->join('programacions','asistencias.programacion_id','=','programacions.id')
            ->whereMonth('asistencias.fecha_class','=',$request->mes)
            ->whereYear('asistencias.fecha_class','=',$request->year)
            ->where([
                ['programacions.docente','like','%'.$request->docente.'%'],
                ['asistencias.hr_llegada','=','F']
            ])
            ->get();
        ;

        return response()->json($sumaLLegada);
    }
    public function getDetalleMincontra(Request $request)
    {
        $validator = Validator::make($request->json()->all(),[
            "docente"=> ['string']
        ]);
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $sumaLLegada=Asistencia::join('programacions','asistencias.programacion_id','=','programacions.id')
            ->whereMonth('asistencias.fecha_class','=',$request->mes)
            ->whereYear('asistencias.fecha_class','=',$request->year)
            ->where(function ($query){
                $query->where('asistencias.llegada_obs','!=','null')
                    ->orWhere('asistencias.salida_obs','!=','null');
            })
            ->where([

                ['programacions.docente','like','%'.$request->docente.'%'],
                ['asistencias.hr_llegada','!=','F']
            ])
            ->get();
        ;

        return response()->json($sumaLLegada);
    }

    ////////////////////////////////////////////////


    public function getMinutosPeriodo(Request $request)
    {
        $validator = Validator::make($request->json()->all(),[
            "docente"=> ['string'],
            "periodo"=> ['string']
        ]);
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $sumaLLegada=Asistencia::select(DB::raw('sum(asistencias.llegada_obs) as retraso,
        sum(asistencias.salida_obs)as anticipo , sum(asistencias.llegada_obs)+sum(asistencias.salida_obs) as total'))
            ->join('programacions','asistencias.programacion_id','=','programacions.id')
            ->where([
                ['programacions.docente','like','%'.$request->docente.'%'],
                ['periodo','=',$request->periodo]
                ])
            ->get()
        ;

        return response()->json($sumaLLegada);
    }
    public function getFaltasPeriodo(Request $request)
    {
        $validator = Validator::make($request->json()->all(),[
            "docente"=> ['string'],
            "periodo"=> ['string']
        ]);
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $sumaLLegada=Asistencia::select(DB::raw('count(asistencias.hr_llegada)as faltas ,
        SUM(TIME_TO_SEC (TIMEDIFF (hr_salida, hr_ingreso)) / 3600 ) * "1,0" as suma'))
            ->join('programacions','asistencias.programacion_id','=','programacions.id')
            ->where([
                ['programacions.docente','like','%'.$request->docente.'%'],
                ['periodo','=',$request->periodo],
                ['asistencias.hr_llegada','=','F']
            ])->get()
        ;

        return response()->json($sumaLLegada);
    }
    public function getDetallefaltaPeriodo(Request $request)
    {
        $validator = Validator::make($request->json()->all(),[
            "docente"=> ['string'],
            "periodo"=> ['string']
        ]);
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $sumaLLegada=Asistencia::select('*',DB::raw('TIMEDIFF(hr_salida,hr_ingreso)as Duracion'))
            ->join('programacions','asistencias.programacion_id','=','programacions.id')
            ->where([
                ['programacions.docente','like','%'.$request->docente.'%'],
                ['periodo','=',$request->periodo],
                ['asistencias.hr_llegada','=','F']
            ])
            ->get();
        ;

        return response()->json($sumaLLegada);
    }
    public function getDetalleMincontraPeriodo(Request $request)
    {
        $validator = Validator::make($request->json()->all(),[
            "docente"=> ['string'],
            "periodo"=> ['string']
        ]);
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $sumaLLegada=Asistencia::join('programacions','asistencias.programacion_id','=','programacions.id')
            ->where(function ($query){
                $query->where('asistencias.llegada_obs','!=','null')
                    ->orWhere('asistencias.salida_obs','!=','null');
            })
            ->where([

                ['programacions.docente','like','%'.$request->docente.'%'],
                ['periodo','=',$request->periodo],
                ['asistencias.hr_llegada','!=','F']
            ])
            ->get();
        ;

        return response()->json($sumaLLegada);
    }


}
