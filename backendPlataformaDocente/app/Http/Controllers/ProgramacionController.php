<?php

namespace App\Http\Controllers;

use App\Models\Programacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class ProgramacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $listamaterias=Programacion::groupby('semana')->orderBy('hr_ingreso','asc')
            ->get();;
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {       $validator = Validator::make($request->json()->all(),[
            "periodo"=> ['required','string'],
            "centro"=> ['required','string'],
            "cod"=> ['required','string'],
            "docente"=> ['string'],
            "materia"=> ['required','string'],
            "semana"=> ['string'],
            "grupo"=> ['required','string'],
            "Aula"=> ['string'],
            "dia"=> ['required','string'],
            "hr_ingreso"=> ['required'],
            "hr_salida"=> ['required'],
            "carrera"=> ['required','string'],
        ]);
        if($validator->fails()){
            return response()->json($validator->messages(), Response::HTTP_BAD_REQUEST);
        }
        $programacion=new Programacion($request->json()->all());
        $programacion->save();
        return response()->json($programacion);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Programacion  $programacion
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $programacion =Programacion::find($id)->orderBy('asc');
        if($programacion==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        return response()->json($programacion);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Programacion  $programacion
     * @return \Illuminate\Http\Response
     */
    public function edit(Programacion $programacion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Programacion  $programacion
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $programacion =Programacion::find($id);
        if($programacion==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        if($request->method()=='PUT'){
            $validator = Validator::make($request->json()->all(),[
                "cod"=> ['required','string'],
                "docente"=> ['string'],
                "materia"=> ['required','string'],
                "semana"=> ['string'],
                "grupo"=> ['required','string'],
                "Aula"=> ['string'],
                "dia"=> ['required','string'],
                "hr_ingreso"=> ['required'],
                "hr_salida"=> ['required'],
                "carrera"=> ['required','string'],
            ]);
        }else{
            $validator = Validator::make($request->json()->all(),[
                "cod"=> ['required','string'],
                "docente"=> ['string'],
                "materia"=> ['required','string'],
                "semana"=> ['string'],
                "grupo"=> ['required','string'],
                "Aula"=> ['string'],
                "dia"=> ['required','string'],
                "hr_ingreso"=> ['required'],
                "hr_salida"=> ['required'],
                "carrera"=> ['required','string'],
            ]);
        }
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $programacion->fill($request->json()->all());
        $programacion->save();
        return response()->json($programacion);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Programacion  $programacion
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $programacion =Programacion::find($id);
        if($programacion==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        $programacion->delete();
        return response()->json(['success'=>true]);
    }
    public function verDocenteProgramacion()
    {
        $listamaterias=Programacion::select('docente')->orderBy('docente', 'asc')->groupBy('docente')->get();
        return response()->json($listamaterias);
    }
    public function VerCarreras()
    {
        $listamaterias=Programacion::select('carrera')->orderBy('carrera', 'asc')->groupBy('carrera')->get();
        return response()->json($listamaterias);
    }

    public function periodo(){
        $listaP = Programacion::select('periodo')->groupby('periodo')->get();
        return response()->json($listaP);
    }

    public function centro(){
        $lista=Programacion::select('centro')->groupby ('centro')->get();
        return response()->json($lista);
    }
    public function dia(){
        $lista=Programacion::select('dia')->groupby ('dia')->get();
        return response()->json($lista);
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
        $listamaterias=Programacion::select('*')->where([
            ['periodo','=',$request->periodo],
            ['centro','=',$request->centro]
            ])
            ->groupby('semana')
            ->get();

        return response()->json($listamaterias);
    }

}
