<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'price',
        'old_price',
        'rating',
        'review_count',
        'stock',
        'image',
        'images',
        'colors',
        'sizes',
        'features',
        'is_featured',
        'in_stock',
    ];

    protected $casts = [
        'in_stock' => 'boolean',
        'is_featured' => 'boolean',
        'sizes' => 'array',
        'images' => 'array',
        'colors' => 'array',
        'features' => 'array',
        'price' => 'decimal:2',
        'old_price' => 'decimal:2',
        'rating' => 'decimal:1',
    ];

    public function category(): BelongsTo {
        return $this->belongsTo(Category::class);
    }

    public function scopeSimilar($query, $productId){
        $product = static::findOrFail($productId);

        return $query->where('category_id', $product->category_id)
            ->where('id', '!=', $productId)
            ->where('is_active', true);
    }
}
