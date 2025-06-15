<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function list_products()
    {
        $categories = Category::latest()->get();
        $products = Product::with('category')->latest()->get();

        return Inertia::render('dashboard/products/index', compact('categories', 'products'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'string|required|max:255',
            'category_id' => 'string|required',
            'colors' => 'array|nullable',
            'features' => 'array|nullable',
            'description' => 'string|nullable',
            'image' => 'image|nullable|max:2048',
            'images' => 'nullable|array',
            'images.*' => 'image|max:2048',
            'is_featured' => 'boolean',
            'price' => 'required|numeric',
            'old_price' => 'required|numeric',
        ]);

        // Slug generation
        $slug = Str::slug($request->name);

        // Main image upload
        $mainImagePath = null;
        if ($request->hasFile('image')) {
            $mainImagePath = $request->file('image')->store('products', 'public');
        }

        // Multiple images upload
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $img) {
                $imagePaths[] = $img->store('products/images', 'public');
            }
        }

        // Create product
        $product = Product::create([
            'name' => $request->name,
            'slug' => $slug,
            'category_id' => $request->category_id,
            'colors' => $request->colors,
            'features' => $request->features,
            'description' => $request->description,
            'image' => $mainImagePath,
            'images' => $imagePaths,
            'price' => $request->price,
            'old_price' => $request->old_price,
            'is_featured' => $request->is_featured,
        ]);

        // dd($product);

        return Inertia::location('dashboard/products/index');
    }
}
