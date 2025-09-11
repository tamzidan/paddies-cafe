// resources/js/Pages/Admin/ProductCategories/Create.tsx
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    // { title: 'Dashboard', href: route('admin.dashboard') },
    { title: 'Manajemen Kategori', href: route('admin.product-categories.index') },
    { title: 'Tambah Baru', href: route('admin.product-categories.create') },
];

export default function CategoryCreate() {
    const { data, setData, post, processing, errors } = useForm({ name: '' });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.product-categories.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Kategori Baru" />
            <div className="max-w-2xl mx-auto bg-card p-6 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Nama Kategori</label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full bg-input border-border rounded-md p-2"
                            autoFocus
                        />
                        {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <Button variant="ghost" asChild>
                            <Link href={route('admin.product-categories.index')}>
                                Batal
                            </Link>
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