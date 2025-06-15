<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('dashboard/categories/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'color' => ['required', 'string', 'max:255'],
            'image' => ['image', 'nullable', 'mimes:png,jpg,jpeg', 'max:5120'],
            'description' => ['string', 'nullable']
        ]);

        $slug = Str::slug($validated['name']);

        $path = null;
        if($request->hasFile('image')){
            $path = $request->file('image')->store('category_image', 'public');
        }

        Category::create([
            ...$validated,
            'slug' => $slug,
            'image' => $path
        ]);

        return redirect()->route('admin.categories')->with('success', 'Successfully Created New Category');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
