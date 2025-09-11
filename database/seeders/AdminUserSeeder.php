<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // database/seeders/AdminUserSeeder.php
        \App\Models\User::create([
            'name' => 'Admin Paddies Coffee',
            'email' => 'admin@paddiescafe.com',
            'password' => bcrypt('password'),
            'is_admin' => true,
        ]);
    }
}
