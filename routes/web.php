<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Arahkan URL root (homepage) ke method 'home' di PageController
// Route::get('/', [PageController::class, 'home'])->name('home');

// Nanti kita akan tambahkan route lain di sini
Route::get('/menu', [PageController::class, 'menu'])->name('menu');
Route::get('/shop', [PageController::class, 'shop'])->name('shop');
Route::get('/location', [PageController::class, 'location'])->name('location');
Route::get('/reservasi', [PageController::class, 'reservasi'])->name('reservasi');

Route::get('/', [PageController::class, 'singlePage'])->name('home');



// GRUP ROUTE UNTUK ADMIN
Route::prefix('admin')
    ->middleware(['admin'])
    ->name('admin.')
    ->group(function () {

        // Route untuk admin dashboard
        Route::get('/dashboard', [\App\Http\Controllers\Admin\AdminController::class, 'dashboard'])->name('dashboard');
        Route::resource('sliders', \App\Http\Controllers\Admin\SliderController::class)->except(['show']);
        Route::resource('product-categories', \App\Http\Controllers\Admin\ProductCategoryController::class)->except(['show']);
        Route::resource('products', \App\Http\Controllers\Admin\ProductController::class)->except(['show']);
        // --- TAMBAHKAN INI ---
        Route::put('products/{product}/toggle-featured', [\App\Http\Controllers\Admin\ProductController::class, 'toggleFeatured'])->name('products.toggleFeatured');
        // ---------------------
        // --- TAMBAHKAN INI ---
    Route::resource('menu-pdfs', App\Http\Controllers\Admin\MenuPdfController::class)->except(['show']);
    Route::put('menu-pdfs/{menuPdf}/set-active', [App\Http\Controllers\Admin\MenuPdfController::class, 'setActive'])->name('menu-pdfs.setActive');
    // ---------------------

    // --- TAMBAHKAN INI ---
    Route::resource('testimonials', \App\Http\Controllers\Admin\TestimonialController::class)->except(['show']);
    Route::put('testimonials/{testimonial}/toggle-active', [\App\Http\Controllers\Admin\TestimonialController::class, 'toggleActive'])->name('testimonials.toggleActive');
    // ---------------------

        // --- TAMBAHKAN INI ---
        Route::resource('featured-products', \App\Http\Controllers\Admin\FeaturedProductController::class)->except(['show']);
        Route::put('testimonials/{testimonial}/toggle-active', [\App\Http\Controllers\Admin\TestimonialController::class, 'toggleActive'])->name('testimonials.toggleActive');

        // ---------------------

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

