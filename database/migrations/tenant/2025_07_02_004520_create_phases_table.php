<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('phases', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('formula_id');
            $table->string('name');
            $table->timestamps();

            $table->foreign('formula_id')->references('id')->on('formulas')->onDelete('cascade');
        });

        Schema::create('phase_ingredients', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('phase_id');
            $table->unsignedBigInteger('ingredient_id');
            $table->decimal('percentage_weight_per_weight', 5, 3)->nullable();
            $table->decimal('percentage_weight_per_volume', 5, 3)->nullable();
            $table->decimal('percentage_volume_per_volume', 5, 3)->nullable();
            $table->boolean('quantity_sufficient')->default(false);
            $table->timestamps();

            $table->foreign('phase_id')->references('id')->on('phases')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phases');
    }
};
