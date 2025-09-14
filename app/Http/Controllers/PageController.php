<?php

namespace App\Http\Controllers;

use App\Models\FeaturedProduct;
use App\Models\Gallery;
use App\Models\MenuPdf;
// Tambahkan import model di atas
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Slider; // <--- Impor model Slider kita
use App\Models\Testimonial; // <-- Tambahkan ini di atas
use Illuminate\Http\Request;
use Inertia\Inertia; // <--- Impor Inertia

class PageController extends Controller
{
    /**
     * Menampilkan halaman Home dengan data slider.
     */
    public function home()
    {
        // Ambil semua data dari tabel sliders
        // Kita urutkan berdasarkan kolom 'order'
        $sliders = Slider::orderBy('order')->get();

        // Render komponen React 'Home' dan kirim data sliders sebagai props
        return Inertia::render('Home', [
            'sliders' => $sliders
        ]);
    }
    
    public function singlePage()
    {
        // Ambil data sliders, products, dan categories
        $sliders = Slider::orderBy('order')->get();
        $products = Product::with('category')->latest()->get();
        $categories = ProductCategory::all();
        $activeMenu = MenuPdf::where('is_active', true)->first();
        $testimonials = Testimonial::where('is_active', true)->latest()->get(); // <-- TAMBAHKAN INI

        // --- TAMBAHKAN INI ---
        $featuredProducts = FeaturedProduct::with('product.category') // Eager load product & category-nya
                                      ->orderBy('order')
                                      ->get();
        // --- TAMBAHKAN ATAU PASTIKAN BARIS INI ADA ---
        $galleries = Gallery::orderBy('order')->get();
        // ---------------------------------------------

        return Inertia::render('CafeWebsite', [
            'sliders' => $sliders,
            'products' => $products,
            'categories' => $categories,
            'menuPdfUrl' => $activeMenu ? $activeMenu->url : null,
            'testimonials' => $testimonials,
            'featuredProducts' => $featuredProducts, // <-- KIRIM SEBAGAI PROP
            'galleries' => $galleries, // <-- PASTIKAN ANDA MENGIRIM PROP INI
        ]);
    }


    /**
     * Menampilkan halaman Menu.
     */
    public function menu()
    {
        // Logika ini sudah kita pindahkan ke singlePage()
        $activeMenu = MenuPdf::where('is_active', true)->first();
        return Inertia::render('Menu', [
            'menuPdfUrl' => $activeMenu ? $activeMenu->url : null
        ]);
    }

    public function shop()
    {
        // Ambil semua produk, dan 'eager load' relasi kategori-nya
        // untuk menghindari N+1 problem.
        $products = Product::with('category')->latest()->get();

        // Ambil semua kategori untuk ditampilkan sebagai filter
        $categories = ProductCategory::all();

        return Inertia::render('Shop', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    /**
     * Menampilkan halaman Lokasi.
     */
    public function location()
    {
        return Inertia::render('Location');
    }

    /**
     * Menampilkan halaman Reservasi.
     */
    public function reservasi()
    {
        return Inertia::render('Reservasi');
    }
}