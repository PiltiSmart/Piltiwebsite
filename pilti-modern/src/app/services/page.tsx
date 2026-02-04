"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Home,
    Briefcase,
    Cpu,
    Sprout,
    GraduationCap,
    BookOpen,
    ChevronRight,
    Search,
    ShieldCheck,
    BarChart3,
    Cloud
} from "lucide-react";
import Link from "next/link";

const categories = [
    {
        id: "home",
        title: "Intelligent Residential Ecosystems",
        desc: "Elevate your living experience with PiltiSmart’s advanced residential automation ecosystems. We specialize in the seamless integration of intelligent lighting, high-fidelity security protocols, and precision climate control systems. By collaborating closely with architects and engineers, we deliver bespoke, turnkey solutions that transform conventional houses into intuitive, responsive environments, ensuring unparalleled comfort and security for modern homeowners.",
        icon: Home,
        img: "/img/premium_smart_home.png",
        features: ["Intelligent Lighting", "Security Systems", "Voice Control", "Climate Management"]
    },
    {
        id: "office",
        title: "Adaptive Workplace Solutions",
        desc: "Optimize corporate efficiency and resource management through our comprehensive Smart Office solutions. PiltiSmart empowers enterprises to monitor and calibrate energy consumption across lighting, HVAC, and water systems in real-time. Our intelligent workplace frameworks not only reduce operational overhead but also foster a more productive, sustainable environment by leveraging data-driven insights to manage resource utilization effectively.",
        icon: Briefcase,
        img: "/img/premium_smart_office.png",
        features: ["Presence Monitoring", "Resource Tracking", "Energy Efficiency", "Remote Management"]
    },
    {
        id: "farming",
        title: "Precision Agricultural IoT",
        desc: "Revolutionize agricultural productivity with precision IoT sensing and automated management systems. PiltiSmart enables farmers to maximize crop yields while minimizing resource expenditure through sophisticated soil analytics, moisture tracking, and automated irrigation networks. Our data-centric approach provides actionable insights into weather patterns and land vitality, ensuring sustainable, high-efficiency farming operations in an evolving climate.",
        icon: Sprout,
        img: "/img/premium_smart_farming.png",
        features: ["Crop Monitoring", "Automated Irrigation", "Soil Analytics", "Weather Insight"]
    },
    {
        id: "school",
        title: "Next-Gen Educational Platforms",
        desc: "Pioneer the future of education with PiltiSmart’s interactive learning ecosystems. We bridge the gap between traditional instruction and digital innovation by implementing virtual classroom technologies, advanced student safety tracking, and automated occupancy management. Our solutions are designed to enhance educational outcomes, streamline administrative processes, and create a safer, more engaging environment for both educators and students.",
        icon: GraduationCap,
        img: "/img/premium_smart_school.png",
        features: ["Virtual Classrooms", "Smart Attendance", "Student Safety", "Learning Analytics"]
    },
    {
        id: "industry",
        title: "Industrial Automation & IIoT",
        desc: "Unlock the full potential of Industry 4.0 with our specialized industrial automation and IIoT integration services. PiltiSmart’s expert team designs and deploys custom edge-to-cloud frameworks that enable predictive maintenance, real-time asset tracking, and comprehensive operational visibility. We help manufacturers eliminate quality bottlenecks and optimize production cycles, ensuring peak performance and safety in complex industrial landscapes.",
        icon: Cpu,
        img: "/img/premium_smart_industry.png",
        features: ["Predictive Maintenance", "Operational Visibility", "Safe Production", "Asset Tracking"]
    },
    {
        id: "publishing",
        title: "Advanced Digital Media Conversion",
        desc: "Streamline your digital transition with our high-fidelity Smart Publishing technology. PiltiSmart offers sophisticated digital conversion services that transform manuscripts into professionally formatted, market-ready ebooks with precision and scale. Our quality-assurance protocols and direct distribution strategies handle the complexities of digital media, allowing authors and publishers to reach global audiences with ease and excellence.",
        icon: BookOpen,
        img: "/img/premium_smart_publishing.png",
        features: ["Ebook Conversion", "Digital Formatting", "Quality Assurance", "Direct Distribution"]
    }
];

