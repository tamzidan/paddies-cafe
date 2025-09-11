// resources/js/Pages/Admin/Products/Edit.tsx
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem, type Category, type Product } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

interface Props {
    product: Product;
    categories: Category[];
}

export default function ProductEdit({ product, categories }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Manajemen Produk', href: route('admin.products.index') },
        { title: 'Edit Produk', href: route('admin.products.edit', product.id) },
    ];

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: product.name || '',
        product_category_id: product.product_category_id || '',
        description: product.description || '',
        price: product.price || '',
        is_featured: product.is_featured || false, // <-- TAMBAHKAN STATE BARU
        image: null as File | null,
        delivery_link_1: product.delivery_link_1 || '',
        delivery_link_2: product.delivery_link_2 || '',
        delivery_link_3: product.delivery_link_3 || '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.products.update', product.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Produk: ${product.name}`} />
            <div className="max-w-4xl mx-auto bg-card p-6 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Kolom Kiri */}
                    <div className="space-y-4">
                        {/* Nama Produk */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Nama Produk</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full bg-input border border-border rounded-md p-2"
                            />
                            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                        </div>

                        {/* Kategori */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Kategori</label>
                            <select
                                value={data.product_category_id}
                                onChange={e => setData('product_category_id', Number(e.target.value))}
                                className="w-full bg-input border border-border rounded-md p-2"
                            >
                                <option value="">Pilih Kategori</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.product_category_id && <div className="text-red-500 text-sm">{errors.product_category_id}</div>}
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Deskripsi</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="w-full bg-input border border-border rounded-md p-2"
                                rows={4}
                            ></textarea>
                            {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                        </div>
                    </div>

                    {/* Kolom Kanan */}
                    <div className="space-y-4">
                        {/* Harga */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Harga</label>
                            <input
                                type="number"
                                value={data.price}
                                onChange={e => setData('price', Number(e.target.value))}
                                className="w-full bg-input border border-border rounded-md p-2"
                            />
                            {errors.price && <div className="text-red-500 text-sm">{errors.price}</div>}
                        </div>

                        {/* Gambar Produk */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Gambar Produk</label>
                            {product.image_path && (
                                <div className="mb-2">
                                    <img
                                        src={`/storage/${product.image_path}`}
                                        alt={product.name}
                                        className="w-32 h-32 object-cover rounded-md border"
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                onChange={e => setData('image', e.target.files ? e.target.files[0] : null)}
                                className="w-full bg-input border border-border rounded-md p-2"
                            />
                            {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
                        </div>

                        {/* --- TAMBAHKAN CHECKBOX DI SINI --- */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_featured"
                                checked={data.is_featured}
                                onChange={e => setData('is_featured', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="is_featured" className="text-sm font-medium">
                                Jadikan Produk Unggulan
                            </label>
                        </div>
                        {/* --------------------------------- */}

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

                    {/* Tombol Aksi */}
                    <div className="md:col-span-2 flex justify-end gap-4">
                        <Button variant="ghost" asChild>
                            <Link href={route('admin.products.index')}>
                                Batal
                            </Link>
                        </Button>
                        <Button type="submit" disabled={processing} className='cursor-pointer'>
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}