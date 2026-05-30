"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Activity,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Zap,
  Hammer,
  Database
} from "lucide-react";
import Link from "next/link";

export default function SmartIndustrialProductPage() {
  // Simulator States
  const [isMotorRunning, setIsMotorRunning] = useState(true);
  const [vibrationSpike, setVibrationSpike] = useState(false);
  const [rpm, setRpm] = useState(1480);
  const [temp, setTemp] = useState(62.4); // Celsius
  const [history, setHistory] = useState<number[]>([1.2, 1.4, 1.3, 1.5, 1.2, 1.3, 1.4, 1.2, 1.5, 1.3]);
  const [isStoreRedirectOpen, setIsStoreRedirectOpen] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate stats
  const peakVibration = history.length > 0 ? Math.max(...history) : 0;
  const bearingLife = vibrationSpike 
    ? 24 
    : !isMotorRunning 
      ? 100 
      : peakVibration > 4.5 
        ? 62 
        : 94;

  const systemHealth = vibrationSpike
    ? "HARMONIC DISSIPATION FAULT"
    : !isMotorRunning
      ? "SYSTEM STANDBY"
      : peakVibration > 4.5
        ? "BEARING SLIP WARNING"
        : "OPTIMAL OPERATIONS";

  // Simulate vibration waveforms
  useEffect(() => {
    if (isMotorRunning) {
      timerRef.current = setInterval(() => {
        setHistory(prev => {
          let nextVal;
          if (vibrationSpike) {
            // Generate massive anomaly spikes (vibration peak > 8.0 mm/s)
            nextVal = parseFloat((6.5 + Math.random() * 3).toFixed(2));
            setTemp(t => parseFloat((t + 0.8).toFixed(1))); // Temp rises
          } else {
            // Normal operation (vibration peak ~1.2 - 2.0 mm/s)
            nextVal = parseFloat((1.2 + Math.random() * 0.6).toFixed(2));
            setTemp(t => parseFloat((62.4 + Math.random() * 0.4 - 0.2).toFixed(1)));
          }
          return [...prev.slice(1), nextVal];
        });
      }, 500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isMotorRunning, vibrationSpike]);

  // Generate SVG Path for Waveform
  const padding = 10;
  const width = 500;
  const height = 150;
  const maxVal = 10; // Max vibration in mm/s
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
                <Activity size={12} />
                <span>Industry 4.0 & Predictive Maintenance</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 text-[#262626]">
                IIoT Diagnostics <br />
                <span className="text-[#0078D4]">& Asset Telemetry</span>
              </h1>
              <p className="text-lg text-[#616161] mb-8 leading-relaxed max-w-xl">
                Deploy vibration sensing meshes, track machinery heat matrices, and predict bearing failure signatures locally on the edge. Minimize factory downtime with maximum IIoT visibility.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsStoreRedirectOpen(true)}
                  className="px-8 py-3 bg-[#0078D4] hover:bg-[#0067B8] text-white rounded-[2px] font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Order Industrial Sensors
                  <ArrowRight size={16} />
                </button>
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-white hover:bg-gray-50 text-[#0078D4] border border-gray-200 rounded-[2px] font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Request Plant Audit
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
                  src="/img/premium_smart_industry.png"
                  alt="Industrial Automation Mesh"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-1">Industrial Edge Core</h3>
                    <p className="text-xs opacity-90">Centralized SCADA telemetry grid linking manufacturing plants globally.</p>
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
              Machinery Vibration & Heat Analytics
            </h2>
            <p className="text-[#616161] text-md">
              Toggle the vibration anomaly switch to simulate a bearing slipping event. PiltiSmart&apos;s edge analytics capture the high-frequency harmonic spikes, log the critical warning, and recommend protective shutdown.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Control Panel (5 cols) */}
            <div className="lg:col-span-5 bg-white p-8 rounded-sm shadow-sm border border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
                  <h3 className="text-lg font-bold text-[#262626] flex items-center gap-2">
                    <Cpu size={18} className="text-[#0078D4]" />
                    Machinery Settings
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-[2px] text-[10px] font-bold uppercase tracking-wider ${
                    systemHealth === "HARMONIC DISSIPATION FAULT"
                      ? "bg-rose-100 text-rose-700 animate-pulse"
                      : systemHealth === "BEARING SLIP WARNING"
                        ? "bg-amber-100 text-amber-700"
                        : systemHealth === "SYSTEM STANDBY"
                          ? "bg-slate-100 text-slate-700"
                          : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {systemHealth}
                  </span>
                </div>

                {/* Automation Alert */}
                <AnimatePresence>
                  {vibrationSpike && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-rose-50 border border-rose-200 p-4 rounded-[4px] mb-6 flex items-start gap-3"
                    >
                      <AlertTriangle className="text-rose-600 shrink-0 mt-0.5" size={18} />
                      <div>
                        <h4 className="text-xs font-bold text-rose-800">PREDICTIVE ALARM TRIPPED</h4>
                        <p className="text-[11px] text-rose-700 mt-1">
                          Vibration amplitude exceeded safety levels (&ge; 4.5 mm/s). Predictive bearing lifetime dropped under critical threshold (24%). Auto-shutdown recommended.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Motor State Control */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <span className="text-xs font-bold text-[#616161] block mb-1">Industrial Motor Status</span>
                    <span className={`text-md font-bold uppercase ${isMotorRunning ? "text-emerald-600" : "text-slate-400"}`}>
                      {isMotorRunning ? "Active (Running)" : "Isolated (Stopped)"}
                    </span>
                  </div>
                  <button
                    id="estop-motor-button"
                    onClick={() => {
                      setIsMotorRunning(!isMotorRunning);
                      if (vibrationSpike) setVibrationSpike(false);
                    }}
                    className={`px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-[2px] shadow-md transition-all ${
                      isMotorRunning 
                        ? "bg-rose-600 hover:bg-rose-700 text-white" 
                        : "bg-emerald-600 hover:bg-emerald-700 text-white"
                    }`}
                  >
                    {isMotorRunning ? "E-Stop Motor" : "Launch Motor"}
                  </button>
                </div>

                {/* Anomaly Trigger Switch */}
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-sm mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#262626] block">Simulate Anomaly Spike</span>
                    <span className="text-[10px] text-[#616161] mt-0.5">Inject high-frequency bearing slip vibrations</span>
                  </div>
                  <div
                    id="anomaly-spike-toggle"
                    onClick={() => isMotorRunning && setVibrationSpike(!vibrationSpike)}
                    className={`w-12 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                      vibrationSpike ? "bg-rose-600" : "bg-gray-200"
                    } ${!isMotorRunning ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${
                      vibrationSpike ? "translate-x-6" : "translate-x-0"
                    }`} />
                  </div>
                </div>
              </div>

              {/* Hardware Readings Panel */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                <div className="p-3 bg-gray-50 rounded-sm">
                  <span className="text-[10px] uppercase font-bold text-[#616161] block mb-1">Rotations</span>
                  <span className="text-md font-bold text-[#262626]">{isMotorRunning ? `${rpm} RPM` : "0 RPM"}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-sm">
                  <span className="text-[10px] uppercase font-bold text-[#616161] block mb-1">Motor Temp</span>
                  <span className="text-md font-bold text-[#262626]">{isMotorRunning ? `${temp.toFixed(1)}°C` : "23.5°C"}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-sm">
                  <span className="text-[10px] uppercase font-bold text-[#616161] block mb-1">Bearing Life</span>
                  <span className={`text-md font-bold ${bearingLife < 30 ? "text-rose-600 animate-pulse" : "text-[#0078D4]"}`}>
                    {bearingLife}%
                  </span>
                </div>
              </div>
            </div>

            {/* Telemetry Chart (7 cols) */}
            <div className="lg:col-span-7 bg-white p-8 rounded-sm shadow-sm border border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
                  <h3 className="text-lg font-bold text-[#262626] flex items-center gap-2">
                    <Activity size={18} className="text-[#0078D4]" />
                    High-Frequency Vibration Waveform
                  </h3>
                  <span className="text-[11px] font-semibold text-[#616161]">
                    Metric: Velocity (mm/s RMS)
                  </span>
                </div>

                {/* SVG Live Waveform */}
                <div className="w-full bg-slate-50 border border-slate-100 rounded-sm p-4 relative overflow-hidden">
                  <div className="absolute inset-0 flex flex-col justify-between py-4 px-1 pointer-events-none opacity-40">
                    <div className="h-px bg-slate-200 w-full" />
                    <div className="h-px bg-slate-200 w-full" />
                    <div className="h-px bg-slate-200 w-full" />
                  </div>

                  <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[180px] overflow-visible">
                    {/* Shaded Area */}
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
                      stroke={vibrationSpike ? "#E11D48" : "#0078D4"}
                      strokeWidth="3"
                      points={points}
                      className="transition-all duration-300"
                    />

                    {/* Gradient Def */}
                    <defs>
                      <linearGradient id="gradient-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={vibrationSpike ? "#FDA4AF" : "#0078D4"} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={vibrationSpike ? "#FDA4AF" : "#0078D4"} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Console log simulation */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <span className="text-[10px] uppercase font-bold text-[#616161] block mb-2">SCADA Diagnostics Log</span>
                <div className="bg-[#111111] text-slate-400 font-mono text-[11px] p-4 rounded-sm space-y-1 h-[80px] overflow-y-auto">
                  <div>[SYS] Industrial Node ID: MOTOR-VIB-07 online.</div>
                  {isMotorRunning && !vibrationSpike && (
                    <div className="text-emerald-500">[INFO] Vibration amplitude stable: {peakVibration.toFixed(2)} mm/s RMS. RPM: {rpm}.</div>
                  )}
                  {!isMotorRunning && (
                    <div className="text-slate-500">[WARN] Motor isolated manually. Calibration offline.</div>
                  )}
                  {vibrationSpike && (
                    <div className="text-rose-500">[CRIT] Vibration spike: {peakVibration.toFixed(2)} mm/s RMS! Bearing slip harmonic mismatch.</div>
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
            <h2 className="text-3xl font-semibold text-[#262626] mb-6">Zero Unplanned Downtime</h2>
            <p className="text-[#616161] text-md leading-relaxed">
              Industrial edge vibration-sensing nodes engineered to catch mechanical anomalies before they lead to structural failures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 border border-border rounded-sm hover:border-[#0078D4] transition-colors group">
              <Activity className="text-[#0078D4] mb-6 group-hover:scale-105 transition-transform" size={32} />
              <h3 className="text-xl font-semibold mb-4 text-[#262626]">High-Frequency Telemetry</h3>
              <p className="text-sm text-[#616161] leading-relaxed">
                Tracks three-axis machinery vibration velocity (mm/s RMS) and acceleration parameters continuously, detecting dynamic misalignments and bearing slip patterns at the edge.
              </p>
            </div>

            <div className="p-8 border border-border rounded-sm hover:border-[#0078D4] transition-colors group">
              <Zap className="text-[#0078D4] mb-6 group-hover:scale-105 transition-transform" size={32} />
              <h3 className="text-xl font-semibold mb-4 text-[#262626]">Predictive Failure AI</h3>
              <p className="text-sm text-[#616161] leading-relaxed">
                Our edge models identify localized bearing degradation trends, estimating exact remaining lifetime and alerting plant technicians weeks before an emergency shutoff is triggered.
              </p>
            </div>

            <div className="p-8 border border-border rounded-sm hover:border-[#0078D4] transition-colors group">
              <Database className="text-[#0078D4] mb-6 group-hover:scale-105 transition-transform" size={32} />
              <h3 className="text-xl font-semibold mb-4 text-[#262626]">Centralized SCADA Sync</h3>
              <p className="text-sm text-[#616161] leading-relaxed">
                Integrates natively with existing PLCs and SCADA networks using Modbus TCP or MQTT over secure cellular/gateway channels, offering a unified overview of all industrial assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Table */}
      <section className="py-20 bg-gray-50 border-t border-b">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-center text-[#262626] mb-12">Industrial Sensor Specifications</h2>
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
                  <td className="p-4 font-semibold text-[#262626]">Frequency Range</td>
                  <td className="p-4">10 Hz to 10,000 Hz (High-frequency mechanical bands)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#262626]">Measurement Ranges</td>
                  <td className="p-4">Velocity (0 - 50 mm/s RMS), Temperature (-40°C to +125°C)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#262626]">Wireless Protocols</td>
                  <td className="p-4">Industrial WirelessHART & BLE 5.2 for local telemetry audits</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#262626]">Hazard Certification</td>
                  <td className="p-4">ATEX Zone 1/21 Intrinsic Safety for explosive or gaseous environments</td>
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
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Secure your production line uptime today</h2>
          <p className="text-slate-300 mb-10 max-w-2xl mx-auto">
            Order your custom industrial sensor pack or coordinate with our specialists to plan full asset coverage auditing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsStoreRedirectOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0078D4] hover:bg-[#0067B8] text-white rounded-[2px] font-bold uppercase tracking-wider transition-all shadow-lg"
            >
              Order Industrial Sensors
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
