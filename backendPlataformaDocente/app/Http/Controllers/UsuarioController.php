<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class UsuarioController extends Controller
{
    public function updatePassword(Request $request){

        $validator = Validator::make($request->json()->all(),[
            'password'=>['required']
        ]);
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $user = $request->user();
        User::where('id', $user->id)->update(['password'=>bcrypt($request["password"])]);

        return response()->json($user->id);
    }
    public function ShowLogin(Request $request){
        $user = $request->user();
        User::where('id',$user);
        if($user==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        return response()->json($user);
    }
}
