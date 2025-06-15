<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function get_home_data(){
        $categories = Category::select('id', 'name', 'slug', 'image', 'color')->latest()->get();
        $products = Product::with('category')
            ->take(10)
            ->latest()
            ->get();
        return Inertia::render('home', compact('categories', 'products'));
    }

    public function show_details($slug)
    {
        $product = Product::where('slug', $slug)->with('category')->firstOrFail();

        $similarProducts = Product::similar($product->id)
            ->get();

        return Inertia::render('product-details', compact('product', 'similarProducts'));
    }
}
