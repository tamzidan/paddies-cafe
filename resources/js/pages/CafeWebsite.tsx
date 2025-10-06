import React, { useState, ReactNode } from 'react';

// Impor komponen kustom
import AppLogoIcon from '../components/app-logo-icon';

// Impor komponen dan modul dari Swiper.js untuk slider/carousel
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation as SwiperNavigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Impor ikon dari pustaka lucide-react
import {
    Menu, X, Star, Coffee, Users, Clock, MapPin, Phone, Mail, Instagram, Navigation as NavigationIcon,
    Download, Filter, ShoppingBag, ArrowRight, Image as ImageIcon, QrCode, Heart,
    Wifi, Quote, Car, Trees, ExternalLink, Play,
    Loader2, AlertCircle, ZoomIn, ChefHat, CalendarCheck
} from 'lucide-react';

// Impor file CSS yang dibutuhkan oleh Swiper.js
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// ==========================================================
// == 1. KOMPONEN-KOMPONEN UI UTAMA
// ==========================================================

/**
 * Komponen Navbar
 * @param {object} props - Props komponen
 * @param {string} props.activeSection - ID seksi yang sedang aktif
 * @param {Function} props.setActiveSection - Fungsi untuk mengubah seksi aktif
 * @returns {JSX.Element} - Elemen JSX untuk navigasi utama.
 */
