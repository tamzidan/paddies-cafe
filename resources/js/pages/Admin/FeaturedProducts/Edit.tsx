// resources/js/Pages/Admin/FeaturedProducts/Edit.tsx

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

// Tipe data lengkap untuk properti featuredProduct
interface FeaturedProduct {
    id: number;
    order: number;
    product_id: number;
    custom_title: string | null;
    custom_description: string | null;
    product: {
        name: string;
    }
}

// Props yang diterima dari controller
interface Props {
    featuredProduct: FeaturedProduct;
}

export default function FeaturedProductEdit({ featuredProduct }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        order: featuredProduct.order || 0,
        custom_title: featuredProduct.custom_title || '',
        custom_description: featuredProduct.custom_description || '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Gunakan method 'post' karena Inertia akan menghandle '_method: PUT'
        post(route('admin.featured-products.update', featuredProduct.id));
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Manajemen Unggulan', href: route('admin.featured-products.index') },
        { title: 'Edit Urutan', href: route('admin.featured-products.edit', featuredProduct.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Unggulan: ${featuredProduct.product.name}`} />
            <div className="max-w-2xl mx-auto bg-card p-6 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Produk</label>
                        <input
                            type="text"
                            value={featuredProduct.product.name}
                            disabled
                            className="w-full bg-gray-700 border-border rounded-md p-2 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 mt-1">Produk tidak dapat diubah. Hapus dan buat baru jika ingin mengganti.</p>
                    </div>

                    <div>
                        <label htmlFor="order" className="block text-sm font-medium mb-1">Nomor Urut</label>
                        <input
                            id="order"
                            type="number"
                            value={data.order}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('order', parseInt(e.target.value))}
                            className="w-full bg-input border-border rounded-md p-2"
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
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}