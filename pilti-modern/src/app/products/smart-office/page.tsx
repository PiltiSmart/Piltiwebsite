"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Users,
  Lightbulb,
  Cpu,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  Building
} from "lucide-react";
import Link from "next/link";

interface Room {
  id: string;
  name: string;
  occupied: boolean;
  activeLoad: number; // Watts when occupied
  standbyLoad: number; // Watts when vacant
}

export default function SmartOfficeProductPage() {
  // Simulator States
  const [rooms, setRooms] = useState<Room[]>([
    { id: "open", name: "Main Open Workspace", occupied: true, activeLoad: 1200, standbyLoad: 150 },
    { id: "conf", name: "Executive Conference Room", occupied: false, activeLoad: 450, standbyLoad: 40 },
    { id: "lounge", name: "Cafeteria & Staff Lounge", occupied: true, activeLoad: 800, standbyLoad: 90 }
  ]);
  const [isStoreRedirectOpen, setIsStoreRedirectOpen] = useState(false);

  // Toggle room occupancy status
  const toggleRoom = (id: string) => {
    setRooms(prev => prev.map(room => 
      room.id === id ? { ...room, occupied: !room.occupied } : room
    ));
  };

  // Calculations
  const totalOccupied = rooms.filter(r => r.occupied).length;
  const activePower = rooms.reduce((sum, r) => sum + (r.occupied ? r.activeLoad : r.standbyLoad), 0);
  const maxPotentialPower = rooms.reduce((sum, r) => sum + r.activeLoad, 0);
  const baseSavings = maxPotentialPower - activePower;
  const savingsPercent = Math.round((baseSavings / maxPotentialPower) * 100);

  return (
    <div className="pt-12 min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative bg-white pt-24 pb-20 overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0078D4]/10 border border-[#0078D4]/20 text-[#0078D4] text-xs font-semibold uppercase tracking-wider mb-6">
                <Briefcase size={12} />
                <span>Adaptive Corporate Infrastructure</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 text-[#262626]">
                Adaptive Workplace <br />
                <span className="text-[#0078D4]">Calibration Systems</span>
              </h1>
              <p className="text-lg text-[#616161] mb-8 leading-relaxed max-w-xl">
                Optimize workplace occupancy, streamline utility utilization, and automate HVAC climate grids in real-time. Maximize operational budget savings with data-driven insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsStoreRedirectOpen(true)}
                  className="px-8 py-3 bg-[#0078D4] hover:bg-[#0067B8] text-white rounded-[2px] font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Order Sensor Grid Pack
                  <ArrowRight size={16} />
                </button>
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-white hover:bg-gray-50 text-[#0078D4] border border-gray-200 rounded-[2px] font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Consult Commercial Planner
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-2xl border border-gray-100 bg-[#F6F6F6] p-4 shadow-xl"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-xl bg-white shadow-inner flex items-center justify-center p-6 relative">
                <img
                  src="/img/premium_smart_office.png"
                  alt="Enterprise Smart Office"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-1">Corporate Automation Mesh</h3>
                    <p className="text-xs opacity-90">Centralized presence nodes adjusting utilities based on workspace occupancy.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section className="py-24 bg-[#F2F2F2]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0078D4] mb-3 block">Interactive Simulator</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#262626] mb-4">
              Occupancy presence & energy calibrator
            </h2>
            <p className="text-[#616161] text-md">
              Toggle the presence status in each office room below. PiltiSmart&apos;s adaptive sensors instantly scale down utility loads in vacant rooms, displaying real-time power conservation curves and resource savings ratio.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Control Panel (6 cols) */}
            <div className="lg:col-span-6 bg-white p-8 rounded-sm shadow-sm border border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
                  <h3 className="text-lg font-bold text-[#262626] flex items-center gap-2">
                    <Building size={18} className="text-[#0078D4]" />
                    Presence Layout Control
                  </h3>
                  <span className="text-[10px] font-bold uppercase bg-slate-100 px-2 py-0.5 text-slate-700 tracking-wider">
                    {totalOccupied} of {rooms.length} Rooms Occupied
                  </span>
                </div>

                {/* Rooms Grid */}
                <div className="space-y-4">
                  {rooms.map((room) => (
                    <div
                      key={room.id}
                      onClick={() => toggleRoom(room.id)}
                      className={`p-5 border rounded-sm transition-all flex items-center justify-between cursor-pointer group select-none ${
                        room.occupied
                          ? "border-[#0078D4] bg-[#0078D4]/5 shadow-sm"
                          : "border-border bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors ${
                          room.occupied
                            ? "bg-[#0078D4] text-white"
                            : "bg-gray-100 text-slate-400 group-hover:bg-gray-200"
                        }`}>
                          <Users size={18} />
                        </div>
                        <div>
                          <h4 className="text-[15px] font-bold text-[#262626]">{room.name}</h4>
                          <p className="text-[11px] text-[#616161] mt-0.5">
                            {room.occupied
                              ? `Active Grid Load: ${room.activeLoad}W`
                              : `Eco-Standby Mode: ${room.standbyLoad}W`
                            }
                          </p>
                        </div>
                      </div>

                      {/* Pill toggle */}
                      <div className={`w-12 h-6 rounded-full p-0.5 transition-colors ${
                        room.occupied ? "bg-[#0078D4]" : "bg-gray-200"
                      } flex items-center`}>
                        <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${
                          room.occupied ? "translate-x-6" : "translate-x-0"
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eco calibration specs */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-4 text-xs text-[#616161] font-medium">
                <span className="flex items-center gap-1.5"><Lightbulb size={14} className="text-amber-500" /> Auto Dim Standby</span>
                <span className="flex items-center gap-1.5"><TrendingDown size={14} className="text-emerald-500" /> HVAC Calibration</span>
              </div>
            </div>

            {/* Diagnostics Panel (6 cols) */}
            <div className="lg:col-span-6 bg-white p-8 rounded-sm shadow-sm border border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
                  <h3 className="text-lg font-bold text-[#262626] flex items-center gap-2">
                    <TrendingDown size={18} className="text-[#0078D4]" />
                    Real-time Savings Overview
                  </h3>
                  <span className="text-[11px] font-semibold text-[#616161]">
                    Energy Calibration Engine
                  </span>
                </div>

                {/* Savings dashboard visuals */}
                <div className="py-6 flex flex-col items-center justify-center relative overflow-hidden bg-slate-50 border border-slate-100 rounded-sm">
                  {/* Absolute glowing accent */}
                  <div className="absolute inset-0 bg-[#0078D4]/5 blur-3xl rounded-sm -z-10" />

                  {/* Circular Dial for Savings Ratio */}
                  <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                    <svg className="absolute w-full h-full transform -rotate-90">
                      <circle cx="80" cy="80" r="70" stroke="#E5E7EB" strokeWidth="12" fill="transparent" />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#0078D4"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 70}
                        strokeDashoffset={(2 * Math.PI * 70) - (savingsPercent / 100) * (2 * Math.PI * 70)}
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                    <div className="z-10 flex flex-col items-center">
                      <span className="text-4xl font-black text-[#262626] transition-all">{savingsPercent}%</span>
                      <span className="text-[10px] uppercase font-bold text-[#616161] tracking-widest mt-1">Utility Savings</span>
                    </div>
                  </div>

                  {/* Data counters */}
                  <div className="w-full px-8 grid grid-cols-2 gap-6 text-center border-t border-slate-100 pt-6">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#616161] block mb-1">Active Office Load</span>
                      <span className="text-lg font-black text-[#262626] transition-all">{activePower} W</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#616161] block mb-1">Max Potential Load</span>
                      <span className="text-lg font-black text-[#616161]">{maxPotentialPower} W</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Console logs */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <span className="text-[10px] uppercase font-bold text-[#616161] block mb-2">HVAC Command Log</span>
                <div className="bg-[#111111] text-slate-400 font-mono text-[11px] p-4 rounded-sm space-y-1 h-[80px] overflow-y-auto">
                  <div>[SYS] Adaptive Presence Node v1.8 active.</div>
                  {rooms.map(room => (
                    <div key={room.id} className={room.occupied ? "text-slate-400" : "text-emerald-500"}>
                      [CAL] {room.name}: {room.occupied ? "Occupied. Utility load 100% active." : "Vacant. HVAC calibrated to Eco (setpoint 24°C)."}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0078D4] mb-3 block">Product Features</span>
            <h2 className="text-3xl font-semibold text-[#262626] mb-6">Optimized Commercial Performance</h2>
            <p className="text-[#616161] text-md leading-relaxed">
              Decentralized occupancy sensing networks engineered to scale operational budget savings in modern business environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 border border-border rounded-sm hover:border-[#0078D4] transition-colors group">
              <Users className="text-[#0078D4] mb-6 group-hover:scale-105 transition-transform" size={32} />
              <h3 className="text-xl font-semibold mb-4 text-[#262626]">Privacy-Compliant Tracking</h3>
              <p className="text-sm text-[#616161] leading-relaxed">
                Uses edge-based thermal imaging and passive infrared (PIR) mesh nodes to track zone utilization with 100% security, guaranteeing corporate regulatory compliance.
              </p>
            </div>

            <div className="p-8 border border-border rounded-sm hover:border-[#0078D4] transition-colors group">
              <Lightbulb className="text-[#0078D4] mb-6 group-hover:scale-105 transition-transform" size={32} />
              <h3 className="text-xl font-semibold mb-4 text-[#262626]">Intelligent Lighting Dim</h3>
              <p className="text-sm text-[#616161] leading-relaxed">
                Automatically dims lighting to 10% standby in unoccupied zones, and brightens instantaneously on presence detection, keeping productivity high and utility costs low.
              </p>
            </div>

            <div className="p-8 border border-border rounded-sm hover:border-[#0078D4] transition-colors group">
              <ShieldCheck className="text-[#0078D4] mb-6 group-hover:scale-105 transition-transform" size={32} />
              <h3 className="text-xl font-semibold mb-4 text-[#262626]">Automated HVAC Calibration</h3>
              <p className="text-sm text-[#616161] leading-relaxed">
                Adjusts HVAC temperature setpoints in real-time in vacant rooms, avoiding unnecessary heating or cooling and reducing peak load utility demands by up to 50%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Table */}
      <section className="py-20 bg-gray-50 border-t border-b">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-center text-[#262626] mb-12">Corporate Node Specifications</h2>
          <div className="bg-white border border-border rounded-sm overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b border-border">
                  <th className="p-4 font-bold text-[#262626]">Parameter</th>
                  <th className="p-4 font-bold text-[#262626]">Specification Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-[#616161]">
                <tr>
                  <td className="p-4 font-semibold text-[#262626]">Sensing Method</td>
                  <td className="p-4">Passive Infrared (PIR) + Local Edge Thermal Matrix (Privacy-Compliant)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#262626]">Coverage Area</td>
                  <td className="p-4">Up to 80 sq. meters per sensor grid node</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#262626]">Power Consumption</td>
                  <td className="p-4">&lt;0.5 Watts (Ultra-low standby consumption)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#262626]">Connectivity</td>
                  <td className="p-4">Zigbee 3.0 / Matter Mesh with local gateway redundancy</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0B1120] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0078D4]/20 to-transparent opacity-50" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Revolutionize your corporate grid footprint today</h2>
          <p className="text-slate-300 mb-10 max-w-2xl mx-auto">
            Order your custom presence sensor pack or coordinate with our specialists to audit your workspace footprint.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsStoreRedirectOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0078D4] hover:bg-[#0067B8] text-white rounded-[2px] font-bold uppercase tracking-wider transition-all shadow-lg"
            >
              Order Sensor Grid Pack
              <ExternalLink size={16} />
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-[2px] font-bold uppercase tracking-wider transition-all border border-white/20"
            >
              Contact Solutions Team
            </Link>
          </div>
        </div>
      </section>

      {/* Store Redirect Interception Modal */}
      <AnimatePresence>
        {isStoreRedirectOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsStoreRedirectOpen(false)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-md w-full p-8 shadow-2xl rounded-[2px] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0078D4] to-[#00BCF2]" />

              <div className="flex items-center gap-4 mb-6 text-[#0078D4]">
                <div className="w-12 h-12 bg-[#0078D4]/5 flex items-center justify-center rounded-full">
                  <ExternalLink size={24} />
                </div>
                <h3 className="text-[20px] font-bold text-[#262626]">Redirecting to PiltiStore</h3>
              </div>

              <p className="text-[14px] text-[#616161] leading-relaxed mb-8">
                You are now leaving piltismart.com and being redirected to our official commerce platform, <span className="font-semibold text-[#262626]">PiltiStore</span>, powered by **Bagisto**.
                Your hardware checkout session will continue in a secure window.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://piltistore.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsStoreRedirectOpen(false)}
                  className="flex-1 bg-[#0078D4] text-white px-6 py-3 text-[13px] font-bold uppercase tracking-wider hover:bg-[#0067B8] transition-all flex items-center justify-center gap-2 rounded-[2px]"
                >
                  Continue to Store
                  <ArrowRight size={16} />
                </a>
                <button
                  onClick={() => setIsStoreRedirectOpen(false)}
                  className="flex-1 bg-[#F2F2F2] text-[#262626] px-6 py-3 text-[13px] font-bold uppercase tracking-wider hover:bg-[#E5E5E5] transition-all rounded-[2px]"
                >
                  Stay on PiltiSmart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
