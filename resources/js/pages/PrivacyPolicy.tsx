// resources/js/Pages/PrivacyPolicy.tsx

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon'; // Adjust path if necessary

export default function PrivacyPolicy() {
    return (
        <>
            <Head title="Privacy Policy" />
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
                        <h1 className="text-3xl md:text-4xl font-bold text-black mb-6">Privacy Policy</h1>
                        <p className="text-gray-500 mb-8">Last Updated: September 27, 2025</p>

                        <article className="prose prose-lg max-w-none text-gray-700">
                            <p>
                                Welcome to Paddies Cafe. We value your privacy and are committed to protecting it. This Privacy Policy explains how we handle the information and privacy of our website visitors.
                            </p>

                            <h2>Personal Data Collection</h2>
                            <p>
                                We are committed to <strong>not collecting your personal data without your permission.</strong> We only process information that you provide voluntarily, for instance, when contacting us for reservations or inquiries.
                            </p>

                            <h2>Published Customer Photos</h2>
                            <p>
                                For promotional and documentation purposes, we may publish photos of the atmosphere or events at our cafe in the website gallery. If you or a relative appear in a photo and you are not comfortable with it, you have the right to <strong>request its deletion.</strong>
                            </p>
                            <p>
                                A deletion request can be made by contacting us through our available contact channels.
                            </p>

                            <h2>Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
                            </p>

                            <h2>Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us via email at <a href="mailto:info@paddiescafe.com">info@paddiescafe.com</a>.
                            </p>
                        </article>
                    </div>
                </main>
            </div>
        </>
    );
}