"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Activity,
  Lightbulb,
  ShieldAlert,
  ArrowRight,
  Cpu,
  CheckCircle2,
  Lock,
  Smartphone,
  ExternalLink,
  Power,
  RotateCcw
} from "lucide-react";
import Link from "next/link";

export default function SmartHomeProductPage() {
  // Simulator States
  const [isOn, setIsOn] = useState(true);
  const [currentLoad, setCurrentLoad] = useState(6.2); // Amps
  const [voltage, setVoltage] = useState(230.5); // Volts
  const [anomalyTriggered, setAnomalyTriggered] = useState(false);
  const [history, setHistory] = useState<number[]>([5.2, 5.8, 6.1, 6.0, 6.5, 6.2, 5.9, 6.3, 6.2]);
  const [isStoreRedirectOpen, setIsStoreRedirectOpen] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Calculated properties
  const powerWatts = isOn ? parseFloat((currentLoad * voltage).toFixed(1)) : 0;
  const systemHealth = anomalyTriggered 
    ? "FAULT DETECTED" 
    : !isOn 
      ? "STANDBY" 
      : currentLoad > 12 
        ? "HIGH LOAD WARNING" 
        : "HEALTHY";

  // Simulate real-time voltage and current fluctuations
  useEffect(() => {
    if (isOn && !anomalyTriggered) {
      timerRef.current = setInterval(() => {
        // Random slight voltage fluctuations
        setVoltage(prev => parseFloat((230 + Math.random() * 2 - 1).toFixed(1)));
        
        // Random slight current fluctuations based on baseline
        setHistory(prev => {
          const nextVal = Math.max(0.1, parseFloat((currentLoad + Math.random() * 0.4 - 0.2).toFixed(2)));
          const updated = [...prev.slice(1), nextVal];
          return updated;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOn, currentLoad, anomalyTriggered]);

  // Handle current load slider adjustments
  const handleLoadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isOn) return;
    
    if (val >= 15.0) {
      // Overcurrent anomaly threshold triggered!
      setAnomalyTriggered(true);
      setCurrentLoad(0);
      setIsOn(false);
      setHistory(prev => [...prev.slice(1), 0]);
    } else {
      setCurrentLoad(val);
      setHistory(prev => [...prev.slice(1), val]);
    }
  };

  // Reset after system trip
  const handleReset = () => {
    setAnomalyTriggered(false);
    setIsOn(true);
    setCurrentLoad(6.2);
    setHistory([5.2, 5.8, 6.1, 6.0, 6.5, 6.2, 5.9, 6.3, 6.2]);
  };

  // Generate SVG Path for the active telemetry chart
  const padding = 10;
  const width = 500;
  const height = 150;
  const maxVal = 18; // Max Amps
  const points = history.map((val, idx) => {
    const x = padding + (idx * (width - 2 * padding)) / (history.length - 1);
    const y = height - padding - (val * (height - 2 * padding)) / maxVal;
    return `${x},${y}`;
  }).join(" ");

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
                <Lightbulb size={12} />
                <span>Next-Gen Smart Home Ecosystem</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 text-[#262626]">
                Intelligent Living <br />
                <span className="text-[#0078D4]">With SmartySwitch™</span>
              </h1>
              <p className="text-lg text-[#616161] mb-8 leading-relaxed max-w-xl">
                The ultimate current-sensing WiFi ecosystem featuring intelligent edge anomaly detection. 
                Monitor appliance loads, predict failures, and secure your residence with military-grade safety protocols.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsStoreRedirectOpen(true)}
                  className="px-8 py-3 bg-[#0078D4] hover:bg-[#0067B8] text-white rounded-[2px] font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Buy SmartySwitch™
                  <ArrowRight size={16} />
                </button>
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-white hover:bg-gray-50 text-[#0078D4] border border-gray-200 rounded-[2px] font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Consult Home Architect
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
                  src="/img/smartfullhome.jpg"
                  alt="Intelligent Smart Home Ecosystem"
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/img/landing_smart_home.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-1">Fully Integrated Residential Mesh</h3>
                    <p className="text-xs opacity-90">Seamless automation tracking lighting, climate, and appliance telemetry.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Simulator Section */}
      <section className="py-24 bg-[#F2F2F2]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0078D4] mb-3 block">Live Product Demo</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#262626] mb-4">
              SmartySwitch™ Telemetry Command Center
            </h2>
            <p className="text-[#616161] text-md">
              Toggle the switch, adjust the active load, and see real-time current sensing curves in action. 
              Increase the load past 15 Amps to test our signature automatic anomaly cutoff.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Control Panel (5 cols) */}
            <div className="lg:col-span-5 bg-white p-8 rounded-sm shadow-sm border border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
                  <h3 className="text-lg font-bold text-[#262626] flex items-center gap-2">
                    <Cpu size={18} className="text-[#0078D4]" />
                    Hardware Controls
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-[2px] text-[10px] font-bold uppercase tracking-wider ${
                    systemHealth === "FAULT DETECTED"
                      ? "bg-rose-100 text-rose-700 animate-pulse"
                      : systemHealth === "HIGH LOAD WARNING"
                        ? "bg-amber-100 text-amber-700"
                        : systemHealth === "STANDBY"
                          ? "bg-slate-100 text-slate-700"
                          : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {systemHealth}
                  </span>
                </div>

                {/* System Active Fault Notification */}
                <AnimatePresence>
                  {anomalyTriggered && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-rose-50 border border-rose-200 p-4 rounded-[4px] mb-6 flex items-start gap-3"
                    >
                      <ShieldAlert className="text-rose-600 shrink-0 mt-0.5" size={18} />
                      <div>
                        <h4 className="text-xs font-bold text-rose-800">AUTOMATIC CUTOFF TRIPPED</h4>
                        <p className="text-[11px] text-rose-700 mt-1">
                          Overcurrent fault threshold exceeded (&ge; 15A). SmartySwitch™ edge protection isolated the load in 12ms.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Power Toggle Button */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <span className="text-xs font-bold text-[#616161] block mb-1">Switch Status</span>
                    <span className={`text-md font-bold uppercase ${isOn ? "text-emerald-600" : "text-slate-400"}`}>
                      {isOn ? "Operational (On)" : "Offline (Off)"}
                    </span>
                  </div>
                  {anomalyTriggered ? (
                    <button
                      onClick={handleReset}
                      className="p-3 bg-rose-600 text-white rounded-full hover:bg-rose-700 shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                    >
                      <RotateCcw size={14} />
                      Reset Fuse
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsOn(!isOn)}
                      className={`p-4 rounded-full transition-all shadow-md ${
                        isOn 
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                          : "bg-slate-200 hover:bg-slate-300 text-slate-600"
                      }`}
                    >
                      <Power size={20} />
                    </button>
                  )}
                </div>

                {/* Load Slider Control */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-[#616161]">Adjust Active Load (Amps)</span>
                    <span className="text-sm font-bold text-[#262626]">
                      {isOn ? `${currentLoad.toFixed(2)} A` : "0.00 A"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="18"
                    step="0.1"
                    disabled={!isOn || anomalyTriggered}
                    value={isOn ? currentLoad : 0.5}
                    onChange={handleLoadChange}
                    className="w-full accent-[#0078D4] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <div className="flex justify-between text-[10px] text-[#616161] mt-1 font-medium">
                    <span>Min (0.5A)</span>
                    <span className="text-rose-600 font-bold">Overcurrent Trip (&ge; 15A)</span>
                  </div>
                </div>
              </div>

              {/* Hardware Readings Panel */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                <div className="p-3 bg-gray-50 rounded-sm">
                  <span className="text-[10px] uppercase font-bold text-[#616161] block mb-1">Voltage</span>
                  <span className="text-md font-bold text-[#262626]">{isOn ? `${voltage.toFixed(1)}V` : "0V"}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-sm">
                  <span className="text-[10px] uppercase font-bold text-[#616161] block mb-1">Active Load</span>
                  <span className="text-md font-bold text-[#262626]">{isOn ? `${currentLoad.toFixed(1)}A` : "0A"}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-sm">
                  <span className="text-[10px] uppercase font-bold text-[#616161] block mb-1">Power</span>
                  <span className="text-md font-bold text-[#0078D4]">{powerWatts}W</span>
                </div>
              </div>
            </div>

            {/* Telemetry Chart (7 cols) */}
            <div className="lg:col-span-7 bg-white p-8 rounded-sm shadow-sm border border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
                  <h3 className="text-lg font-bold text-[#262626] flex items-center gap-2">
                    <Activity size={18} className="text-[#0078D4]" />
                    Real-time Waveform Telemetry
                  </h3>
                  <span className="text-[11px] font-semibold text-[#616161]">
                    Sample Interval: 1s
                  </span>
                </div>

                {/* SVG Live Line Chart */}
                <div className="w-full bg-slate-50 border border-slate-100 rounded-sm p-4 relative overflow-hidden">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between py-4 px-1 pointer-events-none opacity-40">
                    <div className="h-px bg-slate-200 w-full" />
                    <div className="h-px bg-slate-200 w-full" />
                    <div className="h-px bg-slate-200 w-full" />
                  </div>

                  <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[180px] overflow-visible">
                    {/* Shaded Area below the curve */}
                    {history.length > 0 && (
                      <path
                        d={`M${padding},${height - padding} L${points} L${width - padding},${height - padding} Z`}
                        fill="url(#gradient-fill)"
                        className="transition-all duration-300"
                      />
                    )}

                    {/* Telemetry Line */}
                    <polyline
                      fill="none"
                      stroke={anomalyTriggered ? "#E11D48" : "#0078D4"}
                      strokeWidth="3"
                      points={points}
                      className="transition-all duration-300"
                    />

                    {/* Grid Gradients */}
                    <defs>
                      <linearGradient id="gradient-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={anomalyTriggered ? "#FDA4AF" : "#0078D4"} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={anomalyTriggered ? "#FDA4AF" : "#0078D4"} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Console log simulation */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <span className="text-[10px] uppercase font-bold text-[#616161] block mb-2">Hardware Telemetry Log</span>
                <div className="bg-[#111111] text-slate-400 font-mono text-[11px] p-4 rounded-sm space-y-1 h-[80px] overflow-y-auto">
                  <div>[SYS] SmartySwitch firmware version 2.4 active.</div>
                  {isOn && !anomalyTriggered && (
                    <div className="text-emerald-500">[INFO] Calibration stable. Active load: {currentLoad.toFixed(2)}A at {voltage.toFixed(1)}V.</div>
                  )}
                  {!isOn && !anomalyTriggered && (
                    <div className="text-slate-500">[WARN] Standby state activated. Relay open.</div>
                  )}
                  {anomalyTriggered && (
                    <div className="text-rose-500">[CRIT] Overcurrent tripped! Load {currentLoad.toFixed(2)}A isolated instantly.</div>
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
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0078D4] mb-3 block">Product Architecture</span>
            <h2 className="text-3xl font-semibold text-[#262626] mb-6">Designed for Uncompromising Safety</h2>
            <p className="text-[#616161] text-md leading-relaxed">
              SmartySwitch™ isn&apos;t just a toggle. It is an advanced current-sensing gate offering comprehensive residential edge protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 border border-border rounded-sm hover:border-[#0078D4] transition-colors group">
              <ShieldAlert className="text-[#0078D4] mb-6 group-hover:scale-105 transition-transform" size={32} />
              <h3 className="text-xl font-semibold mb-4 text-[#262626]">Edge Anomaly Defense</h3>
              <p className="text-sm text-[#616161] leading-relaxed">
                Integrated autoencoders analyze device current signatures locally on the chip, instantly catching and isolating faulty appliances to protect against short circuits.
              </p>
            </div>

            <div className="p-8 border border-border rounded-sm hover:border-[#0078D4] transition-colors group">
              <Zap className="text-[#0078D4] mb-6 group-hover:scale-105 transition-transform" size={32} />
              <h3 className="text-xl font-semibold mb-4 text-[#262626]">Granular Power Analytics</h3>
              <p className="text-sm text-[#616161] leading-relaxed">
                Tracks active and reactive power loads, generating precise logs of exact usage, helping home owners save up to 40% on monthly electric bills.
              </p>
            </div>

            <div className="p-8 border border-border rounded-sm hover:border-[#0078D4] transition-colors group">
              <Lock className="text-[#0078D4] mb-6 group-hover:scale-105 transition-transform" size={32} />
              <h3 className="text-xl font-semibold mb-4 text-[#262626]">Military-Grade Encryption</h3>
              <p className="text-sm text-[#616161] leading-relaxed">
                Connects to the home gateway using secure TLS 1.3 pathways with dynamic HMAC-SHA256 request signatures, preventing local device hijacking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Specs */}
      <section className="py-20 bg-gray-50 border-t border-b">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-center text-[#262626] mb-12">SmartySwitch™ Specifications</h2>
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
                  <td className="p-4 font-semibold text-[#262626]">Operating Voltage</td>
                  <td className="p-4">110V - 240V AC (Adaptive Grid Frequency)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#262626]">Max Continuous Load</td>
                  <td className="p-4">15 Amps (3450 Watts at 230V)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#262626]">Anomaly Sensing Latency</td>
                  <td className="p-4">&lt;12 milliseconds (Micro-cutoff time)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#262626]">Wireless Protocols</td>
                  <td className="p-4">WiFi 802.11 b/g/n (2.4GHz) & Bluetooth Low Energy (BLE 5.2)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#262626]">Certifications</td>
                  <td className="p-4">CE, FCC, RoHS, Dynamic Edge Safety Compliant</td>
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
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Upgrade to a fully integrated Intelligent Mesh</h2>
          <p className="text-slate-300 mb-10 max-w-2xl mx-auto">
            Order your SmartySwitch™ hardware package or consult our team to configure custom edge meshes for enterprise systems.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsStoreRedirectOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0078D4] hover:bg-[#0067B8] text-white rounded-[2px] font-bold uppercase tracking-wider transition-all shadow-lg"
            >
              Order Switch Pack
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
