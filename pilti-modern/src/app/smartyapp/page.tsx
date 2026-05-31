"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Maximize2, Minimize2, Wifi, WifiOff, AlertCircle, RefreshCw } from "lucide-react";

const SMARTYAPP_URL = "https://smartyapp.piltismart.com/";

export default function SmartyAppPage() {
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
    if (iframeRef.current) {
      iframeRef.current.src = `${SMARTYAPP_URL}?t=${Date.now()}`;
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((f) => !f);
  }, []);

  return (
    <div
      className={`flex flex-col bg-[#0B0F1A] ${
        isFullscreen ? "fixed inset-0 z-[200]" : "min-h-screen pt-16"
      }`}
    >
      {/* Browser Mockup */}
      <div className={`flex flex-col flex-1 items-center justify-center ${isFullscreen ? "" : "p-6"}`}>
        <div
          className={`flex flex-col w-full max-w-5xl bg-[#0D1120] group overflow-hidden transition-all duration-300 ${
            isFullscreen ? "h-full max-w-none" : "h-[80vh] rounded-2xl border border-white/[0.08] shadow-2xl ring-1 ring-white/5"
          }`}
        >
          {/* Device Mockup Content */}
          <div className="relative flex-1 min-h-0 bg-[#0D1120] flex items-center justify-center">
            <div className="w-full h-full relative">
              
              {/* Status Badge - Top Left */}
              <div className="absolute top-6 left-6 z-[100] flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md transition-all select-none">
                {isOnline ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400 font-mono">Smarty app is live</span>
                  </>
                ) : (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-rose-400 font-mono">Smarty app offline</span>
                  </>
                )}
              </div>

              {/* Loading State */}
              {isLoading && !hasError && (
                <div className="absolute inset-0 z-10 bg-[#0D1120] flex flex-col items-center justify-center gap-6">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-2 border-white/[0.08]" />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#0078D4] animate-spin" />
                    <div
                      className="absolute inset-2 rounded-full border-2 border-transparent border-t-[#60A5FA] animate-spin"
                      style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-white/80 font-semibold text-sm mb-1">Loading SmartyApp™</p>
                    <p className="text-white/40 text-xs font-mono">smartyapp.piltismart.com</p>
                  </div>
                </div>
              )}

              {/* Keep the iframe in DOM to prevent blocking or unmounting issues */}
              <iframe
                ref={iframeRef}
                src={SMARTYAPP_URL}
                onLoad={handleLoad}
                title="SmartyApp™"
                className={`w-full h-full border-0 block ${(hasError || isLoading) ? "hidden" : ""}`}
                allow="geolocation; fullscreen; clipboard-read; clipboard-write"
              />

              {/* Error/Offline Overlay State */}
              {hasError && (
                <div className="absolute inset-0 z-20 bg-[#0D1120] flex flex-col items-center justify-center p-6">
                  <div className="max-w-md w-full bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl group-hover:bg-rose-500/15 transition-all duration-500" />
                    
                    <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(244,63,94,0.1)]">
                      <WifiOff size={28} />
                    </div>

                    <h3 className="text-white font-semibold text-lg mb-2">Connection Unreachable</h3>
                    <p className="text-white/60 text-sm mb-6 leading-relaxed">
                      We were unable to connect to the SmartyApp service. The application might be offline, undergoing maintenance, or you may have lost internet connectivity.
                    </p>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={handleRetry}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium text-sm transition-all hover:border-white/20 active:scale-95"
                      >
                        <RefreshCw size={16} />
                        Retry Connection
                      </button>
                      <a
                        href={SMARTYAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-white/60 text-xs font-mono transition-colors"
                      >
                        Try opening smartyapp.piltismart.com directly
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Floating Action Controls - Top Right */}
              {!isLoading && !hasError && (
                <div className="absolute top-6 right-6 z-[100] flex items-center gap-3">
                  {/* Reload Button */}
                  <button
                    onClick={handleRetry}
                    className="p-4 bg-[#1C2130]/80 hover:bg-[#1C2130] border border-white/10 backdrop-blur-md shadow-lg text-white/80 hover:text-white rounded-full transition-all hover:scale-105 active:scale-95 group/reload"
                    title="Reload App"
                  >
                    <RefreshCw size={20} className="group-hover/reload:rotate-180 transition-transform duration-700 ease-out" />
                  </button>

                  {/* Fullscreen Button */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-4 bg-[#0078D4] hover:bg-[#106EBE] shadow-[0_0_20px_rgba(0,120,212,0.4)] text-white rounded-full transition-all hover:scale-105 active:scale-95 group/btn"
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
