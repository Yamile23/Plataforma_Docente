<?php

namespace App\Http\Controllers;

use App\Models\Diacombinado;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class DiacombinadoController extends Controller
{
    public function index()
    {
        $listadias=Diacombinado::all();
        return response()->json($listadias);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->json()->all(),[
            "dia_id"=> ['required'],
            "combinar_id"=> ['required'],

        ]);
        if($validator->fails()){
            return response()->json($validator->messages(), Response::HTTP_BAD_REQUEST);
        }
        $diaCombinar=new Diacombinado($request->json()->all());
        $diaCombinar->save();
        return response()->json($diaCombinar);
    }
    public function show($id)
    {
        $diaCombinar =Diacombinado::find($id);
        if($diaCombinar==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        return response()->json($diaCombinar);
    }
    public function update(Request $request, $id)
    {
        $diaCombinar =Diacombinado::find($id);
        if($diaCombinar==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        if($request->method()=='PUT'){
            $validator = Validator::make($request->json()->all(),[
                "dia_id"=> ['required'],
                "combinar_id"=> ['required'],
            ]);
        }else{
            $validator = Validator::make($request->json()->all(),[
                "dia_id"=> ['required'],
                "combinar_id"=> ['required'],
            ]);
        }
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $diaCombinar->fill($request->json()->all());
        $diaCombinar->save();
        return response()->json($diaCombinar);
    }
    public function destroy($id)
    {
        $diaCombinar =Diacombinado::find($id);
        if($diaCombinar==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        $diaCombinar->delete();
        return response()->json(['success'=>true]);
    }
}
