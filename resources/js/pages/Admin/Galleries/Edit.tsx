// resources/js/Pages/Admin/Galleries/Edit.tsx

import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

// Definisikan tipe data untuk item galeri
interface Gallery {
    id: number;
    image_path: string;
    caption: string | null;
    order: number;
}

const breadcrumbs = (galleryId: number): BreadcrumbItem[] => [
    { title: 'Manajemen Galeri', href: route('admin.galleries.index') },
    { title: 'Edit Foto', href: route('admin.galleries.edit', galleryId) },
];

export default function GalleryEdit({ gallery }: { gallery: Gallery }) {
    const { data, setData, post, processing, errors } = useForm({
        caption: gallery.caption || '',
        order: gallery.order,
        image: null as File | null,
        _method: 'PUT', // Trik untuk request PUT saat ada file
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Gunakan 'post' karena browser tidak mendukung PUT untuk multipart/form-data
        // Laravel akan menangani ini berkat field '_method'
        post(route('admin.galleries.update', gallery.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs(gallery.id)}>
            <Head title={`Edit Foto: ${gallery.caption || 'Galeri'}`} />

            <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-md mt-10">
                <h1 className="text-2xl font-semibold mb-6">Form Edit Foto</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <p className="block text-sm font-medium mb-2">Gambar Saat Ini</p>
                        <img src={`/storage/${gallery.image_path}`} alt={gallery.caption || ''} className="w-48 h-32 object-cover rounded-md border" />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium mb-1">Ganti Gambar (Opsional)</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-200 hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
                        />
                        {errors.image && <div className="text-red-500 text-xs mt-1">{errors.image}</div>}
                    </div>

                    <div>
                        <label htmlFor="caption" className="block text-sm font-medium mb-1">Caption (Opsional)</label>
                        <input
                            type="text"
                            id="caption"
                            value={data.caption}
                            onChange={(e) => setData('caption', e.target.value)}
                            className="w-full bg-input border-border rounded-md p-2 focus:ring-2 focus:ring-primary"
                            placeholder="Contoh: Suasana sore hari"
                        />
                        {errors.caption && <div className="text-red-500 text-xs mt-1">{errors.caption}</div>}
                    </div>

                    <div>
                        <label htmlFor="order" className="block text-sm font-medium mb-1">Nomor Urut <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            id="order"
                            value={data.order}
                            onChange={(e) => setData('order', parseInt(e.target.value, 10) || 0)}
                            className="w-full bg-input border-border rounded-md p-2 focus:ring-2 focus:ring-primary"
                            required
                        />
                         <p className="text-xs text-gray-500 mt-1">Angka lebih kecil akan ditampilkan lebih dulu.</p>
                        {errors.order && <div className="text-red-500 text-xs mt-1">{errors.order}</div>}
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-4 border-t border-border">
                        <Button variant="ghost" asChild>
                            <Link href={route('admin.galleries.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}