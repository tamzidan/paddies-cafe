// resources/js/Components/Navbar.tsx
import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Coffee, Menu, X } from 'lucide-react';

export default function Navbar() {
    // State untuk mengontrol visibilitas menu di mobile
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Dapatkan URL saat ini
    const { url } = usePage();

    const navLinks = [
        { href: '/', text: 'Home' },
        { href: '/menu', text: 'Menu' },
        { href: '/shop', text: 'Shop' },
        { href: '/location', text: 'Location' },
        // { href: '/reservasi', text: 'Reservasi' },
    ];

    // Fungsi untuk menentukan apakah link aktif
    const isActiveLink = (href: string) => {
        if (href === '/') {
            return url === '/';
        }
        return url.startsWith(href);
    };

    return (
        <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo atau Nama Brand */}
                <div className="flex items-center space-x-2">
                    <Coffee className="h-8 w-8 text-black" />
                    <Link 
                        href="/" 
                        className="font-bold text-2xl text-black hover:text-gray-700 transition-colors duration-300"
                    >
                        Paddies Cafe
                    </Link>
                </div>

                {/* Navigasi untuk Desktop (Layar Medium ke atas) */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative font-medium transition-all duration-300 py-2 ${
                                isActiveLink(link.href)
                                    ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black'
                                    : 'text-gray-600 hover:text-black hover:after:content-[""] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-gray-400 hover:after:transition-all hover:after:duration-300'
                            }`}
                        >
                            {link.text}
                        </Link>
                    ))}
                </div>

                {/* Tombol CTA Desktop */}
                <div className="hidden md:block">
                    <Link
                        href="/reservasi"
                        className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md"
                    >
                        Reservasi
                    </Link>
                </div>

                {/* Tombol Hamburger untuk Mobile */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-black focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Menu Mobile dengan Animasi */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${
                isMenuOpen 
                    ? 'max-h-96 opacity-100 visible' 
                    : 'max-h-0 opacity-0 invisible'
            } overflow-hidden`}>
                <div className="bg-white border-t border-gray-200 shadow-lg">
                    {navLinks.map((link, index) => (
                        <Link
                            key={`mobile-${link.href}`}
                            href={link.href}
                            className={`block px-6 py-4 transition-all duration-300 border-l-4 ${
                                isActiveLink(link.href)
                                    ? 'text-black font-semibold bg-gray-50 border-l-black'
                                    : 'text-gray-600 hover:text-black hover:bg-gray-50 hover:pl-8 border-l-transparent'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
                            }}
                        >
                            {link.text}
                        </Link>
                    ))}
                    
                    {/* CTA Mobile */}
                    <div className="px-6 py-4 border-t border-gray-100">
                        <Link
                            href="/reservasi"
                            className="block w-full text-center bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Reservasi Sekarang
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}