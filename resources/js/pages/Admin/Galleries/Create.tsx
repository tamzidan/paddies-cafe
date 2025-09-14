// resources/js/Pages/Admin/Galleries/Create.tsx

import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manajemen Galeri', href: route('admin.galleries.index') },
    { title: 'Tambah Baru', href: route('admin.galleries.create') },
];

export default function GalleryCreate() {
    const { data, setData, post, processing, errors } = useForm({
        caption: '',
        image: null as File | null,
        order: 0,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.galleries.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Foto Galeri Baru" />

            <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-md mt-10">
                <h1 className="text-2xl font-semibold mb-6">Form Tambah Foto Baru</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium mb-1">Gambar <span className="text-red-500">*</span></label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-200 hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
                            required
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
                            {processing ? 'Menyimpan...' : 'Simpan Foto'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}