export default function ServicesPage() {
    return (
        <div className="pt-12">
            {/* Minimalist Hero */}
            <section className="bg-white dark:bg-background py-16 border-b">
                <div className="container mx-auto px-6">
                    <h1 className="text-[36px] font-semibold text-[#262626] dark:text-foreground mb-4">Enterprise IoT & Digital Solutions</h1>
                    <p className="text-[17px] text-[#616161] dark:text-muted-foreground leading-relaxed">
                        PiltiSmart provides a highly specialized suite of SMART services engineered to meet the sophisticated
                        demands of modern industry, education, and residential lifestyles. We deliver operational
                        excellence and digital transformation across every sector.
                    </p>
                </div>
            </section>

            {/* Categorized Service Grid */}
            <section className="py-16 bg-[#F2F2F2] dark:bg-muted/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((cat) => (
                            <div key={cat.id} className="bg-white dark:bg-muted/10 border border-transparent hover:border-[#0078D4] shadow-sm transition-all group overflow-hidden flex flex-col">
                                <div className="aspect-video w-full relative overflow-hidden border-b">
                                    <img
                                        src={cat.img}
                                        alt={cat.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-10 flex-grow">
                                    <cat.icon size={32} className="text-[#0078D4] mb-8" />
                                    <h3 className="text-[20px] font-semibold text-[#262626] dark:text-foreground mb-4">{cat.title}</h3>
                                    <p className="text-[14px] text-[#616161] dark:text-muted-foreground mb-8 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all">
                                        {cat.desc}
                                    </p>
                                    <ul className="space-y-3 mb-10">
                                        {cat.features.slice(0, 3).map((f) => (
                                            <li key={f} className="text-[13px] flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-[#0078D4] rounded-full" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href="#contact" className="text-[#0078D4] font-semibold text-[13px] hover:underline flex items-center gap-1 group/link">
                                        Get started <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* End-to-End Solutions Section */}
            <section className="py-24 bg-white dark:bg-background overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-[28px] font-semibold text-[#262626] dark:text-foreground mb-8">Strategic Ecosystem Integration</h2>
                            <p className="text-[15px] text-[#616161] dark:text-muted-foreground mb-12 leading-relaxed">
                                PiltiSmart provides a unified technological framework that bridges the gap between
                                hardware functionality and intelligent oversight. Our end-to-end ecosystems are engineered
                                for operational resilience, delivering sophisticated data visualization and real-time
                                control to ensure mission-critical reliability across all smart infrastructures.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <BarChart3 className="text-[#0078D4]" />
                                    <h4 className="font-semibold">Cognitive Data Insights</h4>
                                    <p className="text-[13px] text-muted-foreground">Leveraging pattern recognition and predictive modeling to facilitate proactive maintenance and early-stage anomaly detection.</p>
                                </div>
                                <div className="space-y-4">
                                    <ShieldCheck className="text-[#0078D4]" />
                                    <h4 className="font-semibold">Robust Infrastructure Protection</h4>
                                    <p className="text-[13px] text-muted-foreground">Implementing defense-in-depth security architectures with end-to-end encryption and stringent privacy governance.</p>
                                </div>
                                <div className="space-y-4">
                                    <Cloud className="text-[#0078D4]" />
                                    <h4 className="font-semibold">Global Command & Control</h4>
                                    <p className="text-[13px] text-muted-foreground">Provisioning centralized management interfaces that enable secure, high-latency-sensitive oversight of decentralized networks.</p>
                                </div>
                                <div className="space-y-4">
                                    <Search className="text-[#0078D4]" />
                                    <h4 className="font-semibold">AI-Driven Vigilance</h4>
                                    <p className="text-[13px] text-muted-foreground">Integrating advanced computer vision and voice-enabled AI to enhance situational awareness and adaptive monitoring.</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 relative aspect-square max-w-md mx-auto">
                            <div className="absolute inset-0 bg-[#0078D4]/5 rounded-full" />
                            <div className="absolute inset-4 border-2 border-dashed border-[#0078D4]/20 rounded-full animate-spin-slow" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Cpu size={120} className="text-[#0078D4] opacity-20" />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                                <div className="absolute top-10 right-10 p-4 bg-white shadow-lg border border-border">
                                    <div className="w-8 h-1 bg-[#0078D4] mb-2" />
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground">Device Sync</p>
                                    <p className="text-[14px] font-semibold">Active</p>
                                </div>
                                <div className="absolute bottom-10 left-10 p-4 bg-white shadow-lg border border-border">
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground">Network</p>
                                    <p className="text-[14px] font-semibold text-[#0078D4]">Secure</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
