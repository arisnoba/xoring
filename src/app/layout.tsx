import type { Metadata, Viewport } from "next";
import 'lenis/dist/lenis.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import { SITE_URL } from '@/lib/site';
import "./globals.css";
import "./globals.scss";
import "../styles/_typography.scss";
import "../styles/components/_section-overrides.scss";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "XORing — Wear Contribution. Create Connection.",
  description:
    "A wearable POC device where behavior becomes value and AI comes alive.",
  applicationName: 'XORing',
  keywords: ['XORing', 'smart ring', 'wearable', 'social fitness', 'AI agent', 'web3'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "XORing — Wear Contribution. Create Connection.",
    description:
      "A wearable POC device where behavior becomes value and AI comes alive.",
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
    title: "XORing — Wear Contribution. Create Connection.",
    description:
      "A wearable POC device where behavior becomes value and AI comes alive.",
    images: ['/assets/images/ogimage.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/assets/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon/favicon.ico' },
    ],
    apple: [
      { url: '/assets/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/assets/favicon/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/assets/favicon/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/assets/favicon/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased font-sans">
      <head>
        <link rel="preload" href="/assets/video/hero-ring.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/assets/video/hero-ring-loop.mp4" as="video" type="video/mp4" />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-[calc(var(--safe-area-left)+1rem)] focus:top-[calc(var(--safe-area-top)+1rem)] focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-lg"
        >
          Skip to main content
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
