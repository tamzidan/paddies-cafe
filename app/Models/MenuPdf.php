<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class MenuPdf extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'file_path',
        'is_active',
    ];

    /**
     * Accessor untuk mendapatkan URL publik file PDF.
     */
    public function getUrlAttribute()
    {
        return $this->file_path ? Storage::url($this->file_path) : null;
    }
}