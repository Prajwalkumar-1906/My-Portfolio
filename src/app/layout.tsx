import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/ai/ChatWidget";
import { CommandPalette } from "@/components/modals/CommandPalette";
import { EasterEggListener } from "@/components/ui/EasterEggListener";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prajwalkumar-madiwal.vercel.app"),
  title: {
    default: "PRAJWAL | Streaming Interactive Portfolio | Prajwalkumar Madiwal",
    template: "%s | Prajwalkumar Madiwal"
  },
  description: "World-class, Netflix-style 3D interactive portfolio for Prajwalkumar Madiwal — Final-Year CSE, AI/ML & Full-Stack Engineer, Data & Business Analyst, and Public Speaker.",
  keywords: [
    "Prajwalkumar Madiwal",
    "Prajwal Madiwal",
    "AI/ML Engineer Bengaluru",
    "Full-Stack Developer",
    "ABB AI Intern",
    "RRCE Computer Science",
    "Data Analyst",
    "Public Speaker Bengaluru",
    "PlaceWise",
    "Chukta"
  ],
  authors: [{ name: "Prajwalkumar Madiwal", url: "https://www.linkedin.com/in/prajwalkumarm/" }],
  creator: "Prajwalkumar Madiwal",
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://prajwalkumar-madiwal.vercel.app",
    title: "PRAJWAL | The Interactive Show | Prajwalkumar Madiwal",
    description: "Streaming-inspired 3D portfolio featuring AI/ML systems, Full-Stack applications, and Keynote masterclasses.",
    siteName: "Prajwalkumar Madiwal Portfolio",
    images: [
      {
        url: "/assets/webp/prajwal_hero.webp",
        width: 1200,
        height: 630,
        alt: "Prajwalkumar Madiwal Keynote Speaker & Engineer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Prajwalkumar Madiwal | Interactive Portfolio",
    description: "Explore AI/ML projects, Full-Stack architectures, and speaker masterclasses in Netflix-grade 3D depth.",
    images: ["/assets/webp/prajwal_hero.webp"]
  },
  robots: {
    index: true,
    follow: true
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Prajwalkumar Madiwal",
  "alternateName": "Prajwal",
  "jobTitle": "AI/ML & Full-Stack Engineer | Data & Business Analyst",
  "worksFor": {
    "@type": "Organization",
    "name": "ABB"
  },
  "alumniOf": [
    {
      "@type": "EducationalOrganization",
      "name": "Rajarajeswari College of Engineering"
    },
    {
      "@type": "EducationalOrganization",
      "name": "Tungal PU College"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bengaluru",
    "addressRegion": "Karnataka",
    "addressCountry": "India"
  },
  "email": "mailto:pkm.digi@gmail.com",
  "sameAs": [
    "https://www.linkedin.com/in/prajwalkumarm/",
    "https://github.com/Prajwalkumar-1906",
    "https://www.instagram.com/foreverprajwalkumar/",
    "https://x.com/prajwalkumar_19"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable} dark scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-[#141414] text-white selection:bg-[#E50914] selection:text-white min-h-screen relative antialiased font-inter">
        {/* Subtle Film Grain Noise Overlay */}
        <div className="film-grain" aria-hidden="true" />
        
        {/* Global Easter Egg & Konami code listener */}
        <EasterEggListener />

        {/* Global Command Palette (Ctrl/Cmd+K) */}
        <CommandPalette />

        {/* App Content */}
        <main className="relative z-10 min-h-screen flex flex-col">
          {children}
        </main>

        {/* Floating AI Voice & Chat Assistant */}
        <ChatWidget />
      </body>
    </html>
  );
}
