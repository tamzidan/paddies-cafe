<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FeaturedProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeaturedProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/FeaturedProducts/Index', [
            // UBAH BARIS INI: Tambahkan '.category' untuk mengambil relasi kategori dari produk
            'featuredProducts' => FeaturedProduct::with('product.category')->orderBy('order')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/FeaturedProducts/Create', [
            'products' => Product::orderBy('name')->get(), // Kirim semua produk
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id|unique:featured_products,product_id',
            'order' => 'required|integer',
        ]);

        FeaturedProduct::create($request->all());

        return redirect()->route('admin.featured-products.index')->with('success', 'Produk Unggulan ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(FeaturedProduct $featuredProduct)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FeaturedProduct $featuredProduct)
    {
        // --- TAMBAHKAN BARIS INI ---
        // Muat relasi 'product' pada model $featuredProduct yang sudah didapat
        $featuredProduct->load('product');

        return Inertia::render('Admin/FeaturedProducts/Edit', [
            'featuredProduct' => $featuredProduct,
            'products' => Product::orderBy('name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FeaturedProduct $featuredProduct)
    {
        $request->validate([
            // product_id tidak bisa diubah, jadi tidak divalidasi di sini
            'order' => 'required|integer',
        ]);
        
        $featuredProduct->update($request->all());
        
        return redirect()->route('admin.featured-products.index')->with('success', 'Produk Unggulan diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FeaturedProduct $featuredProduct)
    {
        $featuredProduct->delete();
        return redirect()->route('admin.featured-products.index')->with('success', 'Produk Unggulan dihapus.');
    }
}
