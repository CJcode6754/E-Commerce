"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShoppingBag,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryItem } from "@/types/categories";
import { Link } from "@inertiajs/react";

export default function ShopCategory({ categories }: { categories: CategoryItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle mouse events for drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll speed multiplier
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle scroll buttons
  const scroll = (direction: "left" | "right") => {
    if (isAnimating || !carouselRef.current) return;

    setIsAnimating(true);

    const container = carouselRef.current;
    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - container.offsetWidth
        : container.scrollLeft + container.offsetWidth;

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });

    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-12 rounded-3xl py-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-8 md:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Popular Categories
              </h2>
              <p className="text-gray-600 mt-1">
                Browse through our top categories
              </p>
            </div>

            {/* Navigation buttons - desktop */}
            <div className="hidden md:flex space-x-3">
              <button
                onClick={() => scroll("left")}
                disabled={isAnimating}
                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm disabled:opacity-50"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={isAnimating}
                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm disabled:opacity-50"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel container */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex space-x-4 md:space-x-6 overflow-x-auto pb-6 scrollbar-hide snap-x"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category, idx) => {
              const image_path = category.image.startsWith("category_image/") ? `/storage/${category.image}` : category.image
              return (
                (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className={`snap-start flex-shrink-0 w-[80%] sm:w-[45%] md:w-[32%] lg:w-[24%] xl:w-[20%] overflow-hidden cursor-pointer transition-all duration-300 transform ${!isDragging && hoveredCard === category.id
                        ? "scale-[1.02]"
                        : "scale-100"
                      }`}
                    onMouseEnter={() => !isDragging && setHoveredCard(category.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: `${isVisible ? "translateY(0)" : "translateY(20px)"
                        } ${!isDragging && hoveredCard === category.id
                          ? "scale(1.02)"
                          : "scale(1)"
                        }`,
                      transition: "all 0.4s ease",
                      transitionDelay: `${idx * 0.05}s`,
                    }}
                  >
                    {/* Unique card design */}
                    <div
                      className={`h-full rounded-xl overflow-hidden shadow-md ${category.color} border border-gray-100`}
                    >
                      {/* Card top with image */}
                      <div className="relative h-40 overflow-hidden">
                        {/* Image with overlay */}
                        <img
                          src={image_path}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />

                        {/* Overlay with icon */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                          <h3 className="text-white text-lg font-bold">
                            {category.name}
                          </h3>
                        </div>

                        {/* Discount tag if available */}
                        {/* {category.discount && (
                          <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                            {category.discount}
                          </div>
                        )} */}

                        {/* Featured tag */}
                        {/* {category.featured && (
                          <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md flex items-center">
                            <Star className="w-3 h-3 mr-1 fill-white" /> Featured
                          </div>
                        )} */}
                      </div>

                      {/* Card bottom with details */}
                      <div className="p-4 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          {/* Icon */}
                          {/* <div
                            className={`p-2 rounded-full ${category.textColor} bg-white shadow-sm`}
                          >
                            {category.icon}
                          </div> */}

                          {/* Product count */}
                          {/* <div className="text-sm text-gray-600">
                            {category.count} products
                          </div> */}
                        </div>

                        {/* Shop now button */}

                        <button
                          className={cn(
                            `mt-2 py-2 px-4 rounded-lg text-white flex items-center justify-center font-medium text-sm hover:opacity-90 transition-opacity`,
                            `${category.color}`
                          )}
                        >
                          <ShoppingBag className="w-4 h-4 mr-2 text-gray-800" /> <span className="text-black">Shop Now</span>
                        </button>
                      </div>
                    </div>
                  </Link>
                )
              )
            })}
          </div>

          {/* Navigation arrows - mobile */}
          <div className="md:hidden mt-4 flex justify-center space-x-3">
            <button
              onClick={() => scroll("left")}
              disabled={isAnimating}
              className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={isAnimating}
              className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* View all button */}
        <div className="flex justify-center mt-8">
          <a
            href="/categories"
            className="flex items-center px-6 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            View All Categories
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
