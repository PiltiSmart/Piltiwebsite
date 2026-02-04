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
    X,
    MonitorSmartphone,
    ArrowRight
} from "lucide-react";

const categories = [
    { id: "users", name: "Users & Registration", icon: Users },
    { id: "devices", name: "Device Management", icon: Cpu },
    { id: "assets", name: "Assets & Organization", icon: Database },
    { id: "products", name: "Products", icon: Play },
    { id: "registry", name: "Device Registry", icon: FileText },
];

const helpTopics = [
    {
        category: "users",
        title: "Register a New User",
        desc: "Step-by-step guide to setting up a new customer account in the Smarty App.",
        videoId: "4TpGpYjktYc",
        docPath: "/help/Users/newCustomerRegistration.html"
    },
    {
        category: "users",
        title: "View Users",
        desc: "Learn how to browse your user list and manage account details.",
        videoId: "v6YhG0hD0og",
        docPath: "/help/Users/viewUsers.html"
    },
    {
        category: "users",
        title: "Update User Details",
        desc: "How to edit user profiles and institutional information.",
        videoId: "fbzkEy5Eqfs",
        docPath: "/help/Users/viewUsers.html"
    },
    {
        category: "users",
        title: "Add or Update User Photo",
        desc: "Quickly upload or change profile pictures for account identification.",
        videoId: "QbElXdgjqz8",
        docPath: "/help/Users/changePhoto.html"
    },
    {
        category: "users",
        title: "Change Password",
        desc: "Securely update your account credentials and passwords.",
        videoId: "mqp1iBb5hKs",
        docPath: "/help/Users/changePassword.html"
    },
    {
        category: "users",
        title: "Forgot Password",
        desc: "Recover access to your account if you've lost your credentials.",
        videoId: "fbzkEy5Eqfs",
        docPath: "/help/Users/forgotPassword.html"
    },
    {
        category: "users",
        title: "View User Actions",
        desc: "Audit logs showing individual user activity and system interactions.",
        videoId: "H3BGDTcf52c",
        docPath: "/help/Users/viewUsersAuditLogs.html"
    },
    {
        category: "users",
        title: "Add User/Member",
        desc: "Grant access to new team members or family within your organization.",
        videoId: "hu-lMYci6Iw",
        docPath: "/help/Users/addUser.html"
    },
    {
        category: "users",
        title: "Change User Status",
        desc: "Enable, disable, or modify permissions for existing platform users.",
        videoId: "JFQnciO20Hg",
        docPath: "/help/Users/changeUserStatus.html"
    },
    {
        category: "users",
        title: "View Customer Actions",
        desc: "Detailed audit logs for high-level customer account operations.",
        videoId: "_zi2o_afp7s",
        docPath: "/help/Users/viewCustomerAuditLogs.html"
    },
    {
        category: "devices",
        title: "Add Device",
        desc: "Connect your smart hardware to the PiltiSmart platform in seconds.",
        videoId: "skX43IomAHg",
        docPath: "/help/Devices/addDevice.html"
    },
    {
        category: "devices",
        title: "View Device Attributes",
        desc: "Manage and configure technical attributes for your smart devices.",
        videoId: "rJOyBLuA_Z4",
        docPath: "/help/Devices/viewAttributes.html"
    },
    {
        category: "devices",
        title: "View Device Telemetry",
        desc: "Real-time monitoring and historical data analysis for device performance.",
        videoId: "5hu9iMQuHnY",
        docPath: "/help/Devices/viewTelemetry.html"
    },
    {
        category: "devices",
        title: "Delete Device",
        desc: "Properly remove devices from your network and clear historical data.",
        videoId: "ebx1EStevi8",
        docPath: "/help/Devices/deleteDevice.html"
    },
    {
        category: "assets",
        title: "View Asset Relation Tree",
        desc: "Visualize the hierarchy and relationships between your smart assets.",
        videoId: "PxwAOg7qWAw",
        docPath: "/help/Assets/viewTree.html"
    },
    {
        category: "assets",
        title: "Add Asset",
        desc: "Create new asset groups and maintain your organizational structure.",
        videoId: "Uzaq1KlW0Hg",
        docPath: "/help/Assets/addAsset.html"
    },
    {
        category: "assets",
        title: "Edit Asset",
        desc: "Modify asset properties, names, and hierarchical placements.",
        videoId: "hjhLkFbKATk",
        docPath: "/help/Assets/editAssets.html"
    },
    {
        category: "assets",
        title: "Dashboard Pinning",
        desc: "Customize your view by pinning critical assets to the main dashboard.",
        videoId: "LDg6OmDHNOY",
        docPath: "/help/Assets/pinUnpin.html"
    },
    {
        category: "assets",
        title: "Delete Asset",
        desc: "Safely remove assets and their associated relationships from the system.",
        videoId: "Aqk2Ttf9cv8",
        docPath: "/help/Assets/deleteAsset.html"
    },
    {
        category: "products",
        title: "View Products List",
        desc: "Browse and manage the full catalog of products in your inventory.",
        videoId: "JSl06tm1k_w",
        docPath: "/help/Products/viewProducts.html"
    },
    {
        category: "products",
        title: "Purchasing Products",
        desc: "Step-by-step guide to purchasing and acquiring new products within the app.",
        videoId: "JSl06tm1k_w",
        docPath: "/help/Products/buyProduct.html"
    },
    {
        category: "registry",
        title: "View Device Registry",
        desc: "Check the master registration details for all provisioned hardware.",
        videoId: "voo7uNpdM2Q",
        docPath: "/help/registry/viewRegistryEntries.html"
    },
    {
        category: "registry",
        title: "Create Registry Entry",
        desc: "Manually register new devices into the central hardware database.",
        videoId: "GeP5RNUiCSo",
        docPath: "/help/registry/addRegistryEntry.html"
    },
    {
        category: "registry",
        title: "Delete Registry Entry",
        desc: "Remove hardware registration records from the device registry.",
        videoId: "rii-EQaKhV0",
        docPath: "/help/registry/deleteRegistryEntry.html"
    }
];

