<?php

namespace App\Http\Controllers;

use App\Models\MenuPdf;
use App\Models\Product;
use App\Models\ProductCategory;
// Tambahkan import model di atas
use App\Models\Slider; // <--- Impor model Slider kita
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
        
        // --- 2. TAMBAHKAN LOGIKA INI ---
        // Cari menu yang statusnya 'is_active' = true
        $activeMenu = MenuPdf::where('is_active', true)->first();
        // ---------------------------------

        return Inertia::render('CafeWebsite', [
            'sliders' => $sliders,
            'products' => $products,
            'categories' => $categories,
            // --- 3. KIRIM URL SEBAGAI PROP BARU ---
            'menuPdfUrl' => $activeMenu ? $activeMenu->url : null
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