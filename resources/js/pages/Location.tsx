// resources/js/Pages/Location.tsx
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { 
    MapPin, 
    Clock, 
    Phone, 
    ExternalLink,
    Navigation,
    Coffee,
    Car,
    Wifi,
    CreditCard,
    Users,
    Mail
} from 'lucide-react';

export default function Location() {
    const [isMapLoading, setIsMapLoading] = useState(true);
    
    const googleMapsUrl = "https://www.google.com/maps/place/Paddies.Cafe/@-6.9939763,107.807694,17z/data=!4m15!1m8!3m7!1s0x2e68c5c6ea4e2d63:0xc071a0b3d3e549f0!2sPaddies.Cafe!8m2!3d-6.9939816!4d107.8102689!10e1!16s%2Fg%2F11t4kzfz_1!3m5!1s0x2e68c5c6ea4e2d63:0xc071a0b3d3e549f0!8m2!3d-6.9939816!4d107.8102689!16s%2Fg%2F11t4kzfz_1?entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D";

    const facilities = [
        {
            icon: <Wifi className="h-6 w-6" />,
            title: "Free WiFi",
            description: "Internet cepat untuk bekerja"
        },
        {
            icon: <Car className="h-6 w-6" />,
            title: "Parking Area",
            description: "Area parkir yang luas"
        },
        {
            icon: <CreditCard className="h-6 w-6" />,
            title: "Cashless Payment",
            description: "Pembayaran digital tersedia"
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: "Family Friendly",
            description: "Cocok untuk keluarga"
        }
    ];

    const handleMapLoad = () => {
        setIsMapLoading(false);
    };

    return (
        <MainLayout>
            <Head title="Lokasi Kami - Paddies Cafe" />

            {/* Hero Section */}
            <div className="bg-black text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <MapPin className="h-12 w-12 text-white mr-3" />
                        <h1 className="text-4xl md:text-6xl font-bold">Lokasi Kami</h1>
                    </div>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                        Kunjungi Paddies Cafe di Cicalengka, Bandung untuk pengalaman ngopi yang tak terlupakan
                    </p>
                    <div className="flex items-center justify-center text-gray-300">
                        <Navigation className="h-5 w-5 mr-2" />
                        <span>Mudah dijangkau dari berbagai arah</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto py-16 px-6">
                
                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    
                    {/* Map Section */}
                    <div className="order-2 lg:order-1">
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-black flex items-center">
                                    <MapPin className="h-6 w-6 mr-2" />
                                    Peta Lokasi
                                </h2>
                                <p className="text-gray-600 mt-1">Temukan rute terbaik menuju cafe kami</p>
                            </div>
                            
                            <div className="relative">
                                {/* Loading State */}
                                {isMapLoading && (
                                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10 h-96">
                                        <div className="text-center">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                                            <p className="text-gray-600 font-medium">Memuat peta...</p>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="h-96">
                                    <iframe 
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.1299176858915!2d107.80769397403675!3d-6.993976268494977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c5c6ea4e2d63%3A0xc071a0b3d3e549f0!2sPaddies.Cafe!5e0!3m2!1sid!2sid!4v1756041680948!5m2!1sid!2sid"
                                        className="w-full h-full border-0 filter grayscale hover:grayscale-0 transition-all duration-500"
                                        allowFullScreen={true}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        onLoad={handleMapLoad}
                                    />
                                </div>
                            </div>
                            
                            <div className="p-6 bg-gray-50 border-t border-gray-200">
                                <a 
                                    href={googleMapsUrl}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    <ExternalLink className="h-5 w-5 mr-2" />
                                    Buka di Google Maps
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="order-1 lg:order-2 space-y-8">
                        
                        {/* Cafe Info */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                            <div className="flex items-center mb-6">
                                <Coffee className="h-8 w-8 text-black mr-3" />
                                <h2 className="text-3xl font-bold text-black">Paddies Cafe</h2>
                            </div>
                            
                            <div className="space-y-6">
                                {/* Address */}
                                <div className="flex items-start group">
                                    <MapPin className="h-6 w-6 text-black mt-1 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                    <div>
                                        <h3 className="font-bold text-black mb-1">Alamat Lengkap</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Jl. Raya Cicalengka - Majalaya, Cikuya, Kec. Cicalengka, 
                                            Kabupaten Bandung, Jawa Barat 40395
                                        </p>
                                    </div>
                                </div>

                                {/* Operating Hours */}
                                <div className="flex items-start group">
                                    <Clock className="h-6 w-6 text-black mt-1 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                    <div>
                                        <h3 className="font-bold text-black mb-1">Jam Operasional</h3>
                                        <div className="text-gray-600">
                                            <p className="font-medium text-black">Setiap Hari</p>
                                            <p>08:00 - 23:00 WIB</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact */}
                                <div className="flex items-start group">
                                    <Phone className="h-6 w-6 text-black mt-1 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                    <div>
                                        <h3 className="font-bold text-black mb-1">Kontak</h3>
                                        <a 
                                            href="tel:+6287752723783" 
                                            className="text-gray-600 hover:text-black transition-colors duration-300"
                                        >
                                            +62 877 5272 3783
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start group">
                                    <Mail className="h-6 w-6 text-black mt-1 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                    <div>
                                        <h3 className="font-bold text-black mb-1">Email</h3>
                                        <a 
                                            href="mailto:info@paddiescafe.com" 
                                            className="text-gray-600 hover:text-black transition-colors duration-300"
                                        >
                                            info@paddiescafe.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a href="https://api.whatsapp.com/send/?phone=6287752723783&text&type=phone_number&app_absent=0">
                                <button className="cursor-pointer bg-black hover:bg-gray-800 text-white rounded-xl py-4 px-15 font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                                            <Phone className="h-5 w-5 mr-2" />
                                            Telepon Sekarang
                                </button>
                            </a>
                            <a href="https://www.google.com/maps/dir//Paddies.Cafe,+Jl.+Bojong+Cibodas,+Tanjunglaya,+Kec.+Cikancung,+Kabupaten+Bandung,+Jawa+Barat+40396/@-6.9173248,107.6133888,17z/data=!4m17!1m7!3m6!1s0x2e68c5c6ea4e2d63:0xc071a0b3d3e549f0!2sPaddies.Cafe!8m2!3d-6.9939816!4d107.8102689!16s%2Fg%2F11t4kzfz_1!4m8!1m0!1m5!1m1!1s0x2e68c5c6ea4e2d63:0xc071a0b3d3e549f0!2m2!1d107.8102689!2d-6.9939816!3e9?entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D">
                                <button className="cursor-pointer border-2 border-black text-black hover:bg-black hover:text-white py-4 px-18 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center">
                                    <Navigation className="h-5 w-5 mr-2" />
                                    Navigasi GPS
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Facilities Section */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-black mb-4">Fasilitas Tersedia</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Nikmati berbagai fasilitas yang telah kami sediakan untuk kenyamanan Anda
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {facilities.map((facility, index) => (
                            <div 
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group hover:bg-black hover:text-white"
                            >
                                <div className="bg-black group-hover:bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                                    <div className="text-white group-hover:text-black">
                                        {facility.icon}
                                    </div>
                                </div>
                                <h3 className="font-bold text-black group-hover:text-white mb-2">
                                    {facility.title}
                                </h3>
                                <p className="text-gray-600 group-hover:text-gray-300 text-sm">
                                    {facility.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gray-50 rounded-2xl p-12 text-center">
                    <h2 className="text-3xl font-bold text-black mb-4">
                        Siap Berkunjung?
                    </h2>
                    <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto">
                        Kami tunggu kedatangan Anda di Paddies Cafe. Rasakan pengalaman ngopi yang berbeda 
                        dengan suasana yang nyaman dan pelayanan yang ramah.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/reservasi">
                            <button className="cursor-pointer bg-black hover:bg-gray-800 text-white px-8 py-4.5 rounded-lg font-semibold text-lg transition-colors duration-300">
                                Reservasi Meja
                            </button>
                        </a>
                        <a href="/menu">
                            <button className="cursor-pointer border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                                Lihat Menu
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}