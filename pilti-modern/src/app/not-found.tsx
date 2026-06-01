"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Compass, Cpu, HelpCircle, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0B0C0E] text-foreground flex items-center justify-center p-6 relative overflow-hidden select-none">
      {/* Premium Ambient Light/Glow Layers */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0078D4]/10 dark:bg-[#0078D4]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00BCF2]/10 dark:bg-[#00BCF2]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern overlay for tech aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Animated Icon / Visual Block */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative inline-block mb-10"
        >
          <div className="absolute inset-0 bg-[#0078D4]/20 blur-2xl rounded-full" />
          <h1 className="text-[120px] md:text-[160px] font-black leading-none bg-gradient-to-r from-[#0078D4] via-[#00BCF2] to-[#0078D4] bg-clip-text text-transparent select-none filter drop-shadow-sm font-sans tracking-tighter">
            404
          </h1>
        </motion.div>

        {/* Text Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-[24px] md:text-[30px] font-bold text-[#262626] dark:text-white tracking-tight">
            Signal Lost in Transit
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#616161] dark:text-[#A0A5B5] max-w-md mx-auto leading-relaxed">
            The page or smart node you are searching for is offline, disconnected, or has migrated to a new URL coordinate. Let&apos;s get you back online.
          </p>
        </motion.div>

        {/* Navigation Quick Links Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto mt-12"
        >
          <Link
            href="/"
            className="flex flex-col items-center p-5 bg-white dark:bg-[#15171C] border border-black/5 dark:border-white/[0.04] rounded-xl hover:border-[#0078D4] dark:hover:border-[#0078D4] hover:shadow-lg dark:hover:shadow-[#0078D4]/5 transition-all group"
          >
            <div className="w-10 h-10 bg-[#0078D4]/5 text-[#0078D4] flex items-center justify-center rounded-full mb-3 group-hover:bg-[#0078D4] group-hover:text-white transition-colors">
              <Home size={18} />
            </div>
            <span className="text-[13px] font-semibold text-[#262626] dark:text-white">Go Home</span>
            <span className="text-[10px] text-[#616161] dark:text-muted-foreground mt-1">Primary hub</span>
          </Link>

          <Link
            href="/services"
            className="flex flex-col items-center p-5 bg-white dark:bg-[#15171C] border border-black/5 dark:border-white/[0.04] rounded-xl hover:border-[#0078D4] dark:hover:border-[#0078D4] hover:shadow-lg dark:hover:shadow-[#0078D4]/5 transition-all group"
          >
            <div className="w-10 h-10 bg-[#0078D4]/5 text-[#0078D4] flex items-center justify-center rounded-full mb-3 group-hover:bg-[#0078D4] group-hover:text-white transition-colors">
              <Compass size={18} />
            </div>
            <span className="text-[13px] font-semibold text-[#262626] dark:text-white">Our Services</span>
            <span className="text-[10px] text-[#616161] dark:text-muted-foreground mt-1">IoT Solutions</span>
          </Link>

          <Link
            href="/smartyapp"
            className="flex flex-col items-center p-5 bg-white dark:bg-[#15171C] border border-black/5 dark:border-white/[0.04] rounded-xl hover:border-[#0078D4] dark:hover:border-[#0078D4] hover:shadow-lg dark:hover:shadow-[#0078D4]/5 transition-all group"
          >
            <div className="w-10 h-10 bg-[#0078D4]/5 text-[#0078D4] flex items-center justify-center rounded-full mb-3 group-hover:bg-[#0078D4] group-hover:text-white transition-colors">
              <Cpu size={18} />
            </div>
            <span className="text-[13px] font-semibold text-[#262626] dark:text-white">SmartyApp™</span>
            <span className="text-[10px] text-[#616161] dark:text-muted-foreground mt-1">Live portal</span>
          </Link>
        </motion.div>

        {/* Footer Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 text-xs"
        >
          <Link href="/help" className="hover:underline inline-flex items-center gap-1 text-[#616161] dark:text-muted-foreground">
            <HelpCircle size={12} /> Contact support grid
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
