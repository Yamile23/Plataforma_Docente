<?php

namespace App\Http\Controllers;

use App\Models\Roles;
use Illuminate\Http\Response;

class RolesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $role = roles::all();
        return response()->json($role);
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
     * @param  \App\Models\Roles  $roles
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $roles =roles::find($id);
        if($roles==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        return response()->json($roles);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Roles  $roles
     * @return \Illuminate\Http\Response
     */
    public function edit(Roles $roles)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Roles  $roles
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Roles $roles)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Roles  $roles
     * @return \Illuminate\Http\Response
     */
    public function destroy(Roles $roles)
    {
        //
    }
    public function showPermiso()
    {
        $RolUser =Roles::select('roles.id as rolid','roles.name as rol','permissions.id as permisoid','permissions.name as permiso')->join('role_has_permissions', 'role_has_permissions.role_id','=','roles.id')
            ->join('permissions','permissions.id','=','role_has_permissions.permission_id')
            ->get();

        if($RolUser==null){
            return response()->json(array("message"=> "Item not found"), Response::HTTP_NOT_FOUND);
        }
        return response()->json($RolUser);
    }
}
