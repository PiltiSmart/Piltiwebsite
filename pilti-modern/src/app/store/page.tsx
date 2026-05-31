"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Maximize2, Minimize2, Wifi, WifiOff, AlertCircle, RefreshCw, Eraser } from "lucide-react";

const STORE_URL = "https://piltistore.com/";

export default function StorePage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

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
        await fetch(STORE_URL, { mode: "no-cors", cache: "no-store" });
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
    if (iframeRef.current) {
      iframeRef.current.src = `${STORE_URL}?t=${Date.now()}`;
    }
  }, []);

  const handleClearCache = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    setRetryCount((c) => c + 1);
    if (iframeRef.current) {
      iframeRef.current.src = `${STORE_URL}?clear_cache=${Date.now()}&nocache=${Math.random()}&logout=true`;
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((f) => !f);
  }, []);

  return (
    <div
      className={`flex flex-col bg-[#F2F2F2] ${isFullscreen ? "fixed inset-0 z-[200]" : "min-h-screen pt-16"
        }`}
    >
      {/* Browser Mockup */}
      <div className={`flex flex-col flex-1 items-center justify-center ${isFullscreen ? "" : "p-6"}`}>
        <div
          className={`flex flex-col w-full max-w-5xl bg-white group overflow-hidden transition-all duration-300 ${isFullscreen ? "h-full max-w-none" : "h-[80vh] rounded-2xl border border-black/[0.08] shadow-2xl ring-1 ring-black/5"
            }`}
        >
          {/* Device Mockup Content */}
          <div className="relative flex-1 min-h-0 bg-white flex items-center justify-center">
            <div className="w-full h-full relative">

              {/* Status Badge - Top Center */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-black/10 backdrop-blur-md shadow-sm transition-all select-none">
                {isOnline ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-600 font-mono">Pilti Store is live</span>
                  </>
                ) : (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-rose-600 font-mono">Pilti Store offline</span>
                  </>
                )}
              </div>

              {/* Loading State */}
              {isLoading && !hasError && (
                <div className="absolute inset-0 z-10 bg-[#F8F9FA] flex flex-col items-center justify-center gap-6 animate-pulse">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-2 border-black/[0.06]" />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#0078D4] animate-spin" />
                    <div
                      className="absolute inset-2 rounded-full border-2 border-transparent border-t-[#60A5FA] animate-spin"
                      style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-black/80 font-semibold text-sm mb-1">Loading Pilti Store™</p>
                    <p className="text-black/40 text-xs font-mono">piltistore.com</p>
                  </div>
                </div>
              )}

              {/* Keep the iframe in DOM to prevent blocking or unmounting issues */}
              <iframe
                ref={iframeRef}
                src={STORE_URL}
                onLoad={handleLoad}
                title="Pilti Store™"
                className={`w-full h-full border-0 block ${(hasError || isLoading) ? "hidden" : ""}`}
                allow="geolocation; fullscreen; clipboard-read; clipboard-write"
              />

              {/* Error/Offline Overlay State */}
              {hasError && (
                <div className="absolute inset-0 z-20 bg-[#F8F9FA] flex flex-col items-center justify-center p-6">
                  <div className="max-w-md w-full bg-white border border-black/[0.08] rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl group-hover:bg-rose-500/10 transition-all duration-500" />

                    <div className="w-16 h-16 bg-rose-500/5 border border-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <WifiOff size={28} />
                    </div>

                    <h3 className="text-black font-semibold text-lg mb-2">Connection Unreachable</h3>
                    <p className="text-black/60 text-sm mb-6 leading-relaxed">
                      We were unable to connect to the Pilti Store service. The application might be offline, undergoing maintenance, or you may have lost internet connectivity.
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
                        href={STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black/40 hover:text-black/60 text-xs font-mono transition-colors"
                      >
                        Try opening piltistore.com directly
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Floating Action Controls - Top Right */}
              {!isLoading && !hasError && (
                <div className="absolute top-6 right-6 z-[100] flex items-center gap-3">
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

                  {/* Fullscreen Button */}
                  <button
                    onClick={toggleFullscreen}
                    className="cursor-pointer p-4 bg-[#0078D4] hover:bg-[#106EBE] shadow-[0_0_20px_rgba(0,120,212,0.4)] text-white rounded-full transition-all hover:scale-105 active:scale-95 group/btn"
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? (
                      <Minimize2 size={20} className="group-hover/btn:rotate-180 transition-transform duration-500" />
                    ) : (
                      <Maximize2 size={20} className="group-hover/btn:rotate-180 transition-transform duration-500" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
