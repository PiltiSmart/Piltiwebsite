import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download SmartyApp | PiltiSmart",
  description: "Get the latest versions of SmartyApp for iOS, Android, Windows, macOS, and Linux. Seamlessly control and monitor your smart devices on any platform.",
  openGraph: {
    title: "Download SmartyApp | PiltiSmart",
    description: "Get the latest versions of SmartyApp for iOS, Android, Windows, macOS, and Linux. Seamlessly control and monitor your smart devices on any platform.",
    type: "website",
    url: "https://piltismart.com/download",
  },
};

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
