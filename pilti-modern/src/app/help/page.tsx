"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Cpu,
    Database,
    HelpCircle,
    Play,
    FileText,
    Search,
    X
} from "lucide-react";

const categories = [
    { id: "users", name: "Users & Registration", icon: Users },
    { id: "devices", name: "Device Management", icon: Cpu },
    { id: "assets", name: "Assets & Organization", icon: Database },
];

const helpTopics = [
    {
        category: "users",
        title: "Register a New User",
        desc: "Step-by-step guide to setting up a new customer account in the Smarty App.",
        videoId: "4TpGpYjktYc",
    },
    {
        category: "users",
        title: "View & Manage Users",
        desc: "Learn how to browse your user list and manage account details.",
        videoId: "v6YhG0hD0og",
    },
    {
        category: "users",
        title: "Update User Details",
        desc: "How to edit user profiles and institutional information.",
        videoId: "fbzkEy5Eqfs",
    },
    {
        category: "users",
        title: "Security & Passwords",
        desc: "Resetting passwords and managing account security credentials.",
        videoId: "9qz8lSEiajc",
    },
    {
        category: "devices",
        title: "Add New Device",
        desc: "Connect your smart hardware to the PiltiSmart platform in seconds.",
        videoId: "skX43IomAHg",
    },
    {
        category: "devices",
        title: "Device Attributes",
        desc: "Configure telemetry and view technical attributes of your devices.",
        videoId: "rJOyBLuA_Z4",
    },
    {
        category: "devices",
        title: "Delete Device",
        desc: "Properly remove devices from your network and clear historical data.",
        videoId: "ebx1EStevi8",
    },
    {
        category: "assets",
        title: "Asset Relation Tree",
        desc: "Visualize the hierarchy and relationships between your smart assets.",
        videoId: "PxwAOg7qWAw",
    },
    {
        category: "assets",
        title: "Add & Edit Assets",
        desc: "Create new asset groups and maintain your organizational structure.",
        videoId: "Uzaq1KlW0Hg",
    },
    {
        category: "assets",
        title: "Dashboard Pinning",
        desc: "Customize your view by pinning critical assets to the main dashboard.",
        videoId: "LDg6OmDHNOY",
    }
];

export default function HelpPage() {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTopics = helpTopics.filter(topic =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="pt-20">
            {/* Header */}
            <section className="bg-white py-24 border-b border-border">
                <div className="container mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-5xl font-black mb-6">How can we help?</h1>
                        <div className="max-w-xl mx-auto relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary-text transition-colors group-focus-within:text-[#0078D4]" size={24} />
                            <input
                                type="text"
                                placeholder="Search for guides, videos, and documentation..."
                                className="w-full pl-16 pr-8 py-5 bg-background rounded-full border border-border focus:outline-none focus:border-[#0078D4] font-medium transition-all shadow-sm focus:shadow-xl focus:shadow-[#0078D4]/5"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Topics Grid */}
            <section className="py-20 bg-background min-h-screen">
                <div className="container mx-auto px-6">
                    {categories.map((cat) => {
                        const catTopics = filteredTopics.filter(t => t.category === cat.id);
                        if (catTopics.length === 0) return null;

                        return (
                            <div key={cat.id} className="mb-20">
                                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-border">
                                    <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                                        <cat.icon size={24} />
                                    </div>
                                    <h2 className="text-3xl font-bold">{cat.name}</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {catTopics.map((topic, i) => (
                                        <motion.div
                                            key={topic.title}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                            className="bg-white p-8 rounded-[32px] border border-border hover:border-accent/30 transition-all hover:shadow-2xl hover:shadow-accent/5 flex flex-col justify-between"
                                        >
                                            <div>
                                                <h3 className="text-xl font-bold mb-4">{topic.title}</h3>
                                                <p className="text-sm text-secondary-text leading-relaxed">
                                                    {topic.desc}
                                                </p>
                                            </div>
                                            <div className="mt-8 flex gap-3">
                                                <button
                                                    onClick={() => setActiveVideo(topic.videoId)}
                                                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-full text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
                                                >
                                                    <Play size={14} fill="currentColor" />
                                                    Watch Video
                                                </button>
                                                <button className="flex-1 px-4 py-3 bg-background text-foreground border border-border rounded-full text-xs font-bold flex items-center justify-center gap-2 hover:bg-border transition-colors">
                                                    <FileText size={14} />
                                                    Doc
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Video Modal */}
            <AnimatePresence>
                {activeVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
                    >
                        <div className="relative w-full max-w-[360px] aspect-[9/16] rounded-[48px] border-[8px] border-white/20 overflow-hidden shadow-2xl bg-black">
                            <button
                                onClick={() => setActiveVideo(null)}
                                className="absolute top-8 right-6 z-10 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors border border-white/10"
                            >
                                <X size={20} />
                            </button>
                            <iframe
                                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                                className="w-full h-full border-none"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Contact Support */}
            <section className="py-32 bg-white text-center">
                <div className="container mx-auto px-6">
                    <HelpCircle size={64} className="mx-auto text-accent mb-8" />
                    <h2 className="text-4xl font-bold mb-6">Still need assistance?</h2>
                    <p className="text-secondary-text mb-12 max-w-xl mx-auto">
                        Our technical support team is available 24/7 for complex edge-device
                        provisioning and enterprise registry questions.
                    </p>
                    <Link
                        href="/contact"
                        className="px-12 py-5 bg-accent text-white rounded-full font-black hover:bg-accent/90 transition-all inline-block"
                    >
                        Contact Technical Support
                    </Link>
                </div>
            </section>
        </div>
    );
}
