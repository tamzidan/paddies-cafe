// resources/js/Pages/Shop.tsx
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { 
    Coffee, 
    ShoppingBag, 
    Filter, 
    Star,
    ExternalLink,
    Image as ImageIcon,
    ArrowRight
} from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: Category;
    image_path: string | null;
    delivery_link_1: string | null;
    delivery_link_3: string | null;
    delivery_link_2: string | null;
}

interface ShopProps {
    products: Product[];
    categories: Category[];
}

export default function Shop({ products, categories }: ShopProps) {
    const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');

    const formatRupiah = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category.id === selectedCategory);

    // Delivery platforms dengan styling monochrome
    const getDeliveryButton = (link: string | null, platform: string, bgColor: string) => {
        if (!link) return null;
        
        return (
            <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex-1 text-center px-3 py-2 ${bgColor} text-white text-xs font-semibold rounded transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center justify-center`}
            >
                <ExternalLink className="h-3 w-3 mr-1" />
                {platform}
            </a>
        );
    };

    return (
        <MainLayout>
            <Head title="Toko - Paddies Cafe" />

            {/* Hero Section */}
            <div className="bg-black text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <ShoppingBag className="h-12 w-12 text-white mr-3" />
                        <h1 className="text-4xl md:text-6xl font-bold">Menu & Produk</h1>
                    </div>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                        Jelajahi koleksi lengkap menu dan produk berkualitas tinggi dari Paddies Cafe
                    </p>
                    <div className="flex items-center justify-center text-gray-300">
                        <Coffee className="h-5 w-5 mr-2" />
                        <span>Tersedia untuk delivery dan takeaway</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto py-16 px-6">
                
                {/* Filter Categories */}
                <div className="mb-12">
                    <div className="flex items-center justify-center mb-6">
                        <Filter className="h-5 w-5 text-black mr-2" />
                        <h2 className="text-2xl font-bold text-black">Filter Kategori</h2>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-3">
                        <button 
                            onClick={() => setSelectedCategory('all')} 
                            className={`cursor-pointer px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                                selectedCategory === 'all' 
                                    ? 'bg-black text-white shadow-lg' 
                                    : 'bg-gray-100 text-black hover:bg-gray-200 border border-gray-300'
                            }`}
                        >
                            Semua Kategori
                        </button>
                        {categories.map((category) => (
                            <button 
                                key={category.id} 
                                onClick={() => setSelectedCategory(category.id)} 
                                className={`cursor-pointer px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                                    selectedCategory === category.id 
                                        ? 'bg-black text-white shadow-lg' 
                                        : 'bg-gray-100 text-black hover:bg-gray-200 border border-gray-300'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <>
                        <div className="text-center mb-8">
                            <p className="text-gray-600">
                                Menampilkan <span className="font-semibold text-black">{filteredProducts.length}</span> produk
                                {selectedCategory !== 'all' && (
                                    <span> dalam kategori <span className="font-semibold text-black">
                                        {categories.find(cat => cat.id === selectedCategory)?.name}
                                    </span></span>
                                )}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredProducts.map((product) => (
                                <div 
                                    key={product.id} 
                                    className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-200 group"
                                >
                                    {/* Product Image */}
                                    <div className="relative w-full h-48 bg-gray-100">
                                        {product.image_path ? (
                                            <img 
                                                src={`/storage/${product.image_path}`} 
                                                alt={product.name}
                                                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                <ImageIcon className="h-12 w-12 text-gray-400" />
                                            </div>
                                        )}
                                        {/* Category Badge */}
                                        <div className="absolute top-3 left-3 bg-black text-white px-3 py-1 rounded-full text-xs font-semibold">
                                            {product.category.name}
                                        </div>
                                    </div>
                                    
                                    {/* Product Info */}
                                    <div className="p-6 flex-grow flex flex-col">
                                        <h3 className="text-xl font-bold text-black mb-2 line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm flex-grow mb-4 line-clamp-3">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-2xl font-bold text-black">
                                                {formatRupiah(product.price)}
                                            </p>
                                            <div className="flex items-center text-black">
                                                <Star className="h-4 w-4 fill-current" />
                                                <span className="text-sm font-medium ml-1">4.8</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Delivery Buttons */}
                                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                                        <div className="flex gap-2 mb-2">
                                            <span className="text-xs font-medium text-gray-600 flex items-center">
                                                <ArrowRight className="h-3 w-3 mr-1" />
                                                Pesan melalui:
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap justify-center gap-3">
                                            {getDeliveryButton(product.delivery_link_3, 'GoFood', 'bg-black hover:bg-gray-800')}
                                            {getDeliveryButton(product.delivery_link_2, 'ShopeeFood', 'bg-gray-700 hover:bg-gray-800')}
                                            {getDeliveryButton(product.delivery_link_1, 'Delivery', 'bg-gray-600 hover:bg-gray-700')}
                                        </div>
                                        
                                        {/* Jika tidak ada link delivery */}
                                        {!product.delivery_link_1 && !product.delivery_link_2 && !product.delivery_link_3 && (
                                            <div className="text-center py-2">
                                                <p className="text-xs text-gray-500">Tersedia di lokasi</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <div className="max-w-md mx-auto">
                            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-black mb-2">Tidak Ada Produk</h3>
                            <p className="text-gray-500 mb-6">
                                Tidak ada produk dalam kategori yang dipilih.
                            </p>
                            <button 
                                onClick={() => setSelectedCategory('all')}
                                className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                            >
                                Lihat Semua Produk
                            </button>
                        </div>
                    </div>
                )}

                {/* Call to Action */}
                {filteredProducts.length > 0 && (
                    <div className="mt-16 text-center">
                        <div className="bg-gray-50 p-8 rounded-xl">
                            <h3 className="text-2xl font-bold text-black mb-4">
                                Ingin Memesan Langsung?
                            </h3>
                            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                Kunjungi langsung lokasi kami atau hubungi untuk pemesanan khusus dan konsultasi menu.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="https://api.whatsapp.com/send/?phone=6287752723783&text&type=phone_number&app_absent=0">
                                    <button className="cursor-pointer bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                                        Hubungi Kami
                                    </button>
                                </a>
                                <a href="/location">
                                    <button className="cursor-pointer border-2 border-black text-black hover:bg-black hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                                        Lihat Lokasi
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}