<?php
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Shop\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'get_home_data'])->name('home');

Route::get('/products/{slug}', [HomeController::class, 'show_details'])->name('product.details');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', action: function () {
        return Inertia::render('dashboard/index');
    })->name('dashboard');

    Route::get('/dashboard/products', action: function () {
        return Inertia::render('dashboard/products/index');
    })->name('admin.products');

    Route::controller(App\Http\Controllers\Admin\ProductController::class)->group(function () {
        Route::get('/dashboard/products', 'list_products')->name('admin.products');
        Route::post('/dashboard/products/store', 'store')->name('admin.products.store');
    });

    Route::controller(CategoryController::class)->group(function () {
        Route::get('/dashboard/categories', 'index')->name('admin.categories');
        Route::post('/dashboard/categories/store', 'store')->name('admin.categories.store');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
