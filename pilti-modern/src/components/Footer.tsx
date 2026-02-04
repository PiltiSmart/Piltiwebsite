"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Globe } from "lucide-react";

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
            { name: "Account Profile", href: "https://piltistore.com" },
            { name: "Download Center", href: "/download" },
            { name: "Returns", href: "/help" },
            { name: "Order Tracking", href: "https://piltistore.com" },
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
                                        <Link href={link.href} className="hover:underline transition-all">
                                            {link.name}
                                        </Link>
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
                            <Linkedin size={16} className="cursor-pointer hover:opacity-70" />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        <Link href="/contact" className="hover:underline">Contact PiltiSmart</Link>
                        <Link href="/privacy" className="hover:underline">Privacy</Link>
                        <Link href="/terms" className="hover:underline">Terms of use</Link>
                        <Link href="/trademarks" className="hover:underline">Trademarks</Link>
                        <span>&copy; PiltiSmart {new Date().getFullYear()}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
