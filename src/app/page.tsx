'use client';

import Link from 'next/link';
import Image from 'next/image';
import HeroSlider from '@/components/HeroSlider';
import Marquee from '@/components/Marquee';
import { ArrowRight, Globe, ShieldCheck, Users, Clock } from 'lucide-react';

import { getImageForProduct } from '@/lib/image-mapper';

const PRODUCTS = [
  {
    title: "Stainless Steel Pipe",
    desc: "ASTM A312 TP304/L, 316/L. Seamless & Welded Pipes.",
    slug: "stainless-steel-pipe-manufacturer",
    link: "/products/stainless-steel-pipe-manufacturer",
    size: "large" // 2x2
  },
  {
    title: "Stainless Steel Tube",
    desc: "ASTM A213 / A269. Instrumentation & Heat Exchanger Tubes.",
    slug: "stainless-steel-tubes-manufacturer",
    link: "/products/stainless-steel-tubes-manufacturer",
    size: "tall" // 1x2
  },
  {
    title: "Carbon Steel Pipe",
    desc: "ASTM A106 Gr. B / A53 / API 5L. High Pressure.",
    slug: "carbon-steel-pipes-tubes-manufacturer",
    link: "/products/carbon-steel-pipes-tubes-manufacturer",
    size: "standard"
  },
  {
    title: "Nickel Alloy Pipe",
    desc: "Inconel 600/625, Monel 400, Hastelloy C276.",
    slug: "nickel-alloy-pipes-tubes-manufacturer",
    link: "/products/nickel-alloy-pipes-tubes-manufacturer",
    size: "standard"
  },
  {
    title: "Duplex Steel Tube",
    desc: "UNS S31803 / S32205. High Corrosion Resistance.",
    slug: "duplex-steel-pipes-tubes-manufacturer",
    link: "/products/duplex-steel-pipes-tubes-manufacturer",
    size: "wide" // 2x1
  },
  {
    title: "Alloy Steel Pipe",
    desc: "ASTM A335 P11, P22, P91, P9 Chrome Moly Pipes.",
    slug: "alloy-steel-pipes-tubes-manufacturer",
    link: "/products/alloy-steel-pipes-tubes-manufacturer",
    size: "wide"
  },
  {
    title: "Titanium Pipes",
    desc: "Grade 2, 5, 7. High Strength & Light Weight.",
    slug: "titanium-pipes-tubes-manufacturer",
    link: "/products/titanium-pipes-tubes-manufacturer",
    size: "wide"
  },
  {
    title: "Inconel Pipes",
    desc: "Alloy 600, 625, 800, 825. High Temperature.",
    slug: "inconel-pipes-tubes-manufacturer",
    link: "/products/inconel-pipes-tubes-manufacturer",
    size: "wide"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 font-[var(--font-outfit)]">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Custom Marquee - Trust Indicators Strip */}
      <div className="bg-blue-900 text-white py-12 relative overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          <div className="flex flex-col items-center text-center p-4 group hover:-translate-y-1 transition-transform">
            <Globe className="w-8 h-8 text-blue-400 mb-2 group-hover:text-white transition-colors" />
            <div className="text-4xl font-bold mb-1 text-blue-100">70+</div>
            <div className="text-xs uppercase tracking-widest text-blue-300">Countries Exported</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 border-l border-blue-800 group hover:-translate-y-1 transition-transform">
            <ShieldCheck className="w-8 h-8 text-blue-400 mb-2 group-hover:text-white transition-colors" />
            <div className="text-4xl font-bold mb-1 text-blue-100">ISO</div>
            <div className="text-xs uppercase tracking-widest text-blue-300">9001:2015 Certified</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 border-l border-blue-800 group hover:-translate-y-1 transition-transform">
            <Users className="w-8 h-8 text-blue-400 mb-2 group-hover:text-white transition-colors" />
            <div className="text-4xl font-bold mb-1 text-blue-100">500+</div>
            <div className="text-xs uppercase tracking-widest text-blue-300">Clients Globally</div>
          </div>
          <div className="flex flex-col items-center text-center p-4 border-l border-blue-800 group hover:-translate-y-1 transition-transform">
            <Clock className="w-8 h-8 text-blue-400 mb-2 group-hover:text-white transition-colors" />
            <div className="text-4xl font-bold mb-1 text-blue-100">24/7</div>
            <div className="text-xs uppercase tracking-widest text-blue-300">Support Team</div>
          </div>
        </div>
      </div>

      {/* 3. Company Profile (About Us) - Floating Glass Card */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 relative">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-slate-700 -mt-32 relative backdrop-blur-sm bg-white/90 dark:bg-slate-800/90">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg shadow-blue-600/20">
              Who We Are
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Premium Pipes & Tubes Manufacturer</h2>
              <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed space-y-6">
                <p>
                  Leading Manufacturer & Exporter of <strong>Stainless Steel Pipes, Tubes, Coils, and Fittings</strong>.
                  A specialized division of <strong className="text-blue-600">Stainless Steel Pipes Tubes</strong>, dedicated to global infrastructure.
                </p>
                <p>
                  We supply <strong className="text-gray-900 dark:text-white">Seamless</strong> and <strong className="text-gray-900 dark:text-white">Welded</strong> pipes in
                  Stainless Steel, Carbon Steel, Alloy Steel, and High Nickel Alloys for Oil & Gas, Pharma, and Marine sectors.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/about-us" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">Read Our Full Story &rarr;</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Products Grid - Bento Layout */}
      <section className="py-32 bg-gray-50 dark:bg-slate-950 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm block mb-4">Our Catalog</span>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Engineered</span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-6">
            {PRODUCTS.map((product, idx) => (
              <Link
                key={idx}
                href={product.link}
                className={`group relative rounded-3xl overflow-hidden border border-white/20 shadow-xl bg-gray-900 
                  ${product.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                  ${product.size === 'wide' ? 'md:col-span-2' : ''}
                  ${product.size === 'tall' ? 'md:row-span-2' : ''}
                  hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 block
                `}
              >
                {/* Image */}
                <div className="absolute inset-0 h-full w-full">
                  <Image
                    src={getImageForProduct(product.slug)}
                    alt={product.title}
                    fill
                    quality={95}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/40 to-gray-900/90 group-hover:to-gray-900/80 transition-all duration-500" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {product.size === 'large' && (
                      <span className="bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 inline-block shadow-lg">
                        MOST POPULAR
                      </span>
                    )}

                    <h3 className={`font-bold text-white mb-3 text-shadow-sm group-hover:text-blue-200 transition-colors
                      ${product.size === 'large' ? 'text-4xl' : 'text-2xl'}
                    `}>
                      {product.title}
                    </h3>

                    <div className={`overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:max-h-24 max-h-0`}>
                      <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                        {product.desc}
                      </p>
                      <span className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                        Explore Product <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative Shine Effect */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-24 h-24 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link href="/products" className="group inline-flex items-center gap-3 px-10 py-5 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 font-bold tracking-wide shadow-xl hover:shadow-blue-600/30 border border-gray-200 dark:border-slate-700">
              View Complete Catalog
              <span className="bg-gray-100 dark:bg-slate-700 group-hover:bg-white/20 text-blue-600 group-hover:text-white rounded-full p-1 transition-colors">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>


      {/* 5. Latest Service - Nuclear Power Plants - Dark Premium Redesign */}
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
        {/* Abstract Dark Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1e293b,transparent_50%)]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/5 skew-x-12" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-block px-4 py-2 bg-blue-900/30 border border-blue-500/30 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                New Capability
              </div>
              <h3 className="text-xl md:text-2xl font-light text-gray-400 mb-2">
                Specialized Service For
              </h3>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Nuclear</span> <br />
                Power Plants
              </h2>

              <p className="text-gray-400 mb-10 text-lg leading-relaxed max-w-lg">
                We now provide certified high-grade stainless steel piping solutions specifically engineered for the rigorous safety and durability demands of the nuclear energy sector.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact-us"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-sm font-bold uppercase tracking-wider hover:bg-gray-100 transition-all duration-300"
                >
                  View Project Case
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white hover:bg-white/10 rounded-sm font-semibold uppercase tracking-wider transition-all duration-300"
                >
                  Our Standards
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8">
                <div>
                  <div className="text-3xl font-bold text-blue-500">100%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Safety Compliance</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-500">Zero</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Tolerance Defects</div>
                </div>
              </div>
            </div>

            {/* Right Image Grid */}
            <div className="order-1 lg:order-2 relative h-[500px] w-full">
              {/* Main Large Image */}
              <div className="absolute right-0 top-0 w-5/6 h-5/6 rounded-sm overflow-hidden border border-white/10 shadow-2xl z-10 group">
                <Image
                  src="/images/our-work/nuclear/pic1.jpg"
                  alt="Nuclear Facility"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
              </div>

              {/* Secondary Floating Image */}
              <div className="absolute left-0 bottom-0 w-1/2 h-1/2 rounded-sm overflow-hidden border-4 border-gray-900 shadow-2xl z-20 group">
                <Image
                  src="/images/industries/fabrication.jpg"
                  alt="Detailed Piping"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Decorative Tech Graphic */}
              <div className="absolute right-[-20px] bottom-[20%] w-32 h-32 border border-blue-500/20 rounded-full flex items-center justify-center animate-spin-slow z-0">
                <div className="w-24 h-24 border border-dashed border-blue-500/40 rounded-full" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Industries & Applications Floating Cards */}
      <section className="py-24 bg-gray-50 dark:bg-slate-950 overflow-hidden relative">
        <div className="container mx-auto px-4 mb-12 text-center relative z-10">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Industries We Serve</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className="relative rotate-[-2deg] scale-110">
          <Marquee speed={20} direction="right" pauseOnHover={true}>
            {[
              { img: 'tank.jpg', title: 'Oil & Gas' }, // Fallback to tank.jpg
              { img: 'marine.jpg', title: 'Marine' },
              { img: 'pic1.jpg', title: 'Chemical' }, // Fallback
              { img: 'pic2.jpg', title: 'Pharma' }, // Fallback
              { img: 'automotive.jpg', title: 'Automotive' },
              { img: 'fabrication.jpg', title: 'Construction' },
              { img: 'aerospace.jpg', title: 'Aerospace' },
            ].map((item, idx) => (
              <div key={idx} className="relative w-80 h-52 shrink-0 rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800 group">
                <div className="absolute inset-0">
                  <Image
                    src={`/images/industries/${item.img}`} // Path corrected to /images/industries/
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h4 className="text-white text-xl font-bold translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 7. Contact CTA - Enhanced Redesign */}
      <section className="py-28 relative overflow-hidden">

        {/* Deep Industrial Background */}
        <div className="absolute inset-0 p-0 m-0">
          <Image
            src="/images/slider/banner3.jpg"
            alt="Background"
            fill
            className="object-cover blur-[2px] brightness-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-slate-900/90 to-blue-900/90 mix-blend-multiply" />
        </div>

        {/* Animated Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-700" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/5 rounded-3xl p-8 md:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Glass Shine */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg tracking-tight">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Elevate</span> Your Project?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              We specialize in <strong className="text-white">bulk orders</strong> and <strong className="text-white">custom specifications</strong>.
              Our engineering team is ready to deliver precision with speed.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link href="/contact-us" className="group relative bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Get Custom Quote <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12" />
              </Link>

              <div className="flex items-center gap-4 text-white/90">
                <div className="h-12 w-[1px] bg-white/20 hidden sm:block" />
                <div className="text-left">
                  <div className="text-xs uppercase tracking-widest text-blue-300 mb-1">Direct Line</div>
                  <a href="tel:+919892171042" className="text-xl font-bold hover:text-white transition-colors">
                    +91-9892171042
                  </a>
                </div>
              </div>
            </div>

            {/* Decorative Bottom Text */}
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-6 text-sm text-blue-200/60 font-medium uppercase tracking-wider">
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Fast Response</span>
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Global Delivery</span>
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full" /> ISO Certified</span>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Stainless Steel Pipes Tubes",
            "url": "https://stainlesssteelpipestubes.in",
            "logo": "https://stainlesssteelpipestubes.in/images/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-9892171042",
              "contactType": "sales",
              "areaServed": "Global"
            },
            "sameAs": [
              "https://www.facebook.com/metalministry",
              "https://www.linkedin.com/company/metalministry"
            ]
          })
        }}
      />
    </div >
  );
}
