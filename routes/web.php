<?php
use App\Http\Controllers\Shop\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'get_home_data'])->name('home');

Route::get('/detail', function () {
    return Inertia::render('product-details');
})->name('product.details');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', action: function () {
        return Inertia::render('dashboard/index');
    })->name('dashboard');

    Route::get('/dashboard/products', action: function () {
        return Inertia::render('dashboard/products/index');
    })->name('products');

    Route::get('/dashboard/categories', action: function () {
        return Inertia::render('dashboard/categories/index');
    })->name('categories');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
