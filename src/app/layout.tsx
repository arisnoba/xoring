import type { Metadata } from "next";
import 'lenis/dist/lenis.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import "./globals.css";
import "./globals.scss";

export const metadata: Metadata = {
  title: "XORing — World's First Social Smart Ring",
  description:
    "Beyond myself, Connecting us. XORing is the world's first social smart ring — track your health, connect with others, and prove your value.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased font-sans">
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
