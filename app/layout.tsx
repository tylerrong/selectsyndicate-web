import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-select-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Select Syndicate — A different kind of access.",
  description:
    "Select Syndicate connects Select members and institutional partners with curated private-market opportunities, from mature seed to pre-IPO.",
  robots: { index: false, follow: false },
  icons: { icon: "/assets/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0a0e14",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plexSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-bg font-sans text-ink">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
