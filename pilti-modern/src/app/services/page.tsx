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
    Cloud,
    X,
    ArrowRight,
    Info
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

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

const featureDetails: Record<string, { title: string; explanation: string; piltiValue: string }> = {
    "Intelligent Lighting": {
        title: "Intelligent Lighting",
        explanation: "Intelligent lighting systems use IoT sensors, automation protocols, and adaptive algorithms to optimize illumination based on occupancy, natural light levels, and user preferences. These systems reduce energy consumption while enhancing comfort and productivity.",
        piltiValue: "PiltiSmart delivers turnkey intelligent lighting solutions with seamless integration into your existing infrastructure. Our systems feature real-time occupancy detection, circadian rhythm optimization, and remote management capabilities, ensuring maximum energy efficiency and user satisfaction."
    },
    "Security Systems": {
        title: "Security Systems",
        explanation: "Modern security systems leverage advanced sensors, computer vision, and encrypted communication protocols to provide comprehensive surveillance, intrusion detection, and access control. These systems offer real-time alerts and forensic capabilities.",
        piltiValue: "PiltiSmart implements defense-in-depth security architectures with military-grade encryption, multi-factor authentication, and AI-powered threat detection. Our solutions integrate seamlessly with existing security infrastructure while providing centralized oversight and instant incident response."
    },
    "Voice Control": {
        title: "Voice Control",
        explanation: "Voice control technology enables hands-free operation of smart devices through natural language processing and voice recognition. This interface provides intuitive control over lighting, climate, entertainment, and security systems.",
        piltiValue: "PiltiSmart integrates industry-leading voice assistants with custom command frameworks tailored to your environment. Our voice control solutions support multi-language recognition, contextual awareness, and privacy-first processing to ensure seamless, secure interaction."
    },
    "Climate Management": {
        title: "Climate Management",
        explanation: "Smart climate management systems use IoT sensors and predictive algorithms to maintain optimal temperature, humidity, and air quality. These systems learn user preferences and adapt to environmental conditions for maximum comfort and efficiency.",
        piltiValue: "PiltiSmart's climate solutions feature zone-based control, predictive HVAC optimization, and integration with weather forecasting APIs. Our systems reduce energy costs by up to 40% while maintaining precise environmental conditions across all spaces."
    },
    "Presence Monitoring": {
        title: "Presence Monitoring",
        explanation: "Presence monitoring utilizes advanced sensors and computer vision to track occupancy patterns, space utilization, and movement within facilities. This data enables intelligent resource allocation and security oversight.",
        piltiValue: "PiltiSmart deploys privacy-compliant presence detection using thermal imaging, PIR sensors, and edge-based AI processing. Our analytics platform provides actionable insights into space utilization, enabling data-driven decisions for facility optimization."
    },
    "Resource Tracking": {
        title: "Resource Tracking",
        explanation: "Resource tracking systems monitor the consumption and allocation of utilities, equipment, and materials in real-time. This visibility enables proactive management and waste reduction.",
        piltiValue: "PiltiSmart's resource tracking solutions provide granular visibility into energy, water, and material usage with predictive analytics for demand forecasting. Our platform integrates with existing ERP systems to streamline procurement and reduce operational overhead."
    },
    "Energy Efficiency": {
        title: "Energy Efficiency",
        explanation: "Energy efficiency initiatives leverage IoT monitoring, automated controls, and machine learning to minimize energy consumption without compromising performance. These systems identify inefficiencies and optimize operations continuously.",
        piltiValue: "PiltiSmart implements comprehensive energy management frameworks with real-time monitoring, automated load balancing, and predictive maintenance. Our clients typically achieve 30-50% energy savings within the first year of deployment."
    },
    "Remote Management": {
        title: "Remote Management",
        explanation: "Remote management platforms enable centralized control and monitoring of distributed IoT ecosystems from anywhere. These systems provide real-time diagnostics, configuration updates, and emergency response capabilities.",
        piltiValue: "PiltiSmart's cloud-based management console offers secure, role-based access to all connected systems with comprehensive audit trails. Our platform supports mobile and desktop interfaces, ensuring operational continuity regardless of location."
    },
    "Crop Monitoring": {
        title: "Crop Monitoring",
        explanation: "Precision crop monitoring uses satellite imagery, drone surveillance, and ground-based sensors to assess plant health, growth patterns, and stress indicators. This data enables targeted interventions and yield optimization.",
        piltiValue: "PiltiSmart integrates multi-spectral imaging, soil sensors, and weather data to provide comprehensive crop health analytics. Our AI-powered platform detects early signs of disease, nutrient deficiency, and water stress, enabling proactive farm management."
    },
    "Automated Irrigation": {
        title: "Automated Irrigation",
        explanation: "Automated irrigation systems use soil moisture sensors, weather forecasts, and crop-specific algorithms to deliver precise water quantities at optimal times. This approach maximizes water efficiency while ensuring crop vitality.",
        piltiValue: "PiltiSmart's irrigation solutions feature zone-based control, real-time soil moisture monitoring, and integration with weather APIs for predictive scheduling. Our systems reduce water consumption by up to 60% while improving crop yields."
    },
    "Soil Analytics": {
        title: "Soil Analytics",
        explanation: "Advanced soil analytics measure pH levels, nutrient composition, moisture content, and microbial activity to provide comprehensive soil health profiles. This data guides fertilization, irrigation, and crop rotation strategies.",
        piltiValue: "PiltiSmart deploys wireless sensor networks for continuous soil monitoring with cloud-based analytics. Our platform provides actionable recommendations for soil amendments, optimizing fertility and reducing chemical inputs."
    },
    "Weather Insight": {
        title: "Weather Insight",
        explanation: "Hyperlocal weather monitoring combines on-site sensors with regional forecasting models to provide accurate, real-time weather data. This intelligence enables proactive decision-making for agricultural operations.",
        piltiValue: "PiltiSmart integrates micro-weather stations with advanced forecasting algorithms to deliver farm-specific predictions. Our system provides early warnings for frost, drought, and severe weather, protecting crops and optimizing harvest timing."
    },
    "Virtual Classrooms": {
        title: "Virtual Classrooms",
        explanation: "Virtual classroom technology enables remote learning through video conferencing, interactive whiteboards, and collaborative tools. These platforms support synchronous and asynchronous instruction with engagement analytics.",
        piltiValue: "PiltiSmart delivers enterprise-grade virtual classroom solutions with low-latency streaming, breakout room capabilities, and integrated assessment tools. Our platform supports hybrid learning models with seamless transitions between physical and digital environments."
    },
    "Smart Attendance": {
        title: "Smart Attendance",
        explanation: "Automated attendance systems use RFID, biometric sensors, or facial recognition to track student presence without manual intervention. These systems provide real-time data for administrative and safety purposes.",
        piltiValue: "PiltiSmart implements privacy-compliant attendance tracking with parent notifications and integration with student information systems. Our solution reduces administrative burden while improving accuracy and enabling early intervention for attendance issues."
    },
    "Student Safety": {
        title: "Student Safety",
        explanation: "Comprehensive student safety systems integrate access control, emergency communication, and real-time monitoring to create secure learning environments. These platforms enable rapid response to incidents and proactive threat detection.",
        piltiValue: "PiltiSmart's safety solutions feature geofencing, panic button integration, and AI-powered anomaly detection. Our platform provides instant alerts to administrators and emergency services while maintaining detailed audit logs for compliance."
    },
    "Learning Analytics": {
        title: "Learning Analytics",
        explanation: "Learning analytics platforms aggregate data from assessments, engagement metrics, and behavioral patterns to provide insights into student performance and instructional effectiveness. This intelligence guides personalized learning strategies.",
        piltiValue: "PiltiSmart delivers comprehensive learning analytics with predictive modeling for at-risk student identification. Our dashboards provide educators with actionable insights while maintaining student privacy and FERPA compliance."
    },
    "Predictive Maintenance": {
        title: "Predictive Maintenance",
        explanation: "Predictive maintenance uses vibration analysis, thermal imaging, and machine learning to forecast equipment failures before they occur. This approach minimizes downtime and extends asset lifespan.",
        piltiValue: "PiltiSmart's predictive maintenance platform integrates with existing SCADA systems to provide real-time equipment health monitoring. Our AI models achieve 95%+ accuracy in failure prediction, reducing unplanned downtime by up to 70%."
    },
    "Operational Visibility": {
        title: "Operational Visibility",
        explanation: "Operational visibility platforms provide real-time dashboards and analytics for manufacturing processes, supply chains, and resource utilization. This transparency enables rapid decision-making and continuous improvement.",
        piltiValue: "PiltiSmart delivers end-to-end operational visibility with customizable KPI dashboards and automated reporting. Our platform integrates with ERP, MES, and PLM systems to provide a unified view of operations across facilities."
    },
    "Safe Production": {
        title: "Safe Production",
        explanation: "Industrial safety systems monitor environmental hazards, equipment status, and worker locations to prevent accidents and ensure regulatory compliance. These platforms provide real-time alerts and incident management capabilities.",
        piltiValue: "PiltiSmart implements comprehensive safety monitoring with gas detection, proximity sensors, and wearable technology integration. Our platform provides automated compliance reporting and predictive risk assessment to maintain zero-incident operations."
    },
    "Asset Tracking": {
        title: "Asset Tracking",
        explanation: "Real-time asset tracking uses RFID, GPS, and BLE technologies to monitor the location and status of equipment, inventory, and vehicles. This visibility optimizes logistics and prevents loss.",
        piltiValue: "PiltiSmart's asset tracking solutions provide sub-meter accuracy with geofencing, automated check-in/out, and maintenance scheduling integration. Our platform supports both indoor and outdoor tracking with seamless handoff between technologies."
    },
    "Ebook Conversion": {
        title: "Ebook Conversion",
        explanation: "Professional ebook conversion transforms manuscripts and print-ready files into optimized digital formats (EPUB, MOBI, PDF) with proper formatting, metadata, and accessibility features. This process ensures compatibility across all reading devices.",
        piltiValue: "PiltiSmart's conversion services maintain typographic fidelity while optimizing for reflowable layouts. Our quality assurance process validates formatting across 50+ device profiles, ensuring a premium reading experience on all platforms."
    },
    "Digital Formatting": {
        title: "Digital Formatting",
        explanation: "Advanced digital formatting applies professional typography, responsive layouts, and interactive elements to digital publications. This expertise ensures visual excellence and reader engagement across devices.",
        piltiValue: "PiltiSmart employs industry-standard formatting workflows with custom CSS styling and accessibility compliance (WCAG 2.1). Our team handles complex layouts including tables, equations, and multimedia integration with precision."
    },
    "Quality Assurance": {
        title: "Quality Assurance",
        explanation: "Comprehensive quality assurance validates digital publications for formatting errors, broken links, accessibility compliance, and device compatibility. This process ensures a flawless reader experience.",
        piltiValue: "PiltiSmart's QA protocol includes automated validation, manual review, and device testing across iOS, Android, Kindle, and web platforms. We guarantee 100% compliance with industry standards and retailer specifications."
    },
    "Direct Distribution": {
        title: "Direct Distribution",
        explanation: "Direct distribution platforms enable publishers to deliver digital content to readers without intermediaries, maximizing revenue and maintaining customer relationships. These systems handle payment processing, DRM, and analytics.",
        piltiValue: "PiltiSmart provides white-label distribution solutions with secure DRM, global payment gateway integration, and comprehensive sales analytics. Our platform supports subscription models, pre-orders, and promotional campaigns with full author control."
    }
};


