<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     * Menampilkan halaman utama manajemen galeri dengan semua data foto.
     */
    public function index()
    {
        // Ambil semua data dari tabel galleries, diurutkan berdasarkan kolom 'order'
        $galleries = Gallery::orderBy('order')->get();
        
        // Render komponen React 'Admin/Galleries/Index' dan kirim data galleries sebagai props
        return Inertia::render('Admin/Galleries/Index', [
            'galleries' => $galleries
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * Menampilkan halaman dengan form untuk menambah foto baru.
     */
    public function create()
    {
        // Hanya perlu merender komponen form 'Create'
        return Inertia::render('Admin/Galleries/Create');
    }

    /**
     * Store a newly created resource in storage.
     * Menyimpan data foto baru yang dikirim dari form 'Create'.
     */
    public function store(Request $request)
    {
        // Validasi data yang masuk dari request
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048', // Wajib ada, harus gambar, max 2MB
            'caption' => 'nullable|string|max:255', // Tidak wajib, jika ada harus string
            'order' => 'required|integer', // Wajib ada, harus angka
        ]);

        // Simpan file gambar ke storage/app/public/gallery_images
        // 'public' menandakan disk yang digunakan (lihat config/filesystems.php)
        $path = $request->file('image')->store('gallery_images', 'public');

        // Buat record baru di database
        Gallery::create([
            'image_path' => $path,
            'caption' => $request->caption,
            'order' => $request->order,
        ]);

        // Redirect kembali ke halaman index dengan pesan sukses
        return redirect()->route('admin.galleries.index')->with('success', 'Foto berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     * Menampilkan halaman dengan form untuk mengedit foto yang sudah ada.
     */
    public function edit(Gallery $gallery)
    {
        // Render komponen React 'Admin/Galleries/Edit' dan kirim data foto spesifik yang akan diedit
        return Inertia::render('Admin/Galleries/Edit', [
            'gallery' => $gallery
        ]);
    }

    /**
     * Update the specified resource in storage.
     * Memperbarui data foto di database berdasarkan input dari form 'Edit'.
     */
    public function update(Request $request, Gallery $gallery)
    {
        // Validasi data yang masuk
        $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048', // Gambar tidak wajib diisi saat update
            'caption' => 'nullable|string|max:255',
            'order' => 'required|integer',
        ]);

        // Simpan path gambar yang sekarang
        $path = $gallery->image_path;

        // Cek jika ada file gambar baru yang di-upload
        if ($request->hasFile('image')) {
            // 1. Hapus gambar lama dari storage untuk menghemat ruang
            Storage::disk('public')->delete($gallery->image_path);
            
            // 2. Simpan gambar baru dan perbarui variabel $path
            $path = $request->file('image')->store('gallery_images', 'public');
        }

        // Update record di database dengan data baru
        $gallery->update([
            'image_path' => $path,
            'caption' => $request->caption,
            'order' => $request->order,
        ]);

        // Redirect kembali ke halaman index dengan pesan sukses
        return redirect()->route('admin.galleries.index')->with('success', 'Foto berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     * Menghapus foto dari database dan file dari storage.
     */
    public function destroy(Gallery $gallery)
    {
        // Hapus file gambar dari storage
        Storage::disk('public')->delete($gallery->image_path);
        
        // Hapus record dari database
        $gallery->delete();

        // Redirect kembali ke halaman index dengan pesan sukses
        return redirect()->route('admin.galleries.index')->with('success', 'Foto berhasil dihapus.');
    }
}