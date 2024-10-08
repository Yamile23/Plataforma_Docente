<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class Authorization extends Controller
{
    public function store(Request $request)
    {
        request()->validate([
            'name'=> ['required'],
            'email'=>['required'],
            'password'=>['required']
        ]);
        User::create($request->all());
        $usernew=new User($request->json()->all());
        return response()->json($usernew);
    }
    public function create(Request $request){
        $validator = Validator::make($request->json()->all(),[
            'name'=> ['required','string'],
            'email'=>['required','string']
        ]);
        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $usuario= User::create([
            'name'=> $request->json('name'),
            'email'=>$request->json('email'),
            'password'=>bcrypt("nur123")
        ]);

        $usuario->assignRole($request->json('rol'));

        return response()->json($usuario);
    }
    public function update(Request $request, $id)
    {
        $usernew =User::find($id);
        if($usernew==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        if($request->method()=='PUT'){
            $validator = Validator::make($request->json()->all(),[
                'name'=> ['required'],
                'email'=>['required'],
            ]);
        }else{
            $validator = Validator::make($request->json()->all(),[
                'name'=> ['required'],
                'email'=>['required'],
            ]);
        }

        if($validator->fails()){
            return response()->json($validator->messages(),Response::HTTP_BAD_REQUEST);
        }
        $usernew->fill($request->json()->all());
        $usernew->syncRoles($request['rol']);
        $usernew->save();
        return response()->json($usernew);
    }

    public function index()
    {
        $listaUser=User::select('*','users.name as username','users.id as users')
            ->join('model_has_roles','model_has_roles.model_id','=','users.id')
            ->join('roles','roles.id','=','model_has_roles.role_id')
            ->get()
        ;
        return response()->json($listaUser);
    }
    public function Restablecer(Request $request, $id)
    {
        $usernew =User::find($id);
        if($usernew==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }

        $usernew["password"] = bcrypt("nur123");
        $usernew->fill($request->json()->all());
        $usernew->save();
        return response()->json($usernew);
    }
    public function show($id)
    {
        $UpUser =User::select('*','users.name as username','users.id as userid','roles.name as rol')
            ->join('model_has_roles', 'model_has_roles.model_id', '=','users.id')
            ->join('roles', 'roles.id','=','model_has_roles.role_id' )
            ->where('users.id','=', $id)->first();
        if($UpUser==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        return response()->json($UpUser);
    }
    public function login(Request $request){
        $creadencials = request(['email', 'password']);
        if (Auth::attempt($creadencials)){
            $user = $request->user();
            $token = $user->createToken('Personasl Access Token');
            return response()->json([
                "access_token"=>$token->plainTextToken
            ]);
        }else{
            return response()->json([
                "message"=>"Unauthenticated"
            ], 401);
        }
    }
    public function destroy($id)
    {
        $User =User::find($id);
        if($User==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        $User->delete();
        return response()->json(['success'=>true]);
    }
}
