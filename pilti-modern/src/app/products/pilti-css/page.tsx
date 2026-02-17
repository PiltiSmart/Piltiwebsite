"use client";
// Force recompile

import React from "react";
import { motion } from "framer-motion";
import {
    Activity,
    ShieldCheck,
    BrainCircuit,
    FileText,
    Server,
    Zap,
    ArrowRight,
    CheckCircle2,
    Lock,
    Stethoscope,
    ExternalLink,
    UploadCloud,
    FileCheck,
    ArrowDown
} from "lucide-react";
import Link from "next/link";

export default function XRayProbeProductPage() {
    return (
        <div className="pt-12 min-h-screen bg-white font-sans">
            {/* Hero Section */}
            <section className="relative bg-white pt-24 pb-20 overflow-hidden border-b border-gray-100">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0078D4]/10 border border-[#0078D4]/20 text-[#0078D4] text-xs font-semibold uppercase tracking-wider mb-6">
                                <Activity size={12} />
                                <span>v2.0.0 Release</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 text-[#262626]">
                                Pilti Clinical <br />
                                <span className="text-[#0078D4]">
                                    Support System
                                </span>
                            </h1>
                            <p className="text-lg text-[#616161] mb-8 leading-relaxed max-w-xl">
                                Advanced diagnostic intelligence for Radiology and Cardiology.
                                Powered by next-gen Vision Transformers and Clinical Consensus Agents.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/contact"
                                    className="px-8 py-3 bg-[#0078D4] hover:bg-[#0067B8] text-white rounded-[2px] font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                                >
                                    Request Demo
                                    <ArrowRight size={16} />
                                </Link>
                                <Link
                                    href="https://pilti-css.piltismart.com/"
                                    target="_blank"
                                    className="px-8 py-3 bg-white hover:bg-gray-50 text-[#0078D4] border border-gray-200 rounded-[2px] font-semibold transition-all flex items-center justify-center gap-2 group shadow-sm"
                                >
                                    Launch Live Platform
                                    <ExternalLink size={16} className="text-[#0078D4] group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
                                <img
                                    src="/img/xray_dashboard_hero.png"
                                    alt="PCSS Dashboard Interface"
                                    className="w-full h-auto"
                                />

                                {/* Floating Stats Cards */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                    className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl border border-gray-100 hidden md:block"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-500/10 rounded-full text-green-600">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-[#616161] uppercase tracking-wider">Accuracy</div>
                                            <div className="text-lg font-bold text-[#262626]">99.2%</div>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1.2, duration: 0.5 }}
                                    className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-xl border border-gray-100 hidden md:block"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/10 rounded-full text-[#0078D4]">
                                            <Zap size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-[#616161] uppercase tracking-wider">Inference</div>
                                            <div className="text-lg font-bold text-[#262626]">&lt; 150ms</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Engines Section */}
            <section className="py-24 bg-[#F2F2F2]">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-semibold text-[#262626] mb-4">
                            Multi-Engine Diagnostic Architecture
                        </h2>
                        <p className="text-[#616161] text-lg">
                            PCSS leverages specialized AI models for different modalities, ensuring
                            precision and reliability in every analysis.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-sm shadow-sm border border-transparent hover:border-[#0078D4] transition-all group">
                            <div className="w-12 h-12 bg-[#0078D4]/10 text-[#0078D4] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <BrainCircuit size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-[#262626] mb-3">
                                Radiology: RAD-DINO
                            </h3>
                            <p className="text-[#616161] text-sm leading-relaxed mb-4">
                                Powered by next-gen Vision Transformers fine-tuned on million-scale datasets.
                                Features 518x518 anatomical heatmaps and Attention Rollout for
                                interpretability.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "Attention Rollout",
                                    "Consensus Agent",
                                    "DenesNet121 + ResNet50"
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-xs font-medium text-[#616161]">
                                        <CheckCircle2 size={12} className="text-[#0078D4]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-sm shadow-sm border border-transparent hover:border-rose-500 transition-all group">
                            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Activity size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-[#262626] mb-3">
                                Cardiology: HuBERT-ECG
                            </h3>
                            <p className="text-[#616161] text-sm leading-relaxed mb-4">
                                Specialized Transformer for digitizing and interpreting paper-based ECG records.
                                Detects arrhythmias and quantifies clinical metrics like HRV and SDNN.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "Paper-to-Digital",
                                    "Arrhythmia Detection",
                                    "NeuroKit2 Integration"
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-xs font-medium text-[#616161]">
                                        <CheckCircle2 size={12} className="text-rose-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-sm shadow-sm border border-transparent hover:border-purple-500 transition-all group">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-[#262626] mb-3">
                                Anomaly Defense
                            </h3>
                            <p className="text-[#616161] text-sm leading-relaxed mb-4">
                                ResNetAE Autoencoder acting as an Out-of-Distribution (OOD) filter.
                                Automatically rejects non-medical images to maintain system integrity and
                                compliance.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "OOD Detection",
                                    "Autoencoder Filter",
                                    "Integrity Checks"
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-xs font-medium text-[#616161]">
                                        <CheckCircle2 size={12} className="text-purple-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features & Security */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-semibold text-[#262626] mb-8">
                                Professional Clinical Suite
                            </h2>
                            <div className="space-y-8">
                                <div className="flex gap-4 group">
                                    <div className="mt-1 p-2 bg-[#0078D4]/5 rounded-lg group-hover:bg-[#0078D4]/10 transition-colors">
                                        <FileText className="text-[#0078D4]" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-[#262626] mb-2">Automated Reporting</h4>
                                        <p className="text-[#616161] text-sm">
                                            Generates high-fidelity PDF clinical reports complete with automated figure captions,
                                            technical appendices, and diagnostic probability charts.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 group">
                                    <div className="mt-1 p-2 bg-[#0078D4]/5 rounded-lg group-hover:bg-[#0078D4]/10 transition-colors">
                                        <Stethoscope className="text-[#0078D4]" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-[#262626] mb-2">Clinician Annotation</h4>
                                        <p className="text-[#616161] text-sm">
                                            Interactive suite allows doctors to mark pathological areas on high-res X-rays
                                            and digitized ECG traces directly within the browser.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 group">
                                    <div className="mt-1 p-2 bg-[#0078D4]/5 rounded-lg group-hover:bg-[#0078D4]/10 transition-colors">
                                        <Lock className="text-[#0078D4]" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-[#262626] mb-2">Enterprise Security</h4>
                                        <p className="text-[#616161] text-sm">
                                            Built with a security-first architecture featuring 24-hour JWT session persistence
                                            and HMAC-SHA256 request signing for all diagnostic payloads.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0078D4]/5 to-purple-500/5 rounded-2xl blur-3xl opacity-50" />
                            <div className="bg-white rounded-2xl p-8 border border-gray-100 relative shadow-xl overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#0078D4] to-purple-600" />
                                <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
                                    <Activity className="text-[#0078D4]" size={18} />
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#616161]">Diagnostic Workflow</span>
                                </div>

                                {/* Functional Flow Diagram */}
                                <div className="relative space-y-8 before:absolute before:left-[19px] before:top-4 before:h-[80%] before:w-0.5 before:bg-gradient-to-b before:from-gray-200 before:to-transparent before:content-['']">
                                    {/* Step 1 */}
                                    <div className="relative flex gap-4 group">
                                        <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0078D4] ring-4 ring-white transition-colors group-hover:bg-[#0078D4] group-hover:text-white">
                                            <UploadCloud size={18} />
                                        </div>
                                        <div className="pt-1">
                                            <h4 className="text-sm font-bold text-[#262626]">Data Ingestion</h4>
                                            <p className="text-xs text-[#616161] mt-1">
                                                Secure DICOM/ECG upload via encrypted gateway.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="relative flex gap-4 group">
                                        <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-50 text-purple-600 ring-4 ring-white transition-colors group-hover:bg-purple-600 group-hover:text-white">
                                            <BrainCircuit size={18} />
                                        </div>
                                        <div className="pt-1">
                                            <h4 className="text-sm font-bold text-[#262626]">AI Analysis</h4>
                                            <p className="text-xs text-[#616161] mt-1">
                                                Multi-model consensus processing (Rad-DINO + HuBERT).
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="relative flex gap-4 group">
                                        <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-4 ring-white transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                                            <FileCheck size={18} />
                                        </div>
                                        <div className="pt-1">
                                            <h4 className="text-sm font-bold text-[#262626]">Clinical Output</h4>
                                            <p className="text-xs text-[#616161] mt-1">
                                                Automated PDF report generation with physician annotations.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <div className="text-xs text-[#616161]">
                                        <span className="font-semibold text-[#262626]">Latency:</span> &lt;150ms
                                    </div>
                                    <div className="text-xs text-[#616161]">
                                        <span className="font-semibold text-[#262626]">Uptime:</span> 99.9%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-[#0B1120] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0078D4]/20 to-purple-900/20 opacity-50" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to upgrade your diagnostic workflow?</h2>
                    <p className="text-slate-300 mb-10 max-w-2xl mx-auto">
                        Join leading healthcare institutions leveraging PCSS for faster, more accurate diagnostics.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#0078D4] hover:bg-[#0067B8] text-white rounded-[2px] font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl"
                    >
                        Contact Sales Team
                    </Link>
                </div>
            </section>
        </div>
    );
}
