// resources/js/Pages/Admin/Sliders/Create.tsx
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    // { title: 'Dashboard', href: route('admin.dashboard') },
    { title: 'Manajemen Slider', href: route('admin.sliders.index') },
    { title: 'Tambah Baru', href: route('admin.sliders.create') },
];

export default function SliderCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        image: null as File | null,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.sliders.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Slider Baru" />

            <div className="max-w-2xl mx-auto bg-card p-6 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium mb-1">Judul</label>
                        <input
                            type="text"
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full bg-input border-border rounded-md p-2"
                        />
                        {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium mb-1">Gambar</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {errors.image && <div className="text-red-500 text-xs mt-1">{errors.image}</div>}
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Button variant="ghost" asChild>
                            <Link href={route('admin.sliders.index')}>
                                Batal
                            </Link>
                        </Button>
                        
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
