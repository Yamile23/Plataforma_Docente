<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diacombinado extends Model
{
    use HasFactory;
    protected $fillable=['dia_id','combinar_id'];
}
