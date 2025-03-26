import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CompressClick - Advanced Image Compression Tool",
  description: "Compress your images without losing quality. Reduce file size by up to 90% while maintaining visual quality. Perfect for websites, apps, and sharing.",
  keywords: ["image compression", "compress images", "image optimizer", "reduce image size", "image compressor"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
              <GoogleAnalytics gaId="G-V4LFFM8X6K" />

        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
