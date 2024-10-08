<?php

namespace App\Http\Controllers;

use App\Models\Combinacion;
use App\Models\Diacombinado;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class CombinacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $listaCombinados=Combinacion::all();
        return response()->json($listaCombinados);
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
            "Titulo"=> ['string'],
            "Session"=> ['integer'],
            "inicio"=> ['date'],

        ]);
        if($validator->fails()){
            return response()->json($validator->messages(), Response::HTTP_BAD_REQUEST);
        }
        $combinacion=new Combinacion($request->json()->all());
        $combinacion->save();
        return response()->json($combinacion);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Combinacion  $combinacion
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $combinacion =Combinacion::find($id);
        if($combinacion==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        return response()->json($combinacion);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Combinacion  $combinacion
     * @return \Illuminate\Http\Response
     */
    public function edit(Combinacion $combinacion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Combinacion  $combinacion
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $combinacion =Combinacion::find($id);
        if($combinacion==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        if($request->method()=='PUT'){
            $validator = Validator::make($request->json()->all(),[
                "Titulo"=> ['string'],
                "Session"=> ['integer'],
                "inicio"=> ['date'],
            ]);
        }else{
            $validator = Validator::make($request->json()->all(),[
                "Titulo"=> ['string'],
                "Session"=> ['integer'],
                "inicio"=> ['date'],
            ]);
        }
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $combinacion->fill($request->json()->all());
        $combinacion->save();
        return response()->json($combinacion);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Combinacion  $combinacion
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $combinacion =Combinacion::find($id);
        if($combinacion==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        $combinacion->delete();
        return response()->json(['success'=>true]);
    }
    public function Union()
    {
        $listaCombinados=Diacombinado::select('*','combinacions.id as id_com')
            ->rightjoin('combinacions','diacombinados.combinar_id','=','combinacions.id')
           ->leftjoin('dias_semanas','dias_semanas.id','=','diacombinados.dia_id')
            ->orderBy('combinacions.id','asc')
            ->get();
        return response()->json($listaCombinados);
    }
    public function Grupo()
    {
        $listaCombinados=Diacombinado::select('*','combinacions.id as id_com')
            -> join('combinacions','diacombinados.combinar_id','=','combinacions.id')
            ->join('dias_semanas','dias_semanas.id','=','diacombinados.dia_id')
            ->groupby('combinacions.id')
            ->get();
        return response()->json($listaCombinados);
    }
    public function Grupo2()
    {
        $listaCombinados=Diacombinado::select('*','combinacions.id as id_com')
            -> join('combinacions','diacombinados.combinar_id','=','combinacions.id')
            ->join('dias_semanas','dias_semanas.id','=','diacombinados.dia_id')
            ->get();
        return response()->json($listaCombinados);
    }
}
