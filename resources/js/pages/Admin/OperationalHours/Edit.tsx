import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

// Tipe data disesuaikan
interface OperationalHour {
    id: number;
    day: string;
    hours: string;
}

export default function OperationalHourEdit() {
    const { operationalHour } = usePage<{ operationalHour: OperationalHour }>().props;

    // Tambahkan 'day' ke dalam state form dan hapus 'is_open'
    const { data, setData, put, processing, errors } = useForm({
        day: operationalHour.day,
        hours: operationalHour.hours,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('admin.operational-hours.update', operationalHour.id));
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Jam Operasional', href: route('admin.operational-hours.index') },
        { title: `Edit ${operationalHour.day}`, href: route('admin.operational-hours.edit', operationalHour.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Jam Operasional - ${operationalHour.day}`} />
            
            <h1 className="text-2xl font-semibold mb-6">
                Edit Jam Operasional: <span className="font-bold">{data.day}</span>
            </h1>

            <div className="max-w-2xl bg-card p-6 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Input untuk mengedit Hari */}
                    <div>
                        <label htmlFor="day" className="block text-sm font-medium mb-1">Hari</label>
                        <input 
                            id="day"
                            type="text" 
                            value={data.day} 
                            onChange={e => setData('day', e.target.value)} 
                            className="w-full bg-input border-border rounded-md p-2"
                        />
                        {errors.day && <div className="text-red-500 text-sm mt-1">{errors.day}</div>}
                    </div>

                    {/* Input untuk mengedit Jam */}
                    <div>
                        <label htmlFor="hours" className="block text-sm font-medium mb-1">Jam Operasional</label>
                        <input 
                            id="hours"
                            type="text" 
                            value={data.hours} 
                            onChange={e => setData('hours', e.target.value)} 
                            className="w-full bg-input border-border rounded-md p-2"
                            placeholder="Contoh: 10:00 - 22:00 atau Libur"
                        />
                        {errors.hours && <div className="text-red-500 text-sm mt-1">{errors.hours}</div>}
                    </div>
                    
                    {/* Checkbox status buka dihapus */}

                    <div className="flex justify-end gap-4">
                        <Button variant="ghost" asChild>
                            <Link href={route('admin.operational-hours.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}