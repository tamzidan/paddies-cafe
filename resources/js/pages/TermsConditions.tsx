// resources/js/Pages/TermsConditions.tsx

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon'; // Adjust path if necessary

export default function TermsConditions() {
    return (
        <>
            <Head title="Terms & Conditions" />
            <div className="bg-gray-50 min-h-screen">
                <header className="bg-white shadow-md">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href={route('home')} className="flex items-center space-x-2">
                            <AppLogoIcon className="fill-current text-white dark:text-white rounded-full size-10 shadow-md" />
                            <span className="font-bold text-2xl text-black">Paddies Cafe</span>
                        </Link>
                        <Link href={route('home')} className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300">
                            Back to Home
                        </Link>
                    </div>
                </header>

                <main className="container mx-auto px-6 py-16">
                    <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg">
                        <h1 className="text-3xl md:text-4xl font-bold text-black mb-6">Terms & Conditions</h1>
                        <p className="text-gray-500 mb-8">Last Updated: September 27, 2025</p>

                        <article className="prose prose-lg max-w-none text-gray-700">
                            <p>
                                By accessing and using the paddiescafe.com website, you agree to be bound by the following Terms and Conditions.
                            </p>

                            <h2>Intellectual Property</h2>
                            <p>
                                All content displayed on this website, including but not limited to text, <strong>photos, menu images, logos, and designs, is the exclusive property of Paddies Cafe.</strong>
                            </p>
                            <p>
                                You are <strong>prohibited from copying, reproducing, or using any material</strong> from this site for commercial or non-commercial purposes without our prior written permission.
                            </p>
                            
                            <h2>Informational Purpose and Menu Availability</h2>
                            <p>
                                This website serves to provide general information about Paddies Cafe. The information presented, especially regarding the menu and prices, <strong>is subject to change at any time without notice.</strong>
                            </p>
                            <p>
                                We <strong>do not guarantee the availability of every menu item</strong> displayed on the website. For the most accurate availability information, please contact us directly or visit our cafe.
                            </p>

                            <h2>Limitation of Liability</h2>
                            <p>
                                Paddies Cafe will not be liable for any direct, indirect, or consequential damages arising from the use of, or inability to use, this site.
                            </p>
                        </article>
                    </div>
                </main>
            </div>
        </>
    );
}