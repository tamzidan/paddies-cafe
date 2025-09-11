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
        Schema::create('menu_pdfs', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Judul menu, misal: "Menu Utama Edisi Lebaran"
            $table->string('file_path'); // Path file PDF di storage
            $table->boolean('is_active')->default(false); // Penanda menu yang aktif
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_pdfs');
    }
};