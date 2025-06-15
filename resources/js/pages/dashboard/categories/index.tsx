import CategoriesDataTable from '@/components/dashboard/CategoryDataTable';
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
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <CategoriesDataTable/>
            </div>
        </AppLayout>
    )
}
