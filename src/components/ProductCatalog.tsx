'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageForProduct } from '@/lib/image-mapper';

type Product = {
    title: string;
    slug: string;
    meta_description: string;
};

export default function ProductCatalog({ products }: { products: Product[] }) {
    const [query, setQuery] = useState('');

    // 1. Filter out Garbage/Template items
    // Comprehensive BLOCKLIST based on Database Audit
    const garbageTitles = [
        'accordians', 'alert box', 'all widgets', 'animation effects', 'button', 'buttons',
        'carousel', 'carousel sliders', 'cart', 'checkout', 'client review', 'contact form',
        'counters', 'devider', 'dividers', 'faq 1', 'faq 2', 'gallery filters', 'google map',
        'header', 'footer', 'help desk', 'icon box', 'icon box style', 'image box',
        'images box content', 'images effects', 'list group', 'list groups', 'login',
        'modal popup', 'pagination', 'portfolio', 'pricing table', 'privacy policy',
        'product details', 'progress bar', 'register', 'separators', 'service details',
        'services 1', 'services 2', 'shop listing', 'shop grid', 'shop sidebar',
        'shop widgets', 'tabs', 'team', 'testimonials', 'toggles', 'video', 'wishlist',
        'blog grid', 'blog half', 'blog large', 'blog single'
    ];

    const cleanProducts = products.filter(p => {
        const titleLower = p.title.toLowerCase();
        const slugLower = p.slug.toLowerCase();

        // Explicit Page Exclusions (Don't show static pages as products)
        if (p.slug === 'about-us' || p.slug === 'contact-us') return false;

        // Filter out "Location Spam" (Pipe Tube Exporter in X)
        if (titleLower.includes('pipe tube exporter in')) return false;
        if (slugLower.includes('pipe-tube-exporter-in')) return false;

        // Filter out Template Shortcodes & Garbage
        if (garbageTitles.some(t => titleLower.includes(t) || slugLower.includes(t))) return false;

        // Filter out "Dummy" items
        if (titleLower.includes('dummy')) return false;

        return true;
    });

    // 2. Deduplicate by Slug AND Normalized Title
    const seenMap = new Map();
    const uniqueProducts = cleanProducts.filter(p => {
        // Normalize title: remove "Exporter", "Manufacturer", "Supplier", "India", etc. and trim
        const normalizedTitle = p.title.toLowerCase()
            .replace(/\b(exporter|manufacturer|supplier|india|mumbai)\b/g, '')
            .replace(/[^a-z0-9]/g, '')
            .trim();

        if (seenMap.has(p.slug)) return false;
        if (seenMap.has(normalizedTitle)) return false;

        seenMap.set(p.slug, true);
        seenMap.set(normalizedTitle, true);
        return true;
    });

    const filteredProducts = uniqueProducts.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.meta_description?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-12 relative">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
                <AnimatePresence>
                    {filteredProducts.map((product) => {
                        return (
                            <motion.div
                                layout
                                key={product.slug}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href={`/products/${product.slug}`}
                                    className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 border border-gray-100 dark:border-slate-800 flex flex-col h-full"
                                >
                                    <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-slate-800">
                                        <Image
                                            src={getImageForProduct(product.slug)}
                                            alt={product.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                        {/* Floating Action / Badge */}
                                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm p-2 rounded-full shadow-lg translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                                            <ArrowRight size={18} className="text-blue-600" />
                                        </div>
                                    </div>

                                    <div className="p-6 flex-grow flex flex-col relative">
                                        {/* Decorative Line */}
                                        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-slate-700 to-transparent group-hover:via-blue-500 transition-colors duration-500" />

                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {product.title}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-grow font-light leading-relaxed">
                                            {product.meta_description || 'Premium quality Stainless Steel Pipes and Tubes manufactured to international standards.'}
                                        </p>

                                        <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                                            View Specifications <ArrowRight size={16} className="ml-1" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-xl">No products found matching &quot;{query}&quot;</p>
                </div>
            )}
        </div>
    );
}
