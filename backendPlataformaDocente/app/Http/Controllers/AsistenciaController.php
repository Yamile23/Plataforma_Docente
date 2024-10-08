<?php

namespace App\Http\Controllers;

use App\Models\Asistencia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Rap2hpoutre\FastExcel\FastExcel;
use Symfony\Component\HttpFoundation\Response;

class AsistenciaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $listasistencia=Asistencia::all();
        return response()->json($listasistencia);
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->json()->all(),[
            "hr_llegada"=> ['string','required'],
            "fecha_class"=> ['date','required'],
            "programacion_id"=> ['string','required'],
            "user"=> ['required'],
        ]);
        if($validator->fails()){
            return response()->json($validator->messages(), Response::HTTP_BAD_REQUEST);
        }
        Asistencia::create($request->json()->all());
        $asistencia = new Asistencia($request->json()->all());
        return response()->json($asistencia);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Asistencia  $asistencia
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $asistencia =Asistencia::find($id);
        if($asistencia==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        return response()->json($asistencia);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Asistencia  $asistencia
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAsistenciaProgramacion($id)
    {
        $asistencia =Asistencia::where('programacion_id', $id)->orderby('updated_at','desc')->first();
        if($asistencia==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        return response()->json($asistencia);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Asistencia  $asistencia
     * @return \Illuminate\Http\Response
     */
    public function edit(Asistencia $asistencia)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Asistencia  $asistencia
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateAsis(Request $request, $id)
    {
        $asistencia =Asistencia::where('id', $id)->orderby('updated_at','desc')->first();
        if($asistencia==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        if($request->method()=='PUT'){
            $validator = Validator::make($request->json()->all(),[
                "hr_llegada"=> ['string'],
                "fecha_class"=> ['date'],
            ]);
        }else{
            $validator = Validator::make($request->json()->all(),[
                "hr_llegada"=> ['string'],
                "fecha_class"=> ['date'],
            ]);
        }
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $asistencia->fill($request->json()->all());
        $asistencia->save();
        return response()->json($asistencia);
    }
    public function update(Request $request, $id)
    {
        $asistencia =Asistencia::find($id);
        if($asistencia==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        if($request->method()=='PUT'){
            $validator = Validator::make($request->json()->all(),[
                "hr_llegada"=> ['string'],
                "fecha_class"=> ['date'],
            ]);
        }else{
            $validator = Validator::make($request->json()->all(),[
                "hr_llegada"=> ['string'],
                "fecha_class"=> ['date'],
            ]);
        }
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $asistencia->fill($request->json()->all());
        $asistencia->save();
        return response()->json($asistencia);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Asistencia  $asistencia
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $asistencia =Asistencia::find($id);
        if($asistencia==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        $asistencia->delete();
        return response()->json(['success'=>true]);
    }
    public function SeachFlash(Request $request)
    {
        $validator = Validator::make($request->json()->all(),[
            "programacion_id"=> ['string'],
            "fecha_class"=> ['string'],
        ]);
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $listamaterias=Asistencia::select('*')->where([
            ['programacion_id','=',$request->programacion_id],
            ['fecha_class','=',$request->fecha_class]
        ])
            ->get();

        return response()->json($listamaterias);
    }

}
