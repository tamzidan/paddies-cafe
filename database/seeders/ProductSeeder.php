<?php
// database/seeders/ProductSeeder.php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $mainCourseId = ProductCategory::where('slug', 'main-course')->first()->id;
        $snackId = ProductCategory::where('slug', 'snack')->first()->id;
        $coffeeId = ProductCategory::where('slug', 'coffee')->first()->id;

        Product::create([
            'product_category_id' => $mainCourseId,
            'name' => 'Nasi Goreng Kampung',
            'description' => 'Nasi goreng klasik dengan bumbu kampung, telur, dan suwiran ayam.',
            'price' => 25000,
            'image_path' => 'products/nasi-goreng.jpg', // <-- GAMBAR DITAMBAHKAN
            'delivery_link_1' => 'https://esborder.id/produk/nasi-goreng-kampung', // <-- LINK DELIVERY DITAMBAHKAN
            'delivery_link_2' => '#',
            'delivery_link_3' => '#',
        ]);

        Product::create([
            'product_category_id' => $mainCourseId,
            'name' => 'Sop Iga Bakar Meracik',
            'description' => 'Iga bakar empuk disajikan dengan kuah sop bening yang kaya rempah.',
            'price' => 45000,
            'image_path' => 'products/sop-iga.jpg', // <-- GAMBAR DITAMBAHKAN
            'delivery_link_1' => 'https://esborder.id/produk/sop-iga-bakar', // <-- LINK DELIVERY DITAMBAHKAN
            'delivery_link_2' => '#',
            'delivery_link_3' => '#',
        ]);

        Product::create([
            'product_category_id' => $snackId,
            'name' => 'Cireng Bumbu Rujak',
            'description' => 'Cireng renyah di luar dan kenyal di dalam, disajikan dengan bumbu rujak pedas manis.',
            'price' => 18000,
            'image_path' => 'products/cireng.jpg', // <-- GAMBAR DITAMBAHKAN
            'delivery_link_1' => 'https://esborder.id/produk/cireng-rujak', // <-- LINK DELIVERY DITAMBAHKAN
            'delivery_link_2' => '#',
            'delivery_link_3' => '#',
        ]);

        Product::create([
            'product_category_id' => $coffeeId,
            'name' => 'Butterscotch Sea Salt',
            'description' => 'Kopi susu creamy dengan sirup butterscotch manis dan sentuhan gurih dari sea salt.',
            'price' => 28000,
            'image_path' => 'products/kopi-butterscotch.jpg', // <-- GAMBAR DITAMBAHKAN
            'delivery_link_1' => 'https://esborder.id/produk/butterscotch-sea-salt-coffee', // <-- LINK DELIVERY DITAMBAHKAN
            'delivery_link_2' => '#',
            'delivery_link_3' => '#',
        ]);
    }
}