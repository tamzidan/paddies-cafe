<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationSettingController extends Controller
{
    // Method untuk menampilkan halaman form
    public function index()
    {
        // Daftar semua key yang kita butuhkan untuk form
        $keys = [
            'reservasi_title', 'reservasi_subtitle',
            'reservasi_wa_number', 'reservasi_wa_text',
            'reservasi_phone_number',
            'reservasi_email',
            'reservasi_ig_username', 'reservasi_ig_link',
            'reservasi_tiktok_name', 'reservasi_tiktok_link',
            'reservasi_tips'
        ];

        // Ambil data dari database, jika tidak ada, defaultnya null
        $settings = Setting::whereIn('key', $keys)
            ->pluck('value', 'key');

        return Inertia::render('Admin/ReservationSettings/Index', [
            'settings' => $settings
        ]);
    }

    // Method untuk menyimpan/update data
    public function update(Request $request)
    {
        // Validasi data yang masuk
        $request->validate([
            'reservasi_title' => 'nullable|string|max:255',
            'reservasi_subtitle' => 'nullable|string',
            'reservasi_wa_number' => 'nullable|string|max:20',
            'reservasi_wa_text' => 'nullable|string',
            'reservasi_phone_number' => 'nullable|string|max:20',
            'reservasi_email' => 'nullable|email|max:255',
            'reservasi_ig_username' => 'nullable|string|max:255',
            'reservasi_ig_link' => 'nullable|url',
            'reservasi_tiktok_name' => 'nullable|string|max:255',
            'reservasi_tiktok_link' => 'nullable|url',
            'reservasi_tips' => 'nullable|string',
        ]);

        // Loop dan simpan setiap setting
        foreach ($request->all() as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        return redirect()->back()->with('success', 'Pengaturan reservasi berhasil diperbarui.');
    }
}