import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manajemen Menu PDF', href: route('admin.menu-pdfs.index') },
    { title: 'Tambah Baru', href: route('admin.menu-pdfs.create') },
];

export default function MenuPdfCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        file: null as File | null,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.menu-pdfs.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Menu PDF Baru" />
            <div className="max-w-2xl mx-auto bg-card p-6 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Judul Menu</label>
                        <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="w-full bg-input border-border rounded-md p-2" />
                        {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">File PDF</label>
                        <input type="file" onChange={e => setData('file', e.target.files ? e.target.files[0] : null)} className="w-full" accept=".pdf" />
                        {errors.file && <div className="text-red-500 text-sm mt-1">{errors.file}</div>}
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button variant="ghost" asChild>
                            <Link href={route('admin.menu-pdfs.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing} className='cursor-pointer'>
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}