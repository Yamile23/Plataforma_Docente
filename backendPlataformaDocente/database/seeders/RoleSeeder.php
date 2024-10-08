<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::create([
            'name' => 'admin',
            'email'=>'admin@admin.com',
            'password'=>bcrypt('admin!123')
        ]);


        $adminRole = Role::create([
            'name'=>'Administrador'
        ]);
        $moderadorRole = Role::create([
            'name'=>'Moderador'
        ]);
        $operador1Role = Role::create([
            'name'=>'Operador1'
        ]);
        $operador2Role = Role::create([
            'name'=>'Operador2'
        ]);
        $operador3Role = Role::create([
            'name'=>'Operador3'
        ]);

        $universal = Permission::create(['name'=> 'universal']);
        $modificarDato = Permission::create(['name'=> 'modificar dato']);
        $insertarDatos = Permission::create([ 'name' =>'insertar seguimiento docente']);
        $lectura = Permission::create(['name' => 'lectura docente asignaturas']);
        $updatedatos = Permission::create(['name' => 'Eliminar datos']);

        $adminRole->givePermissionTo($universal);
        $adminRole->givePermissionTo($modificarDato);
        $adminRole->givePermissionTo($insertarDatos);
        $adminRole->givePermissionTo($lectura);
        $adminRole->givePermissionTo($updatedatos);


        $moderadorRole->givePermissionTo($modificarDato);
        $moderadorRole->givePermissionTo($insertarDatos);
        $moderadorRole->givePermissionTo($lectura);
        $moderadorRole->givePermissionTo($updatedatos);

        $operador1Role->givePermissionTo($insertarDatos);
        $operador1Role->givePermissionTo($lectura);

        $operador2Role->givePermissionTo($lectura);

        $operador3Role->givePermissionTo($lectura);

        $admin->assignRole('Administrador');
    }
}
