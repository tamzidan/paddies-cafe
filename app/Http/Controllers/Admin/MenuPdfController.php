<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuPdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MenuPdfController extends Controller
{
    public function index()
    {
        $menus = MenuPdf::latest()->get();
        return Inertia::render('Admin/MenuPdfs/Index', [
            'menus' => $menus,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/MenuPdfs/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf|max:20000', // Maks 5MB
        ]);

        $filePath = $request->file('file')->store('menus', 'public');

        MenuPdf::create([
            'title' => $request->title,
            'file_path' => $filePath,
        ]);

        return redirect()->route('admin.menu-pdfs.index')->with('success', 'Menu PDF berhasil ditambahkan.');
    }

    public function edit(MenuPdf $menuPdf)
    {
        return Inertia::render('Admin/MenuPdfs/Edit', [
            'menu' => $menuPdf,
        ]);
    }

    public function update(Request $request, MenuPdf $menuPdf)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'file' => 'nullable|file|mimes:pdf|max:5120', // Boleh kosong saat update
        ]);

        $filePath = $menuPdf->file_path;

        if ($request->hasFile('file')) {
            // Hapus file lama
            if ($menuPdf->file_path) {
                Storage::disk('public')->delete($menuPdf->file_path);
            }
            // Simpan file baru
            $filePath = $request->file('file')->store('menus', 'public');
        }

        $menuPdf->update([
            'title' => $request->title,
            'file_path' => $filePath,
        ]);

        return redirect()->route('admin.menu-pdfs.index')->with('success', 'Menu PDF berhasil diperbarui.');
    }

    public function destroy(MenuPdf $menuPdf)
    {
        // Hapus file dari storage
        if ($menuPdf->file_path) {
            Storage::disk('public')->delete($menuPdf->file_path);
        }
        $menuPdf->delete();

        return redirect()->route('admin.menu-pdfs.index')->with('success', 'Menu PDF berhasil dihapus.');
    }

    /**
     * Method khusus untuk mengatur menu aktif.
     */
    public function setActive(MenuPdf $menuPdf)
    {
        // Gunakan transaction untuk memastikan konsistensi data
        DB::transaction(function () use ($menuPdf) {
            // Set semua menu lain menjadi tidak aktif
            MenuPdf::where('id', '!=', $menuPdf->id)->update(['is_active' => false]);

            // Set menu yang dipilih menjadi aktif
            $menuPdf->update(['is_active' => true]);
        });
        
        return redirect()->route('admin.menu-pdfs.index')->with('success', "{$menuPdf->title} berhasil diaktifkan.");
    }
}