// resources/js/Layouts/MainLayout.tsx
import React, { PropsWithChildren } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            {/* Padding top untuk memberi ruang di bawah navbar yang fixed */}
            <main className="pt-16 flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}