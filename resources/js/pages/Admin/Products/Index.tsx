// resources/js/Pages/Admin/Products/Index.tsx
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { PencilSquareIcon, TrashIcon, PlusIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

// Definisikan tipe datanya
interface Product { 
    id: number; 
    name: string; 
    price: number; 
    image_path: string; 
    category: { name: string } 
}

const breadcrumbs: BreadcrumbItem[] = [
    // { title: 'Dashboard', href: route('admin.dashboard') },
    { title: 'Manajemen Produk', href: route('admin.products.index') },
];

export default function ProductIndex() {
    const { products } = usePage<{ products: Product[] }>().props;
    
    // State untuk modal delete confirmation
    const [deleteModal, setDeleteModal] = useState<{
        show: boolean;
        product: Product | null;
    }>({ show: false, product: null });

    function showDeleteConfirmation(product: Product) {
        setDeleteModal({ show: true, product });
    }

    function hideDeleteConfirmation() {
        setDeleteModal({ show: false, product: null });
    }

    function handleDelete() {
        if (deleteModal.product) {
            // Menggunakan router.delete dari Inertia
            router.delete(route('admin.products.destroy', deleteModal.product.id), {
                onSuccess: () => {
                    hideDeleteConfirmation();
                }
            });
        }
    }

    const formatRupiah = (price: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Produk" />
            
            <div className="flex justify-between items-center mb-6 p-10">
                <h1 className="text-2xl font-semibold">Daftar Produk</h1>
                <Button asChild>
                    <Link href={route('admin.products.create')}>
                        <PlusIcon className="w-4 h-4" />
                        Tambah Produk Baru
                    </Link>
                </Button>
            </div>
            
            <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm">
                {products.length === 0 ? (
                    <div className="text-center py-8">
                        <Alert variant="destructive" className="max-w-md mx-auto">
                            <ExclamationTriangleIcon />
                            <AlertTitle>Belum Ada Produk</AlertTitle>
                            <AlertDescription>
                                Belum ada produk yang dibuat. Klik tombol "Tambah Produk Baru" untuk membuat produk pertama.
                            </AlertDescription>
                        </Alert>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="border-b">
                            <tr>
                                <th className="p-4">Gambar</th>
                                <th className="p-4">Nama Produk</th>
                                <th className="p-4">Kategori</th>
                                <th className="p-4">Harga</th>
                                <th className="p-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-b">
                                    <td className="p-4">
                                        <img src={`/storage/${product.image_path}`} alt={product.name} className="w-24 h-24 object-cover rounded-md" />
                                    </td>
                                    <td className="p-4 font-medium">{product.name}</td>
                                    <td className="p-4">{product.category.name}</td>
                                    <td className="p-4">{formatRupiah(product.price)}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="icon" asChild>
                                                <Link href={route('admin.products.edit', product.id)}>
                                                    <PencilSquareIcon className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            
                                            <Button 
                                                variant="destructive" 
                                                size="icon" 
                                                onClick={() => showDeleteConfirmation(product)}
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

            {/* Delete Confirmation Modal */}
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
                                Apakah Anda yakin ingin menghapus produk "{deleteModal.product?.name}"? 
                                Tindakan ini tidak dapat dibatalkan.
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