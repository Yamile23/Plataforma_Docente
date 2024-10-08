<?php

namespace App\Http\Controllers;

use App\Models\Festiva;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class FestivaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $listafechas=Festiva::all();
        return response()->json($listafechas);
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
            "Detalle"=> ['required','string'],
            "fecha"=> ['required','date'],

        ]);
        if($validator->fails()){
            return response()->json($validator->messages(), Response::HTTP_BAD_REQUEST);
        }
        $festiva=new Festiva($request->json()->all());
        $festiva->save();
        return response()->json($festiva);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Festiva  $festiva
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $festiva =Festiva::find($id);
        if($festiva==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        return response()->json($festiva);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Festiva  $festiva
     * @return \Illuminate\Http\Response
     */
    public function edit(Festiva $festiva)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Festiva  $festiva
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $festiva =Festiva::find($id);
        if($festiva==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        if($request->method()=='PUT'){
            $validator = Validator::make($request->json()->all(),[
                "Detalle"=> ['string'],
                "fecha"=> ['date'],
            ]);
        }else{
            $validator = Validator::make($request->json()->all(),[
                "Detalle"=> ['string'],
                "fecha"=> ['date'],
            ]);
        }
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $festiva->fill($request->json()->all());
        $festiva->save();
        return response()->json($festiva);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Festiva  $festiva
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $festiva =Festiva::find($id);
        if($festiva==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        $festiva->delete();
        return response()->json(['success'=>true]);
    }
    public function getFecha(Request $request)
    {
        $validator = Validator::make($request->json()->all(),[
            "fecha"=> ['date']
        ]);
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $fecha=Festiva::select('fecha')->where('festivas.fecha','like','%'.$request->fecha.'%')->get();

        return response()->json($fecha);
    }
}
