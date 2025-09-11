// resources/js/Pages/Admin/FeaturedProducts/Create.tsx

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

// Tipe data untuk daftar produk yang bisa dipilih
interface Product { 
    id: number; 
    name: string; 
}

// Props yang diterima dari controller
interface Props {
    products: Product[];
}

export default function FeaturedProductCreate({ products }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        product_id: '',
        order: 0,
        custom_title: '',
        custom_description: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.featured-products.store'));
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Manajemen Unggulan', href: route('admin.featured-products.index') },
        { title: 'Tambah Baru', href: route('admin.featured-products.create') },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Produk Unggulan" />
            <div className="max-w-2xl mx-auto bg-card p-6 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="product_id" className="block text-sm font-medium mb-1">Pilih Produk</label>
                        <select
                            id="product_id"
                            value={data.product_id}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setData('product_id', e.target.value)}
                            className="w-full bg-input border-border rounded-md p-2"
                        >
                            <option value="">-- Pilih Produk untuk Diunggulkan --</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select>
                        {errors.product_id && <div className="text-red-500 text-sm mt-1">{errors.product_id}</div>}
                    </div>

                    <div>
                        <label htmlFor="order" className="block text-sm font-medium mb-1">Nomor Urut</label>
                        <input
                            id="order"
                            type="number"
                            value={data.order}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('order', parseInt(e.target.value))}
                            className="w-full bg-input border-border rounded-md p-2"
                            placeholder="Contoh: 1"
                        />
                        <p className="text-xs text-gray-500 mt-1">Angka lebih kecil akan tampil lebih dulu.</p>
                        {errors.order && <div className="text-red-500 text-sm mt-1">{errors.order}</div>}
                    </div>
                    
                    <div>
                        <label htmlFor="custom_title" className="block text-sm font-medium mb-1">Judul Khusus (Opsional)</label>
                        <input
                            id="custom_title"
                            type="text"
                            value={data.custom_title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('custom_title', e.target.value)}
                            className="w-full bg-input border-border rounded-md p-2"
                            placeholder="Contoh: Paling Laris Minggu Ini!"
                        />
                        {errors.custom_title && <div className="text-red-500 text-sm mt-1">{errors.custom_title}</div>}
                    </div>

                     <div>
                        <label htmlFor="custom_description" className="block text-sm font-medium mb-1">Deskripsi Khusus (Opsional)</label>
                        <textarea
                            id="custom_description"
                            value={data.custom_description}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('custom_description', e.target.value)}
                            className="w-full bg-input border-border rounded-md p-2"
                            rows={3}
                            placeholder="Deskripsi singkat mengapa produk ini diunggulkan."
                        ></textarea>
                        {errors.custom_description && <div className="text-red-500 text-sm mt-1">{errors.custom_description}</div>}
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Button variant="ghost" asChild>
                            <Link href={route('admin.featured-products.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing} className="cursor-pointer">
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}