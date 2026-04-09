import type { Metadata, Viewport } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import LineOverlay from "@/components/LineOverlay";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JOPT 2026 Grand Final",
  description:
    "JOPT 2026 Grand Final イベントコンパニオンPWA — スケジュール・ギャラリー",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "JOPT GF",
  },
};

export const viewport: Viewport = {
  themeColor: "#1A4B8C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={notoSerifJP.className}>
      <body>
        <LineOverlay />
        <Header />
        <main className="flex-1 pb-16">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
