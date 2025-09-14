// resources/js/Pages/Admin/Galleries/Index.tsx

import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { PencilSquareIcon, TrashIcon, PlusIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/solid';

// Definisikan tipe data untuk item galeri
interface Gallery {
    id: number;
    image_path: string;
    caption: string | null;
    order: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manajemen Galeri', href: route('admin.galleries.index') },
];

export default function GalleryIndex() {
    // Ambil data galleries dari props yang dikirim controller
    const { galleries } = usePage<{ galleries: Gallery[] }>().props;

    // State untuk modal konfirmasi hapus
    const [deleteModal, setDeleteModal] = useState<{ show: boolean; gallery: Gallery | null }>({
        show: false,
        gallery: null,
    });

    const showDeleteConfirmation = (gallery: Gallery) => {
        setDeleteModal({ show: true, gallery });
    };

    const hideDeleteConfirmation = () => {
        setDeleteModal({ show: false, gallery: null });
    };

    const handleDelete = () => {
        if (deleteModal.gallery) {
            router.delete(route('admin.galleries.destroy', deleteModal.gallery.id), {
                onSuccess: () => hideDeleteConfirmation(),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Galeri" />

            <div className="flex justify-between items-center mb-6 p-10">
                <h1 className="text-2xl font-semibold">Daftar Foto Galeri</h1>
                <Button asChild>
                    <Link href={route('admin.galleries.create')}>
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Tambah Foto Baru
                    </Link>
                </Button>
            </div>

            <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm">
                {galleries.length === 0 ? (
                     <Alert variant="destructive" className="max-w-md mx-auto">
                         <ExclamationTriangleIcon className="h-4 w-4" />
                         <AlertTitle>Belum Ada Foto</AlertTitle>
                         <AlertDescription>
                             Belum ada foto yang ditambahkan ke galeri. Klik tombol "Tambah Foto Baru" untuk memulai.
                         </AlertDescription>
                     </Alert>
                ) : (
                    <table className="w-full text-left">
                        <thead className="border-b">
                            <tr>
                                <th className="p-4 text-center">Urutan</th>
                                <th className="p-4">Gambar</th>
                                <th className="p-4">Caption</th>
                                <th className="p-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {galleries.map((gallery) => (
                                <tr key={gallery.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <td className="p-4 font-bold text-center w-20">{gallery.order}</td>
                                    <td className="p-4">
                                        <img src={`/storage/${gallery.image_path}`} alt={gallery.caption || ''} className="w-32 h-20 object-cover rounded-md border" />
                                    </td>
                                    <td className="p-4 font-medium">{gallery.caption || '-'}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="icon" asChild>
                                                <Link href={route('admin.galleries.edit', gallery.id)}>
                                                    <PencilSquareIcon className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => showDeleteConfirmation(gallery)}
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
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Konfirmasi Hapus</h3>
                            <Button variant="ghost" size="icon" onClick={hideDeleteConfirmation}><XMarkIcon className="w-5 h-5" /></Button>
                        </div>
                        <Alert variant="destructive">
                            <ExclamationTriangleIcon className="h-4 w-4" />
                            <AlertTitle>Peringatan!</AlertTitle>
                            <AlertDescription>
                                Anda yakin ingin menghapus foto ini? Tindakan ini tidak dapat dibatalkan.
                            </AlertDescription>
                        </Alert>
                        <div className="flex gap-3 justify-end mt-6">
                            <Button variant="outline" onClick={hideDeleteConfirmation}>Batal</Button>
                            <Button variant="destructive" onClick={handleDelete}>Ya, Hapus</Button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}