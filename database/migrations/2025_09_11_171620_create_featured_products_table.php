<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_featured_products_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('featured_products', function (Blueprint $table) {
            $table->id();
            // Kunci asing yang merujuk ke ID di tabel 'products'
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('custom_title')->nullable(); // Judul khusus jika perlu
            $table->text('custom_description')->nullable(); // Deskripsi khusus
            $table->integer('order')->default(0); // Untuk pengurutan
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('featured_products');
    }
};