import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

interface MenuPdf {
    id: number;
    title: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manajemen Menu PDF', href: route('admin.menu-pdfs.index') },
    { title: 'Edit Menu', href: '#' },
];

export default function MenuPdfEdit({ menu }: { menu: MenuPdf }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: menu.title || '',
        file: null as File | null,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Penting: Gunakan 'post' untuk mengirim form dengan file, Laravel akan membaca _method 'PUT'
        post(route('admin.menu-pdfs.update', menu.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Menu: ${menu.title}`} />
            <div className="max-w-2xl mx-auto bg-card p-6 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Judul Menu</label>
                        <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="w-full bg-input border-border rounded-md p-2" />
                        {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Upload File PDF Baru (Opsional)</label>
                        <p className='text-xs text-gray-500 mb-2'>Kosongkan jika tidak ingin mengubah file PDF yang sudah ada.</p>
                        <input type="file" onChange={e => setData('file', e.target.files ? e.target.files[0] : null)} className="w-full" accept=".pdf" />
                        {errors.file && <div className="text-red-500 text-sm mt-1">{errors.file}</div>}
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button variant="ghost" asChild>
                            <Link href={route('admin.menu-pdfs.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing} className='cursor-pointer'>
                            {processing ? 'Memperbarui...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}