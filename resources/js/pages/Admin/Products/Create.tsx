// resources/js/Pages/Admin/Products/Create.tsx
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

interface Category { id: number; name: string; }

export default function ProductCreate({ categories }: { categories: Category[] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        product_category_id: '',
        description: '',
        price: 0,
        image: null as File | null,
        delivery_link_1: '',
        delivery_link_2: '',
        delivery_link_3: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.products.store'));
    }

    const breadcrumbs: BreadcrumbItem[] = [
        // { title: 'Dashboard', href: route('admin.dashboard') },
        { title: 'Manajemen Produk', href: route('admin.products.index') },
        { title: 'Tambah Baru', href: route('admin.products.create') },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Produk Baru" />
            <div className="max-w-4xl mx-auto bg-card p-6 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Kolom Kiri */}
                    <div className="space-y-4">
                        <div>
                            <label>Nama Produk</label>
                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full bg-input border-border rounded-md p-2" />
                            {errors.name && <div className="text-red-500">{errors.name}</div>}
                        </div>
                        <div>
                            <label>Kategori</label>
                            <select value={data.product_category_id} onChange={e => setData('product_category_id', e.target.value)} className="w-full bg-input border-border rounded-md p-2">
                                <option value="">Pilih Kategori</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            {errors.product_category_id && <div className="text-red-500">{errors.product_category_id}</div>}
                        </div>
                        <div>
                            <label>Deskripsi</label>
                            <textarea value={data.description} onChange={e => setData('description', e.target.value)} className="w-full bg-input border-border rounded-md" rows={4}></textarea>
                            {errors.description && <div className="text-red-500">{errors.description}</div>}
                        </div>
                    </div>

                    {/* Kolom Kanan */}
                    <div className="space-y-4">
                        <div>
                            <label>Harga</label>
                            <input type="number" value={data.price} onChange={e => setData('price', parseInt(e.target.value))} className="w-full bg-input border-border rounded-md p-2" />
                            {errors.price && <div className="text-red-500">{errors.price}</div>}
                        </div>
                        <div>
                            <label>Gambar Produk</label>
                            <input type="file" onChange={e => setData('image', e.target.files ? e.target.files[0] : null)} className="w-full bg-input border-border rounded-md p-2" />
                            {errors.image && <div className="text-red-500">{errors.image}</div>}
                        </div>
                        {/* Link Delivery */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Link Grab</label>
                            <input
                                type="url"
                                value={data.delivery_link_1}
                                onChange={e => setData('delivery_link_1', e.target.value)}
                                className="w-full bg-input border border-border rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Link GoFood</label>
                            <input
                                type="url"
                                value={data.delivery_link_3}
                                onChange={e => setData('delivery_link_3', e.target.value)}
                                className="w-full bg-input border border-border rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Link ShopeeFood</label>
                            <input
                                type="url"
                                value={data.delivery_link_2}
                                onChange={e => setData('delivery_link_2', e.target.value)}
                                className="w-full bg-input border border-border rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-4">
                        <Button variant="ghost" asChild>
                            <Link href={route('admin.products.index')}>
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