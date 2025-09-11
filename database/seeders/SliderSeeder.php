<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Slider;

class SliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Slider::create([
            'image_path' => 'sliders/slide1.jpg',
            'title' => 'Pemandangan Sawah',
            'order' => 1,
        ]);

        Slider::create([
            'image_path' => 'sliders/slide2.jpg',
            'title' => 'Kopi Pilihan',
            'order' => 2,
        ]);

        Slider::create([
            'image_path' => 'sliders/slide3.jpg',
            'title' => 'Suasana Sore Hari',
            'order' => 3,
        ]);
    }
}
