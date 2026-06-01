import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartyApp™ Portal - Live IoT Management | PiltiSmart",
  description: "Access your devices dynamically via the integrated SmartyApp portal. Configure telemetry thresholds, register new IoT switches, and view real-time operations.",
  openGraph: {
    title: "SmartyApp™ Portal - Live IoT Management | PiltiSmart",
    description: "Access your devices dynamically via the integrated SmartyApp portal. Configure telemetry thresholds, register new IoT switches, and view real-time operations.",
    type: "website",
    url: "https://piltismart.com/smartyapp",
  },
};

export default function SmartyAppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
