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
        Route::put('products/{product}/toggle-featured', [\App\Http\Controllers\Admin\ProductController::class, 'toggleFeatured'])->name('products.toggleFeatured');

        Route::resource('menu-pdfs', App\Http\Controllers\Admin\MenuPdfController::class)->except(['show']);
        Route::put('menu-pdfs/{menuPdf}/set-active', [App\Http\Controllers\Admin\MenuPdfController::class, 'setActive'])->name('menu-pdfs.setActive');

        Route::resource('testimonials', \App\Http\Controllers\Admin\TestimonialController::class)->except(['show']);
        Route::put('testimonials/{testimonial}/toggle-active', [\App\Http\Controllers\Admin\TestimonialController::class, 'toggleActive'])->name('testimonials.toggleActive');

        Route::resource('featured-products', \App\Http\Controllers\Admin\FeaturedProductController::class)->except(['show']);
        Route::put('testimonials/{testimonial}/toggle-active', [\App\Http\Controllers\Admin\TestimonialController::class, 'toggleActive'])->name('testimonials.toggleActive');

        Route::resource('galleries', \App\Http\Controllers\Admin\GalleryController::class)->except(['show']);

        Route::get('reservation-settings', [\App\Http\Controllers\Admin\ReservationSettingController::class, 'index'])->name('reservation-settings.index');
        Route::put('reservation-settings', [\App\Http\Controllers\Admin\ReservationSettingController::class, 'update'])->name('reservation-settings.update');

        // --- TAMBAHKAN ROUTE BARU DI SINI ---
        Route::get('operational-hours', [\App\Http\Controllers\Admin\OperationalHourController::class, 'index'])->name('operational-hours.index');
        Route::get('operational-hours/{operational_hour}/edit', [\App\Http\Controllers\Admin\OperationalHourController::class, 'edit'])->name('operational-hours.edit');
        Route::put('operational-hours/{operational_hour}', [\App\Http\Controllers\Admin\OperationalHourController::class, 'update'])->name('operational-hours.update');
        Route::put('operational-hours/{operational_hour}/toggle-open', [\App\Http\Controllers\Admin\OperationalHourController::class, 'toggleOpen'])->name('operational-hours.toggleOpen');
        // ------------------------------------

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

