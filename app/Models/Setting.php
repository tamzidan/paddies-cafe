<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    // --- TAMBAHKAN BARIS DI BAWAH INI ---
    protected $fillable = ['key', 'value'];
    // ------------------------------------
}