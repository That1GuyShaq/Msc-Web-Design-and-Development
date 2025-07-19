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
        Schema::create('ingredients', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index();
            $table->string('inci_name')->index();
            $table->string('cas_number')->index()->nullable();
            $table->string('ec_number')->index()->nullable();
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->enum('state_of_matter', ['liquid', 'solid', 'gas', 'powder']);
            $table->UnsignedBigInteger('created_by');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ingredients');
    }
};
