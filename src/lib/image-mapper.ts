
export const FALLBACK_IMAGE = '/images/slider-hd-1.png';

const SPECIFIC_MAPPINGS: Record<string, string> = {
    // New Pipes & Tubes Mappings (Mapping to real images)
    'stainless-steel-pipe-manufacturer': 'our-work/products/stainless-steel/stainless-steel-seamless-pipe.jpg',
    'stainless-steel-tubes-manufacturer': 'our-work/products/stainless-steel/tubes/stainless-steel-304-tubes.jpg',
    'carbon-steel-pipes-tubes-manufacturer': 'our-work/products/carbon-steel/carbon-steel-a252-seamless-pipe-tubes.jpg',
    'nickel-alloy-pipes-tubes-manufacturer': 'our-work/products/nickel-alloy/nickel-alloy-pipes-tubes.jpg',
    'alloy-steel-pipes-tubes-manufacturer': 'our-work/alloy-steel-pipes.jpg',
    'duplex-steel-pipes-tubes-manufacturer': 'our-work/duplex-steel-pipes-tubes.jpg', // Verified exists in root
    'stainless-steel-sheet-plate-coil-manufacturer': 'our-work/products/stainless-steel/stainless-steel-polished-pipes.jpg', // Fallback
    'stainless-steel-round-bar-manufacturer': 'our-work/products/stainless-steel/stainless-steel-round-pipes.jpg', // Fallback
    'cupro-nickel-pipes-tubes-manufacturer': 'our-work/products/nickel-alloy/nickel-alloy-pipes-tubes.jpg', // Shared image
    'titanium-pipes-tubes-manufacturer': 'our-work/titanium-pipes-tubes.jpg', // Verified exists

    // Legacy Fallbacks (Keep these if needed for older links)
    'stainless-steel-threaded-forged-fittings-manufacturer': 'products/item1.jpg',
};

export function getImageForProduct(slug: string): string {
    if (!slug) return FALLBACK_IMAGE;

    // 1. Check explicit mapping first
    if (SPECIFIC_MAPPINGS[slug]) {
        // Fix: Removed extra 'products/' prefix as mappings now include full relative path
        return `/images/${SPECIFIC_MAPPINGS[slug]}`;
    }

    // 2. Try Smart Pattern Matching
    const cleanSlug = slug.toLowerCase();

    // --- Alloy Steel Specifics (Granular) ---
    if (cleanSlug.includes('alloy')) {
        if (cleanSlug.includes('p11')) return '/images/our-work/products/alloy-steel/alloy-steel-astm-a335-p11-seamless-pipe-exporter.jpg';
        if (cleanSlug.includes('p12')) return '/images/our-work/products/alloy-steel/alloy-steel-astm-a335-p12-seamless-pipe-exporter.jpg';
        if (cleanSlug.includes('p22')) return '/images/our-work/products/alloy-steel/alloy-steel-astm-a335-p22-seamless-pipe-exporter.jpg';
        if (cleanSlug.includes('p91')) return '/images/our-work/products/alloy-steel/alloy-steel-asme-sa213-t91-seamless-pipe.jpg';
        if (cleanSlug.includes('p5')) return '/images/our-work/products/alloy-steel/alloy-steel-astm-a335-p5-seamless-pipe.jpg';
        if (cleanSlug.includes('t11')) return '/images/our-work/products/alloy-steel/alloy-steel-asme-sa213-t11-seamless-pipe.jpg';

        if (!cleanSlug.includes('nickel')) return '/images/our-work/alloy-steel-pipes.jpg';
    }

    // --- Stainless Steel Specifics ---
    if (cleanSlug.includes('stainless') || cleanSlug.includes('304') || cleanSlug.includes('316')) {
        if (cleanSlug.includes('304')) return '/images/our-work/products/stainless-steel/stainless-steel-304-pipes.jpg';
        if (cleanSlug.includes('316')) return '/images/our-work/products/stainless-steel/stainless-steel-316-pipes.jpg';
        if (cleanSlug.includes('310')) return '/images/our-work/products/stainless-steel/stainless-steel-310-pipes.jpg';
        if (cleanSlug.includes('321')) return '/images/our-work/products/stainless-steel/stainless-steel-321-pipes.jpg';
        if (cleanSlug.includes('904l')) return '/images/our-work/products/stainless-steel/stainless-steel-904l-pipes.jpg';
    }

    // --- Carbon Steel Specifics ---
    if (cleanSlug.includes('carbon')) {
        if (cleanSlug.includes('a106')) return '/images/our-work/products/carbon-steel/carbon-steel-pipe-a106-grade-b-seamless-pipes-tubes.jpg';
        if (cleanSlug.includes('api') && cleanSlug.includes('5l')) return '/images/our-work/products/carbon-steel/carbon-steel-api-5l-x52-psl1-seamless-pipe-tubes.jpg';
        if (cleanSlug.includes('a333')) return '/images/our-work/products/carbon-steel/carbon-steel-pipe-a333-gr-6-seamless-pipe-tubes.jpg';
        if (cleanSlug.includes('a53')) return '/images/our-work/products/carbon-steel/carbon-steel-pipe-a53-gr-b-seamless-pipe-tubes.jpg';
        return '/images/our-work/products/carbon-steel/carbon-steel-pipes-tubes.jpg';
    }

    // --- Other Material Categories ---
    if (cleanSlug.includes('nickel')) return '/images/our-work/products/nickel-alloy/nickel-alloy-pipes-tubes.jpg';
    if (cleanSlug.includes('duplex')) return '/images/our-work/duplex-steel-pipes-tubes.jpg';
    if (cleanSlug.includes('titanium')) return '/images/our-work/titanium-pipes-tubes.jpg';
    if (cleanSlug.includes('aluminium')) return '/images/our-work/aluminium-pipes-tubes.jpg';
    if (cleanSlug.includes('monel')) return '/images/our-work/monel-pipes-tubes.jpg';
    if (cleanSlug.includes('hastelloy')) return '/images/our-work/hastelloy-pipes-tubes.jpg';
    if (cleanSlug.includes('inconel')) return '/images/our-work/inconel-pipes.jpg';

    // Sheets/Plates specific
    if (cleanSlug.includes('sheet') || cleanSlug.includes('plate') || cleanSlug.includes('coil')) {
        return '/images/our-work/products/stainless-steel/stainless-steel-polished-pipes.jpg';
    }

    // Bars specific
    if (cleanSlug.includes('bar') || cleanSlug.includes('rod')) {
        return '/images/our-work/products/stainless-steel/stainless-steel-round-pipes.jpg';
    }

    // Default Fallback to a safe image (Stainless Seamless)
    return '/images/our-work/products/stainless-steel/stainless-steel-seamless-pipe.jpg';
}
