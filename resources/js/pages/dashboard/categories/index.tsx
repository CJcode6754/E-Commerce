import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: '/category',
    },
];

export default function index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Categies</h1>
                    <p className="text-gray-500">
                        Welcome back! Here's an overview of your store.
                    </p>
                </div>
            </div>
        </AppLayout>
    )
}
