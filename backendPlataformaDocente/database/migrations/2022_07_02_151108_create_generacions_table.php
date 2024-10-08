<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGeneracionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Generacions', function (Blueprint $table) {
            $table->id();
            $table->string("periodo");
            $table->String("centro");
            $table->string("cod");
            $table->string("docente");
            $table->string("materia");
            $table->string("semana");
            $table->string("grupo");
            $table->string("Aula");
            $table->string("dia");
            $table->time("hr_ingreso");
            $table->time("hr_salida");
            $table->string("carrera");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('generacions');
    }
}
