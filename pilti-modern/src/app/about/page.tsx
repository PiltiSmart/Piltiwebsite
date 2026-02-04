"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Users, ShieldCheck, Award, Zap, ChevronRight, Target, Rocket } from "lucide-react";

const coreValues = [
    { title: "Strategic Client Centricity", desc: "Prioritizing long-term success through mission-critical solutions that exceed enterprise expectations." },
    { title: "Integrity in Engineering", desc: "Architecting every solution with uncompromising quality and state-of-the-art IoT frameworks." },
    { title: "Operational Mastery", desc: "Delivering high-fidelity results across every sector through technical precision and execution excellence." },
    { title: "Impact-Driven Innovation", desc: "Empowering our professionals to contribute meaningfully and make a strategic global difference." },
    { title: "Collaborative Synergy", desc: "Operating as a unified ecosystem committed to collective success and a shared technological vision." },
    { title: "Purposeful Digitalization", desc: "Accelerating project progress through intelligent technologies that enhance productivity and sustainability." }
];

const team = [
    { name: "Suraj", role: "Micro-Control Programmer [IoT]", img: "/img/team4.jpg" },
    { name: "Rishi", role: "Technical Lead [IoT]", img: "/img/team2.jpg" },
    { name: "Mani", role: "FrontEnd Programmer [IoT]", img: "/img/team1.jpg" },
    { name: "Ashok", role: "Backend Technical Lead [IoT]", img: "/img/team3.jpg" },
];

export default function AboutPage() {
    return (
        <div className="pt-12">
            {/* Split Hero Section */}
            <section className="bg-white dark:bg-background py-16">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-[36px] md:text-[46px] font-semibold text-[#262626] dark:text-foreground mb-8 leading-tight">
                            Who we are
                        </h1>
                        <p className="text-[15px] text-[#616161] dark:text-muted-foreground mb-6 leading-relaxed">
                            PiltiSmart comprises a dedicated team of experts driven by a singular vision:
                            to deliver exceptional and consistent results for our clients. Our collective
                            strength lies in the unique talents of our professionals, fostered within an
                            environment that promotes innovation and collaborative success.
                        </p>
                        <p className="text-[15px] text-[#616161] dark:text-muted-foreground mb-10 leading-relaxed">
                            We are defined by a shared commitment to excellence and a passion for
                            advancing the future of technology. Guided by a steadfast set of core values,
                            we ensure that every solution we deliver meets the highest standards of
                            quality and integrity.
                        </p>
                    </motion.div>
                    <div className="relative aspect-[16/10] bg-[#F2F2F2] rounded-[24px] overflow-hidden shadow-2xl group border border-[#0078D4]/10">
                        <img
                            src="/img/premium_about_hero.png"
                            alt="PiltiSmart Professional Team"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#0078D4]/10 to-transparent opacity-60 pointer-events-none" />
                    </div>
                </div>
            </section>

            {/* Core Values Section - Grid Style */}
            <section className="py-24 bg-[#F2F2F2] dark:bg-muted/5">
                <div className="container mx-auto px-6">
                    <h2 className="text-[28px] font-semibold text-[#262626] dark:text-foreground mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {coreValues.map((value, i) => (
                            <div key={value.title} className="space-y-4">
                                <h3 className="text-[18px] font-semibold text-[#262626] dark:text-foreground">{value.title}</h3>
                                <p className="text-[14px] text-[#616161] dark:text-muted-foreground leading-relaxed">
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expertise Section - Clean Cards */}
            <section className="py-24 bg-white dark:bg-background">
                <div className="container mx-auto px-6">
                    <div className="max-w-xl mb-16">
                        <h2 className="text-[28px] font-semibold text-[#262626] dark:text-foreground mb-6">Our Expertise</h2>
                        <p className="text-[14px] text-[#616161] dark:text-muted-foreground">
                            We specialize in bridging the gap between hardware and intelligence,
                            ensuring 100% excellence in everything we deliver.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 border border-border rounded-[2px] hover:border-[#0078D4] transition-colors group">
                            <Zap size={32} className="text-[#0078D4] mb-6" />
                            <h4 className="text-[20px] font-semibold mb-4 text-[#262626] dark:text-foreground">IOT Managed Service</h4>
                            <div className="h-1 w-full bg-[#F2F2F2] mb-4">
                                <div className="h-full w-full bg-[#0078D4]" />
                            </div>
                            <span className="text-[13px] font-bold">100% PROFICIENCY</span>
                        </div>
                        <div className="p-8 border border-border rounded-[2px] hover:border-[#0078D4] transition-colors group">
                            <Target size={32} className="text-[#0078D4] mb-6" />
                            <h4 className="text-[20px] font-semibold mb-4 text-[#262626] dark:text-foreground">Data Analytics</h4>
                            <div className="h-1 w-full bg-[#F2F2F2] mb-4">
                                <div className="h-full w-full bg-[#0078D4]" />
                            </div>
                            <span className="text-[13px] font-bold">100% PROFICIENCY</span>
                        </div>
                        <div className="p-8 border border-border rounded-[2px] hover:border-[#0078D4] transition-colors group">
                            <Rocket size={32} className="text-[#0078D4] mb-6" />
                            <h4 className="text-[20px] font-semibold mb-4 text-[#262626] dark:text-foreground">Machine Learning</h4>
                            <div className="h-1 w-full bg-[#F2F2F2] mb-4">
                                <div className="h-full w-full bg-[#0078D4]" />
                            </div>
                            <span className="text-[13px] font-bold">100% PROFICIENCY</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section - Clean Grid */}
            <section className="py-24 bg-[#F2F2F2] dark:bg-muted/5">
                <div className="container mx-auto px-6">
                    <h2 className="text-[28px] font-semibold text-[#262626] dark:text-foreground mb-16 text-center">Meet Our Experts</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member) => (
                            <div key={member.name} className="flex flex-col items-center text-center group">
                                <div className="w-48 h-48 rounded-full overflow-hidden bg-white mb-6 border-4 border-white shadow-md ring-1 ring-[#0078D4]/10 group-hover:ring-[#0078D4] transition-all">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                                    />
                                </div>
                                <h4 className="text-[18px] font-semibold text-[#262626] dark:text-foreground">{member.name}</h4>
                                <p className="text-[13px] text-[#616161] dark:text-muted-foreground mb-4">{member.role}</p>
                                <Link href="#" className="text-[#0078D4] text-[13px] font-semibold hover:underline flex items-center gap-1 group/link">
                                    View Profile <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white dark:bg-background">
                <div className="container mx-auto px-6 text-center max-w-2xl">
                    <h2 className="text-[32px] font-semibold text-[#262626] dark:text-foreground mb-8">
                        Everything can be SMART, with the right vision.
                    </h2>
                    <p className="text-[15px] text-[#616161] dark:text-muted-foreground mb-10 leading-relaxed">
                        Our mission is to simplify the complex. We don&apos;t just build technology;
                        we create the invisible infrastructure that powers the future of human productivity.
                    </p>
                    <Link
                        href="/contact"
                        className="px-8 py-2 bg-[#0078D4] text-white font-semibold rounded-[2px] hover:bg-[#0067B8] transition-all inline-flex items-center gap-2"
                    >
                        Work with us
                    </Link>
                </div>
            </section>
        </div>
    );
}
