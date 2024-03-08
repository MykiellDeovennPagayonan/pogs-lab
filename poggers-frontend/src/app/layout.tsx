import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pog Museum",
  description: "Very cool collection website for pogs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="p-12 bg-gray-900 dark">
      <body className={inter.className}>{children}</body>
      {/* <Toaster /> */}
    </html>
  );
}
