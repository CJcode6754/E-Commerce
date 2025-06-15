"use client";
// ProductDetail.tsx
import { useState } from "react";
import {
    Star,
    Heart,
    ShoppingCart,
    Share2,
    ChevronRight,
    Check,
} from "lucide-react";
import SimilarProducts from "@/components/frontend/SimilarProducts";
import { SimilarProduct } from "@/types/products";
import ShopFrontLayout from "@/layouts/ShopFrontLayout";

// Types
interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    description: string;
    features: string[];
    images: string[];
    colors: string[];
    sizes: string[];
    inStock: boolean;
}

const ProductDetail = ({product, similarProducts}:{product:Product, similarProducts:SimilarProduct[]}) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [quantity, setQuantity] = useState(1);

    return (
        <ShopFrontLayout>
            <div className="max-w-6xl mx-auto px-8 py-12 bg-white">
                {/* Breadcrumb */}
                <nav className="flex mb-8 text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-700">
                        Home
                    </a>
                    <ChevronRight className="h-4 w-4 mx-2 text-gray-400 self-center" />
                    <a href="#" className="text-gray-500 hover:text-gray-700">
                        Office Furniture
                    </a>
                    <ChevronRight className="h-4 w-4 mx-2 text-gray-400 self-center" />
                    <a href="#" className="text-gray-500 hover:text-gray-700">
                        Chairs
                    </a>
                    <ChevronRight className="h-4 w-4 mx-2 text-gray-400 self-center" />
                    <span className="text-gray-900 font-medium">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-6">
                        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
                            <img
                                src={`/storage/${product.images[selectedImage]}`}
                                alt={product.name}
                                className="object-cover transition-all duration-300 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        <div className="flex space-x-4 px-4 overflow-auto pb-2">
                            {product.images.map((image, index) => {
                                const image_path = `/storage/${image}`;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative aspect-square w-16 rounded-lg overflow-hidden transition-all duration-200 ${
                                            selectedImage === index
                                                ? "border-2 border-indigo-600"
                                                : "border border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        <img
                                            src={image_path}
                                            alt={`Product image ${index + 1}`}
                                            className="object-cover w-full h-full"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                            <div className="mt-2 flex items-center">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${i < Math.floor(product.rating)
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : i < product.rating
                                                        ? "text-yellow-400 fill-yellow-400 opacity-50"
                                                        : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="ml-2 text-sm text-gray-500">
                                    {product.rating} ({product.reviewCount} reviews)
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-b py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">
                                        ${Number(product.price).toFixed(2)}
                                    </p>
                                    {product.originalPrice && (
                                        <p className="text-sm text-gray-500 line-through">
                                            ${product.originalPrice.toFixed(2)}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <div
                                        className={`h-3 w-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"
                                            } mr-2`}
                                    ></div>
                                    <p
                                        className={`text-sm ${product.inStock ? "text-green-700" : "text-red-700"
                                            }`}
                                    >
                                        {product.inStock ? "In Stock" : "Out of Stock"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                                <div className="mt-2 flex space-x-3">
                                    {product.colors.map((colorStr, index) => {
                                        const color = {
                                            name: colorStr.split("=")[0],
                                            value: colorStr.split("=")[1] || "#000000",
                                        }
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedColor(index)}
                                                className={`flex items-center justify-center rounded-full h-8 w-8 border-2 ${selectedColor === index
                                                        ? "border-indigo-600"
                                                        : "border-gray-200"
                                                    }`}
                                                style={{ backgroundColor: color.value }}
                                            >
                                                {color.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                                <div className="mt-2 flex items-center border border-gray-200 rounded-md w-32">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-2 text-gray-500 hover:text-gray-700"
                                    >
                                        -
                                    </button>
                                    <span className="flex-1 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-3 py-2 text-gray-500 hover:text-gray-700"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button className="flex-1 rounded-md bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200">
                                <div className="flex items-center justify-center">
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    Add to Cart
                                </div>
                            </button>
                            <button className="rounded-md border border-gray-300 p-3 hover:bg-gray-50 transition-all duration-200">
                                <Heart className="h-5 w-5 text-gray-500" />
                            </button>
                            <button className="rounded-md border border-gray-300 p-3 hover:bg-gray-50 transition-all duration-200">
                                <Share2 className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="border-t pt-4">
                            <h3 className="text-sm font-medium text-gray-900">
                                Product Description
                            </h3>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-900">Features</h3>
                            <ul className="mt-2 space-y-2">
                                {product.features.map((feature, index) => {
                                    return (
                                        <li key={index} className="flex items-start space-x-2">
                                            <Check className="h-5 w-5 text-green-500 mt-1" />
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                <SimilarProducts similarProducts={similarProducts} />
            </div>
        </ShopFrontLayout>
    );
};

export default ProductDetail;
