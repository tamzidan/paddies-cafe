import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

// Definisikan tipe data sesuai dengan model Laravel yang baru
interface OperationalHour {
    id: number;
    day: string;
    hours: string;
    // is_open dihapus
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Jam Operasional', href: route('admin.operational-hours.index') },
];

export default function OperationalHourIndex() {
    const { operationalHours } = usePage<{ operationalHours: OperationalHour[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Jam Operasional" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Pengaturan Jam Operasional</h1>
            </div>

            <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm">
                <table className="w-full text-left">
                    <thead className="border-b">
                        <tr>
                            <th className="p-4">Hari</th>
                            <th className="p-4">Jam Operasional</th>
                            <th className="p-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {operationalHours.map((hour) => (
                            <tr key={hour.id} className="border-b">
                                <td className="p-4 font-medium">{hour.day}</td>
                                <td className="p-4">{hour.hours}</td>
                                <td className="p-4">
                                    <Button variant="outline" size="icon" asChild>
                                        <Link href={route('admin.operational-hours.edit', hour.id)}>
                                            <PencilSquareIcon className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}