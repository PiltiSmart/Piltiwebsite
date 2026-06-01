"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Maximize2, Minimize2, Wifi, WifiOff, AlertCircle, RefreshCw, Smartphone, Tablet, Eraser } from "lucide-react";

// Use the raw app query parameter so the external black background is skipped entirely
const SMARTYAPP_URL = "https://smartyapp.piltismart.com/?isApp=true";

export default function SmartyAppPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [device, setDevice] = useState<"phone" | "tablet">("phone");
  const [iframeSrc, setIframeSrc] = useState(SMARTYAPP_URL);

  // Monitor network status using navigator.onLine and a non-blocking check
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("simulateOffline") === "true") {
        setIsOnline(false);
        setHasError(true);
        setIsLoading(false);
        return;
      }
    }

    const handleOnline = () => {
      setIsOnline(true);
      setHasError(false);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setHasError(true);
    };

    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      if (!navigator.onLine) {
        setHasError(true);
      }
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      }
    };
  }, []);

  // Soft health check that won't block iframe loading
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("simulateOffline") === "true") {
        setIsOnline(false);
        setHasError(true);
        setIsLoading(false);
        return;
      }
    }
    let active = true;
    const checkServer = async () => {
      try {
        await fetch(SMARTYAPP_URL, { mode: "no-cors", cache: "no-store" });
        if (active) {
          setIsOnline(true);
          setHasError(false);
        }
      } catch (err) {
        if (active) {
          setIsOnline(false);
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    checkServer();
    return () => {
      active = false;
    };
  }, [retryCount]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Safe fallback to disable loading screen and show the iframe if load event takes too long or cached
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 3500); // 3.5 seconds safe fallback

    return () => clearTimeout(timer);
  }, [isLoading]);

  // Monitor iframe load using direct event listener & readyState for cached loads
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const onIframeLoad = () => {
      setIsLoading(false);
    };

    try {
      if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
        onIframeLoad();
      }
    } catch (e) {
      // CORS might block reading contentDocument, which is fine
    }

    iframe.addEventListener("load", onIframeLoad);
    return () => {
      iframe.removeEventListener("load", onIframeLoad);
    };
  }, [retryCount]);

  const handleRetry = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    setRetryCount((c) => c + 1);
    setIframeSrc(`${SMARTYAPP_URL}&t=${Date.now()}`);
  }, []);

  const handleClearCache = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    setRetryCount((c) => c + 1);
    setIframeSrc(`${SMARTYAPP_URL}&clear_cache=${Date.now()}&nocache=${Math.random()}&logout=true`);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((f) => !f);
  }, []);

  return (
    <div
      className={`flex flex-col bg-[#F2F2F2] transition-colors duration-500 ${isFullscreen ? "fixed inset-0 z-[200]" : "min-h-screen pt-16"
        }`}
    >
      {/* Outer Browser Mockup Wrapper */}
      <div className={`flex flex-col flex-1 items-center justify-center relative ${isFullscreen ? "" : "p-6"}`}>

        {/* Sleek Device Mockup Frame Container (Handles Light Theme and Sizing) */}
        {!hasError && (
          <div
            className={`transition-all duration-500 flex items-center justify-center ${isFullscreen
                ? "w-full h-full"
                : device === "phone"
                  ? "h-[76vh] w-full max-w-[360px] bg-black rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative overflow-hidden border border-black/[0.06]"
                  : "h-[76vh] w-full max-w-[1024px] bg-black rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative overflow-hidden border border-black/[0.06]"
              }`}
          >
            <div className="w-full h-full relative">
              {/* Loading State inside our local device frame */}
              {isLoading && (
                <div className="absolute inset-0 z-10 bg-[#F8F9FA] flex flex-col items-center justify-center gap-6">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-2 border-black/[0.06]" />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#0078D4] animate-spin" />
                  </div>
                  <div className="text-center px-4">
                    <p className="text-black/80 font-semibold text-sm mb-1">Loading SmartyApp™</p>
                    <p className="text-black/40 text-xs font-mono">smartyapp.piltismart.com</p>
                  </div>
                </div>
              )}

              {/* Keep the iframe in DOM to prevent blocking or unmounting issues */}
              <iframe
                key={retryCount}
                ref={iframeRef}
                src={iframeSrc}
                onLoad={handleLoad}
                title="SmartyApp™"
                className={`w-full h-full border-0 block ${isLoading ? "hidden" : ""}`}
                allow="geolocation; fullscreen; clipboard-read; clipboard-write"
              />

            </div>
          </div>
        )}

        {/* Custom Offline State Overlay */}
        {hasError && (
          <div className="max-w-md w-full bg-white border border-black/[0.08] rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl group-hover:bg-rose-500/10 transition-all duration-500" />

            <div className="w-16 h-16 bg-rose-500/5 border border-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <WifiOff size={28} />
            </div>

            <h3 className="text-black font-semibold text-lg mb-2">Connection Unreachable</h3>
            <p className="text-black/60 text-sm mb-6 leading-relaxed">
              We were unable to connect to the SmartyApp service. The application might be offline, undergoing maintenance, or you may have lost internet connectivity.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleRetry}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#0078D4] hover:bg-[#0067B8] text-white rounded-xl font-medium text-sm transition-all active:scale-95 shadow-sm hover:shadow"
              >
                <RefreshCw size={16} />
                Retry Connection
              </button>
              <a
                href="https://smartyapp.piltismart.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/40 hover:text-black/60 text-xs font-mono transition-colors"
              >
                Try opening smartyapp.piltismart.com directly
              </a>
            </div>
          </div>
        )}

        {/* Status Badge - Top Center */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-black/10 backdrop-blur-md shadow-sm transition-all select-none">
          {isOnline ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-600 font-mono">Smarty app is live</span>
            </>
          ) : (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-rose-600 font-mono">Smarty app offline</span>
            </>
          )}
        </div>

        {/* Floating Action Controls - Top Right */}
        {!isLoading && !hasError && (
          <div className="absolute top-6 right-6 z-[100] flex items-center gap-3">

            {/* Local Device Mockup Switcher (Only visible when not fullscreen) */}
            {!isFullscreen && (
              <div className="flex items-center bg-white/80 border border-black/10 backdrop-blur-md p-1 rounded-full shadow-lg gap-1">
                <button
                  onClick={() => setDevice("phone")}
                  className={`cursor-pointer p-2.5 rounded-full transition-all active:scale-95 ${device === "phone"
                      ? "bg-[#0078D4] text-white shadow-md scale-105"
                      : "text-black/60 hover:text-black hover:bg-black/5"
                    }`}
                  title="Switch to Phone View"
                >
                  <Smartphone size={16} />
                </button>
                <button
                  onClick={() => setDevice("tablet")}
                  className={`cursor-pointer p-2.5 rounded-full transition-all active:scale-95 ${device === "tablet"
                      ? "bg-[#0078D4] text-white shadow-md scale-105"
                      : "text-black/60 hover:text-black hover:bg-black/5"
                    }`}
                  title="Switch to Tablet View"
                >
                  <Tablet size={16} />
                </button>
              </div>
            )}

            {/* Clear Cache Button */}
            <button
              onClick={handleClearCache}
              className="cursor-pointer p-4 bg-white/80 hover:bg-white border border-black/10 backdrop-blur-md shadow-lg text-rose-600 hover:text-rose-700 rounded-full transition-all hover:scale-105 active:scale-95 group/clear"
              title="Clear Cache & Reload"
            >
              <Eraser size={20} className="group-hover/clear:rotate-12 transition-transform duration-300" />
            </button>

            {/* Reload Button */}
            <button
              onClick={handleRetry}
              className="cursor-pointer p-4 bg-white/80 hover:bg-white border border-black/10 backdrop-blur-md shadow-lg text-black/80 hover:text-black rounded-full transition-all hover:scale-105 active:scale-95 group/reload"
              title="Reload App"
            >
              <RefreshCw size={20} className="group-hover/reload:rotate-180 transition-transform duration-700 ease-out" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