const Navbar = ({ activeSection, setActiveSection }: any) => {
    // State untuk mengontrol visibilitas menu pada tampilan mobile
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Daftar link navigasi
    const navLinks = [
        { id: 'home', text: 'Home' },
        { id: 'menu', text: 'Menu' },
        { id: 'shop', text: 'Shop' },
        { id: 'location', text: 'Location' },
        { id: 'gallery', text: 'Gallery' },
    ];

    // Fungsi untuk mengecek apakah sebuah link sedang aktif
    const isActiveLink = (id: string) => activeSection === id;

    // Fungsi yang dipanggil saat link navigasi diklik
    const handleNavClick = (id: string) => {
        setActiveSection(id);
        setIsMenuOpen(false); // Tutup menu mobile setelah link diklik
    };

    return (
        <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
            {/* Kontainer utama navbar */}
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo dan Nama Brand */}
                <div className="flex items-center space-x-2 cursor-pointer transition-all duration-300 transform hover:scale-105">
                    <AppLogoIcon className="fill-current text-white dark:text-white rounded-full size-10 shadow-md" />
                    <button
                        onClick={() => handleNavClick('home')}
                        className="font-bold text-2xl text-black cursor-pointer"
                    >
                        Paddies Cafe
                    </button>
                </div>

                {/* Link Navigasi untuk Desktop */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => handleNavClick(link.id)}
                            className={`relative font-medium transition-all duration-300 py-2 ${
                                isActiveLink(link.id)
                                    ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black cursor-pointer'
                                    : 'text-gray-600 hover:text-black hover:after:content-[""] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-gray-400 hover:after:transition-all hover:after:duration-300 cursor-pointer'
                            }`}
                        >
                            {link.text}
                        </button>
                    ))}
                </div>

                {/* Tombol Reservasi untuk Desktop */}
                <div className="hidden md:block">
                    <button
                        onClick={() => handleNavClick('reservasi')}
                        className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md cursor-pointer"
                    >
                        Reservasi
                    </button>
                </div>

                {/* Tombol Toggle Menu untuk Mobile */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-black focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Konten Menu Dropdown untuk Mobile */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible'
            } overflow-hidden`}>
                <div className="bg-white border-t border-gray-200 shadow-lg">
                    {navLinks.map((link, index) => (
                        <button
                            key={`mobile-${link.id}`}
                            onClick={() => handleNavClick(link.id)}
                            className={`block w-full text-left px-6 py-4 transition-all duration-300 border-l-4 ${
                                isActiveLink(link.id)
                                    ? 'text-black font-semibold bg-gray-50 border-l-black'
                                    : 'text-gray-600 hover:text-black hover:bg-gray-50 hover:pl-8 border-l-transparent'
                            }`}
                            style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
                        >
                            {link.text}
                        </button>
                    ))}
                    <div className="px-6 py-4 border-t border-gray-100">
                        <button
                            onClick={() => handleNavClick('reservasi')}
                            className="block w-full text-center bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
                        >
                            Reservasi Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

/**
 * Komponen Footer
 * @param {object} props - Props komponen
 * @param {Function} props.setActiveSection - Fungsi untuk mengubah seksi aktif
 * @param {ReservationSettings} props.reservationSettings - Objek berisi data kontak dari settings
 * @returns {JSX.Element} - Elemen JSX untuk footer.
 */
const Footer = ({ setActiveSection, reservationSettings }: any) => {
    const currentYear = new Date().getFullYear();
    const quickLinks = [
        { name: 'Home', id: 'home' },
        { name: 'Menu', id: 'menu' },
        { name: 'Shop', id: 'shop' },
        { name: 'Location', id: 'location' },
        { name: 'Gallery', id: 'gallery' },
        { name: 'Reservasi', id: 'reservasi' },
    ];

    // Membuat URL WhatsApp yang dinamis dari settings
    const whatsappUrl = `https://wa.me/${reservationSettings.reservasi_wa_number || ''}?text=${encodeURIComponent(reservationSettings.reservasi_wa_text || '')}`;

    return (
        <footer className="bg-black text-white mt-auto">
            {/* Konten utama footer */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
                    {/* Kolom 1: Informasi Brand & Social Media */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-2 mb-6">
                            <Coffee className="h-10 w-10 text-white" />
                            <h3 className="text-3xl font-bold text-white">Paddies Cafe</h3>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Tempat favorit untuk menikmati kopi, makanan lezat,
                            dan suasana yang nyaman bersama keluarga dan teman.
                        </p>
                        {/* MODIFIKASI: Link sosial media dinamis */}
                        <div className="flex space-x-4">
                            {/* Ikon TikTok: hanya tampil jika link ada */}
                            {reservationSettings?.reservasi_tiktok_link && (
                                <a href={reservationSettings.reservasi_tiktok_link} className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                                </a>
                            )}
                            {/* Ikon Instagram: hanya tampil jika link ada */}
                            {reservationSettings?.reservasi_ig_link && (
                                <a href={reservationSettings.reservasi_ig_link} className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                    <Instagram className="h-6 w-6" />
                                </a>
                            )}
                            {/* Ikon WhatsApp: hanya tampil jika nomor WA ada */}
                            {reservationSettings?.reservasi_wa_number && (
                                <a href={whatsappUrl} className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve"><path fill="#000000" opacity="1.000000" stroke="none" d=" M60.000000,101.000000 C40.000004,101.000000 20.500008,101.000000 1.000008,101.000000 C1.000005,67.666679 1.000005,34.333351 1.000003,1.000021 C34.333317,1.000014 67.666634,1.000014 100.999969,1.000007 C100.999977,34.333313 100.999977,67.666626 100.999985,100.999969 C87.500000,101.000000 74.000000,101.000000 60.000000,101.000000 M16.235203,91.965279 C20.695047,90.658409 25.136599,89.281311 29.631836,88.110306 C30.427845,87.902946 31.521376,88.409111 32.352612,88.831566 C41.103264,93.278847 50.215969,93.925499 59.763931,92.039879 C87.903671,86.482559 101.419495,54.703991 87.993057,30.642778 C78.968948,14.470882 61.273048,6.118834 42.569668,9.865643 C17.162710,14.955364 2.613998,41.216015 11.495090,65.353584 C13.688280,71.314377 13.373197,76.076637 11.852147,81.503517 C10.804087,85.242844 9.837976,89.005142 8.744414,93.097015 C11.567237,92.629143 13.472882,92.313293 16.235203,91.965279 z"/><path fill="#ffffffab" opacity="1.000000" stroke="none" d=" M15.806866,91.981354 C13.472882,92.313293 11.567237,92.629143 8.744414,93.097015 C9.837976,89.005142 10.804087,85.242844 11.852147,81.503517 C13.373197,76.076637 13.688280,71.314377 11.495090,65.353584 C2.613998,41.216015 17.162710,14.955364 42.569668,9.865643 C61.273048,6.118834 78.968948,14.470882 87.993057,30.642778 C101.419495,54.703991 87.903671,86.482559 59.763931,92.039879 C50.215969,93.925499 41.103264,93.278847 32.352612,88.831566 C31.521376,88.409111 30.427845,87.902946 29.631836,88.110306 C25.136599,89.281311 20.695047,90.658409 15.806866,91.981354 M70.491142,24.993132 C63.888542,19.595255 56.084270,17.259523 47.864979,18.204725 C38.488079,19.283049 30.585407,23.821541 24.835747,31.646124 C18.289198,40.555176 16.203598,50.276024 20.035961,60.750870 C22.317511,66.986931 26.026066,72.855927 21.245008,80.494057 C28.042299,78.917130 33.169247,78.249207 38.898495,81.088432 C50.283279,86.730347 66.588104,83.076736 74.454826,73.955307 C81.968597,65.243126 86.094940,55.267216 82.923904,43.594349 C80.962791,36.375298 77.737991,29.727215 70.491142,24.993132 z"/><path fill="#000000" opacity="1.000000" stroke="none" d=" M70.753952,25.255646 C77.737991,29.727215 80.962791,36.375298 82.923904,43.594349 C86.094940,55.267216 81.968597,65.243126 74.454826,73.955307 C66.588104,83.076736 50.283279,86.730347 38.898495,81.088432 C33.169247,78.249207 28.042299,78.917130 21.245008,80.494057 C26.026066,72.855927 22.317511,66.986931 20.035961,60.750870 C16.203598,50.276024 18.289198,40.555176 24.835747,31.646124 C30.585407,23.821541 38.488079,19.283049 47.864979,18.204725 C56.084270,17.259523 63.888542,19.595255 70.753952,25.255646 M51.700119,58.972935 C48.041672,55.599857 44.383224,52.226776 40.443947,48.594772 C46.370449,44.005157 44.157784,39.286098 41.933529,34.601460 C40.007526,30.545006 35.928421,29.316740 33.093678,32.739445 C30.949373,35.328506 28.819569,39.744785 29.559748,42.602982 C33.386314,57.379234 43.330135,66.874573 57.989765,70.772896 C62.161106,71.882141 67.617233,72.381660 70.597672,67.666893 C71.891472,65.620239 72.956001,61.325790 71.893471,60.244225 C66.289803,54.540215 61.188419,55.066818 56.149509,61.146622 C54.943890,60.460297 53.696213,59.750031 51.700119,58.972935 z"/><path fill="#ffffffd2" opacity="1.000000" stroke="none" d=" M52.074326,59.006348 C53.696213,59.750031 54.943890,60.460297 56.149509,61.146622 C61.188419,55.066818 66.289803,54.540215 71.893471,60.244225 C72.956001,61.325790 71.891472,65.620239 70.597672,67.666893 C67.617233,72.381660 62.161106,71.882141 57.989765,70.772896 C43.330135,66.874573 33.386314,57.379234 29.559748,42.602982 C28.819569,39.744785 30.949373,35.328506 33.093678,32.739445 C35.928421,29.316740 40.007526,30.545006 41.933529,34.601460 C44.157784,39.286098 46.370449,44.005157 40.443947,48.594772 C44.383224,52.226776 48.041672,55.599857 52.074326,59.006348 z"/></svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Kolom 2: Menu Utama (Quick Links) */}
                    <div>
                        <h4 className="text-xl font-bold mb-6 text-white">Menu Utama</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((item) => (
                                <li key={item.name}>
                                    <button
                                        onClick={() => setActiveSection(item.id)}
                                        className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group"
                                    >
                                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all duration-300 cursor-pointer" />
                                        <span className="ml-2 group-hover:ml-0 cursor-pointer">{item.name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kolom 3: Informasi Kontak (Dibuat Dinamis) */}
                    <div>
                        <h4 className="text-xl font-bold mb-6 text-white">Hubungi Kami</h4>
                        <div className="space-y-4">
                            {/* Alamat Statis */}
                            <div className="flex items-start space-x-3 group">
                                <MapPin className="h-5 w-5 text-white mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                <div>
                                    <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                                        Jl. Bojong Cibodas, Tanjunglaya, Kec. Cikancung, Kabupaten Bandung, Jawa Barat 40396
                                    </p>
                                </div>
                            </div>
                            
                            {/* Tampilkan nomor telepon jika ada di settings */}
                            {reservationSettings?.reservasi_phone_number && (
                                <div className="flex items-center space-x-3 group">
                                    <Phone className="h-5 w-5 text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                    <a href={`tel:${reservationSettings.reservasi_phone_number}`} className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">
                                        {reservationSettings.reservasi_phone_number}
                                    </a>
                                </div>
                            )}

                            {/* Tampilkan email jika ada di settings */}
                            {reservationSettings?.reservasi_email && (
                                <div className="flex items-center space-x-3 group">
                                    <Mail className="h-5 w-5 text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                    <a href={`mailto:${reservationSettings.reservasi_email}`} className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">
                                        {reservationSettings.reservasi_email}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright & Credit Section */}
            <div className="border-t border-gray-700 bg-gray-900">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                            <span>© {currentYear} Paddies Cafe. All Rights Reserved.</span>
                        </div>
                        <div className="flex items-center space-x-6 text-gray-400 text-sm">
                            <a href={'/privacy-policy'} className="hover:text-white transition-colors duration-300 hover:underline">Kebijakan Privasi</a>
                            <span className="text-gray-600">•</span>
                            <a href={'/terms-conditions'} className="hover:text-white transition-colors duration-300 hover:underline">Syarat & Ketentuan</a>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                            <span>Made with</span>
                            <Heart className="h-4 w-4 text-white fill-current animate-pulse" />
                            <span>by <a href="https://tamzidan.com" className="hover:text-white transition-colors duration-300 hover:underline">Tamzidan Mahdiyin</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

/**
 * Komponen MenuViewer
 * Menampilkan menu dalam format PDF menggunakan Google Docs Viewer.
 * @param {object} props - Props komponen
 * @param {string | null} props.menuPdfUrl - URL ke file PDF menu
 * @returns {JSX.Element} - Elemen JSX untuk penampil menu.
 */
const MenuViewer = ({ menuPdfUrl }: { menuPdfUrl: string | null }) => {
    // State untuk menampilkan indikator loading saat PDF sedang dimuat
    const [isLoading, setIsLoading] = useState(true);

    // URL untuk Google Docs Viewer, dienkripsi untuk keamanan
    const googleViewerUrl = menuPdfUrl
        ? `https://docs.google.com/gview?url=https://paddiescafe.com${encodeURIComponent(menuPdfUrl)}&embedded=true`
        : '';

    // Fungsi yang dipanggil setelah iframe (PDF viewer) selesai dimuat
    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    return (
        <div>
            {/* Header seksi menu */}
            <div className="bg-black text-white py-19">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <Coffee className="h-12 w-12 text-white mr-3" />
                        <h1 className="text-4xl md:text-6xl font-bold">Menu Kami</h1>
                    </div>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                        Jelajahi koleksi lengkap hidangan dan minuman berkualitas tinggi yang telah kami siapkan khusus untuk Anda
                    </p>
                    {menuPdfUrl ? (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href={menuPdfUrl} download="paddies-menu.pdf" className="bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center transform hover:scale-105">
                                <Download className="mr-2 h-5 w-5" />
                                Download Menu (PDF)
                            </a>
                            <a href={menuPdfUrl} target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center">
                                <ExternalLink className="mr-2 h-5 w-5" />
                                Buka di Tab Baru
                            </a>
                        </div>
                    ) : (
                         <p className="text-yellow-400">Menu PDF akan segera tersedia.</p>
                    )}
                </div>
            </div>

            {/* Kontainer untuk menampilkan PDF */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    {menuPdfUrl ? (
                        <div className="max-w-4xl mx-auto bg-black rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
                            <div className="relative">
                                {/* Tampilkan overlay loading */}
                                {isLoading && (
                                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10">
                                        <div className="text-center">
                                            <Loader2 className="h-12 w-12 animate-spin text-white mx-auto mb-4" />
                                            <p className="text-gray-300 font-medium">Mempersiapkan menu...</p>
                                        </div>
                                    </div>
                                )}
                                {/* Iframe untuk Google Docs Viewer */}
                                <div className="w-full aspect-[8.5/11] bg-gray-800">
                                    <iframe
                                        src={googleViewerUrl}
                                        title="Menu Paddies Cafe"
                                        className="w-full h-full border-none"
                                        onLoad={handleIframeLoad}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Tampilan jika menu tidak tersedia
                        <div className="max-w-4xl mx-auto text-center py-12">
                             <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg" role="alert">
                                 <div className="flex">
                                     <div className="py-1"><AlertCircle className="h-6 w-6 text-yellow-500 mr-4"/></div>
                                     <div>
                                         <p className="font-bold">Menu Belum Tersedia</p>
                                         <p className="text-sm">Saat ini menu digital sedang tidak tersedia. Silakan cek kembali nanti.</p>
                                     </div>
                                 </div>
                             </div>
                        </div>
                    )}
                    {/* Opsi alternatif jika PDF gagal dimuat */}
                    {menuPdfUrl && (
                        <div className="mt-8 text-center">
                            <p className="text-gray-500 text-sm mb-4">
                                Tidak dapat melihat menu? Coba alternatif di bawah ini:
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href={menuPdfUrl} download="paddies-menu.pdf" className="bg-black hover:bg-gray-950 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center transform hover:scale-105">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download PDF
                                </a>
                                <a href={menuPdfUrl} target="_blank" rel="noopener noreferrer" className="border-2 border-black text-black hover:bg-black hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-sm flex items-center justify-center">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Buka di Tab Baru
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


// ==========================================================
// == 2. DEFINISI TIPE DATA (INTERFACES)
// ==========================================================

// Struktur data untuk item slider
interface Slider {
    id: number;
    title: string;
    subtitle: string;
    image_path?: string;
    order: number;
}
// Struktur data untuk testimoni pelanggan
interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar?: string;
}
// Struktur data untuk kategori produk
interface ProductCategory {
    id: number;
    name: string;
}
// Struktur data untuk produk
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    category: ProductCategory;
    is_featured: boolean;
    image_path?: string;
    delivery_link_1?: string;
    delivery_link_2?: string;
    delivery_link_3?: string;
}
// Struktur data untuk item galeri
interface Gallery {
    id: number;
    image_path: string;
    caption: string | null;
}
// Struktur data untuk jam operasional
interface OperationalHour {
    id: number;
    day: string;
    hours: string;
    is_open: boolean;
}
// Struktur data untuk pengaturan reservasi dan kontak
interface ReservationSettings {
    reservasi_title?: string;
    reservasi_subtitle?: string;
    reservasi_wa_number?: string;
    reservasi_wa_text?: string;
    reservasi_phone_number?: string;
    reservasi_email?: string;
    reservasi_ig_username?: string;
    reservasi_ig_link?: string;
    reservasi_tiktok_name?: string;
    reservasi_tiktok_link?: string;
    reservasi_tips?: string;
}
// Struktur data untuk props utama komponen CafeWebsite
interface CafeWebsiteProps {
    sliders: Slider[];
    products?: Product[];
    categories?: ProductCategory[];
    menuPdfUrl: string | null;
    testimonials: Testimonial[];
    featuredProducts: any[];
    galleries: Gallery[];
    reservationSettings: ReservationSettings;
    operationalHours: OperationalHour[];
}


// ==========================================================
// == 3. KOMPONEN-KOMPONEN SEKSI HALAMAN
// ==========================================================

/**
 * Komponen HomeSection
 * Menampilkan semua konten yang ada di halaman utama (Home).
 * @param {object} props - Props komponen
 * @returns {JSX.Element} - Elemen JSX untuk seksi Home.
 */
const HomeSection = ({ sliders, operationalHours, featuredProducts, testimonials, setActiveSection }: any) => {
    // Logika untuk menentukan hari ini dan menandainya di jam operasional
    const todayIndex = new Date().getDay(); // 0 = Minggu, 1 = Senin, ...
    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const todayName = dayNames[todayIndex];

    return (
        <div className="space-y-0 pt-0">
            {/* --- Hero Slider Section --- */}
            <div className="relative w-full -mt-7 overflow-hidden">
                <Swiper
                    modules={[SwiperNavigation, Pagination, Autoplay, EffectFade]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={{ enabled: true }}
                    pagination={{ clickable: true }}
                    loop={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    effect="fade"
                    className="h-[70vh] md:h-[80vh] custom-swiper"
                    breakpoints={{
                        0: { navigation: { enabled: false } },
                        768: { navigation: { enabled: true } }
                    }}
                >
                    {sliders.map((slide) => (
                        <SwiperSlide key={slide.id} className="relative">
                            <img
                                src={`/storage/${slide.image_path}`}
                                alt={slide.title || 'Paddies Cafe Slider Image'}
                                className="w-full h-full object-cover filter grayscale"
                            />
                            <div className="absolute inset-0 bg-black/50"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                                <div className="text-center max-w-4xl px-6">
                                    <div className="flex items-center justify-center mb-4">
                                        <img
                                            src="/paddies-logo-transparant.png"
                                            alt="Logo Paddies Cafe"
                                            className="h-26 md:h-36 mb-4"
                                        />
                                    </div>
                                    <p className="text-xl md:text-2xl mb-4 text-gray-200">
                                        Tempat terbaik untuk menikmati kopi dengan suasana yang nyaman.
                                    </p>
                                    <p className="text-xl md:text-2xl mb-4 text-gray-200">
                                        #DariRasaCeritaBermula
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <button onClick={() => setActiveSection('menu')} className="bg-white hover:bg-black hover:text-white text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center border-2 border-white cursor-pointer">
                                            Lihat Menu
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </button>
                                         <button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center cursor-pointer">
                                             <Play className="mr-2 h-5 w-5" />
                                             Virtual Tour
                                         </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* CSS kustom untuk styling Swiper */}
                <style>{`
                    .custom-swiper .swiper-button-next, .custom-swiper .swiper-button-prev { background-color: rgba(0, 0, 0, 0.5); border-radius: 50%; width: 44px; height: 44px; color: #ffffff; transition: background-color 0.3s ease; }
                    .custom-swiper .swiper-button-next:hover, .custom-swiper .swiper-button-prev:hover { background-color: #000000; }
                    .custom-swiper .swiper-button-next::after, .custom-swiper .swiper-button-prev::after { font-size: 20px; }
                    .custom-swiper .swiper-pagination-bullet { background-color: #ffffff; opacity: 0.7; }
                    .custom-swiper .swiper-pagination-bullet-active { background-color: #ffffff; opacity: 1; }
                    .testimonial-swiper .swiper-wrapper { transition-timing-function: linear !important; }
                `}</style>
            </div>

            {/* --- Jam Operasional Section --- */}
            {operationalHours && operationalHours.length > 0 && (
                <div className="py-20 bg-black relative overflow-hidden">
                    {/* Elemen dekoratif latar belakang */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
                        <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full"></div>
                        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
                    </div>
                    
                    <div className="container mx-auto px-6 relative">
                        <div className="text-center mb-16">
                            <div className="flex items-center justify-center mb-6">
                                <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent w-20"></div>
                                <Clock className="h-8 w-8 text-white mx-4" />
                                <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent w-20"></div>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                                Jam Operasional
                            </h2>
                            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                                Kami siap melayani Anda setiap hari dengan sepenuh hati dan dedikasi tinggi.
                            </p>
                        </div>
                        
                        {/* Grid untuk menampilkan jam operasional per hari */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:gap-6 xl:grid-cols-2 xl:gap-6 gap-4 max-w-7xl mx-auto">
                            {operationalHours.map((item, index) => {
                                const isToday = item.day.toLowerCase() === todayName.toLowerCase();
                                const isWeekend = item.day.toLowerCase() === 'sabtu' || item.day.toLowerCase() === 'minggu';
                                
                                return (
                                    <div
                                        key={item.id}
                                        className={`relative group cursor-default overflow-hidden transition-all duration-500 transform hover:scale-105 ${isToday ? 'bg-white text-black shadow-2xl scale-110 z-10' : 'bg-gray-900 text-white border border-gray-800 hover:border-gray-600 hover:bg-gray-800'} rounded-xl min-h-[180px] flex flex-col justify-between p-5 hover:shadow-2xl hover:-translate-y-1`}
                                        style={{ animationDelay: `${index * 100}ms`, animation: 'fadeInUp 0.6s ease-out forwards' }}
                                    >
                                        <div className={`absolute top-0 left-0 w-full h-1 ${isToday ? 'bg-black' : isWeekend ? 'bg-gray-600' : 'bg-gray-700'}`}></div>
                                        {isToday && (
                                            <div className="absolute -top-3 -right-3 bg-black text-white text-xs px-4 py-1 rounded-full font-bold shadow-lg border-2 border-white">
                                                <div className="flex items-center">
                                                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                                                    HARI INI
                                                </div>
                                            </div>
                                        )}
                                        {!isToday && isWeekend && (
                                            <div className="absolute top-3 right-3 w-3 h-3 bg-gray-600 rounded-full opacity-60"></div>
                                        )}
                                        <div className="text-center mb-4">
                                            <h3 className={`font-black text-lg tracking-wider uppercase ${isToday ? 'text-black' : 'text-white group-hover:text-gray-200'}`}>{item.day}</h3>
                                            <div className={`h-px w-8 mx-auto mt-2 ${isToday ? 'bg-black' : 'bg-gray-600 group-hover:bg-gray-500'}`}></div>
                                        </div>
                                        <div className="flex-grow flex items-center justify-center">
                                            <div className={`text-center p-3 rounded-lg transition-all duration-300 ${isToday ? 'bg-gray-100 border border-gray-300' : 'bg-gray-800 border border-gray-700 group-hover:bg-gray-700'}`}>
                                                <p className={`text-sm font-bold leading-relaxed ${isToday ? 'text-black' : 'text-white'}`}>{item.hours}</p>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* Animasi Keyframes untuk entri elemen */}
                    <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }`}</style>
                </div>
            )}

            {/* --- Fasilitas Section --- */}
            <div className="container py-20 mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Fasilitas Kami</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Nikmati berbagai fasilitas yang kami sediakan untuk kenyamanan Anda</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { icon: Wifi, title: 'Free WiFi', desc: 'Internet cepat untuk semua pengunjung' },
                        { icon: Car, title: 'Parking Area', desc: 'Area parkir yang memadai, aman dan nyaman' },
                        { icon: Trees, title: 'Outdoor Area', desc: 'Suasana asri dan sejuk di area outdoor kami' },
                        { icon: QrCode, title: 'Cashless Payment', desc: 'Pembayaran digital untuk kemudahan' }
                    ].map((facility, index) => (
                        <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                            <div className="bg-black text-white p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:bg-gray-800">
                                <facility.icon className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-black mb-2">{facility.title}</h3>
                            <p className="text-sm text-gray-600">{facility.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Statistik Section --- */}
            {/* <div className="bg-black text-white py-26">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '4.9', label: 'Rating Google', icon: Star },
                            { value: '10K+', label: 'Happy Customers', icon: Users },
                            { value: '3+', label: 'Tahun Berpengalaman', icon: Clock },
                            { value: '50+', label: 'Menu Pilihan', icon: Coffee }
                        ].map((stat, index) => (
                            <div key={index} className="group">
                                <stat.icon className="h-8 w-8 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                                <div className="text-gray-300">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}

            {/* --- Menu Unggulan Section --- */}
            <div className="container py-20 my-10 mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Menu Unggulan</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Cicipi menu-menu favorit pilihan pelanggan kami</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredProducts.map(({ product }) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                            <div className="h-48 bg-gray-200 flex items-center justify-center">
                                {product.image_path ? (
                                    <img
                                        src={`/storage/${product.image_path}`}
                                        alt={product.name}
                                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                    />
                                ) : ( <ImageIcon className="h-16 w-16 text-gray-400" /> )}
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-black mb-2">{product.name}</h3>
                                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Testimoni Section --- */}
            <div className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-black mb-4">Apa Kata Mereka</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">Testimoni dari pelanggan setia Paddies Cafe</p>
                    </div>
                </div>
                <div className="relative w-full overflow-hidden cursor-grab">
                    <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none md:w-32"></div>
                    <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none md:w-32"></div>
                    
                    <Swiper
                        modules={[Autoplay]}
                        slidesPerView={'auto'}
                        spaceBetween={24}
                        loop={true}
                        speed={8000}
                        autoplay={{
                            delay: 1,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        className="!px-4 md:!px-8 testimonial-swiper"
                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id} className="!w-[80vw] sm:!w-[45vw] md:!w-80">
                                <div className="h-full flex flex-col bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                                    <Quote className="h-6 w-6 text-black mb-3" />
                                    <p className="text-gray-600 mb-4 italic text-sm leading-relaxed h-24 overflow-auto flex-grow">
                                        "{testimonial.content}"
                                    </p>
                                    <div className="flex items-center mb-3 mt-auto">
                                        <img
                                            src={testimonial.avatar ? `/storage/${testimonial.avatar}` : `https://ui-avatars.com/api/?name=${testimonial.name}&background=random`}
                                            alt={testimonial.name}
                                            className="w-10 h-10 rounded-full mr-3 object-cover filter grayscale"
                                        />
                                        <div>
                                            <h4 className="font-semibold text-black text-sm">{testimonial.name}</h4>
                                            <p className="text-gray-500 text-xs">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* --- Tentang Kami Section --- */}
            <div className="py-20 bg-black text-white mt-0">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6">
                                Tentang <span className="border-b-4 border-white">Paddies Cafe</span>
                            </h2>
                            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                                Sejak 2022, Paddies Cafe telah menjadi destinasi favorit para pecinta kopi di Bandung Timur.
                                Kami berkomitmen untuk menyajikan kopi dari biji pilihan,
                                dikombinasikan dengan makanan lezat dan suasana yang hangat dan nyaman.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center"><ChefHat className="h-6 w-6 text-white mr-3" /> <span className="text-gray-100">Chef berpengalaman dengan resep signature</span></div>
                                <div className="flex items-center"><Coffee className="h-6 w-6 text-white mr-3" /> <span className="text-gray-100">100% premium coffee beans</span></div>
                                <div className="flex items-center"><Users className="h-6 w-6 text-white mr-3" /> <span className="text-gray-100">Suasana cozy untuk segala acara</span></div>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="/storage/gallery/view1.jpg"
                                alt="About Paddies Cafe"
                                className="rounded-2xl shadow-2xl w-full filter grayscale hover:grayscale-0 transition-all duration-300"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-gray-950 text-white p-6 rounded-xl shadow-lg">
                                <h4 className="font-bold text-lg">Since 2022</h4>
                                <p className="text-gray-300">Melayani dengan cinta</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// ==========================================================
// == 4. KOMPONEN UTAMA (PEMBUNGKUS HALAMAN)
// ==========================================================

/**
 * Komponen CafeWebsite
 * Komponen utama yang mengatur seluruh tata letak dan logika website.
 * @param {CafeWebsiteProps} props - Props utama yang berisi semua data dari server.
 * @returns {JSX.Element} - Elemen JSX untuk keseluruhan halaman website.
 */
const CafeWebsite: React.FC<CafeWebsiteProps> = ({ 
    sliders, 
    products = [], 
    categories = [], 
    menuPdfUrl, 
    testimonials, 
    featuredProducts, 
    galleries = [], 
    reservationSettings = {}, 
    operationalHours = [] 
}) => {

    // --- State Management ---
    // State untuk melacak seksi mana yang sedang ditampilkan (misal: 'home', 'menu')
    const [activeSection, setActiveSection] = useState('home');
    // State untuk melacak kategori produk yang dipilih di halaman Shop
    const [selectedCategory, setSelectedCategory] = useState('all');
    // State untuk menampilkan gambar di lightbox/modal saat diklik di galeri
    const [selectedImage, setSelectedImage] = useState<Gallery | null>(null);

    // --- Helper & Derived Variables ---
    // Membuat URL WhatsApp yang dinamis berdasarkan data dari settings
    const whatsappUrl = `https://wa.me/${reservationSettings.reservasi_wa_number || ''}?text=${encodeURIComponent(reservationSettings.reservasi_wa_text || '')}`;
    
    // Menyaring produk berdasarkan kategori yang dipilih
    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category.id.toString() === selectedCategory);

    // --- Event Handlers ---
    // Handler untuk membuka gambar di lightbox
    const handlePhotoClick = (photo: Gallery) => {
        setSelectedImage(photo);
    };

    // --- Helper Functions ---
    /**
     * Memformat angka menjadi format mata uang Rupiah.
     * @param {number} price - Harga dalam bentuk angka.
     * @returns {string} - Harga dalam format string Rupiah (misal: "Rp 15.000").
     */
    const formatRupiah = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0
        }).format(price);
    };

    /**
     * Menghasilkan tombol link delivery jika link tersedia.
     * @param {string | null | undefined} link - URL untuk delivery.
     * @param {string} name - Nama platform delivery (misal: "GoFood").
     * @param {string} bgClass - Kelas Tailwind CSS untuk warna background.
     * @returns {JSX.Element | null} - Elemen tombol atau null jika link tidak ada.
     */
    const getDeliveryButton = (link: string | null | undefined, name: string, bgClass: string) => {
        if (!link) return null;
        return (
            <a href={link} target="_blank" rel="noopener noreferrer" className={`${bgClass} text-white px-3 py-1 rounded-md text-xs font-medium transition-colors duration-300 flex-1 text-center`}>
                {name}
            </a>
        );
    };

    // --- Layout Components ---
    /**
     * Komponen pembungkus halaman untuk memberikan padding atas yang konsisten (di bawah navbar).
     */
    const PageContainer: React.FC<{ children: ReactNode; }> = ({ children }) => (
        <div className="pt-20">{children}</div>
    );

    // --- Section Renderers ---
    // Setiap fungsi ini bertanggung jawab untuk merender satu seksi/halaman.

    const renderMenu = () => <PageContainer><MenuViewer menuPdfUrl={menuPdfUrl} /></PageContainer>;

    const renderShop = () => {
        return (
            <PageContainer>
                {/* Header halaman Shop */}
                <div className="bg-black text-white py-19 w-full">
                    <div className="container mx-auto px-6 text-center">
                        <div className="flex items-center justify-center mb-4">
                            <ShoppingBag className="h-12 w-12 text-white mr-3" />
                            <h1 className="text-4xl md:text-6xl font-bold">Shop Online</h1>
                        </div>
                        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                            Pesan menu favorit Anda langsung ke rumah
                        </p>
                        <div className="flex items-center justify-center text-gray-300">
                            <Coffee className="h-5 w-5 mr-2" />
                            <span>Tersedia untuk delivery dan takeaway</span>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 py-16">
                    {/* Filter Kategori */}
                    <div className="mb-12">
                        <div className="flex items-center justify-center mb-6">
                            <Filter className="h-5 w-5 text-black mr-2" />
                            <h3 className="text-2xl font-bold text-black">Filter Kategori</h3>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            <button onClick={() => setSelectedCategory('all')} className={`cursor-pointer px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${selectedCategory === 'all' ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-black hover:bg-gray-200 border border-gray-300'}`}>
                                Semua Kategori
                            </button>
                            {categories.map((category) => (
                                <button key={category.id} onClick={() => setSelectedCategory(category.id.toString())} className={`cursor-pointer px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${selectedCategory === category.id.toString() ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-black hover:bg-gray-200 border border-gray-300'}`}>
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Tampilan Produk */}
                    {filteredProducts.length > 0 ? (
                        <>
                            <div className="text-center mb-8">
                                <p className="text-gray-600">
                                    Menampilkan <span className="font-semibold text-black">{filteredProducts.length}</span> produk
                                    {selectedCategory !== 'all' && (
                                    <span> dalam kategori <span className="font-semibold text-black">
                                        {categories.find(cat => cat.id.toString() === selectedCategory)?.name}
                                    </span></span>
                                    )}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-200 group">
                                        <div className="relative w-full h-48 bg-gray-100">
                                            {product.image_path ? (
                                                <img src={`/storage/${product.image_path}`} alt={product.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"/>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                    <ImageIcon className="h-12 w-12 text-gray-400" />
                                                </div>
                                            )}
                                            <div className="absolute top-3 left-3 bg-black text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                {product.category.name}
                                            </div>
                                        </div>
                                        <div className="p-6 flex-grow flex flex-col">
                                            <h3 className="text-xl font-bold text-black mb-2 line-clamp-2">{product.name}</h3>
                                            <p className="text-gray-600 text-sm flex-grow mb-4 line-clamp-3">{product.description}</p>
                                            <div className="flex items-center justify-end">
                                                <div className="flex items-center text-black">
                                                    <Star className="h-4 w-4 fill-current" />
                                                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-gray-50 border-t border-gray-200">
                                            <div className="flex gap-2 mb-2">
                                                <span className="text-xs font-medium text-gray-600 flex items-center">
                                                    <ArrowRight className="h-3 w-3 mr-1" /> Pesan melalui:
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap justify-center gap-3">
                                                {getDeliveryButton(product.delivery_link_3, 'GoFood', 'bg-black hover:bg-gray-800')}
                                                {getDeliveryButton(product.delivery_link_2, 'ShopeeFood', 'bg-gray-700 hover:bg-gray-800')}
                                                {getDeliveryButton(product.delivery_link_1, 'Delivery', 'bg-gray-600 hover:bg-gray-700')}
                                            </div>
                                            {!product.delivery_link_1 && !product.delivery_link_2 && !product.delivery_link_3 && (
                                                <div className="text-center py-2"><p className="text-xs text-gray-500">Tersedia di lokasi</p></div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        // Tampilan jika tidak ada produk
                        <div className="text-center py-20">
                            <div className="max-w-md mx-auto">
                                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-black mb-2">Tidak Ada Produk</h3>
                                <p className="text-gray-500 mb-6">Tidak ada produk dalam kategori yang dipilih.</p>
                                <button onClick={() => setSelectedCategory('all')} className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                                    Lihat Semua Produk
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </PageContainer>
        );
    }
    
    const renderLocation = () => {
        return (
            <PageContainer>
                 <div className="bg-black text-white py-16 mb-16">
                    <div className="container mx-auto px-6 text-center ">
                        <div className="flex items-center justify-center mb-4" >
                            <MapPin className="h-12 w-12 text-white mr-3" />
                            <h1 className="text-4xl md:text-6xl font-bold">Lokasi Kami</h1>
                        </div>
                        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                            Kunjungi Paddies Cafe di Cicalengka, Bandung untuk pengalaman ngopi yang tak terlupakan
                        </p>
                        <div className="flex items-center justify-center text-gray-300 hover:shadow-xl transition-all duration-300">
                            <NavigationIcon className="h-5 w-5 mr-2" />
                            <span>Mudah dijangkau dari berbagai arah</span>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto mb-16">  
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="order-2 lg:order-1">
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-2xl font-bold text-black flex items-center">
                                        <MapPin className="h-6 w-6 mr-2" />
                                        Peta Lokasi
                                    </h2>
                                    <p className="text-gray-600 mt-1">Temukan rute terbaik menuju cafe kami</p>
                                </div>
                                <div className="bg-gray-200 h-96 rounded-lg overflow-hidden shadow-lg">
                                    <iframe 
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.1299176858915!2d107.80769397403675!3d-6.993976268494977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c5c6ea4e2d63%3A0xc071a0b3d3e549f0!2sPaddies.Cafe!5e0!3m2!1sid!2sid!4v1757185213228!5m2!1sid!2sid" 
                                        className="w-full h-full border-0 filter grayscale hover:grayscale-0 transition-all duration-500" 
                                        allowFullScreen={true} 
                                        loading="lazy" 
                                        referrerPolicy="no-referrer-when-downgrade">
                                    </iframe>
                                </div>
                                <div className="p-6 bg-gray-50 border-t border-gray-200">
                                    <a 
                                        href="https://maps.app.goo.gl/g3et5Uvnuni2pE6r9"
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
                        <div className="order-1 lg:order-2 space-y-8">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <div className="flex items-start mb-4">
                                    <MapPin className="h-6 w-6 text-black mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-black text-lg mb-2">Alamat Lengkap</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Jl. Bojong Cibodas, Tanjunglaya<br />Kec. Cikancung, Kabupaten Bandung,<br />Jawa Barat 40396
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-black text-white p-6 rounded-lg">
                                <h3 className="font-bold text-lg mb-4">Informasi Tambahan</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li>• Parkir gratis tersedia</li><li>• Akses WiFi unlimited</li><li>• Area smoking dan non-smoking</li><li>• Tersedia power outlet di setiap meja</li><li>• Pet friendly (area tertentu)</li><li>• Musala</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </PageContainer>
        );
    }
    
    const renderReservasi = () => {
        // Memproses tips reservasi dari string menjadi daftar list item HTML
        const reservationTipsList = reservationSettings.reservasi_tips
            ? reservationSettings.reservasi_tips.split('\n').map((tip, index) => <li key={index}>{tip.trim()}</li>)
            : [];
        
        return (
            <PageContainer>
                 <div className="bg-black text-white py-19">
                    <div className="container mx-auto px-6 text-center">
                        <div className="flex items-center justify-center mb-4">
                            <CalendarCheck className="h-12 w-12 text-white mr-3" />
                            <h1 className="text-4xl md:text-6xl font-bold">{reservationSettings.reservasi_title || 'Reservasi'}</h1>
                        </div>
                        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                            {reservationSettings.reservasi_subtitle || 'Hubungi kami untuk melakukan reservasi meja atau acara khusus'}
                        </p>
                    </div>
                </div>
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <h4 className="text-xl font-bold text-black mb-4">Hubungi Kami</h4>
                                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-all duration-300 group">
                                            <div className="bg-green-500 text-white p-3 rounded-full mr-4 group-hover:bg-green-600 transition-colors"><Phone className="h-6 w-6" /></div>
                                            <div><div className="font-bold text-black">WhatsApp</div><div className="text-gray-600">{reservationSettings.reservasi_phone_number}</div><div className="text-sm text-green-600 font-medium">Chat langsung untuk reservasi</div></div>
                                        </a>
                                        <a href={`tel:${reservationSettings.reservasi_phone_number}`} className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all duration-300 group">
                                            <div className="bg-blue-500 text-white p-3 rounded-full mr-4 group-hover:bg-blue-600 transition-colors"><Phone className="h-6 w-6" /></div>
                                            <div><div className="font-bold text-black">Telepon</div><div className="text-gray-600">{reservationSettings.reservasi_phone_number}</div><div className="text-sm text-blue-600 font-medium">Jam operasional cafe</div></div>
                                        </a>
                                        <a href={`mailto:${reservationSettings.reservasi_email}?subject=Reservasi Paddies Cafe`} className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all duration-300 group">
                                            <div className="bg-gray-500 text-white p-3 rounded-full mr-4 group-hover:bg-gray-600 transition-colors"><Mail className="h-6 w-6" /></div>
                                            <div><div className="font-bold text-black">Email</div><div className="text-gray-600">{reservationSettings.reservasi_email}</div><div className="text-sm text-gray-600 font-medium">Reservasi via email</div></div>
                                        </a>
                                    </div>
                                    <div className="space-y-6">
                                        <h4 className="text-xl font-bold text-black mb-4">Ikuti Kami</h4>
                                        <a href={reservationSettings.reservasi_ig_link} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-lg transition-all duration-300 group">
                                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full mr-4 group-hover:from-purple-600 group-hover:to-pink-600 transition-all"><Instagram className="h-6 w-6" /></div>
                                            <div><div className="font-bold text-black">Instagram</div><div className="text-gray-600">{reservationSettings.reservasi_ig_username}</div><div className="text-sm text-pink-600 font-medium">Update menu & promo terbaru</div></div>
                                        </a>
                                        <a href={reservationSettings.reservasi_tiktok_link} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-violet-50 hover:bg-violet-100 border border-violet-200 rounded-lg transition-all duration-300 group">
                                            <div className="bg-violet-600 text-white p-3 rounded-full mr-4 group-hover:bg-violet-700 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                                                </svg>
                                            </div>
                                            <div><div className="font-bold text-black">Tiktok</div><div className="text-gray-600">{reservationSettings.reservasi_tiktok_name}</div><div className="text-sm text-violet-600 font-medium">Vibes & konten seru kami di TikTok</div></div>
                                        </a>
                                        <div className="bg-black text-white p-6 rounded-lg">
                                            <h5 className="font-bold text-lg mb-3">Tips Reservasi</h5>
                                            <ul className="space-y-2 text-sm text-gray-300">
                                                {reservationTipsList}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                </div>
            </PageContainer>
        );
    }

    const renderGallery = () => (
        <PageContainer>
            {/* Hero Section */}
            <div className="bg-black text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex items-center justify-center mb-6">
                        <ImageIcon className="h-12 w-12 text-white mr-4" />
                        <h1 className="text-4xl md:text-6xl font-bold">
                            Galeri Momen
                        </h1>
                    </div>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                        Lihat koleksi momen-momen berharga yang tertangkap di Paddies Cafe.
                    </p>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="bg-white">
                <div className="container mx-auto px-4 md:px-8 py-16">
                    {galleries.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {galleries.map((photo) => (
                                <button
                                    key={photo.id}
                                    onClick={() => handlePhotoClick(photo)}
                                    className="relative aspect-square overflow-hidden rounded-lg shadow-md group cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                >
                                    <img
                                        src={`/storage/${photo.image_path}`}
                                        alt={photo.caption || 'Gallery Image'}
                                        className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-4 text-center">
                                        <ZoomIn className="h-8 w-8 text-white mb-2 transform group-hover:scale-125 transition-transform duration-300" />
                                        {photo.caption && (
                                            <p className="text-white text-sm font-semibold mt-2">
                                                {photo.caption}
                                            </p>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="bg-gray-50 p-8 rounded-lg shadow-inner inline-block">
                                <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-black mb-2">Galeri Masih Kosong</h3>
                                <p className="text-gray-600">Nantikan foto-foto menarik dari kami segera!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox Modal untuk menampilkan gambar yang dipilih */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative max-w-4xl max-h-[90vh] w-full animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat konten di-klik
                    >
                        {/* Tombol close modal */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 z-20 bg-white/10 rounded-full p-2 text-white hover:bg-white hover:text-black transition-all duration-300"
                            aria-label="Close image"
                        >
                            <X className="h-6 w-6" />
                        </button>
                        
                        {/* Gambar yang ditampilkan */}
                        <img
                            src={`/storage/${selectedImage.image_path}`}
                            alt={selectedImage.caption || 'Paddies Cafe Gallery'}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl mx-auto block"
                        />
                        
                        {/* Caption gambar */}
                        {selectedImage.caption && (
                            <div className="text-center mt-4">
                                <h3 className="text-white text-base md:text-lg bg-black/50 px-4 py-2 rounded-lg inline-block">
                                    {selectedImage.caption}
                                </h3>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </PageContainer>
    );

    // --- Render Utama Komponen ---
    return (
        <div className="min-h-screen bg-white flex flex-col h-full flex-1 overflow-x-hidden">
            <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
            <main className="flex-grow overflow-hidden">
                {/* Render seksi secara kondisional berdasarkan state `activeSection` */}
                {activeSection === 'home' && (
                    <HomeSection
                        sliders={sliders}
                        operationalHours={operationalHours}
                        featuredProducts={featuredProducts}
                        testimonials={testimonials}
                        setActiveSection={setActiveSection}
                        formatRupiah={formatRupiah}
                    />
                )}
                {activeSection === 'menu' && renderMenu()}
                {activeSection === 'shop' && renderShop()}
                {activeSection === 'location' && renderLocation()}
                {activeSection === 'gallery' && renderGallery()}
                {activeSection === 'reservasi' && renderReservasi()}
            </main>
            {/* Kirim data `reservationSettings` ke Footer agar info kontak dinamis */}
            <Footer setActiveSection={setActiveSection} reservationSettings={reservationSettings} />
        </div>
    );
};

export default CafeWebsite;