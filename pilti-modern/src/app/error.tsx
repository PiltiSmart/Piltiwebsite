"use client";

import React, { useEffect, useState } from "react";
import { AlertTriangle, RefreshCw, ChevronRight, Terminal, Home } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  const [showLogs, setShowLogs] = useState(false);

  useEffect(() => {
    // Log the error to standard diagnostic channels
    console.error("Runtime exception captured by global boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0B0C0E] text-foreground flex items-center justify-center p-6 relative overflow-hidden select-none">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/10 dark:bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0078D4]/10 dark:bg-[#0078D4]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-xl w-full relative z-10">
        <div className="bg-white dark:bg-[#15171C] border border-black/5 dark:border-white/[0.04] p-8 md:p-10 shadow-2xl rounded-2xl">
          
          {/* Header Warning Block */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-rose-500/5 dark:bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-rose-500/10">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h1 className="text-[20px] md:text-[22px] font-bold text-[#262626] dark:text-white tracking-tight">
                System Exception Captured
              </h1>
              <p className="text-[12px] text-[#616161] dark:text-muted-foreground uppercase tracking-widest font-mono mt-0.5">
                Core thread error boundary
              </p>
            </div>
          </div>

          {/* User Message */}
          <p className="text-[14px] text-[#616161] dark:text-[#A0A5B5] leading-relaxed mb-8">
            An unexpected runtime exception was encountered. The IoT page wrapper was unable to execute state updates. You can attempt to soft-reset the runtime environment or return home.
          </p>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={() => reset()}
              className="flex-1 cursor-pointer bg-[#0078D4] hover:bg-[#0067B8] text-white py-3 px-6 rounded-xl font-semibold text-[13px] transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
            >
              <RefreshCw size={14} className="animate-spin-slow" />
              Reset System Context
            </button>
            <Link
              href="/"
              className="flex-1 cursor-pointer bg-[#F2F2F2] dark:bg-white/[0.04] hover:bg-[#E5E5E5] dark:hover:bg-white/[0.08] text-[#262626] dark:text-white py-3 px-6 rounded-xl font-semibold text-[13px] transition-all flex items-center justify-center gap-2 border border-black/5 dark:border-transparent"
            >
              <Home size={14} />
              Return Home
            </Link>
          </div>

          {/* Technical Diagnostics Expandable */}
          <div className="border-t border-black/5 dark:border-white/[0.04] pt-6">
            <button
              onClick={() => setShowLogs(!showLogs)}
              className="cursor-pointer flex items-center justify-between w-full text-[12px] font-semibold text-black/50 dark:text-white/40 hover:text-black/80 dark:hover:text-white/80 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Terminal size={14} />
                Technical logs & stack trace
              </span>
              <ChevronRight
                size={14}
                className={`transition-transform duration-200 ${showLogs ? "rotate-90" : ""}`}
              />
            </button>

            {showLogs && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-black/40 border border-black/5 dark:border-white/[0.04] rounded-lg overflow-x-auto max-h-48 font-mono text-[11px] leading-relaxed text-rose-600 dark:text-rose-400 select-text">
                <p className="font-bold mb-1">Error: {error.message || "Unknown client execution error"}</p>
                {error.stack && (
                  <pre className="mt-2 text-black/60 dark:text-white/40 overflow-x-auto whitespace-pre">
                    {error.stack}
                  </pre>
                )}
                {error.digest && (
                  <p className="mt-2 opacity-50 font-sans">Digest ID: {error.digest}</p>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
