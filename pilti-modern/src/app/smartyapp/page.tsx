"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Wifi, WifiOff, AlertCircle, RefreshCw, Eraser, ExternalLink, Camera, ChevronDown, Smartphone } from "lucide-react";

// Use the raw app query parameter so the external black background is skipped entirely
const SMARTYAPP_URL = "https://smartyapp.piltismart.com/?isApp=true";

const DEVICE_PRESETS = {
  // iPhones
  "iphone-16-pro-max": { name: "iPhone 16 Pro Max", width: 440, height: 956, category: "iPhone" },
  "iphone-16-pro":     { name: "iPhone 16 Pro",     width: 402, height: 874, category: "iPhone" },
  "iphone-16":         { name: "iPhone 16",         width: 393, height: 852, category: "iPhone" },
  "iphone-15":         { name: "iPhone 15",         width: 393, height: 852, category: "iPhone" },
  "iphone-se":         { name: "iPhone SE",         width: 375, height: 667, category: "iPhone" },
  // Android
  "pixel-9-pro":       { name: "Pixel 9 Pro",       width: 412, height: 892, category: "Android" },
  "pixel-9":           { name: "Pixel 9",           width: 412, height: 892, category: "Android" },
  "samsung-s24-ultra": { name: "Galaxy S24 Ultra",  width: 412, height: 915, category: "Android" },
  "samsung-s24":       { name: "Galaxy S24",        width: 360, height: 780, category: "Android" },
  "samsung-a15":       { name: "Galaxy A15",        width: 384, height: 854, category: "Android" },
  // Tablets
  "ipad-pro-13":       { name: "iPad Pro 13\u2033",    width: 1032, height: 1376, category: "Tablet" },
  "ipad-air":          { name: "iPad Air",          width: 820,  height: 1180, category: "Tablet" },
  "ipad-mini":         { name: "iPad Mini",         width: 744,  height: 1133, category: "Tablet" },
  "galaxy-tab-s9":     { name: "Galaxy Tab S9",     width: 800,  height: 1280, category: "Tablet" },
} as const;

type DeviceKey = keyof typeof DEVICE_PRESETS;

