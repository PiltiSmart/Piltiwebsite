"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout,
  Droplet,
  Thermometer,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Sun,
  Timer
} from "lucide-react";
import Link from "next/link";

export default function SmartFarmingProductPage() {
  // Simulator States
  const [moisture, setMoisture] = useState(42); // Soil Moisture %
  const [nitrogen, setNitrogen] = useState(140); // mg/kg
  const [temp, setTemp] = useState(24.5); // Celsius
  const [isIrrigating, setIsIrrigating] = useState(false);
  const [isStoreRedirectOpen, setIsStoreRedirectOpen] = useState(false);

  const irrigationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Closed-loop irrigation simulator logic
  useEffect(() => {
    if (moisture < 30 && !isIrrigating) {
      setIsIrrigating(true);
    }
  }, [moisture, isIrrigating]);

  useEffect(() => {
    if (isIrrigating) {
      irrigationTimerRef.current = setInterval(() => {
        setMoisture(prev => {
          if (prev >= 65) {
            setIsIrrigating(false);
            if (irrigationTimerRef.current) clearInterval(irrigationTimerRef.current);
            return 65;
          }
          return prev + 3; // Replenish moisture
        });
      }, 500);
    } else {
      if (irrigationTimerRef.current) clearInterval(irrigationTimerRef.current);
    }

    return () => {
      if (irrigationTimerRef.current) clearInterval(irrigationTimerRef.current);
    };
  }, [isIrrigating]);

  // Handle manual moisture slider
  const handleMoistureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isIrrigating) return; // Prevent manual change while active irrigation is running
    setMoisture(parseInt(e.target.value));
  };

  // SVG parameters for circular dials
  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;

  const getStrokeDashoffset = (val: number, max: number) => {
    const percentage = Math.min(100, Math.max(0, (val / max) * 100));
    return circumference - (percentage / 100) * circumference;
  };

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
                <Sprout size={12} />
                <span>Precision Agronomy IoT</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 text-[#262626]">
                Maximizing Yields <br />
                <span className="text-[#0078D4]">With Agricultural IoT</span>
              </h1>
              <p className="text-lg text-[#616161] mb-8 leading-relaxed max-w-xl">
                Deploy smart moisture sensing grids, automate remote water gate valves, and capture hyperlocal weather intelligence in real-time. Optimize resources and maximize yield.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsStoreRedirectOpen(true)}
                  className="px-8 py-3 bg-[#0078D4] hover:bg-[#0067B8] text-white rounded-[2px] font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Order Soil Sensor Pack
                  <ArrowRight size={16} />
                </button>
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-white hover:bg-gray-50 text-[#0078D4] border border-gray-200 rounded-[2px] font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Consult Agronomy Team
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
                  src="/img/smart_farming.jpg"
                  alt="Precision Smart Farming IoT"
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/img/landing_smart_farming.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-1">Precision Cultivation Grid</h3>
                    <p className="text-xs opacity-90">Wireless mesh node tracking soil matrix indicators across broad acreage.</p>
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
              Closed-Loop Hydration Command Center
            </h2>
            <p className="text-[#616161] text-md">
              Slide the slider to simulate soil moisture dropping. Once it goes below **30%**, PiltiSmart&apos;s automatic closed-loop irrigation system activates, replenishing the moisture level back to optimal status.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Control Panel (5 cols) */}
            <div className="lg:col-span-5 bg-white p-8 rounded-sm shadow-sm border border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
                  <h3 className="text-lg font-bold text-[#262626] flex items-center gap-2">
                    <Cpu size={18} className="text-[#0078D4]" />
                    Soil Calibration Panel
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-[2px] text-[10px] font-bold uppercase tracking-wider ${
                    isIrrigating
                      ? "bg-sky-100 text-sky-700 animate-pulse"
                      : moisture < 40
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {isIrrigating ? "IRRIGATING ACTIVE" : moisture < 40 ? "LOW HYDRATION" : "HYDRATION STABLE"}
                  </span>
                </div>

                {/* Automation Alert */}
                <AnimatePresence>
                  {isIrrigating && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-sky-50 border border-sky-200 p-4 rounded-[4px] mb-6 flex items-start gap-3"
                    >
                      <Droplet className="text-[#0078D4] shrink-0 mt-0.5 animate-bounce" size={18} />
                      <div>
                        <h4 className="text-xs font-bold text-sky-800">AUTOMATIC SOLENOID VALVE OPEN</h4>
                        <p className="text-[11px] text-sky-700 mt-1">
                          Moisture fell below threshold limit (&lt; 30%). Smart water gateway opened the solenoid valve. Replenishing soil hydration.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Slide Moisture Adjustment */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-[#616161]">Simulate Soil Depletion (Moisture %)</span>
                    <span className="text-sm font-bold text-[#262626]">{moisture}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="80"
                    disabled={isIrrigating}
                    value={moisture}
                    onChange={handleMoistureChange}
                    className="w-full accent-[#0078D4] disabled:opacity-50 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#616161] mt-1 font-medium">
                    <span>Critical Dry (15%)</span>
                    <span className="text-sky-600 font-bold">Irrigation Trigger Threshold (&lt; 30%)</span>
                  </div>
                </div>

                {/* Additional Agronomy Inputs */}
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <div>
                    <div className="flex justify-between text-xs text-[#616161] font-semibold mb-1">
                      <span>Ambient Temperature</span>
                      <span>{temp.toFixed(1)} °C</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="40"
                      step="0.5"
                      value={temp}
                      onChange={(e) => setTemp(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-[#616161] font-semibold mb-1">
                      <span>Nitrogen Level (N)</span>
                      <span>{nitrogen} mg/kg</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="250"
                      value={nitrogen}
                      onChange={(e) => setNitrogen(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Dials Gauge (7 cols) */}
            <div className="lg:col-span-7 bg-white p-8 rounded-sm shadow-sm border border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
                  <h3 className="text-lg font-bold text-[#262626] flex items-center gap-2">
                    <Droplet size={18} className="text-[#0078D4]" />
                    Soil Telemetry Indicators
                  </h3>
                  <span className="text-[11px] font-semibold text-[#616161] flex items-center gap-1">
                    <Timer size={12} /> Live telemetry stream
                  </span>
                </div>

                {/* Telemetry Dials Grid */}
                <div className="grid grid-cols-3 gap-6 py-6 text-center">
                  {/* Dial 1: Moisture */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <svg className="absolute w-full h-full transform -rotate-90">
                        <circle cx="56" cy="56" r={radius} stroke="#F2F2F2" strokeWidth={strokeWidth} fill="transparent" />
                        <circle
                          cx="56"
                          cy="56"
                          r={radius}
                          stroke="#0078D4"
                          strokeWidth={strokeWidth}
                          fill="transparent"
                          strokeDasharray={circumference}
                          strokeDashoffset={getStrokeDashoffset(moisture, 100)}
                          className="transition-all duration-300"
                        />
                      </svg>
                      <div className="z-10 flex flex-col items-center">
                        <span className="text-xl font-black text-[#262626]">{moisture}%</span>
                        <span className="text-[9px] uppercase font-bold text-[#616161]">Moisture</span>
                      </div>
                    </div>
                  </div>

                  {/* Dial 2: Temperature */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <svg className="absolute w-full h-full transform -rotate-90">
                        <circle cx="56" cy="56" r={radius} stroke="#F2F2F2" strokeWidth={strokeWidth} fill="transparent" />
                        <circle
                          cx="56"
                          cy="56"
                          r={radius}
                          stroke="#F59E0B"
                          strokeWidth={strokeWidth}
                          fill="transparent"
                          strokeDasharray={circumference}
                          strokeDashoffset={getStrokeDashoffset(temp, 50)}
                          className="transition-all duration-300"
                        />
                      </svg>
                      <div className="z-10 flex flex-col items-center">
                        <span className="text-xl font-black text-[#262626]">{temp.toFixed(0)}°C</span>
                        <span className="text-[9px] uppercase font-bold text-[#616161]">Temp</span>
                      </div>
                    </div>
                  </div>

                  {/* Dial 3: Nitrogen */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <svg className="absolute w-full h-full transform -rotate-90">
                        <circle cx="56" cy="56" r={radius} stroke="#F2F2F2" strokeWidth={strokeWidth} fill="transparent" />
                        <circle
                          cx="56"
                          cy="56"
                          r={radius}
                          stroke="#10B981"
                          strokeWidth={strokeWidth}
                          fill="transparent"
                          strokeDasharray={circumference}
                          strokeDashoffset={getStrokeDashoffset(nitrogen, 250)}
                          className="transition-all duration-300"
                        />
                      </svg>
                      <div className="z-10 flex flex-col items-center">
                        <span className="text-xl font-black text-[#262626]">{nitrogen}</span>
                        <span className="text-[9px] uppercase font-bold text-[#616161]">Nitrogen</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Console log simulation */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <span className="text-[10px] uppercase font-bold text-[#616161] block mb-2">Gate Telemetry Log</span>
                <div className="bg-[#111111] text-slate-400 font-mono text-[11px] p-4 rounded-sm space-y-1 h-[80px] overflow-y-auto">
                  <div>[SYS] Soil Node ID: AGRI-NODE-04 active.</div>
                  {isIrrigating ? (
                    <div className="text-sky-400 animate-pulse">[INFO] Solenoid valve #02 active. Water flow rate: 1.2 L/min.</div>
                  ) : moisture < 40 ? (
                    <div className="text-amber-500">[WARN] Critical moisture level detected: {moisture}%. Standby for automated gate valve sequence.</div>
                  ) : (
                    <div className="text-emerald-500">[INFO] Crop index healthy. NPK levels in bounds.</div>
                  )}
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
            <h2 className="text-3xl font-semibold text-[#262626] mb-6">Sustainable Precision Farming</h2>
            <p className="text-[#616161] text-md leading-relaxed">
              Automated closed-loop crop hydration networks designed to save up to 60% of water and fertilizer resources while optimizing yield.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 border border-border rounded-sm hover:border-[#0078D4] transition-colors group">
              <Droplet className="text-[#0078D4] mb-6 group-hover:scale-105 transition-transform" size={32} />
              <h3 className="text-xl font-semibold mb-4 text-[#262626]">Closed-Loop Irrigation</h3>
              <p className="text-sm text-[#616161] leading-relaxed">
                Connect ground-based moisture nodes to solar-powered solenoid water valves. Gates open and close automatically based on exact soil matrix requirements, eliminating dry spots and over-irrigation.
              </p>
            </div>

            <div className="p-8 border border-border rounded-sm hover:border-[#0078D4] transition-colors group">
              <Sun className="text-[#0078D4] mb-6 group-hover:scale-105 transition-transform" size={32} />
              <h3 className="text-xl font-semibold mb-4 text-[#262626]">Weather Predictive Analytics</h3>
              <p className="text-sm text-[#616161] leading-relaxed">
                Our AI-driven gateway aggregates microclimate sensors with global weather APIs, automatically adjusting schedules ahead of impending rain or heatwaves to protect crops.
              </p>
            </div>

            <div className="p-8 border border-border rounded-sm hover:border-[#0078D4] transition-colors group">
              <ShieldCheck className="text-[#0078D4] mb-6 group-hover:scale-105 transition-transform" size={32} />
              <h3 className="text-xl font-semibold mb-4 text-[#262626]">Nutrient (NPK) Analytics</h3>
              <p className="text-sm text-[#616161] leading-relaxed">
                Monitor key chemical composition details (Nitrogen, Phosphorus, Potassium) dynamically to prevent over-fertilization and maximize plant vigor in every sector of your land.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Table */}
      <section className="py-20 bg-gray-50 border-t border-b">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-center text-[#262626] mb-12">Farming Node Specifications</h2>
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
                  <td className="p-4 font-semibold text-[#262626]">Power Source</td>
                  <td className="p-4">Integrated Solar Panel + LiFePO4 Battery Pack (Up to 5 years autonomy)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#262626]">Sensing Depth</td>
                  <td className="p-4">Multi-depth probe (10cm, 30cm, 60cm soil profiles)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#262626]">Wireless Network</td>
                  <td className="p-4">LoRaWAN (Up to 15km line-of-sight range) & BLE for local configuration</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#262626]">Environmental Protection</td>
                  <td className="p-4">IP68 Hermetic Waterproofing (UV-stabilized casing)</td>
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
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Revolutionize your harvest cycle today</h2>
          <p className="text-slate-300 mb-10 max-w-2xl mx-auto">
            Order your custom soil sensor pack or coordinate with our specialists to plan full coverage irrigation nodes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsStoreRedirectOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0078D4] hover:bg-[#0067B8] text-white rounded-[2px] font-bold uppercase tracking-wider transition-all shadow-lg"
            >
              Order Soil Sensor Pack
              <ExternalLink size={16} />
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-[2px] font-bold uppercase tracking-wider transition-all border border-white/20"
            >
              Contact Agronomy Team
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
