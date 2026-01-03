'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Phone, Mail, Menu, X, ArrowRight } from 'lucide-react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    const handleMouseEnter = (menu: string) => setActiveDropdown(menu);
    const handleMouseLeave = () => setActiveDropdown(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isTransparent = isHomePage && !isScrolled;
    const textColorClass = isTransparent ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-blue-600';
    const logoClass = isTransparent ? 'brightness-0 invert drop-shadow-md' : '';

    return (
        <header
            className={`z-50 transition-all duration-300 border-b 
            ${isHomePage ? 'fixed top-0 left-0 right-0' : 'sticky top-0 bg-white shadow-sm'}
            ${isTransparent ? 'bg-transparent border-white/10 py-4' : 'bg-white/95 backdrop-blur-md border-gray-100 shadow-sm py-2'}
            `}
        >
            {/* Top Strip - Only on Home Page */}
            {isHomePage && (
                <div className={`absolute top-0 left-0 w-full overflow-hidden transition-all duration-500 ${isScrolled ? 'h-0 opacity-0' : 'h-8 opacity-100 bg-black/40 backdrop-blur-sm'}`}>
                    <div className="w-full h-full flex items-center">
                        <div className="animate-marquee whitespace-nowrap flex gap-16 text-xs font-medium tracking-widest text-white/90 uppercase px-4">
                            <span>ISO 9001:2015 Certified Manufacturer & Exporter</span>
                            <span><Mail size={12} className="inline mr-1" /> enquiry@metalministry.in</span>
                            <span><Phone size={12} className="inline mr-1" /> +91-9892171042</span>
                            <span>Global Shipping Available</span>
                            <span> </span>
                            <span>ISO 9001:2015 Certified Manufacturer & Exporter</span>
                            <span><Mail size={12} className="inline mr-1" /> enquiry@metalministry.in</span>
                            <span><Phone size={12} className="inline mr-1" /> +91-9892171042</span>
                            <span>Global Shipping Available</span>
                        </div>
                    </div>
                </div>
            )}

            <div className={`container mx-auto px-4 transition-all duration-300 ${isTransparent ? 'mt-6' : 'mt-0'}`}>
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 relative group z-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/logo.png"
                            alt="Stainless Steel Pipes Tubes Logo"
                            className={`h-16 md:h-20 w-auto object-contain transition-all duration-500 ${logoClass}`}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex gap-8 items-center">
                        <Link href="/" className={`${textColorClass} font-bold tracking-wide text-sm uppercase transition-colors relative group py-2`}>
                            Home
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                        <Link href="/about-us" className={`${textColorClass} font-bold tracking-wide text-sm uppercase transition-colors relative group py-2`}>
                            About
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`}></span>
                        </Link>

                        {/* Pipes & Tubes Dropdown */}
                        <div
                            className="relative group h-full"
                            onMouseEnter={() => handleMouseEnter('pipes')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button className={`flex items-center gap-1 ${textColorClass} font-bold tracking-wide text-sm uppercase py-4 group`}>
                                Pipes & Tubes <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'pipes' ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {activeDropdown === 'pipes' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full -left-10 w-[600px] bg-white/95 backdrop-blur-xl shadow-2xl rounded-lg border border-gray-100 overflow-hidden grid grid-cols-2 p-6 pb-16 gap-x-8 gap-y-4"
                                    >
                                        <div className="col-span-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pipes</div>
                                        <Link href="/products/stainless-steel-pipe-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Stainless Steel Pipe</Link>
                                        <Link href="/products/carbon-steel-pipes-tubes-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Carbon Steel Pipe</Link>
                                        <Link href="/products/nickel-alloy-pipes-tubes-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Nickel Alloy Pipe</Link>
                                        <Link href="/products/alloy-steel-pipes-tubes-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Alloy Steel Pipe</Link>

                                        <div className="col-span-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-4">Tubes</div>
                                        <Link href="/products/stainless-steel-tubes-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Stainless Steel Tube</Link>
                                        <Link href="/products/duplex-steel-pipes-tubes-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Duplex Steel Tube</Link>
                                        <Link href="/products/super-duplex-steel-pipes-tubes-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Super Duplex Tube</Link>
                                        <Link href="/products/inconel-pipes-tubes-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Inconel Tube</Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Other Products Dropdown */}
                        <div
                            className="relative group h-full"
                            onMouseEnter={() => handleMouseEnter('other')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button className={`flex items-center gap-1 ${textColorClass} font-bold tracking-wide text-sm uppercase py-4 group`}>
                                Other Products <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'other' ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {activeDropdown === 'other' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full -left-10 w-[500px] bg-white/95 backdrop-blur-xl shadow-2xl rounded-lg border border-gray-100 overflow-hidden grid grid-cols-1 p-6 gap-y-4"
                                    >
                                        <Link href="/products/monel-pipes-tubes-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Monel Pipes & Tubes</Link>
                                        <Link href="/products/hastelloy-pipes-tubes-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Hastelloy Pipes & Tubes</Link>
                                        <Link href="/products/titanium-pipes-tubes-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Titanium Pipes & Tubes</Link>
                                        <Link href="/products/aluminium-pipes-tubes-manufacturer" className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all">Aluminium Pipes & Tubes</Link>

                                        <div className="border-t border-gray-100 my-2"></div>
                                        <Link href="/products" className="text-sm font-bold text-blue-600 flex items-center gap-2">View Full Catalog <ArrowRight size={14} /></Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Technical Dropdown */}
                        <div className="relative group">
                            <button className={`${textColorClass} font-bold tracking-wide text-sm uppercase flex items-center gap-1 py-4 group-hover:text-blue-500 transition-colors`}>
                                Technical <ChevronDown size={14} />
                            </button>
                            <div className="absolute top-full left-0 w-64 bg-white dark:bg-slate-900 shadow-xl rounded-b-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 border-t-2 border-blue-500">
                                <Link href="/technical/chemical-composition" className="block px-6 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors border-b border-gray-100 dark:border-slate-800">
                                    Chemical Composition
                                </Link>
                                <Link href="/technical/international-standards" className="block px-6 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors border-b border-gray-100 dark:border-slate-800">
                                    International Standards
                                </Link>
                                <Link href="/technical/weight-calculator" className="block px-6 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors">
                                    Weight Calculator
                                </Link>
                            </div>
                        </div>



                        <Link href="/quality" className={`${textColorClass} font-bold tracking-wide text-sm uppercase transition-colors relative group py-2`}>
                            Quality
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`}></span>
                        </Link>

                        <Link href="/blogs" className={`${textColorClass} font-bold tracking-wide text-sm uppercase transition-colors relative group py-2`}>
                            Blogs
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`}></span>
                        </Link>

                        <Link href="/contact-us" className={`${textColorClass} font-bold tracking-wide text-sm uppercase transition-colors relative group py-2`}>
                            Contact
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden lg:block shrink-0">
                        <Link href="/contact-us" className={`px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-blue-500/40 hover:-translate-y-1 transition-all text-base flex items-center gap-2 whitespace-nowrap tracking-wide border ${!isTransparent ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white border-transparent' : 'bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white hover:text-blue-900'}`}>
                            Get Quote <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button className={`lg:hidden ${textColorClass}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div >

            {/* Mobile Menu */}
            <AnimatePresence>
                {
                    mobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: '100vh', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="lg:hidden fixed inset-0 top-[60px] bg-white z-40 overflow-y-auto"
                        >
                            <nav className="p-6 flex flex-col space-y-6 mt-10">
                                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-800">Home</Link>
                                <Link href="/about-us" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-800">About Us</Link>

                                <div className="text-2xl font-bold text-gray-800">Pipes & Tubes</div>
                                <Link href="/products/stainless-steel-pipe-manufacturer" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-600 pl-4">Stainless Steel Pipe</Link>
                                <Link href="/products/stainless-steel-tubes-manufacturer" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-600 pl-4">Stainless Steel Tube</Link>
                                <Link href="/products/nickel-alloy-pipes-tubes-manufacturer" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-600 pl-4">Nickel Alloy Pipe</Link>
                                <Link href="/products/alloy-steel-pipes-tubes-manufacturer" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-600 pl-4">Alloy Steel Pipe</Link>

                                <div className="text-2xl font-bold text-gray-800 mt-4">Other Products</div>
                                <Link href="/products/monel-pipes-tubes-manufacturer" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-600 pl-4">Monel</Link>
                                <Link href="/products/hastelloy-pipes-tubes-manufacturer" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-600 pl-4">Hastelloy</Link>

                                <Link href="/quality" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-800 mt-4">Quality</Link>
                                <Link href="/certificates" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-800">Certificates</Link>
                                <Link href="/blogs" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-800">Blogs</Link>
                                <Link href="/contact-us" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-blue-600 mt-4">Contact Us</Link>
                            </nav>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </header >
    );
}
