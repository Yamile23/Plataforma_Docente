<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCombinacionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('combinacions', function (Blueprint $table) {
            $table->id();
            $table->string('Titulo');
            $table->string('Session');
            $table->date('inicio');
            $table->timestamps();
        });
        Schema::table("diacombinados", function (Blueprint $table){
            $table->unsignedBigInteger("combinar_id")->nullable();
            $table->foreign("combinar_id")->references("id")->on("combinacions")
                ->on("combinacions")->
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
        Schema::dropIfExists('combinacions');
    }
}
