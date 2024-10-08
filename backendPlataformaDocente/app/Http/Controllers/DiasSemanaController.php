<?php

namespace App\Http\Controllers;

use App\Models\DiasSemana;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class DiasSemanaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $listadias=DiasSemana::all();
        return response()->json($listadias);
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
            "numero"=> ['string','required'],
            "Dia"=> ['required','string'],

        ]);
        if($validator->fails()){
            return response()->json($validator->messages(), Response::HTTP_BAD_REQUEST);
        }
        $dia=new DiasSemana($request->json()->all());
        $dia->save();
        return response()->json($dia);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DiasSemana  $diasSemana
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $diasSemana =DiasSemana::find($id);
        if($diasSemana==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        return response()->json($diasSemana);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DiasSemana  $diasSemana
     * @return \Illuminate\Http\Response
     */
    public function edit(DiasSemana $diasSemana)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DiasSemana  $diasSemana
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DiasSemana $diasSemana)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DiasSemana  $diasSemana
     * @return \Illuminate\Http\Response
     */
    public function destroy(DiasSemana $diasSemana)
    {
        //
    }
}
