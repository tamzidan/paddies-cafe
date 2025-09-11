// resources/js/Pages/Admin/ProductCategories/Edit.tsx
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

// Definisikan tipe datanya
interface Category { id: number; name: string; slug: string; }

const breadcrumbs: BreadcrumbItem[] = [
    // { title: 'Dashboard', href: route('admin.dashboard') },
    { title: 'Manajemen Kategori', href: route('admin.product-categories.index') },
    { title: 'Edit Kategori', href: route('admin.product-categories.index') },
];

export default function CategoryEdit({ category }: { category: Category }) {
    const { data, setData, put, processing, errors } = useForm({ name: category.name });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('admin.product-categories.update', category.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Kategori: ${category.name}`} />
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