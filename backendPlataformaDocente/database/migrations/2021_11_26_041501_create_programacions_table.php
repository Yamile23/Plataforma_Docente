<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramacionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programacions', function (Blueprint $table) {
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
        Schema::table("asistencias", function (Blueprint $table){
            $table->unsignedBigInteger("programacion_id")->nullable();
            $table->foreign("programacion_id")->references("id")->on("programacions")
                ->on("programacions")->
                onUpdate('cascade')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {   Schema::table("asistencias", function (Blueprint $table){
        $table->dropForeign('asistencias_programacion_id_foreign');
        $table->dropColumn('programacion_id');
        });
        Schema::dropIfExists('programacions');
    }
}
