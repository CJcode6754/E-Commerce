import ProductsDataTable from '@/components/dashboard/ProductsDataTable';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { CategoryItem } from '@/types/categories';
import { ProductItem } from '@/types/products';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

export default function index({categories, products}:{categories:CategoryItem[], products:ProductItem[]}) {
    const data = products.map((item) => ({
        id: String(item.id),
        name: item.name,
        salesCount: 0,
        category: item.category,
        stock: 0,
        image: `/storage/${item.image}`,
        price: item.price,
        status: item.in_stock,
    }));

    const categoryOption = categories.map((item) => ({
        label: item.name,
        value: item.id,
    }));
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <ProductsDataTable categories={categoryOption} products={data}/>
            </div>
        </AppLayout>
    )
}
