"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
  { name: "Store", href: "https://piltistore.com" },
  { name: "Download", href: "/download" },
  { name: "Help", href: "/help" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b",
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-0"
          : "bg-background py-0"
      )}
    >
      <div className="container mx-auto px-6 h-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl shrink-0">
            <img
              src="/img/logo-new1.png"
              alt="PiltiSmart"
              className="h-6 w-auto dark:invert"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center gap-1 text-[13px]">
              {navLinks.filter(link => link.name !== "Store").map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="px-4 py-3 transition-colors hover:underline decoration-2 underline-offset-4 text-foreground/90 whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="https://piltistore.com"
              className="text-[13px] hover:underline decoration-2 underline-offset-4 pr-4 border-r whitespace-nowrap"
            >
              Store
            </Link>
            <Search size={18} className="cursor-pointer hover:opacity-70" />
            <UserCircle2 size={20} className="cursor-pointer hover:opacity-70" />
          </div>



          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-12 left-0 w-full bg-background border-b shadow-lg lg:hidden p-6 animate-in slide-in-from-top-5">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
