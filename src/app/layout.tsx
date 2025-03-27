import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Head from "next/head";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CompressClick - Free AI-Powered Image Compression Tool",
  description: "Compress your images without losing quality using our advanced AI technology. Reduce file size by up to 90% while maintaining visual quality. Free, no signup required, and perfect for websites, apps, and sharing.",
  keywords: [
    "image compression", 
    "compress images", 
    "image optimizer", 
    "reduce image size", 
    "image compressor", 
    "free image compression", 
    "AI image compression", 
    "lossless compression", 
    "bulk image compression", 
    "compress photos online",
    "optimize images for web",
    "reduce image file size",
    "compress PNG",
    "compress JPG",
    "compress JPEG",
    "compress WebP"
  ],
  authors: [{ name: "CompressClick Team" }],
  creator: "CompressClick",
  publisher: "CompressClick",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://compressclick.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CompressClick - Free AI-Powered Image Compression Tool",
    description: "Compress your images without losing quality using our advanced AI technology. Reduce file size by up to 90% while maintaining visual quality.",
    url: "https://compressclick.com",
    siteName: "CompressClick",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CompressClick - Image Compression Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CompressClick - Free AI-Powered Image Compression Tool",
    description: "Compress your images without losing quality using our advanced AI technology. Reduce file size by up to 90%.",
    images: ["https://compressclick.com/twitter-image.jpg"],
    creator: "@compressclick",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
         <Head>
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "CompressClick",
              "url": "https://www.compressclick.com/"
            }),
          }}
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
              <GoogleAnalytics gaId="G-V4LFFM8X6K" />

        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
