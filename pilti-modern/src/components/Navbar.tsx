"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, UserCircle2, ArrowRight, FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
  { name: "Store", href: "https://piltistore.com" },
  { name: "Download", href: "/download" },
  { name: "Help", href: "/help" },
];

const searchIndex = [
  { title: "Home", href: "/", category: "Page", tags: "piltismart smart home office school farm" },
  { title: "About PiltiSmart", href: "/about", category: "Page", tags: "mission vision team company" },
  { title: "Our Services", href: "/services", category: "Page", tags: "automation smart solutions enterprise" },
  { title: "Contact Support", href: "/contact", category: "Page", tags: "email phone address location" },
  { title: "Smarty App Download", href: "/download", category: "App", tags: "ios android windows mac linux mobile" },
  { title: "Knowledge Base", href: "/help", category: "Support", tags: "videos documentation tutorials" },
  { title: "New User Registration", href: "/help", category: "Tutorial", tags: "signup account setup" },
  { title: "Device Management", href: "/help", category: "Tutorial", tags: "add device delete telemetry" },
  { title: "Asset Organization", href: "/help", category: "Tutorial", tags: "relation tree groups" },
  { title: "Privacy Policy", href: "/privacy", category: "Legal", tags: "data security terms" },
  { title: "Terms of Service", href: "/terms", category: "Legal", tags: "usage license" },
  { title: "Careers", href: "/careers", category: "Company", tags: "jobs hiring opportunities roles culture" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRedirectOpen, setIsRedirectOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState("https://piltistore.com");

  const handleStoreRedirect = (e: React.MouseEvent, url: string = "https://piltistore.com") => {
    e.preventDefault();
    setPendingUrl(url);
    setIsRedirectOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const filteredResults = searchQuery.trim() === ""
    ? []
    : searchIndex.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
            <button
              onClick={(e) => handleStoreRedirect(e, "https://piltistore.com")}
              className="text-[13px] hover:underline decoration-2 underline-offset-4 pr-4 border-r whitespace-nowrap"
            >
              Store
            </button>
            <div className="relative">
              <Search
                size={18}
                className="cursor-pointer hover:text-[#0078D4] transition-colors"
                onClick={() => setIsSearchOpen(true)}
              />
            </div>
            <UserCircle2 size={20} className="cursor-pointer hover:text-[#0078D4] transition-colors" />
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
                {link.name === "Store" ? (
                  <button
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      handleStoreRedirect(e, link.href);
                    }}
                    className="text-base font-medium hover:text-primary transition-colors text-left w-full"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-medium hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Global Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col pt-12"
          >
            <div className="container mx-auto px-6 flex items-center justify-between h-12 border-b">
              <div className="flex items-center gap-4 flex-grow max-w-4xl">
                <Search size={20} className="text-[#616161]" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search piltismart.com..."
                  className="w-full bg-transparent text-[18px] outline-none placeholder:text-[#616161]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-2 hover:bg-[#F2F2F2] rounded-full transition-colors"
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow overflow-auto bg-[#F2F2F2]/30 py-12">
              <div className="container mx-auto px-6 max-w-4xl">
                {searchQuery.trim() === "" ? (
                  <div>
                    <h3 className="text-[12px] font-bold text-[#616161] uppercase tracking-widest mb-6">Quick Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {navLinks.slice(0, 4).map(link => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setIsSearchOpen(false)}
                          className="p-4 bg-white border border-transparent hover:border-[#0078D4]/30 shadow-sm transition-all flex items-center justify-between group"
                        >
                          <span className="text-[15px] font-medium">{link.name}</span>
                          <ArrowRight size={16} className="text-[#0078D4] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-[12px] font-bold text-[#616161] uppercase tracking-widest mb-6">
                      Search Results ({filteredResults.length})
                    </h3>
                    <div className="flex flex-col gap-2">
                      {filteredResults.map((result, i) => (
                        <motion.div
                          key={result.title}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Link
                            href={result.href}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className="p-6 bg-white border border-transparent hover:border-[#0078D4]/30 shadow-sm transition-all flex items-center gap-6 group"
                          >
                            <div className="w-10 h-10 bg-[#F2F2F2] text-[#616161] flex items-center justify-center shrink-0 group-hover:bg-[#0078D4]/5 group-hover:text-[#0078D4] transition-colors">
                              <FileText size={18} />
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center gap-3 mb-1">
                                <span className="text-[16px] font-semibold text-[#262626] group-hover:text-[#0078D4] transition-colors">
                                  {result.title}
                                </span>
                                <span className="px-2 py-0.5 bg-[#F2F2F2] text-[#616161] text-[10px] font-bold uppercase tracking-wider rounded-[2px]">
                                  {result.category}
                                </span>
                              </div>
                              <p className="text-[13px] text-[#616161] line-clamp-1">{result.href}</p>
                            </div>
                            <ArrowRight size={18} className="text-[#0078D4] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                          </Link>
                        </motion.div>
                      ))}
                      {filteredResults.length === 0 && (
                        <div className="text-center py-24">
                          <p className="text-[18px] text-[#616161]">No results found for "{searchQuery}"</p>
                          <p className="text-[14px] text-[#616161] mt-2 text-balance">Try checking your spelling or use more general terms like "app" or "help".</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Store Redirect Modal */}
      <AnimatePresence>
        {isRedirectOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white max-w-md w-full p-8 shadow-2xl rounded-[2px] relative overflow-hidden"
            >
              {/* Decorative Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0078D4] to-[#00BCF2]" />

              <div className="flex items-center gap-4 mb-6 text-[#0078D4]">
                <div className="w-12 h-12 bg-[#0078D4]/5 flex items-center justify-center rounded-full">
                  <ExternalLink size={24} />
                </div>
                <h3 className="text-[20px] font-bold text-[#262626]">Redirecting to PiltiStore</h3>
              </div>

              <p className="text-[14px] text-[#616161] leading-relaxed mb-8">
                You are now leaving piltismart.com and being redirected to our official commerce platform, <span className="font-semibold text-[#262626]">PiltiStore</span>.
                Your session will continue in a new secure window.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={pendingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsRedirectOpen(false)}
                  className="flex-1 bg-[#0078D4] text-white px-6 py-3 text-[13px] font-bold uppercase tracking-wider hover:bg-[#0067B8] transition-all flex items-center justify-center gap-2 rounded-[2px]"
                >
                  Continue to Store
                  <ArrowRight size={16} />
                </a>
                <button
                  onClick={() => setIsRedirectOpen(false)}
                  className="flex-1 bg-[#F2F2F2] text-[#262626] px-6 py-3 text-[13px] font-bold uppercase tracking-wider hover:bg-[#E5E5E5] transition-all rounded-[2px]"
                >
                  Stay on PiltiSmart
                </button>
              </div>

              <button
                onClick={() => setIsRedirectOpen(false)}
                className="absolute top-6 right-6 text-[#616161] hover:text-[#262626] transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
