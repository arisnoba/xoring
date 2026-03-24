import type { Metadata } from "next";
import 'lenis/dist/lenis.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import { SITE_URL } from '@/lib/site';
import "./globals.css";
import "./globals.scss";
import "../styles/_typography.scss";
import "../styles/components/_section-overrides.scss";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "XORing — World's First Social Smart Ring",
  description:
    "Beyond myself, Connecting us. XORing is the world's first social smart ring — track your health, connect with others, and prove your value.",
  applicationName: 'XORing',
  keywords: ['XORing', 'smart ring', 'wearable', 'social fitness', 'AI agent', 'web3'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "XORing — World's First Social Smart Ring",
    description:
      "Beyond myself, Connecting us. XORing is the world's first social smart ring — track your health, connect with others, and prove your value.",
    url: SITE_URL,
    siteName: 'XORing',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/images/ogimage.png',
        width: 1200,
        height: 630,
        alt: 'XORing social smart ring hero image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "XORing — World's First Social Smart Ring",
    description:
      "Beyond myself, Connecting us. XORing is the world's first social smart ring — track your health, connect with others, and prove your value.",
    images: ['/assets/images/ogimage.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased font-sans">
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-lg"
        >
          Skip to main content
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
