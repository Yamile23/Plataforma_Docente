<?php

namespace App\Http\Controllers;

use App\Models\Generacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use League\MimeTypeDetection\GeneratedExtensionToMimeTypeMap;
use Symfony\Component\HttpFoundation\Response;

class GeneracionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $listamaterias=Generacion::all();
        return response()->json($listamaterias);
    }
    public function getMateria(Request $request)
    {
        $validator = Validator::make($request->json()->all(),[
            "periodo"=> ['string'],
            "centro"=> ['string'],
            "dia"=> ['string']
        ]);
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $listamaterias=Generacion::select('*')->where([
            ['periodo','=',$request->periodo],
            ['centro','=',$request->centro]
        ])->get();

        return response()->json($listamaterias);
    }
    public function periodo(){
        $listaP = Generacion::select('periodo')->groupby('periodo')->get();
        return response()->json($listaP);
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
     * @param  \App\Models\Generacion  $generacion
     * @return \Illuminate\Http\Response
     */
    public function show(Generacion $generacion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Generacion  $generacion
     * @return \Illuminate\Http\Response
     */
    public function edit(Generacion $generacion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Generacion  $generacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Generacion $generacion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Generacion  $generacion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Generacion $generacion)
    {
        //
    }
}
