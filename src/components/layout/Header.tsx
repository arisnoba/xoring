"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "RING", href: "#ring" },
  { label: "APP", href: "#app" },
  { label: "AIOS", href: "#aios" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 lg:h-20 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 h-full flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <Image
            src="/assets/images/logo.svg"
            alt="XO RING"
            width={120}
            height={32}
            className={cn("transition-all duration-300", scrolled ? "invert-0" : "invert")}
            unoptimized
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className={cn(
                "text-sm font-bold tracking-[0.15em] transition-colors duration-200",
                scrolled ? "text-[#1d1d1f] hover:text-[#3d3df5]" : "text-white hover:text-white/70"
              )}
            >
              {link.label}
            </button>
          ))}

          <button
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-bold tracking-[0.05em] transition-all duration-200",
              scrolled
                ? "bg-[#1d1d1f] text-white hover:bg-[#3d3df5]"
                : "bg-white text-[#1d1d1f] hover:bg-white/90"
            )}
          >
            Buy Now
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={cn(
            "md:hidden p-2 rounded-lg transition-colors",
            scrolled ? "text-[#1d1d1f]" : "text-white"
          )}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-[#e5e5e5] py-6 px-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-bold tracking-[0.15em] text-[#1d1d1f] hover:text-[#3d3df5] py-2 text-left"
              >
                {link.label}
              </button>
            ))}
            <button className="mt-2 w-full px-6 py-3 rounded-full bg-[#1d1d1f] text-white text-sm font-bold">
              Buy Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
