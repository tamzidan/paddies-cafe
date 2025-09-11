<?php

namespace Database\Seeders;

use App\Models\ProductCategory; // <-- Jangan lupa import
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str; // <-- Import Str

class ProductCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['Main Course', 'Rice Bowl', 'Snack', 'Pizza & Pasta', 'Coffee', 'Non-Coffee'];

        foreach ($categories as $category) {
            ProductCategory::create([
                'name' => $category,
                'slug' => Str::slug($category)
            ]);
        }
    }
}