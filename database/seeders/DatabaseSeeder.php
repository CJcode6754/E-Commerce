<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $categories = [
            [
                'name' => 'Electronics',
                'slug' => 'Electronics',
                'color' => 'bg-blue-100',
                'image' => 'electronics.jpg',
                'description' => 'Devices, gadgets, and accessories.',
                'is_active' => true,
            ],
            [
                'name' => 'Fashion',
                'slug' => 'Fashion',
                'color' => 'bg-pink-100',
                'image' => 'fashion.jpg',
                'description' => 'Clothing, shoes, and accessories.',
                'is_active' => true,
            ],
            [
                'name' => 'Home & Living',
                'slug' => 'Home & Living',
                'color' => 'bg-green-100',
                'image' => 'home.jpg',
                'description' => 'Furniture, kitchen, and home decor.',
                'is_active' => true,
            ],
            [
                'name' => 'Books',
                'slug' => 'Books',
                'color' => 'bg-yellow-100',
                'image' => 'books.jpg',
                'description' => 'Novels, textbooks, and literature.',
                'is_active' => true,
            ],
        ];


        foreach($categories as $category){
            Category::create($category);
        }
    }
}
