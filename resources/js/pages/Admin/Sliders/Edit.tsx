// resources/js/Pages/Admin/Sliders/Edit.tsx
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem, type Slider } from '@/types'; // Asumsikan Anda pindah tipe Slider ke types.ts
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs = (sliderId: number): BreadcrumbItem[] => [
    // { title: 'Dashboard', href: route('admin.dashboard') },
    { title: 'Manajemen Slider', href: route('admin.sliders.index') },
    { title: 'Edit', href: route('admin.sliders.edit', sliderId) },
];

export default function SliderEdit({ slider }: { slider: Slider }) {
    const { data, setData, post, processing, errors } = useForm({
        title: slider.title,
        image: null as File | null,
        _method: 'PUT', // Trik untuk request PUT
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Kirim ke route update, bukan store
        post(route('admin.sliders.update', slider.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs(slider.id)}>
            <Head title={`Edit Slider: ${slider.title}`} />

            <div className="max-w-2xl mx-auto bg-card p-6 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit}>
                    {/* Tampilkan gambar saat ini */}
                    <div className="mb-4">
                        <p className="block text-sm font-medium mb-1">Gambar Saat Ini</p>
                        <img src={`/storage/${slider.image_path}`} alt={slider.title} className="w-48 h-24 object-cover rounded-md border" />
                    </div>
                    
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
                        <label htmlFor="image" className="block text-sm font-medium mb-1">Ganti Gambar (Opsional)</label>
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
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
