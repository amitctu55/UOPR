import type { Metadata } from "next";
import { Figtree, Sora } from "next/font/google";
import { Providers } from "@/components/providers";
import { ThemeInit } from "@/components/theme-init";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "UPCHAR — Enterprise Healthcare Platform",
    template: "%s · UPCHAR",
  },
  description:
    "Secure, scalable healthcare management for patients, doctors, hospitals, and administrators.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${figtree.variable} font-sans`}>
        <Providers>
          <ThemeInit />
          {children}
        </Providers>
      </body>
    </html>
  );
}
