"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, Monitor, Smartphone, Apple, Terminal } from "lucide-react";

interface DownloadLink {
    name: string;
    href: string;
    disabled?: boolean;
}

interface OSSection {
    os: string;
    desc: string;
    icon: any;
    links: DownloadLink[];
    isPlayStore?: boolean;
}

const downloadLinks: OSSection[] = [
    {
        os: "Windows",
        desc: "Intel / AMD",
        icon: Monitor,
        links: [
            { name: "Windows (x86)", href: "/downloads/windows/SMARTY-WIN-x86.exe" }
        ]
    },
    {
        os: "macOS",
        desc: "Intel & Apple Silicon",
        icon: Apple,
        links: [
            { name: "macOS (Intel)", href: "/downloads/mac/SMARTY-MAC-INTEL.dmg" },
            { name: "macOS (Apple Silicon)", href: "/downloads/mac/SMARTY-MAC-SILICON.dmg" }
        ]
    },
    {
        os: "Linux",
        desc: "Universal Builds",
        icon: Terminal,
        links: [
            { name: "Coming Soon", href: "#", disabled: true }
        ]
    },
    {
        os: "Mobile App",
        desc: "Android (Direct / Store)",
        icon: Smartphone,
        links: [
            { name: "Android APK", href: "/downloads/mobile/SMARTY-MOBILE.apk" }
        ],
        isPlayStore: true
    }
];

export default function DownloadPage() {
    return (
        <div className="pt-20">
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        {/* Left Column: Product Context & Video */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:w-1/3 lg:sticky lg:top-32 flex flex-col items-center lg:items-center"
                        >
                            <div className="text-center lg:text-left w-full">
                                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#262626]">Get the Smarty App</h1>
                            </div>

                            <div className="w-[200px] h-[434px] bg-black rounded-[32px] border-[10px] border-[#262626] overflow-hidden shadow-2xl relative mx-auto mb-10">
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                >
                                    <source src="/img/smarty_dribbble.mp4" type="video/mp4" />
                                </video>
                                <div className="absolute inset-0 bg-accent/10 blur-3xl -z-10 rounded-[32px]" />
                            </div>

                            <div className="text-center lg:text-center w-full">
                                <p className="text-[#616161] text-lg leading-relaxed max-w-sm mx-auto">
                                    Experience the full power of real-time IoT management.
                                    Select your platform and start your smart journey.
                                </p>
                            </div>
                        </motion.div>

                        {/* Right Column: Download List (Rows for Consistency) */}
                        <div className="lg:w-2/3 lg:pt-2">
                            <div className="space-y-4">
                                {downloadLinks.map((item, i) => (
                                    <motion.div
                                        key={item.os}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-[#F6F6F6] p-4 lg:p-6 rounded-[16px] border border-transparent hover:border-[#0078D4]/10 transition-all flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 group"
                                    >
                                        <div className="flex items-center gap-6 flex-grow">
                                            <div className="w-12 h-12 rounded-xl bg-white text-[#0078D4] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
                                                <item.icon size={24} />
                                            </div>
                                            <div className="text-center sm:text-left">
                                                <h3 className="text-[17px] font-bold text-[#262626] mb-0.5">{item.os}</h3>
                                                <p className="text-[12px] text-[#616161]">{item.desc}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:items-end gap-3 shrink-0">
                                            {item.links.map(link => (
                                                <a
                                                    key={link.name}
                                                    href={link.href}
                                                    className={`text-[13px] font-bold transition-all flex items-center gap-2 ${link.disabled
                                                        ? "text-[#616161] opacity-50 cursor-not-allowed"
                                                        : "text-[#0078D4] hover:underline"
                                                        }`}
                                                >
                                                    {!link.disabled && <Download size={14} />}
                                                    {link.name}
                                                </a>
                                            ))}

                                            {item.isPlayStore && (
                                                <a
                                                    href="https://play.google.com/store/apps/details?id=in.pilti.smarty_app&hl=en"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:opacity-80 transition-opacity"
                                                >
                                                    <img
                                                        src="/img/get_it_on_playstore.webp"
                                                        alt="Get it on Google Play"
                                                        className="h-14 w-auto"
                                                    />
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Help Banner Integrated below List */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mt-12 bg-[#262626] text-white p-12 rounded-[40px] relative overflow-hidden group shadow-xl"
                            >
                                <img
                                    src="/img/premium_smart_industry.png"
                                    alt="Professional Industrial Background"
                                    className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#262626] via-[#262626]/80 to-transparent" />

                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="text-center md:text-left">
                                        <h2 className="text-3xl font-bold mb-3 tracking-tight">Enterprise Deployment?</h2>
                                        <p className="text-white/70 max-w-sm font-medium">Dedicated installation support for industrial registries and complex edge-network configurations.</p>
                                    </div>
                                    <a
                                        href="/contact"
                                        className="px-10 py-4 bg-[#0078D4] text-white rounded-2xl font-bold hover:bg-white hover:text-black transition-all whitespace-nowrap shadow-lg shadow-[#0078D4]/20"
                                    >
                                        Consult an Expert
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
