<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asistencia extends Model
{
    use HasFactory;
    protected $fillable=['hr_llegada','llegada_obs','hr_salidas','salida_obs','Observaciones','fecha_class','programacion_id','user'];
}
