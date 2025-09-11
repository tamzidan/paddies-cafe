<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => Testimonial::latest()->get(),
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Testimonials/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'content' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'avatar' => 'nullable|image|max:1024',
            'is_active' => 'required|boolean',
        ]);

        $avatarPath = null;
        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('testimonials', 'public');
        }

        Testimonial::create([
            'name' => $request->name,
            'role' => $request->role,
            'content' => $request->content,
            'rating' => $request->rating,
            'avatar' => $avatarPath,
            'is_active' => $request->is_active,
        ]);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Testimonial $testimonial)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Testimonial $testimonial)
    {
        return Inertia::render('Admin/Testimonials/Edit', [
            'testimonial' => $testimonial,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Testimonial $testimonial)
    {
        // Untuk update, kita tidak bisa langsung memvalidasi, karena _method
        // Jadi kita perlu menggabungkan data request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'content' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'avatar' => 'nullable|image|max:1024',
            'is_active' => 'required|boolean',
        ]);

        $avatarPath = $testimonial->avatar;
        if ($request->hasFile('avatar')) {
            // Hapus avatar lama jika ada
            if ($avatarPath) {
                Storage::disk('public')->delete($avatarPath);
            }
            $avatarPath = $request->file('avatar')->store('testimonials', 'public');
        }

        $testimonial->update([
            'name' => $validated['name'],
            'role' => $validated['role'],
            'content' => $validated['content'],
            'rating' => $validated['rating'],
            'avatar' => $avatarPath,
            'is_active' => $validated['is_active'],
        ]);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Testimonial $testimonial)
    {
        // Hapus avatar dari storage
        if ($testimonial->avatar) {
            Storage::disk('public')->delete($testimonial->avatar);
        }

        $testimonial->delete();

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial deleted.');
    }

    public function toggleActive(Testimonial $testimonial)
    {
        $testimonial->update(['is_active' => !$testimonial->is_active]);
        return redirect()->back()->with('success', 'Status testimoni diperbarui.');
    }
}
