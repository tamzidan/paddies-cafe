import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

// Tipe untuk props settings
interface ReservationSettings {
    reservasi_title?: string;
    reservasi_subtitle?: string;
    reservasi_wa_number?: string;
    reservasi_wa_text?: string;
    reservasi_phone_number?: string;
    reservasi_email?: string;
    reservasi_ig_username?: string;
    reservasi_ig_link?: string;
    reservasi_fb_name?: string;
    reservasi_fb_link?: string;
    reservasi_tips?: string;
}

interface Props {
    settings: ReservationSettings;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pengaturan Reservasi', href: route('admin.reservation-settings.index') },
];

export default function ReservationSettingsIndex({ settings }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        reservasi_title: settings.reservasi_title || '',
        reservasi_subtitle: settings.reservasi_subtitle || '',
        reservasi_wa_number: settings.reservasi_wa_number || '6287752723783',
        reservasi_wa_text: settings.reservasi_wa_text || 'Halo, saya ingin melakukan reservasi di Paddies Cafe',
        reservasi_phone_number: settings.reservasi_phone_number || '+62 877-5272-3783',
        reservasi_email: settings.reservasi_email || 'info@paddiescafe.com',
        reservasi_ig_username: settings.reservasi_ig_username || '@paddiescafe',
        reservasi_ig_link: settings.reservasi_ig_link || 'https://instagram.com/paddiescafe',
        reservasi_fb_name: settings.reservasi_fb_name || 'Paddies Cafe Official',
        reservasi_fb_link: settings.reservasi_fb_link || '#',
        reservasi_tips: settings.reservasi_tips || '• Reservasi minimal 2 jam sebelumnya\n• Untuk grup 8+ orang, harap konfirmasi 1 hari sebelum\n• Reservasi weekend disarankan H-2\n• Deposit diperlukan untuk acara khusus\n• Maksimal holding time: 15 menit',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('admin.reservation-settings.update'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Halaman Reservasi" />
            
            <div className="p-4 sm:p-6 lg:p-8">
                <h1 className="text-2xl font-semibold mb-6">Pengaturan Halaman Reservasi</h1>
                
                <div className="max-w-4xl mx-auto bg-card p-6 rounded-lg shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Judul & Subtitel */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Judul Halaman</label>
                                <input type="text" value={data.reservasi_title} onChange={e => setData('reservasi_title', e.target.value)} className="w-full bg-input border-border rounded-md p-2" />
                                {errors.reservasi_title && <div className="text-red-500 text-sm mt-1">{errors.reservasi_title}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Subtitel Halaman</label>
                                <input type="text" value={data.reservasi_subtitle} onChange={e => setData('reservasi_subtitle', e.target.value)} className="w-full bg-input border-border rounded-md p-2" />
                                {errors.reservasi_subtitle && <div className="text-red-500 text-sm mt-1">{errors.reservasi_subtitle}</div>}
                            </div>
                        </div>

                        {/* Kontak */}
                        <fieldset className="border p-4 rounded-md">
                            <legend className="text-lg font-medium px-2">Informasi Kontak</legend>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nomor WhatsApp (contoh: 628xxxx)</label>
                                    <input type="text" value={data.reservasi_wa_number} onChange={e => setData('reservasi_wa_number', e.target.value)} className="w-full bg-input border-border rounded-md p-2" />
                                    {errors.reservasi_wa_number && <div className="text-red-500 text-sm mt-1">{errors.reservasi_wa_number}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nomor Telepon (display)</label>
                                    <input type="text" value={data.reservasi_phone_number} onChange={e => setData('reservasi_phone_number', e.target.value)} className="w-full bg-input border-border rounded-md p-2" />
                                    {errors.reservasi_phone_number && <div className="text-red-500 text-sm mt-1">{errors.reservasi_phone_number}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Teks Template WhatsApp</label>
                                    <textarea value={data.reservasi_wa_text} onChange={e => setData('reservasi_wa_text', e.target.value)} className="w-full bg-input border-border rounded-md p-2" rows={3}></textarea>
                                    {errors.reservasi_wa_text && <div className="text-red-500 text-sm mt-1">{errors.reservasi_wa_text}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Alamat Email</label>
                                    <input type="email" value={data.reservasi_email} onChange={e => setData('reservasi_email', e.target.value)} className="w-full bg-input border-border rounded-md p-2" />
                                    {errors.reservasi_email && <div className="text-red-500 text-sm mt-1">{errors.reservasi_email}</div>}
                                </div>
                            </div>
                        </fieldset>

                        {/* Sosial Media */}
                        <fieldset className="border p-4 rounded-md">
                            <legend className="text-lg font-medium px-2">Sosial Media</legend>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Username Instagram</label>
                                    <input type="text" value={data.reservasi_ig_username} onChange={e => setData('reservasi_ig_username', e.target.value)} className="w-full bg-input border-border rounded-md p-2" />
                                    {errors.reservasi_ig_username && <div className="text-red-500 text-sm mt-1">{errors.reservasi_ig_username}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Link Instagram</label>
                                    <input type="url" value={data.reservasi_ig_link} onChange={e => setData('reservasi_ig_link', e.target.value)} className="w-full bg-input border-border rounded-md p-2" />
                                    {errors.reservasi_ig_link && <div className="text-red-500 text-sm mt-1">{errors.reservasi_ig_link}</div>}
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium mb-1">Username Tiktok</label>
                                    <input type="text" value={data.reservasi_fb_name} onChange={e => setData('reservasi_fb_name', e.target.value)} className="w-full bg-input border-border rounded-md p-2" />
                                    {errors.reservasi_fb_name && <div className="text-red-500 text-sm mt-1">{errors.reservasi_fb_name}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Link Tiktok</label>
                                    <input type="url" value={data.reservasi_fb_link} onChange={e => setData('reservasi_fb_link', e.target.value)} className="w-full bg-input border-border rounded-md p-2" />
                                    {errors.reservasi_fb_link && <div className="text-red-500 text-sm mt-1">{errors.reservasi_fb_link}</div>}
                                </div>
                            </div>
                        </fieldset>

                        {/* Tips */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Tips Reservasi (Satu tips per baris)</label>
                            <textarea value={data.reservasi_tips} onChange={e => setData('reservasi_tips', e.target.value)} className="w-full bg-input border-border rounded-md p-2" rows={6}></textarea>
                            {errors.reservasi_tips && <div className="text-red-500 text-sm mt-1">{errors.reservasi_tips}</div>}
                        </div>

                        {/* Tombol Aksi */}
                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing} className='cursor-pointer'>
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </AppLayout>
    );
}