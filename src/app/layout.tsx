import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://stainlesssteelpipestubes.in'),
  title: {
    default: "Stainless Steel Pipes Tubes Manufacturer | Metal Ministry Inc.",
    template: "%s | Metal Ministry Inc."
  },
  description: "ISO 9001:2015 Certified Manufacturer & Exporter of Stainless Steel Pipes, Tubes, Coils, and Fittings. Specialized in Seamless & Welded Tubing for Oil & Gas, Pharma, and Marine sectors.",
  keywords: ["Stainless Steel Pipes", "Stainless Steel Tubes", "Seamless Pipes", "Welded Tubes", "Metal Ministry Inc", "Pipe Manufacturer India", "SS 304 Pipe", "SS 316 Tube"],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stainlesssteelpipestubes.in',
    title: "Stainless Steel Pipes Tubes Manufacturer | Metal Ministry Inc.",
    description: "Premium quality Stainless Steel Pipes & Tubes. ISO Certified Manufacturer serving global industries.",
    siteName: "Stainless Steel Pipes Tubes",
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/images/logo.png', // Assuming logo.png exists based on previous file content usage
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${inter.variable} font-sans antialiased flex flex-col min-h-screen bg-white text-gray-900`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
