// resources/js/Pages/Admin/Sliders/Index.tsx
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { PencilSquareIcon, TrashIcon, PlusIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

// Definisikan tipe data untuk slider
interface Slider {
    id: number;
    title: string;
    image_path: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    // { title: 'Dashboard', href: route('admin.dashboard') },
    { title: 'Manajemen Slider', href: route('admin.sliders.index') },
];

export default function SliderIndex() {
    // Ambil data sliders dari props yang dikirim controller
    const { sliders } = usePage<{ sliders: Slider[] }>().props;
    
    // State untuk modal delete confirmation
    const [deleteModal, setDeleteModal] = useState<{
        show: boolean;
        slider: Slider | null;
    }>({ show: false, slider: null });

    function showDeleteConfirmation(slider: Slider) {
        setDeleteModal({ show: true, slider });
    }

    function hideDeleteConfirmation() {
        setDeleteModal({ show: false, slider: null });
    }

    function handleDelete() {
        if (deleteModal.slider) {
            // Menggunakan router.delete dari Inertia
            router.delete(route('admin.sliders.destroy', deleteModal.slider.id), {
                onSuccess: () => {
                    hideDeleteConfirmation();
                }
            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Slider" />

            <div className="flex justify-between items-center mb-6 p-10">
                <h1 className="text-2xl font-semibold">Daftar Slider</h1>
                <Button asChild>
                    <Link href={route('admin.sliders.create')}>
                        <PlusIcon className="w-4 h-4" />
                        Tambah Slider Baru
                    </Link>
                </Button>
            </div>

            <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm">
                {sliders.length === 0 ? (
                    <div className="text-center py-8">
                        <Alert variant="destructive" className="max-w-md mx-auto">
                            <ExclamationTriangleIcon />
                            <AlertTitle>Belum Ada Slider</AlertTitle>
                            <AlertDescription>
                                Belum ada slider yang dibuat. Klik tombol "Tambah Slider Baru" untuk membuat slider pertama.
                            </AlertDescription>
                        </Alert>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="border-b">
                            <tr>
                                <th className="p-4">Gambar</th>
                                <th className="p-4">Judul</th>
                                <th className="p-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sliders.map((slider) => (
                                <tr key={slider.id} className="border-b">
                                    <td className="p-4">
                                        <img src={`/storage/${slider.image_path}`} alt={slider.title} className="w-32 h-16 object-cover rounded-md" />
                                    </td>
                                    <td className="p-4 font-medium">{slider.title}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="icon" asChild>
                                                <Link href={route('admin.sliders.edit', slider.id)}>
                                                    <PencilSquareIcon className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            
                                            <Button 
                                                variant="destructive" 
                                                size="icon" 
                                                onClick={() => showDeleteConfirmation(slider)}
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
                                Apakah Anda yakin ingin menghapus slider "{deleteModal.slider?.title}"? 
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
