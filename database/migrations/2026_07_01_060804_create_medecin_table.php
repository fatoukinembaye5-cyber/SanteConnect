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
        Schema::create('medecins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('utilisateur_id')->unique()->constrained('utilisateurs')->cascadeOnDelete();
            $table->string('specialite')->nullable();
            $table->string('matricule')->unique()->nullable();
            $table->string('telephone')->nullable();
            $table->string('cabinet')->nullable();
            $table->text('adresse')->nullable();
            $table->string('statut')->default('actif');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medecins');
    }
};