export default function SmartyAppPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const deviceFrameRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState<DeviceKey>("iphone-16-pro");
  const [showDeviceMenu, setShowDeviceMenu] = useState(false);
  const [iframeSrc, setIframeSrc] = useState(SMARTYAPP_URL);
  const [showFlash, setShowFlash] = useState(false);

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

  const handlePopOut = useCallback(() => {
    const w = screen.width;
    const h = screen.height;
    window.open("https://smartyapp.piltismart.com", "SmartyApp", `noopener,noreferrer,width=${w},height=${h},top=0,left=0,resizable=no,scrollbars=yes`);
  }, []);

  const handleScreenshot = useCallback(async () => {
    if (!deviceFrameRef.current) return;
    try {
      // Get device frame position before the share dialog appears
      const rect = deviceFrameRef.current.getBoundingClientRect();

      // Use Screen Capture API to capture actual rendered pixels
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: "browser" } as MediaTrackConstraints,
        preferCurrentTab: true,
      } as DisplayMediaStreamOptions);

      const video = document.createElement("video");
      video.srcObject = stream;
      await video.play();

      // Small delay to ensure the frame is rendered
      await new Promise((r) => setTimeout(r, 150));

      // Flash effect
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 300);

      // Calculate scale between captured resolution and viewport
      const scaleX = video.videoWidth / window.innerWidth;
      const scaleY = video.videoHeight / window.innerHeight;

      // Crop coordinates mapped to captured resolution
      const cropX = rect.left * scaleX;
      const cropY = rect.top * scaleY;
      const cropW = rect.width * scaleX;
      const cropH = rect.height * scaleY;

      // Draw only the cropped device frame area
      const canvas = document.createElement("canvas");
      canvas.width = cropW;
      canvas.height = cropH;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(video, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

      // Stop the stream
      stream.getTracks().forEach((t) => t.stop());

      // Download the screenshot
      const link = document.createElement("a");
      link.download = `smartyapp-screenshot-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Screenshot failed:", err);
    }
  }, []);

  return (
    <div
      className="flex flex-col bg-[#F2F2F2] transition-colors duration-500 min-h-screen pt-16"
    >
      {/* Outer Browser Mockup Wrapper */}
      <div className="flex flex-col flex-1 items-center justify-center relative p-6">

        {/* Sleek Device Mockup Frame Container (Handles Light Theme and Sizing) */}
        {!hasError && (
          <div
            ref={deviceFrameRef}
            className="transition-all duration-500 flex items-center justify-center h-[88vh] bg-black rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative overflow-hidden border border-black/[0.06]"
            style={{ width: `${DEVICE_PRESETS[selectedDevice].width}px`, maxWidth: "100%" }}
          >
            {/* Screenshot flash overlay */}
            {showFlash && (
              <div className="absolute inset-0 z-50 bg-white animate-[flash_0.3s_ease-out] pointer-events-none" />
            )}
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

        {/* Status Badge - Top Right (above refresh controls) */}
        <div className="absolute top-2 right-6 z-[100] flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-black/10 backdrop-blur-md shadow-sm transition-all select-none">
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
          <div className="absolute top-14 right-6 z-[100] flex items-center gap-3">

            {/* Device Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDeviceMenu((v) => !v)}
                className="cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-white/80 hover:bg-white border border-black/10 backdrop-blur-md rounded-full shadow-lg transition-all active:scale-95"
              >
                <Smartphone size={14} className="text-black/60" />
                <span className="text-xs font-semibold text-black/80 whitespace-nowrap">{DEVICE_PRESETS[selectedDevice].name}</span>
                <ChevronDown size={14} className={`text-black/40 transition-transform duration-200 ${showDeviceMenu ? "rotate-180" : ""}`} />
              </button>

              {showDeviceMenu && (
                <>
                  {/* Backdrop to close menu */}
                  <div className="fixed inset-0 z-[99]" onClick={() => setShowDeviceMenu(false)} />

                  {/* Dropdown Menu */}
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl border border-black/10 rounded-2xl shadow-2xl z-[100] overflow-hidden py-1 max-h-[60vh] overflow-y-auto">
                    {(["iPhone", "Android", "Tablet"] as const).map((category) => (
                      <div key={category}>
                        <div className="px-4 py-2 text-[10px] uppercase tracking-wider font-bold text-black/30">{category}</div>
                        {Object.entries(DEVICE_PRESETS)
                          .filter(([, d]) => d.category === category)
                          .map(([key, d]) => (
                            <button
                              key={key}
                              onClick={() => {
                                setSelectedDevice(key as DeviceKey);
                                setShowDeviceMenu(false);
                              }}
                              className={`cursor-pointer w-full text-left px-4 py-2.5 flex items-center justify-between transition-all ${
                                selectedDevice === key
                                  ? "bg-[#0078D4]/10 text-[#0078D4]"
                                  : "text-black/70 hover:bg-black/5"
                              }`}
                            >
                              <span className="text-xs font-medium">{d.name}</span>
                              <span className="text-[10px] font-mono text-black/30">{d.width}×{d.height}</span>
                            </button>
                          ))}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

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

            {/* Pop Out Button - Opens in new browser tab */}
            <button
              onClick={handlePopOut}
              className="cursor-pointer p-4 bg-white/80 hover:bg-white border border-black/10 backdrop-blur-md shadow-lg text-black/80 hover:text-black rounded-full transition-all hover:scale-105 active:scale-95 group/popout"
              title="Open in New Window"
            >
              <ExternalLink size={20} className="group-hover/popout:translate-x-0.5 group-hover/popout:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        )}

        {/* Screenshot Button - Bottom Right */}
        {!isLoading && !hasError && (
          <button
            onClick={handleScreenshot}
            className="absolute bottom-6 right-6 z-[100] cursor-pointer p-4 bg-white/80 hover:bg-white border border-black/10 backdrop-blur-md shadow-lg text-black/80 hover:text-black rounded-full transition-all hover:scale-105 active:scale-95 group/screenshot"
            title="Take Screenshot"
          >
            <Camera size={20} className="group-hover/screenshot:scale-110 transition-transform duration-300" />
          </button>
        )}
      </div>
    </div>
  );
}
