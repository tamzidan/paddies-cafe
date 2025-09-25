// resources/js/Pages/Admin/OperationalHours/Edit.tsx

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

interface OperationalHour {
    id: number;
    day: string;
    hours: string;
    is_open: boolean;
}

export default function OperationalHourEdit() {
    const { operationalHour } = usePage<{ operationalHour: OperationalHour }>().props;

    const { data, setData, put, processing, errors } = useForm({
        hours: operationalHour.hours,
        is_open: operationalHour.is_open,
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
                Edit Jam Operasional: <span className="font-bold">{operationalHour.day}</span>
            </h1>

            <div className="max-w-2xl bg-card p-6 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
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
                    
                    <div className="flex items-center gap-2">
                        <input 
                            type="checkbox" 
                            id="is_open" 
                            checked={data.is_open} 
                            onChange={e => setData('is_open', e.target.checked)} 
                            className="h-4 w-4 rounded" 
                        />
                        <label htmlFor="is_open" className="text-sm font-medium">Status Buka</label>
                    </div>

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