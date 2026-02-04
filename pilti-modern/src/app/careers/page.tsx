"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Users,
    Zap,
    Rocket,
    Globe,
    ShieldCheck,
    Cpu,
    Code2,
    BrainCircuit,
    ArrowRight,
    Briefcase
} from "lucide-react";

const cultureHighlights = [
    {
        title: "Innovation-First",
        desc: "We don't just follow trends; we set them in the IoT space through rigorous R&D and creative engineering.",
        icon: Zap
    },
    {
        title: "Global Impact",
        desc: "Your work at PiltiSmart directly contributes to a more sustainable and intelligently connected world.",
        icon: Globe
    },
    {
        title: "Collaborative Synergy",
        desc: "We operate as a unified ecosystem where every voice is heard and collective success is the standard.",
        icon: Users
    }
];

const openRoles = [
    {
        title: "IoT Systems Architect",
        department: "Engineering",
        location: "Remote / Hybrid",
        id: "iot-arch-001"
    },
    {
        title: "Embedded Software Engineer",
        department: "Hardware Integration",
        location: "Office",
        id: "emb-eng-002"
    },
    {
        title: "AI/ML IoT Researcher",
        department: "Data Intelligence",
        location: "Remote",
        id: "ai-res-003"
    },
    {
        title: "Full Stack Developer [IoT]",
        department: "Software Platforms",
        location: "Hybrid",
        id: "fs-dev-004"
    }
];

const benefits = [
    { title: "Cutting-Edge Tech", desc: "Work with the latest IoT frameworks and state-of-the-art hardware." },
    { title: "Growth & Mentorship", desc: "Continuous learning paths and direct interaction with industry veterans." },
    { title: "Strategic Flexibility", desc: "Agile work environments designed for maximum productivity and balance." },
    { title: "Purpose-Driven Work", desc: "Contributing to mission-critical infrastructure that changes lives." }
];

export default function CareersPage() {
    return (
        <div className="pt-12">
            {/* Elite Support Hero */}
            <section className="bg-white dark:bg-background py-24 border-b border-border">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-[46px] font-semibold leading-tight text-[#262626] dark:text-foreground mb-8">
                            Join the team that builds <br />
                            <span className="text-[#0078D4]">the future of smart ecosystems.</span>
                        </h1>
                        <p className="text-[18px] text-[#616161] dark:text-muted-foreground max-w-2xl leading-relaxed mb-10">
                            At PiltiSmart, we are visionaries, engineers, and creators dedicated to the
                            invisible infrastructure that powers human productivity.
                        </p>
                        <a
                            href="#open-roles"
                            className="px-8 py-4 bg-[#0078D4] text-white text-[13px] font-bold uppercase tracking-wider hover:bg-[#0067B8] transition-all flex items-center gap-2 rounded-[2px] w-fit"
                        >
                            View Open Positions
                            <ArrowRight size={16} />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Culture & Vision */}
            <section className="py-24 bg-[#F2F2F2] dark:bg-muted/5">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2 space-y-8">
                            <h2 className="text-[32px] font-semibold text-[#262626] dark:text-foreground">Our Culture of Excellence</h2>
                            <p className="text-[15px] text-[#616161] dark:text-muted-foreground leading-relaxed">
                                We believe in &quot;Purposeful Digitalization.&quot; Our professionals are fostered
                                within an environment that promotes technical precision and execution excellence.
                            </p>
                            <div className="grid grid-cols-1 gap-8 pt-4">
                                {cultureHighlights.map((item) => (
                                    <div key={item.title} className="flex gap-6">
                                        <div className="w-12 h-12 bg-white dark:bg-muted/20 text-[#0078D4] flex items-center justify-center rounded-full shrink-0 shadow-sm">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-[18px] font-semibold mb-2 text-[#262626] dark:text-foreground">{item.title}</h4>
                                            <p className="text-[14px] text-[#616161] dark:text-muted-foreground leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="relative aspect-square bg-white dark:bg-muted/10 rounded-[2px] overflow-hidden border border-border/50 shadow-xl p-4">
                                <img
                                    src="/img/premium_about_hero.png"
                                    alt="PiltiSmart Culture"
                                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                                    <p className="text-white text-[20px] font-semibold">100% Commitment to Engineering Integrity.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-24 bg-white dark:bg-background border-y border-border">
                <div className="container mx-auto px-6">
                    <h2 className="text-[28px] font-semibold text-[#262626] dark:text-foreground mb-16">Why PiltiSmart?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {benefits.map((benefit) => (
                            <div key={benefit.title} className="space-y-4">
                                <div className="h-1 w-12 bg-[#0078D4]" />
                                <h3 className="text-[18px] font-semibold text-[#262626] dark:text-foreground">{benefit.title}</h3>
                                <p className="text-[14px] text-[#616161] dark:text-muted-foreground leading-relaxed">
                                    {benefit.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Roles */}
            <section id="open-roles" className="py-24 bg-white dark:bg-background">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-xl">
                            <h2 className="text-[32px] font-semibold text-[#262626] dark:text-foreground mb-4">Current Opportunities</h2>
                            <p className="text-[15px] text-[#616161] dark:text-muted-foreground">
                                We are constantly looking for talent. Even if a role is tagged as coming soon,
                                we encourage early interest.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] font-bold text-[#616161]">
                            <Briefcase size={16} />
                            <span>{openRoles.length} CURRENT LISTINGS</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {openRoles.map((role) => (
                            <div
                                key={role.id}
                                className="p-8 border border-border hover:border-[#0078D4]/30 bg-[#F2F2F2]/30 hover:bg-white transition-all flex flex-col md:flex-row justify-between items-center gap-6 group"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-[20px] font-semibold text-[#262626] dark:text-foreground">{role.title}</h3>
                                        <span className="px-3 py-1 bg-[#0078D4] text-white text-[10px] font-black uppercase tracking-[0.1em] rounded-full">
                                            Coming Soon
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-[13px] text-[#616161] dark:text-muted-foreground">
                                        <span className="flex items-center gap-1.5"><Code2 size={14} /> {role.department}</span>
                                        <span className="w-1.5 h-1.5 bg-[#0078D4]/20 rounded-full" />
                                        <span className="flex items-center gap-1.5"><BrainCircuit size={14} /> {role.location}</span>
                                    </div>
                                </div>
                                <button className="px-8 py-3 bg-transparent border border-[#0078D4] text-[#0078D4] text-[12px] font-bold uppercase tracking-wider opacity-50 cursor-not-allowed rounded-[2px]">
                                    Application Pending
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* General Application */}
                    <div className="mt-16 p-12 bg-[#0078D4] text-white rounded-[2px] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-[#0078D4]/20 relative overflow-hidden">
                        <div className="relative z-10 max-w-xl">
                            <h3 className="text-[24px] font-bold mb-4">Don&apos;t see the right fit?</h3>
                            <p className="text-white/80 text-[15px] leading-relaxed">
                                We are always expanding our ecosystem. Submit your profile for general
                                consideration and we&apos;ll reach out when a mission-critical role aligns with your expertise.
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="relative z-10 px-10 py-4 bg-white text-[#0078D4] text-[13px] font-black uppercase tracking-widest hover:bg-white/90 transition-all rounded-[2px] whitespace-nowrap"
                        >
                            Send Your Resume
                        </Link>
                        {/* Decorative Icon */}
                        <Rocket size={200} className="absolute -right-20 -bottom-20 text-white/10 rotate-12" />
                    </div>
                </div>
            </section>
        </div>
    );
}