export default function HelpPage() {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [activeDoc, setActiveDoc] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTopics = helpTopics.filter(topic =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="pt-12">
            {/* Elite Support Hero */}
            <section className="bg-white py-24 border-b border-border">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-[46px] font-semibold leading-tight text-[#262626] mb-8">
                            Knowledge Base & Support Center
                        </h1>
                        <div className="max-w-2xl relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#616161] group-focus-within:text-[#0078D4] transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search technical guides, video tutorials, and documentation..."
                                className="w-full pl-16 pr-8 py-5 bg-[#F2F2F2] border border-transparent focus:bg-white focus:border-[#0078D4] text-[15px] font-medium transition-all outline-none rounded-[2px]"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* App Requirement Notice - Lite & Multi-platform */}
                        <div className="mt-10 p-6 bg-[#F2F2F2]/50 border border-border/50 flex flex-col md:flex-row items-center justify-between gap-6 rounded-[2px]">
                            <div className="flex items-center gap-5">
                                <div className="w-10 h-10 bg-[#0078D4]/10 text-[#0078D4] flex items-center justify-center rounded-full shrink-0">
                                    <MonitorSmartphone size={20} />
                                </div>
                                <div>
                                    <h3 className="text-[16px] font-semibold text-[#262626] mb-1">Smarty App Available</h3>
                                    <p className="text-[13px] text-[#616161] max-w-xl leading-relaxed">
                                        To manage your smart ecosystem and execute these operations, the Smarty App is available across all platforms.
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/download"
                                className="px-6 py-3 bg-[#0078D4] text-white text-[12px] font-bold uppercase tracking-wider hover:bg-[#0067B8] transition-all flex items-center gap-2 rounded-[2px] whitespace-nowrap"
                            >
                                Get the App
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Enterprise Documentation Grid */}
            <section className="py-24 bg-[#F2F2F2] min-h-screen">
                <div className="container mx-auto px-6">
                    {categories.map((cat) => {
                        const catTopics = filteredTopics.filter(t => t.category === cat.id);
                        if (catTopics.length === 0) return null;

                        return (
                            <div key={cat.id} className="mb-24 last:mb-0">
                                <div className="flex items-center gap-4 mb-12 border-b border-border pb-6">
                                    <div className="w-10 h-10 bg-[#0078D4]/5 text-[#0078D4] flex items-center justify-center">
                                        <cat.icon size={22} />
                                    </div>
                                    <h2 className="text-[24px] font-semibold text-[#262626] uppercase tracking-wider">{cat.name}</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {catTopics.map((topic, i) => (
                                        <motion.div
                                            key={topic.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                            className="bg-white border border-transparent hover:border-[#0078D4]/30 shadow-sm transition-all flex flex-col h-full group"
                                        >
                                            <div className="p-10 flex flex-col flex-grow">
                                                <h3 className="text-[20px] font-semibold text-[#262626] mb-4 group-hover:text-[#0078D4] transition-colors">
                                                    {topic.title}
                                                </h3>
                                                <p className="text-[14px] text-[#616161] leading-relaxed mb-auto">
                                                    {topic.desc}
                                                </p>

                                                <div className="mt-10 flex border-t border-border pt-8 gap-4">
                                                    <button
                                                        onClick={() => setActiveVideo(topic.videoId)}
                                                        className="flex-1 px-4 py-3 bg-[#EE3322] text-white text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-[#CC0000] transition-colors rounded-[2px]"
                                                    >
                                                        <Play size={14} fill="currentColor" />
                                                        Video Tutorial
                                                    </button>
                                                    <button
                                                        onClick={() => setActiveDoc(topic.docPath || "")}
                                                        className="flex-1 px-4 py-3 bg-white text-[#262626] border border-border text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-[#F2F2F2] transition-colors rounded-[2px]"
                                                    >
                                                        <FileText size={14} />
                                                        Documentation
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Support Modals (Remained unchanged structurally, but verified for theme alignment) */}
            <AnimatePresence>
                {activeVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
                    >
                        <div className="relative w-full max-w-[360px] aspect-[9/16] rounded-[24px] border-[4px] border-white/10 overflow-hidden shadow-2xl bg-black">
                            <button
                                onClick={() => setActiveVideo(null)}
                                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors border border-white/10"
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

            <AnimatePresence>
                {activeDoc && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
                    >
                        <motion.div
                            initial={{ scale: 0.98, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.98, opacity: 0 }}
                            className="relative w-full h-full max-w-6xl bg-white shadow-2xl border border-white/20 overflow-hidden flex flex-col rounded-[2px]"
                        >
                            <div className="p-6 border-b border-border flex items-center justify-between bg-white sticky top-0 z-20">
                                <div className="flex items-center gap-3 text-[#0078D4]">
                                    <FileText size={20} />
                                    <span className="font-bold text-[14px] uppercase tracking-widest">Documentation Viewer</span>
                                </div>
                                <button
                                    onClick={() => setActiveDoc(null)}
                                    className="w-10 h-10 bg-[#F2F2F2] text-[#262626] flex items-center justify-center hover:bg-border transition-colors border border-border"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="flex-grow bg-[#F2F2F2] overflow-auto">
                                <iframe
                                    src={activeDoc}
                                    className="w-full h-full border-none bg-white"
                                    title="Documentation"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Strategic Support Call-to-Action */}
            <section className="py-32 bg-white text-center">
                <div className="container mx-auto px-6 max-w-2xl">
                    <HelpCircle size={48} className="mx-auto text-[#0078D4] mb-8 opacity-20" />
                    <h2 className="text-[32px] font-semibold text-[#262626] mb-8">Mission-Critical Technical Support</h2>
                    <p className="text-[16px] text-[#616161] mb-12 leading-relaxed">
                        Our specialized engineering team is available Mon-Sat, 10AM-5PM for complex edge-device
                        provisioning and enterprise integration architecture consulting.
                    </p>
                    <Link
                        href="/contact"
                        className="px-12 py-4 bg-[#0078D4] text-white font-semibold hover:bg-[#0067B8] transition-all inline-block rounded-[2px]"
                    >
                        Request Technical Assistance
                    </Link>
                </div>
            </section>
        </div>
    );
}
