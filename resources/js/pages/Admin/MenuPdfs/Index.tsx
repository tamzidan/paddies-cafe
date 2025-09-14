import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PlusIcon, TrashIcon, PencilSquareIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

// Definisikan tipe data untuk menu
interface MenuPdf {
    id: number;
    title: string;
    file_path: string;
    is_active: boolean;
    url: string; // dari accessor yang kita buat di model
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manajemen Menu PDF', href: route('admin.menu-pdfs.index') },
];

export default function MenuPdfIndex() {
    const { menus } = usePage<{ menus: MenuPdf[] }>().props;

    const handleSetActive = (menu: MenuPdf) => {
        if (confirm(`Anda yakin ingin mengaktifkan menu "${menu.title}"?`)) {
            router.put(route('admin.menu-pdfs.setActive', menu.id));
        }
    };
    
    const handleDelete = (menu: MenuPdf) => {
        if (confirm(`Anda yakin ingin menghapus menu "${menu.title}"? Tindakan ini tidak dapat dibatalkan.`)) {
            router.delete(route('admin.menu-pdfs.destroy', menu.id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Menu PDF" />
            
            <div className="flex justify-between items-center mb-6 p-10">
                <h1 className="text-2xl font-semibold">Daftar Menu PDF</h1>
                <Button asChild>
                    <Link href={route('admin.menu-pdfs.create')}>
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Tambah Menu Baru
                    </Link>
                </Button>
            </div>

            <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm">
                <table className="w-full text-left">
                    <thead className="border-b">
                        <tr>
                            <th className="p-4">Judul</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">File</th>
                            <th className="p-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map((menu) => (
                            <tr key={menu.id} className="border-b">
                                <td className="p-4 font-medium">{menu.title}</td>
                                <td className="p-4">
                                    {menu.is_active ? (
                                        <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                            Aktif
                                        </span>
                                    ) : (
                                        <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                            Tidak Aktif
                                        </span>
                                    )}
                                </td>
                                <td className="p-4">
                                    <a href={menu.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        Lihat PDF
                                    </a>
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        {!menu.is_active && (
                                            <Button variant="outline" size="sm" onClick={() => handleSetActive(menu)}>
                                                <CheckCircleIcon className="w-4 h-4 mr-1" />
                                                Aktifkan
                                            </Button>
                                        )}
                                        <Button variant="outline" size="icon" asChild>
                                            <Link href={route('admin.menu-pdfs.edit', menu.id)}>
                                                <PencilSquareIcon className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => handleDelete(menu)}>
                                            <TrashIcon className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {menus.length === 0 && <p className="text-center py-8 text-gray-500">Belum ada menu PDF yang ditambahkan.</p>}
            </div>
        </AppLayout>
    );
}