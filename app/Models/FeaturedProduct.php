<?php
// app/Models/FeaturedProduct.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FeaturedProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'custom_title',
        'custom_description',
        'order',
    ];

    /**
     * Mendefinisikan bahwa produk unggulan ini milik satu produk.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}