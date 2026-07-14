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
    Schema::create('projects', function (Blueprint $table) {
        $table->id();
        $table->string('name'); // Columna para el título del proyecto
        $table->text('description')->nullable(); // Descripción (puede dejarse en blanco)
        $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Relaciona el proyecto con el usuario que lo crea
        $table->timestamps(); // Crea automáticamente 'created_at' y 'updated_at'
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
