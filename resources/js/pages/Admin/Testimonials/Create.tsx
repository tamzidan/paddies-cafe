// resources/js/Pages/Admin/Testimonials/Create.tsx
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

export default function TestimonialCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        role: '',
        content: '',
        rating: 5,
        avatar: null as File | null,
        is_active: true as boolean,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.testimonials.store'));
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Manajemen Testimoni', href: route('admin.testimonials.index') },
        { title: 'Tambah Baru', href: route('admin.testimonials.create') },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Testimoni Baru" />
            <div className="max-w-2xl mx-auto bg-card p-6 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nama</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full bg-input border-border rounded-md p-2" />
                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Jabatan/Peran</label>
                        <input type="text" value={data.role} onChange={e => setData('role', e.target.value)} className="w-full bg-input border-border rounded-md p-2" />
                        {errors.role && <div className="text-red-500 text-sm mt-1">{errors.role}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Isi Testimoni</label>
                        <textarea value={data.content} onChange={e => setData('content', e.target.value)} className="w-full bg-input border-border rounded-md p-2" rows={4}></textarea>
                        {errors.content && <div className="text-red-500 text-sm mt-1">{errors.content}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                        <input type="number" value={data.rating} onChange={e => setData('rating', parseInt(e.target.value))} min="1" max="5" className="w-full bg-input border-border rounded-md p-2" />
                        {errors.rating && <div className="text-red-500 text-sm mt-1">{errors.rating}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Avatar</label>
                        <input type="file" onChange={e => setData('avatar', e.target.files ? e.target.files[0] : null)} className="w-full bg-input border-border rounded-md p-2" />
                        {errors.avatar && <div className="text-red-500 text-sm mt-1">{errors.avatar}</div>}
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="is_active" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="h-4 w-4 rounded" />
                        <label htmlFor="is_active" className="text-sm font-medium">Aktifkan Testimoni</label>
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button variant="ghost" asChild><Link href={route('admin.testimonials.index')}>Batal</Link></Button>
                        <Button type="submit" disabled={processing}>{processing ? 'Menyimpan...' : 'Simpan'}</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}