// resources/js/Pages/Admin/ProductCategories/Index.tsx
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { PencilSquareIcon, TrashIcon, PlusIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    // { title: 'Dashboard', href: route('admin.dashboard') },
    { title: 'Manajemen Kategori', href: route('admin.product-categories.index') },
];

export default function CategoryIndex() {
    const { categories } = usePage<{ categories: Category[] }>().props;
    
    // State untuk modal delete confirmation
    const [deleteModal, setDeleteModal] = useState<{
        show: boolean;
        category: Category | null;
    }>({ show: false, category: null });

    function showDeleteConfirmation(category: Category) {
        setDeleteModal({ show: true, category });
    }

    function hideDeleteConfirmation() {
        setDeleteModal({ show: false, category: null });
    }

    function handleDelete() {
        if (deleteModal.category) {
            // Menggunakan router.delete dari Inertia
            router.delete(route('admin.product-categories.destroy', deleteModal.category.id), {
                onSuccess: () => {
                    hideDeleteConfirmation();
                }
            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Kategori" />

            <div className="flex justify-between items-center mb-6 p-10">
                <h1 className="text-2xl font-semibold">Daftar Kategori Produk</h1>
                <Button asChild>
                    <Link href={route('admin.product-categories.create')}>
                        <PlusIcon className="w-4 h-4" />
                        Tambah Kategori Baru
                    </Link>
                </Button>
            </div>

            <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm">
                {categories.length === 0 ? (
                    <div className="text-center py-8">
                        <Alert variant="destructive" className="max-w-md mx-auto">
                            <ExclamationTriangleIcon />
                            <AlertTitle>Belum Ada Kategori</AlertTitle>
                            <AlertDescription>
                                Belum ada kategori yang dibuat. Klik tombol "Tambah Kategori Baru" untuk membuat kategori pertama.
                            </AlertDescription>
                        </Alert>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="border-b">
                            <tr>
                                <th className="p-4">Nama Kategori</th>
                                <th className="p-4">Slug</th>
                                <th className="p-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id} className="border-b">
                                    <td className="p-4 font-medium">{category.name}</td>
                                    <td className="p-4 text-sm text-muted-foreground">{category.slug}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="icon" asChild>
                                                <Link href={route('admin.product-categories.edit', category.id)}>
                                                    <PencilSquareIcon className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            
                                            <Button 
                                                variant="destructive" 
                                                size="icon" 
                                                onClick={() => showDeleteConfirmation(category)}
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
                                Apakah Anda yakin ingin menghapus kategori "{deleteModal.category?.name}"? 
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