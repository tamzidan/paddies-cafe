// resources/js/Pages/Admin/FeaturedProducts/Index.tsx

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { PencilSquareIcon, TrashIcon, PlusIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import React from 'react';

// Definisikan tipe data untuk prop featuredProducts
interface FeaturedProduct {
    id: number;
    order: number;
    product: {
        id: number;
        name: string;
        image_path: string;
        category: { name: string };
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manajemen Unggulan', href: route('admin.featured-products.index') },
];

export default function FeaturedProductIndex() {
    const { featuredProducts } = usePage<{ featuredProducts: FeaturedProduct[] }>().props;

    // State untuk modal konfirmasi hapus
    const [deleteModal, setDeleteModal] = useState<{
        show: boolean;
        item: FeaturedProduct | null;
    }>({ show: false, item: null });

    function showDeleteConfirmation(item: FeaturedProduct) {
        setDeleteModal({ show: true, item });
    }

    function hideDeleteConfirmation() {
        setDeleteModal({ show: false, item: null });
    }

    function handleDelete() {
        if (deleteModal.item) {
            router.delete(route('admin.featured-products.destroy', deleteModal.item.id), {
                onSuccess: () => hideDeleteConfirmation(),
                preserveScroll: true,
            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Produk Unggulan" />
            
            <div className="flex justify-between items-center mb-6 p-10">
                <h1 className="text-2xl font-semibold">Daftar Produk Unggulan</h1>
                <Button asChild>
                    <Link href={route('admin.featured-products.create')}>
                        <PlusIcon className="w-4 h-4" />
                        Tambah Produk Unggulan
                    </Link>
                </Button>
            </div>
            
            <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm">
                {featuredProducts.length === 0 ? (
                    <div className="text-center py-8">
                        <Alert variant="destructive" className="max-w-md mx-auto">
                            <ExclamationTriangleIcon />
                            <AlertTitle>Belum Ada Produk Unggulan</AlertTitle>
                            <AlertDescription>
                                Belum ada produk yang ditambahkan ke daftar unggulan. Klik tombol "Tambah Produk Unggulan" untuk memulai.
                            </AlertDescription>
                        </Alert>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="border-b">
                            <tr>
                                <th className="p-4">Urutan</th>
                                <th className="p-4">Gambar</th>
                                <th className="p-4">Nama Produk</th>
                                <th className="p-4">Kategori</th>
                                <th className="p-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {featuredProducts.map((item) => (
                                <tr key={item.id} className="border-b">
                                    <td className="p-4 text-lg font-bold text-center">{item.order}</td>
                                    <td className="p-4">
                                        <img src={`/storage/${item.product.image_path}`} alt={item.product.name} className="w-24 h-24 object-cover rounded-md" />
                                    </td>
                                    <td className="p-4 font-medium">{item.product.name}</td>
                                    <td className="p-4">{item.product.category ? item.product.category.name : 'N/A'}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="icon" asChild>
                                                <Link href={route('admin.featured-products.edit', item.id)}>
                                                    <PencilSquareIcon className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <Button 
                                                variant="destructive" 
                                                size="icon" 
                                                onClick={() => showDeleteConfirmation(item)}
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal Konfirmasi Hapus */}
            {deleteModal.show && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Konfirmasi Hapus
                            </h3>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={hideDeleteConfirmation}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </Button>
                        </div>
                        
                        <Alert variant="destructive" className="mb-4">
                            <ExclamationTriangleIcon />
                            <AlertTitle>Peringatan!</AlertTitle>
                            <AlertDescription>
                                Apakah Anda yakin ingin menghapus "{deleteModal.item?.product.name}" dari daftar unggulan? 
                                Tindakan ini hanya menghapusnya dari daftar, bukan produknya.
                            </AlertDescription>
                        </Alert>

                        <div className="flex gap-3 justify-end">
                            <Button 
                                variant="outline" 
                                onClick={hideDeleteConfirmation}
                                className='cursor-pointer'
                            >
                                Batal
                            </Button>
                            <Button 
                                variant="destructive" 
                                onClick={handleDelete}
                            >
                                Ya, Hapus
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}