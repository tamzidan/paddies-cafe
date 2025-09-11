// resources/js/Pages/Menu.tsx
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { 
    Download, 
    FileText, 
    ExternalLink, 
    Coffee,
    Clock,
    Star,
    ArrowRight
} from 'lucide-react';

export default function Menu() {
    const [isLoading, setIsLoading] = useState(true);
    
    // URL publik lengkap ke file PDF Anda
    const pdfPublicUrl = 'https://meracik-coffee.tamzidan.com/assets/paddies-menu.pdf';
    
    // Buat URL untuk Google Drive Viewer
    const googleViewerUrl = `https://docs.google.com/gview?url=${pdfPublicUrl}&embedded=true`;

    // Menu categories untuk showcase
    const menuCategories = [
        {
            id: 1,
            name: "Coffee & Espresso",
            description: "Premium coffee blends dan espresso-based drinks",
            icon: <Coffee className="h-6 w-6" />,
            items: 15
        },
        {
            id: 2,
            name: "Non-Coffee Drinks",
            description: "Tea, chocolate, dan signature beverages",
            icon: <Star className="h-6 w-6" />,
            items: 12
        },
        {
            id: 3,
            name: "Food & Snacks",
            description: "Makanan ringan dan main course",
            icon: <FileText className="h-6 w-6" />,
            items: 20
        },
        {
            id: 4,
            name: "Desserts",
            description: "Kue, pastry, dan dessert spesial",
            icon: <Clock className="h-6 w-6" />,
            items: 8
        }
    ];

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    return (
        <MainLayout>
            <Head title="Menu Kami - Paddies Cafe" />

            {/* Hero Section */}
            <div className="bg-black text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <Coffee className="h-12 w-12 text-white mr-3" />
                        <h1 className="text-4xl md:text-6xl font-bold">Menu Kami</h1>
                    </div>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                        Jelajahi koleksi lengkap hidangan dan minuman berkualitas tinggi yang telah kami siapkan khusus untuk Anda
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/assets/paddies-menu.pdf"
                            download="paddies-menu.pdf"
                            className="bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center transform hover:scale-105"
                        >
                            <Download className="mr-2 h-5 w-5" />
                            Download Menu (PDF)
                        </a>
                        <a
                            href={pdfPublicUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center"
                        >
                            <ExternalLink className="mr-2 h-5 w-5" />
                            Buka di Tab Baru
                        </a>
                    </div>
                </div>
            </div>

            {/* Menu Categories Preview */}
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-black mb-4">Kategori Menu</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Temukan berbagai pilihan menu yang telah kami kategorikan untuk kemudahan Anda
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {menuCategories.map((category) => (
                            <div 
                                key={category.id} 
                                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group hover:bg-black hover:text-white"
                            >
                                <div className="bg-black group-hover:bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                                    <div className="text-white group-hover:text-black">
                                        {category.icon}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-black group-hover:text-white mb-2">
                                    {category.name}
                                </h3>
                                <p className="text-gray-600 group-hover:text-gray-300 text-sm mb-3">
                                    {category.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500 group-hover:text-gray-400">
                                        {category.items} items
                                    </span>
                                    <ArrowRight className="h-4 w-4 text-black group-hover:text-white" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* PDF Viewer Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-black mb-4">Menu Lengkap</h2>
                        <p className="text-gray-600 text-lg">
                            Lihat menu lengkap kami dalam format PDF di bawah ini
                        </p>
                    </div>

                    {/* PDF Viewer Container */}
                    <div className="relative max-w-5xl mx-auto">
                        {/* Loading State */}
                        {isLoading && (
                            <div className="absolute inset-0 bg-gray-100 rounded-xl flex items-center justify-center z-10">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                                    <p className="text-gray-600 font-medium">Memuat menu...</p>
                                </div>
                            </div>
                        )}
                        
                        {/* PDF Viewer */}
                        <div className="w-full aspect-[4/5] md:aspect-video lg:aspect-[8.5/11] border-2 border-gray-300 rounded-xl shadow-2xl overflow-hidden bg-white">
                            <iframe
                                src={googleViewerUrl}
                                title="Menu Paddies Cafe"
                                className="w-full h-full border-none"
                                onLoad={handleIframeLoad}
                            />
                        </div>

                        {/* Alternative Options */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-500 text-sm mb-4">
                                Tidak bisa melihat menu? Coba alternatif di bawah ini:
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <a
                                    href="/assets/paddies-menu.pdf"
                                    download="paddies-menu.pdf"
                                    className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 text-sm flex items-center justify-center"
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download PDF
                                </a>
                                <a
                                    href={pdfPublicUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border-2 border-black text-black hover:bg-black hover:text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 text-sm flex items-center justify-center"
                                >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Buka PDF Langsung
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="py-16 bg-black text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Siap Memesan?</h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        Hubungi kami sekarang untuk reservasi atau pemesanan. Tim kami siap melayani Anda dengan sepenuh hati.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="https://api.whatsapp.com/send/?phone=6287752723783&text&type=phone_number&app_absent=0">
                            <button className="cursor-pointer bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                                Hubungi Kami
                            </button>
                        </a>
                        <a href="/reservasi">
                            <button className="cursor-pointer border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                                Reservasi Meja
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}