export default function ServicesPage() {
    const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

    const currentFeature = selectedFeature ? featureDetails[selectedFeature] : null;
    return (
        <div className="pt-12">
            {/* Elite Hero Section */}
            <section className="bg-white py-24 border-b border-border">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-[46px] font-semibold leading-tight text-[#262626] mb-8">
                            Enterprise IoT & Digital Transformation
                        </h1>
                        <p className="text-[18px] text-[#616161] leading-relaxed max-w-2xl">
                            PiltiSmart delivers high-fidelity SMART ecosystems engineered for
                            the world's most demanding environments. We bridge the gap between
                            complex hardware and intuitive digital oversight.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Categorized Service Grid - Uniform Height */}
            <section className="py-24 bg-[#F2F2F2]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white border border-transparent hover:border-[#0078D4] shadow-sm transition-all group flex flex-col h-full"
                            >
                                <div className="aspect-[16/10] w-full relative overflow-hidden border-b border-border">
                                    <img
                                        src={cat.img}
                                        alt={cat.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <div className="bg-white/90 backdrop-blur-sm p-3 shadow-sm">
                                            <cat.icon size={20} className="text-[#0078D4]" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-10 flex flex-col flex-grow">
                                    <h3 className="text-[22px] font-semibold text-[#262626] mb-6 min-h-[66px] flex items-center">
                                        {cat.title}
                                    </h3>
                                    <p className="text-[14px] text-[#616161] mb-8 leading-relaxed flex-grow">
                                        {cat.desc}
                                    </p>

                                    <div className="mt-auto">
                                        <div className="h-px bg-border w-full mb-8" />
                                        <ul className="space-y-4 mb-10">
                                            {cat.features.slice(0, 3).map((f) => (
                                                <li
                                                    key={f}
                                                    onClick={() => setSelectedFeature(f)}
                                                    className="text-[13px] font-medium flex items-center gap-3 cursor-pointer hover:text-[#0078D4] transition-colors group/feature"
                                                >
                                                    <div className="w-1 h-1 bg-[#0078D4] rounded-full group-hover/feature:scale-150 transition-transform" />
                                                    <span className="group-hover/feature:underline">{f}</span>
                                                    <Info size={12} className="opacity-0 group-hover/feature:opacity-100 transition-opacity" />
                                                </li>
                                            ))}
                                        </ul>
                                        <Link
                                            href="/contact"
                                            className="text-[#0078D4] font-semibold text-[13px] hover:underline flex items-center gap-2 group/link"
                                        >
                                            Consult our experts
                                            <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic Ecosystem Section - Premium Layout */}
            <section className="py-32 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div>
                            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0078D4] mb-6 block">
                                Core Competencies
                            </span>
                            <h2 className="text-[36px] font-semibold text-[#262626] mb-10 leading-tight">
                                Strategic Ecosystem Integration
                            </h2>
                            <p className="text-[16px] text-[#616161] mb-16 leading-relaxed max-w-xl">
                                We provide a unified technological framework that bridges the gap between
                                hardware and intelligent oversight. Our ecosystems are engineered for
                                operational resilience and tactical precision.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                                <div className="group">
                                    <BarChart3 className="text-[#0078D4] mb-6 group-hover:scale-110 transition-transform" size={28} />
                                    <h4 className="font-semibold text-[18px] mb-3 text-[#262626]">Predictive Modeling</h4>
                                    <p className="text-[14px] text-[#616161] leading-relaxed">Early-stage anomaly detection with cognitive data insights.</p>
                                </div>
                                <div className="group">
                                    <ShieldCheck className="text-[#0078D4] mb-6 group-hover:scale-110 transition-transform" size={28} />
                                    <h4 className="font-semibold text-[18px] mb-3 text-[#262626]">Defense-in-Depth</h4>
                                    <p className="text-[14px] text-[#616161] leading-relaxed">End-to-end encryption and stringent privacy governance.</p>
                                </div>
                                <div className="group">
                                    <Cloud className="text-[#0078D4] mb-6 group-hover:scale-110 transition-transform" size={28} />
                                    <h4 className="font-semibold text-[18px] mb-3 text-[#262626] uppercase">IIoT Command</h4>
                                    <p className="text-[14px] text-[#616161] leading-relaxed">Centralized oversight of complex decentralized networks.</p>
                                </div>
                                <div className="group">
                                    <Cpu className="text-[#0078D4] mb-6 group-hover:scale-110 transition-transform" size={28} />
                                    <h4 className="font-semibold text-[18px] mb-3 text-[#262626]">Adaptive AI</h4>
                                    <p className="text-[14px] text-[#616161] leading-relaxed">Situational awareness driven by advanced computer vision.</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-square relative bg-[#F2F2F2] flex items-center justify-center overflow-hidden border border-border">
                                <motion.div
                                    animate={{
                                        rotate: 360,
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{
                                        rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    className="absolute w-[120%] h-[120%] border border-[#0078D4]/5 rounded-full"
                                />
                                <div className="relative z-10 w-4/5 h-4/5 border border-border bg-white shadow-2xl p-12 flex flex-col justify-between">
                                    <div>
                                        <div className="w-12 h-1 bg-[#0078D4] mb-8" />
                                        <h3 className="text-[40px] font-light text-[#262626] mb-2">99.9%</h3>
                                        <p className="text-[12px] uppercase font-bold text-muted-foreground tracking-widest">Uptime Precision</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end border-b border-border pb-2">
                                            <span className="text-[12px] font-medium text-[#616161]">Network Load</span>
                                            <span className="text-[14px] font-bold text-[#0078D4]">Optimal</span>
                                        </div>
                                        <div className="flex justify-between items-end border-b border-border pb-2">
                                            <span className="text-[12px] font-medium text-[#616161]">Encryption Integrity</span>
                                            <span className="text-[14px] font-bold text-[#0078D4]">Military-Grade</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Detail Modal */}
            <AnimatePresence>
                {currentFeature && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedFeature(null)}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl rounded-[2px] relative"
                        >
                            {/* Header */}
                            <div className="sticky top-0 bg-white border-b border-border p-8 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#0078D4]/10 flex items-center justify-center rounded-full">
                                        <Info size={24} className="text-[#0078D4]" />
                                    </div>
                                    <h3 className="text-[24px] font-semibold text-[#262626]">{currentFeature.title}</h3>
                                </div>
                                <button
                                    onClick={() => setSelectedFeature(null)}
                                    className="text-[#616161] hover:text-[#262626] transition-colors"
                                    aria-label="Close modal"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-8">
                                {/* Explanation */}
                                <div>
                                    <h4 className="text-[14px] font-bold uppercase tracking-wider text-[#0078D4] mb-4">What is {currentFeature.title}?</h4>
                                    <p className="text-[15px] text-[#616161] leading-relaxed">
                                        {currentFeature.explanation}
                                    </p>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-border" />

                                {/* PiltiSmart Value */}
                                <div>
                                    <h4 className="text-[14px] font-bold uppercase tracking-wider text-[#0078D4] mb-4">How PiltiSmart Helps</h4>
                                    <p className="text-[15px] text-[#616161] leading-relaxed">
                                        {currentFeature.piltiValue}
                                    </p>
                                </div>

                                {/* CTA */}
                                <div className="pt-6">
                                    <Link
                                        href="/contact"
                                        onClick={() => setSelectedFeature(null)}
                                        className="px-8 py-4 bg-[#0078D4] text-white text-[13px] font-bold uppercase tracking-wider hover:bg-[#0067B8] transition-all flex items-center justify-center gap-2 rounded-[2px] w-full"
                                    >
                                        Consult Our Experts
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
