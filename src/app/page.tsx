import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Script from "next/script";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />

      {/* Structured Data for SEO */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "name": "CompressClick",
                "url": "https://compressclick.com",
                "description": "Free AI-powered image compression tool that reduces file size by up to 90% while maintaining visual quality.",
                "applicationCategory": "Multimedia",
                "operatingSystem": "All",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "featureList": [
                  "Compress images without losing quality",
                  "Reduce file size by up to 90%",
                  "No signup required",
                  "Free to use",
                  "Bulk image compression",
                  "Download as ZIP"
                ]
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How does image compression work?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our AI-powered compression technology analyzes each image to identify areas where data can be reduced without affecting visual quality. It uses advanced algorithms to remove unnecessary metadata, optimize color palettes, and apply smart compression techniques specific to each image type."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Will compression affect image quality?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our compression technology is designed to maintain visual quality while reducing file size. In most cases, the compressed images are visually indistinguishable from the originals, even though they may be up to 90% smaller in file size."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What image formats are supported?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We support all major image formats including JPG/JPEG, PNG, WebP, GIF, and SVG. Each format is compressed using techniques optimized for that specific file type."
                    }
                  }
                ]
              },
              {
                "@type": "Organization",
                "name": "CompressClick",
                "url": "https://compressclick.com",
                "logo": "https://compressclick.com/logo.svg",
                "description": "CompressClick provides free AI-powered image compression tools to help optimize images for websites, apps, and sharing."
              }
            ]
          })
        }}
      />
    </div>
  );
}
