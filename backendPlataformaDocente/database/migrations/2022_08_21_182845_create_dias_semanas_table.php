<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDiasSemanasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dias_semanas', function (Blueprint $table) {
            $table->id();
            $table->integer("numero");
            $table->string("Dia");
            $table->timestamps();
        });
        Schema::table("diacombinados", function (Blueprint $table){
            $table->unsignedBigInteger("dia_id")->nullable();
            $table->foreign("dia_id")->references("id")->on("dias_semanas")
                ->on("dias_semanas")->
                onUpdate('cascade')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dias_semanas');
    }
}
