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

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  image: string;
  icon?: React.ReactNode;
  color: string;
  textColor: string;
  bgColor: string;
  count?: number;
  featured?: boolean;
  discount?: string;
}

export default function ShopCategory() {
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

  // Categories data with unique styling for each card
  const categories: CategoryItem[] = [
    {
      id: 1,
      name: "Electronics",
      slug: "electronics",
      image:
        "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
          <line x1="2" y1="10" x2="22" y2="10"></line>
        </svg>
      ),
      color: "bg-gradient-to-br from-blue-50 to-blue-100",
      textColor: "text-blue-700",
      bgColor: "bg-blue-700",
      count: 248,
      featured: true,
    },
    {
      id: 2,
      name: "Fashion",
      slug: "fashion",
      image:
        "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <path d="M16 2H8l-4 6h16l-4-6z"></path>
          <path d="M12 14v7"></path>
          <path d="M8 9l-4 9h16l-4-9"></path>
        </svg>
      ),
      color: "bg-gradient-to-br from-pink-50 to-pink-100",
      textColor: "text-pink-700",
      bgColor: "bg-pink-700",
      count: 312,
      discount: "30% OFF",
    },
    {
      id: 3,
      name: "Home & Kitchen",
      slug: "home-kitchen",
      image:
        "https://images.unsplash.com/photo-1584477710383-c790ca8f19e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      color: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      textColor: "text-emerald-700",
      bgColor: "bg-emerald-700",
      count: 186,
    },
    {
      id: 4,
      name: "Beauty & Health",
      slug: "beauty-health",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      ),
      color: "bg-gradient-to-br from-purple-50 to-purple-100",
      textColor: "text-purple-700",
      bgColor: "bg-purple-700",
      count: 204,
    },
    {
      id: 5,
      name: "Sporting Goods",
      slug: "sports",
      image:
        "https://images.unsplash.com/photo-1576858574144-9ae1ebcf41bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M16 12H8"></path>
          <path d="M12 16V8"></path>
        </svg>
      ),
      color: "bg-gradient-to-br from-orange-50 to-orange-100",
      textColor: "text-orange-700",
      bgColor: "bg-orange-700",
      count: 156,
      featured: true,
    },
    {
      id: 6,
      name: "Books & Media",
      slug: "books-media",
      image:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      ),
      color: "bg-gradient-to-br from-amber-50 to-amber-100",
      textColor: "text-amber-700",
      bgColor: "bg-amber-700",
      count: 132,
    },
    {
      id: 7,
      name: "Toys & Games",
      slug: "toys-games",
      image:
        "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <circle cx="5" cy="12" r="3"></circle>
          <circle cx="19" cy="12" r="3"></circle>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      ),
      color: "bg-gradient-to-br from-red-50 to-red-100",
      textColor: "text-red-700",
      bgColor: "text-red-700",
      count: 118,
    },
    {
      id: 8,
      name: "Automotive",
      slug: "automotive",
      image:
        "https://images.unsplash.com/photo-1604055807765-4e9a2a0f30b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
      ),
      color: "bg-gradient-to-br from-gray-50 to-gray-100",
      textColor: "text-gray-700",
      bgColor: "bg-gray-700",
      count: 96,
    },
    {
      id: 9,
      name: "Jewelry",
      slug: "jewelry",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="4"></circle>
        </svg>
      ),
      color: "bg-gradient-to-br from-indigo-50 to-indigo-100",
      textColor: "text-indigo-700",
      bgColor: "bg-indigo-700",
      count: 78,
      discount: "20% OFF",
    },
    {
      id: 10,
      name: "Smart Home",
      slug: "smart-home",
      image:
        "https://images.unsplash.com/photo-1558002038-1055e2dae8d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      color: "bg-gradient-to-br from-sky-50 to-sky-100",
      textColor: "text-sky-700",
      bgColor: "bg-sky-700",
      count: 64,
    },
  ];

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
            {categories.map((category, idx) => (
              <a
                key={category.id}
                href={`/category/${category.slug}`}
                className={`snap-start flex-shrink-0 w-[80%] sm:w-[45%] md:w-[32%] lg:w-[24%] xl:w-[20%] overflow-hidden cursor-pointer transition-all duration-300 transform ${
                  !isDragging && hoveredCard === category.id
                    ? "scale-[1.02]"
                    : "scale-100"
                }`}
                onMouseEnter={() => !isDragging && setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `${
                    isVisible ? "translateY(0)" : "translateY(20px)"
                  } ${
                    !isDragging && hoveredCard === category.id
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
                      src={category.image}
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
                    {category.discount && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                        {category.discount}
                      </div>
                    )}

                    {/* Featured tag */}
                    {category.featured && (
                      <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md flex items-center">
                        <Star className="w-3 h-3 mr-1 fill-white" /> Featured
                      </div>
                    )}
                  </div>

                  {/* Card bottom with details */}
                  <div className="p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      {/* Icon */}
                      <div
                        className={`p-2 rounded-full ${category.textColor} bg-white shadow-sm`}
                      >
                        {category.icon}
                      </div>

                      {/* Product count */}
                      <div className="text-sm text-gray-600">
                        {category.count} products
                      </div>
                    </div>

                    {/* Shop now button */}

                    <button
                      className={cn(
                        `mt-2 py-2 px-4 rounded-lg text-white flex items-center justify-center font-medium text-sm hover:opacity-90 transition-opacity`,
                        `${category.bgColor}`
                      )}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" /> Shop Now
                    </button>
                  </div>
                </div>
              </a>
            ))}
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
