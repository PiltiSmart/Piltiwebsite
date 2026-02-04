"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Zap, ShoppingCart } from "lucide-react";

const products = [
    {
        name: "SmartySwitch",
        features: ["Mobile App", "Voice Control", "Power Monitor", "Fault Prediction", "Alert Notifications"],
        status: "Coming Soon"
    },
    {
        name: "SmartyTalkCamera",
        features: ["Voice Greetings", "Video Recordings", "Mobile App", "Motion Detection", "Animals Alerts"],
        status: "Coming Soon"
    },
    {
        name: "SmartyGateway",
        features: ["Local Storage", "BLE support", "Battery Support", "Up to 10 Device support", "Offline data collection"],
        status: "Coming Soon"
    },
    {
        name: "SmartyCompTV - L1",
        features: ["Computer on TV", "Video Calling", "Word/Excel/PowerPoint", "Mobile App", "Linux OS"],
        status: "Coming Soon"
    }
];

const services = [
    {
        name: "Smart Home",
        features: ["Smart Lighting", "Energy Optimisation", "Temperature Control", "Safety Hazards Detection", "Early Fault detections"]
    },
    {
        name: "Smart Office",
        features: ["Smart Lighting", "Energy Optimisation", "Temperature Control", "Safety Hazards Detection", "Indoor Air Monitoring"]
    },
    {
        name: "Smart Farming",
        features: ["Cost & Waste Reduction", "Climate Monitoring", "Greenhouse Automation", "Precision Farming", "Animals Alerts"]
    },
    {
        name: "Smart Schools",
        features: ["Automated Attendance", "Wireless Door Locks", "Noise Optimisation", "Digital ID Cards", "Robotic Education"]
    }
];

export default function PricingPage() {
    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-5xl md:text-7xl font-black mb-6">Pricing & Plans</h1>
                        <p className="text-secondary-text max-w-2xl mx-auto text-lg leading-relaxed">
                            Transparent solutions for a smarter future. We&apos;re currently working
                            hard to bring our products to market.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Products */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-4 mb-12">
                        <Zap className="text-accent" size={32} />
                        <h2 className="text-4xl font-bold">Hardware Products</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product, i) => (
                            <motion.div
                                key={product.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 rounded-[32px] border border-border hover:border-accent/30 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold mb-6">{product.name}</h3>
                                    <ul className="space-y-4 mb-8">
                                        {product.features.map(f => (
                                            <li key={f} className="flex items-start gap-3 text-sm text-secondary-text">
                                                <Check size={16} className="text-accent mt-0.5" />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button className="w-full py-4 bg-background text-foreground rounded-full font-bold opacity-50 cursor-not-allowed">
                                    {product.status}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-4 mb-12">
                        <ShoppingCart className="text-accent" size={32} />
                        <h2 className="text-4xl font-bold">Ecosystem Services</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, i) => (
                            <motion.div
                                key={service.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-[32px] bg-background border border-border group hover:border-accent transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold mb-6">{service.name}</h3>
                                    <ul className="space-y-4 mb-8">
                                        {service.features.map(f => (
                                            <li key={f} className="flex items-start gap-3 text-sm text-secondary-text">
                                                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5" />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button className="w-full py-4 bg-white text-foreground border border-border rounded-full font-bold hover:bg-background transition-all">
                                    Inquire Now
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
