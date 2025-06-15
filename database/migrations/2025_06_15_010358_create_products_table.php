<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('old_price', 10, 2)->nullable();
            $table->decimal('rating', 2, 1)->nullable();
            $table->integer('review_count')->default(50);
            $table->integer('stock')->default(0);
            $table->string('image')->nullable();
            $table->json('images')->nullable();
            $table->json('colors')->nullable();
            $table->json('sizes')->nullable();
            $table->json('features')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('in_stock')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
