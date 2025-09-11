import React from 'react';
import { 
    MapPin, 
    Phone, 
    Mail, 
    Clock, 
    Facebook, 
    Instagram, 
    Twitter,
    Coffee,
    Heart,
    ArrowRight
} from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white mt-auto">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-2 mb-6">
                            <Coffee className="h-10 w-10 text-white" />
                            <h3 className="text-3xl font-bold text-white">Paddies Cafe</h3>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Tempat favorit untuk menikmati kopi berkualitas tinggi, makanan lezat, 
                            dan suasana yang nyaman bersama keluarga dan teman.
                        </p>
                        <div className="flex space-x-4">
                            <a 
                                href="#" 
                                className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a 
                                href="https://www.instagram.com/paddiescafe?igsh=MWIxemdqaXc2MjZ1Zg%3D%3D&utm_source=qr" 
                                className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10"
                                aria-label="Instagram"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a 
                                href="#" 
                                className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-bold mb-6 text-white">Menu Utama</h4>
                        <ul className="space-y-3">
                            {[
                                { name: 'Beranda', href: '/' },
                                { name: 'Menu', href: '/menu' },
                                { name: 'Shop', href: '/shop' },
                                { name: 'Location', href: '/location' },
                                { name: 'Reservasi', href: '/reservasi' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <a 
                                        href={item.href} 
                                        className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group"
                                    >
                                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all duration-300" />
                                        <span className="ml-2 group-hover:ml-0">{item.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-bold mb-6 text-white">Hubungi Kami</h4>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3 group">
                                <MapPin className="h-5 w-5 text-white mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                <div>
                                    <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                                        Jl. Bojong Cibodas, Tanjunglaya, Kec. Cikancung, Kabupaten Bandung, Jawa Barat 40396
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 group">
                                <Phone className="h-5 w-5 text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                <a 
                                    href="tel:+6287752723783" 
                                    className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300"
                                >
                                    +62 877 5272 3783
                                </a>
                            </div>
                            <div className="flex items-center space-x-3 group">
                                <Mail className="h-5 w-5 text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                <a 
                                    href="mailto:info@paddiescafe.com" 
                                    className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300"
                                >
                                    info@paddiescafe.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h4 className="text-xl font-bold mb-6 text-white">Jam Buka</h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Clock className="h-5 w-5 text-white flex-shrink-0" />
                                <div className="text-gray-300 text-sm">
                                    <p className="font-semibold text-white">Senin - Jumat</p>
                                    <p>07:00 - 22:00</p>
                                </div>
                            </div>
                            <div className="text-gray-300 text-sm ml-8">
                                <p className="font-semibold text-white">Sabtu - Minggu</p>
                                <p>08:00 - 23:00</p>
                            </div>
                        </div>
                        
                        {/* Special Notice */}
                        <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
                            <p className="text-white text-sm font-medium">
                                ☕ Happy Hour: 15:00-17:00<br />
                                <span className="text-gray-300">Diskon 20% untuk semua minuman!</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="border-t border-gray-700">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <div className="text-center md:text-left">
                            <h4 className="text-xl font-bold text-white mb-2">
                                Dapatkan Update Terbaru
                            </h4>
                            <p className="text-gray-300">
                                Berlangganan newsletter untuk promo dan menu terbaru
                            </p>
                        </div>
                        <div className="flex space-x-2 w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Masukkan email Anda"
                                className="px-4 py-3 bg-white/10 text-white placeholder-gray-400 rounded-lg border border-white/20 focus:border-white focus:outline-none flex-1 md:w-64 backdrop-blur-sm"
                            />
                            <button className="px-8 py-3 bg-white hover:bg-gray-200 text-black rounded-lg font-semibold transition-all duration-300 whitespace-nowrap transform hover:scale-105">
                                Daftar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 bg-gray-900">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                            <span>&copy; {currentYear} Paddies Cafe. All Rights Reserved.</span>
                        </div>
                        <div className="flex items-center space-x-6 text-gray-400 text-sm">
                            <a href="#" className="hover:text-white transition-colors duration-300 hover:underline">
                                Kebijakan Privasi
                            </a>
                            <span className="text-gray-600">•</span>
                            <a href="#" className="hover:text-white transition-colors duration-300 hover:underline">
                                Syarat & Ketentuan
                            </a>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                            <span>Made with</span>
                            <Heart className="h-4 w-4 text-white fill-current animate-pulse" />
                            <span>by a cool developer</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}