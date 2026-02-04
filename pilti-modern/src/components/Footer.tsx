"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Globe, ExternalLink, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const footerLinks = [
    {
        title: "What's new",
        links: [
            { name: "SmartySwitch", href: "/services" },
            { name: "SmartyTalkCamera", href: "/services" },
            { name: "SmartyCompTV", href: "/services" },
            { name: "Next Gen IoT", href: "/" },
        ]
    },
    {
        title: "PiltiSmart Store",
        links: [
            { name: "Account Profile", href: "https://piltistore.com/customer/login" },
            { name: "Returns", href: "https://piltistore.com/page/return-policy" },
            { name: "Order Tracking", href: "https://piltistore.com/customer/account/orders" },
        ]
    },
    {
        title: "Education",
        links: [
            { name: "Smart Schools", href: "/services" },
            { name: "Virtual Classrooms", href: "/services" },
            { name: "Learning Plans", href: "/services" },
        ]
    },
    {
        title: "Business",
        links: [
            { name: "Smart Office", href: "/services" },
            { name: "Smart Industries", href: "/services" },
            { name: "Edge Computing", href: "/services" },
            { name: "Data Analytics", href: "/services" },
        ]
    },
    {
        title: "Developer & IT",
        links: [
            { name: "IoT Platform", href: "/" },
            { name: "Developer Docs", href: "/help" },
            { name: "SDKs & APIs", href: "/help" },
        ]
    },
    {
        title: "Company",
        links: [
            { name: "About Us", href: "/about" },
            { name: "Careers", href: "/careers" },
            { name: "Privacy", href: "/privacy" },
            { name: "Terms", href: "/terms" },
            { name: "Contact Us", href: "/contact" },
        ]
    }
];

export default function Footer() {
    const [isRedirectOpen, setIsRedirectOpen] = useState(false);
    const [pendingUrl, setPendingUrl] = useState("https://piltistore.com");

    const handleStoreRedirect = (e: React.MouseEvent, url: string = "https://piltistore.com") => {
        e.preventDefault();
        setPendingUrl(url);
        setIsRedirectOpen(true);
    };

    return (
        <footer className="bg-[#F2F2F2] dark:bg-muted/10 pt-10 text-[11px] text-[#616161] dark:text-muted-foreground">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
                    {footerLinks.map((group) => (
                        <div key={group.title} className="space-y-4">
                            <h5 className="font-bold text-[15px] text-[#262626] dark:text-foreground">{group.title}</h5>
                            <ul className="space-y-3">
                                {group.links.map((link) => (
                                    <li key={link.name}>
                                        {link.href.startsWith("https://piltistore.com") ? (
                                            <button
                                                onClick={(e) => handleStoreRedirect(e, link.href)}
                                                className="hover:underline transition-all text-left"
                                            >
                                                {link.name}
                                            </button>
                                        ) : (
                                            <Link href={link.href} className="hover:underline transition-all">
                                                {link.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center py-8 gap-4 border-t border-[#D2D2D2]/20">
                    <div className="flex items-center gap-6">
                        <Link href="#" className="flex items-center gap-2 hover:underline">
                            <Globe size={14} />
                            English (India)
                        </Link>
                        <div className="flex gap-4">
                            <Facebook size={16} className="cursor-pointer hover:opacity-70" />
                            <Twitter size={16} className="cursor-pointer hover:opacity-70" />
                            <a href="https://www.linkedin.com/company/piltismart" target="_blank" rel="noopener noreferrer">
                                <Linkedin size={16} className="cursor-pointer hover:opacity-70" />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        <Link href="/contact" className="hover:underline">Contact PiltiSmart</Link>
                        <Link href="/privacy" className="hover:underline">Privacy</Link>
                        <Link href="/terms" className="hover:underline">Terms of use</Link>
                        <Link href="/trademarks" className="hover:underline">Trademarks</Link>
                        <span>&copy; PiltiSmart {new Date().getFullYear()}</span>
                        <span className="opacity-50 text-[10px] ml-2 font-mono">
                            v{process.env.NEXT_PUBLIC_APP_VERSION}
                            {process.env.NEXT_PUBLIC_GIT_HASH && ` (${process.env.NEXT_PUBLIC_GIT_HASH})`}
                        </span>
                    </div>
                </div>
            </div>

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
                                    className="flex-1 bg-[#0078D4] text-white px-6 py-3 text-[13px] font-bold uppercase tracking-wider hover:bg-[#0067B8] transition-all flex items-center justify-center gap-2 rounded-[2px] no-underline"
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
        </footer>
    );
}
