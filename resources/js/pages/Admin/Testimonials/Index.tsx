// resources/js/Pages/Admin/Testimonials/Index.tsx
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { PencilSquareIcon, TrashIcon, PlusIcon, ExclamationTriangleIcon, XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface Testimonial { 
    id: number; 
    name: string; 
    role: string;
    rating: number;
    avatar: string;
    is_active: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manajemen Testimoni', href: route('admin.testimonials.index') },
];

export default function TestimonialIndex() {
    const { testimonials } = usePage<{ testimonials: Testimonial[] }>().props;

    const [deleteModal, setDeleteModal] = useState<{
        show: boolean;
        testimonial: Testimonial | null;
    }>({ show: false, testimonial: null });

    function showDeleteConfirmation(testimonial: Testimonial) {
        setDeleteModal({ show: true, testimonial });
    }

    function hideDeleteConfirmation() {
        setDeleteModal({ show: false, testimonial: null });
    }

    function handleDelete() {
        if (deleteModal.testimonial) {
            router.delete(route('admin.testimonials.destroy', deleteModal.testimonial.id), {
                onSuccess: () => hideDeleteConfirmation()
            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Testimoni" />

            <div className="flex justify-between items-center mb-6 p-10">
                <h1 className="text-2xl font-semibold">Daftar Testimoni</h1>
                <Button asChild>
                    <Link href={route('admin.testimonials.create')}>
                        <PlusIcon className="w-4 h-4" />
                        Tambah Testimoni Baru
                    </Link>
                </Button>
            </div>

            <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm">
                {testimonials.length === 0 ? (
                    <div className="text-center py-8">
                        {/* Alert jika kosong */}
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="border-b">
                            <tr>
                                <th className="p-4">Avatar</th>
                                <th className="p-4">Nama</th>
                                <th className="p-4">Jabatan</th>
                                <th className="p-4 text-center">Rating</th>
                                <th className="p-4 text-center">Status</th>
                                <th className="p-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testimonials.map((testimonial) => (
                                <tr key={testimonial.id} className="border-b">
                                    <td className="p-4">
                                        <img src={testimonial.avatar ? `/storage/${testimonial.avatar}` : 'https://ui-avatars.com/api/?name='+testimonial.name} alt={testimonial.name} className="w-16 h-16 object-cover rounded-full" />
                                    </td>
                                    <td className="p-4 font-medium">{testimonial.name}</td>
                                    <td className="p-4">{testimonial.role}</td>
                                    <td className="p-4 text-center">{testimonial.rating} ★</td>
                                    <td className="p-4 text-center">
                                        <Button
                                            variant={testimonial.is_active ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => router.put(route('admin.testimonials.toggleActive', testimonial.id), {}, { preserveScroll: true })}
                                            title={testimonial.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                        >
                                            {testimonial.is_active ? <EyeIcon className="w-5 h-5"/> : <EyeSlashIcon className="w-5 h-5"/>}
                                        </Button>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="icon" asChild>
                                                <Link href={route('admin.testimonials.edit', testimonial.id)}>
                                                    <PencilSquareIcon className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <Button 
                                                variant="destructive" 
                                                size="icon" 
                                                onClick={() => showDeleteConfirmation(testimonial)}
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
                                Apakah Anda yakin ingin menghapus produk "{deleteModal.testimonial?.name}"? 
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