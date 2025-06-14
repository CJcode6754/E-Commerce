"use client";

import { ArrowRight, Shield, Truck, RefreshCw, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@inertiajs/react";

const quickLinks = [
  { name: "Track Order", href: "/track" },
  { name: "Size Guide", href: "/size-guide" },
  { name: "Returns", href: "/returns" },
  { name: "Contact", href: "/contact" },
];

const categories = [
  { name: "Men's Fashion", href: "/men" },
  { name: "Women's Fashion", href: "/women" },
  { name: "Accessories", href: "/accessories" },
  { name: "Home & Living", href: "/home" },
];

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $100",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "SSL encrypted checkout",
  },
  {
    icon: CreditCard,
    title: "Multiple Payment",
    description: "Various payment options",
  },
];

export default function ShopFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Features Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for exclusive deals, new arrivals, and
              sustainability updates.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="bg-white text-gray-900 hover:bg-gray-100">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Quick Links */}
              <div>
                <h3 className="font-semibold text-white mb-6">Quick Links</h3>
                <ul className="space-y-4">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors flex items-center group"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold text-white mb-6">Categories</h3>
                <ul className="space-y-4">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <Link
                        href={category.href}
                        className="text-gray-400 hover:text-white transition-colors flex items-center group"
                      >
                        <span>{category.name}</span>
                        <ArrowRight className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Info */}
              <div>
                <h3 className="font-semibold text-white mb-6">Company</h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sustainability"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Sustainability
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/press"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Press
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold text-white">
                EcoStore
              </Link>
              <p className="text-gray-400 text-sm">
                © 2024 All rights reserved
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms
              </Link>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-gray-700 rounded"></div>
                <div className="w-8 h-5 bg-gray-700 rounded"></div>
                <div className="w-8 h-5 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
