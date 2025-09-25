<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OperationalHour;

class OperationalHourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hours = [
            ['day' => 'Senin-Jumat', 'hours' => '10:00 - 22:00', 'is_open' => true, 'sort_order' => 1],
            ['day' => 'Sabtu-Minggu', 'hours' => '10:00 - 22:00', 'is_open' => true, 'sort_order' => 2],
        ];

        foreach ($hours as $hour) {
            OperationalHour::create($hour);
        }
    }
}