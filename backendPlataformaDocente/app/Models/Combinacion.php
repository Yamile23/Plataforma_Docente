<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Combinacion extends Model
{
    use HasFactory;
    protected $fillable=['Titulo','Session','inicio'];
}
