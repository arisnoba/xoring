import type { Metadata } from "next";
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
