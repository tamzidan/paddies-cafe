<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OperationalHour;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OperationalHourController extends Controller
{
    /**
     * Menampilkan daftar jam operasional.
     */
    public function index()
    {
        return Inertia::render('Admin/OperationalHours/Index', [
            'operationalHours' => OperationalHour::orderBy('sort_order')->get(),
        ]);
    }

    /**
     * Menampilkan form untuk mengedit jam operasional.
     */
    public function edit(OperationalHour $operational_hour)
    {
        return Inertia::render('Admin/OperationalHours/Edit', [
            'operationalHour' => $operational_hour,
        ]);
    }

    /**
     * Memperbarui data jam operasional di database.
     */
    public function update(Request $request, OperationalHour $operational_hour)
    {
        // Validasi sekarang mencakup 'day' dan menghapus 'is_open'
        $validated = $request->validate([
            'day'   => 'required|string|max:255',
            'hours' => 'required|string|max:255',
            // 'is_open' => 'required|boolean',
        ]);

        $operational_hour->update($validated);

        return redirect()->route('admin.operational-hours.index')->with('success', 'Jam operasional berhasil diperbarui.');
    }

    /**
     * Mengubah status buka/tutup.
     */
    public function toggleOpen(OperationalHour $operational_hour)
    {
        $operational_hour->update(['is_open' => !$operational_hour->is_open]);

        return redirect()->back()->with('success', 'Status operasional berhasil diubah.');
    }
}