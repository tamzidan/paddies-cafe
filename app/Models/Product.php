<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo; // <-- Tambahkan import ini


class Product extends Model
{
    use HasFactory;

    // Pastikan fillable properties sudah ada jika belum,
    // seeder kita bekerja karena kita menggunakan create(), tapi ini best practice.
    protected $fillable = [
        'product_category_id',
        'name',
        'description',
        'price',
        'image_path',
        'delivery_link_1',
        'delivery_link_2',
        'delivery_link_3',
    ];

    /**
     * Mendefinisikan bahwa produk ini dimiliki oleh satu kategori.
     * Nama method (category) harus sama dengan yang kita panggil di with('category').
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class, 'product_category_id');
    }

}
