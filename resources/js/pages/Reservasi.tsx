// resources/js/Pages/Reservasi.tsx
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { PhoneArrowUpRightIcon } from '@heroicons/react/24/solid';

export default function Reservasi() {
    // --- GANTI NOMOR WHATSAPP DI BAWAH INI ---
    // Gunakan format 62 (kode negara Indonesia), bukan 0.
    const whatsAppNumber = '6287752723783'; 
    
    // Pesan default yang akan muncul di WhatsApp saat link diklik
    const message = encodeURIComponent(
        'Hai min aku mau reservasi dong!'
    );

    const whatsAppLink = `https://wa.me/${whatsAppNumber}?text=${message}`;

    return (
        <MainLayout>
            <Head title="Reservasi Tempat" />
            
            <div className="container mx-auto py-16 px-4 bg-white min-h-screen">
                <div className="max-w-2xl mx-auto text-center bg-black p-8 sm:p-12 rounded-xl shadow-2xl border-4 border-gray-800">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        Reservasi Tempat Anda
                    </h1>
                    
                    <div className="space-y-4 mb-8">
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Berencana datang bersama rombongan atau ingin memastikan Anda mendapatkan tempat terbaik?
                            Kami sarankan untuk melakukan reservasi terlebih dahulu untuk kenyamanan Anda.
                        </p>
                        
                        <p className="text-gray-400 leading-relaxed">
                            Cukup klik tombol di bawah ini untuk terhubung langsung dengan tim kami melalui WhatsApp. 
                            Kami akan membantu Anda menyiapkan segalanya.
                        </p>
                    </div>
                    
                    <div className="mt-8">
                        <a
                            href={whatsAppLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-white text-black font-bold text-lg py-4 px-8 rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-gray-300 hover:border-black"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.456l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.908 6.161l-1.317 4.834 4.92-1.307z"/>
                            </svg>
                            Reservasi via WhatsApp
                        </a>
                    </div>
                    
                    {/* Decorative elements for visual interest */}
                    <div className="mt-8 pt-6 border-t border-gray-700">
                        <div className="flex justify-center space-x-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}