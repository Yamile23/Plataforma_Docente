<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Generacion extends Model
{
    use HasFactory;
    protected $fillable=['cod','docente','materia','semana','grupo','Aula','dia','hr_ingreso','hr_salida','carrera'];
}
