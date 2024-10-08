<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Programacion extends Model
{
    use HasFactory;
    protected $fillable=['periodo','centro','cod','docente','materia','semana','grupo','Aula','dia','hr_ingreso','hr_salida','carrera'];
}
