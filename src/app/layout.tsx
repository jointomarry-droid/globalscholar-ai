import type { Metadata } from "next";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { FirebaseProvider } from "@/components/layout/firebase-provider";
import { I18nProvider } from "@/lib/i18n/context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://globalscholar.ai"),
  title: {
    default: "GlobalScholar AI - From Admission to Global Career | AI-Powered Education Ecosystem",
    template: "%s | GlobalScholar AI",
  },
  description:
    "GlobalScholar AI is the trusted AI-powered global education ecosystem helping students discover 500,000+ scholarships from 50,000+ universities across 200+ countries. From admission to global career — your journey powered by AI.",
  keywords: [
    "scholarships",
    "study abroad",
    "universities",
    "AI scholarship matching",
    "fully funded scholarships",
    "international students",
    "graduate school",
    "PhD funding",
    "Masters scholarships",
    "education technology",
    "AI education",
    "global education",
    "scholarship finder",
    "university rankings",
    "study abroad programs",
    "research funding",
    "career guidance",
    "student loans",
    "education loans",
    "IELTS preparation",
    "TOEFL preparation",
    "visa assistance",
    "admission guidance",
    "university admissions",
    "scholarship applications",
    "AI document analyzer",
    "SOP writing",
    "cover letter writing",
    "CV builder",
    "career prediction",
    "research matching",
  ],
  authors: [{ name: "GlobalScholar AI" }],
  creator: "GlobalScholar AI",
  publisher: "GlobalScholar AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://globalscholar.ai",
    siteName: "GlobalScholar AI",
    title: "GlobalScholar AI - From Admission to Global Career | AI-Powered Education Ecosystem",
    description:
      "The trusted AI-powered global education ecosystem. Discover 500,000+ scholarships, 50,000+ universities across 200+ countries. Your journey from admission to global career.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GlobalScholar AI - AI-Powered Global Education Ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GlobalScholar AI - From Admission to Global Career",
    description: "AI-powered global education ecosystem. Discover scholarships, universities, and career opportunities worldwide.",
    images: ["/og-image.png"],
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
  alternates: {
    canonical: "https://globalscholar.ai",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <ThemeProvider>
          <I18nProvider>
            <FirebaseProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </FirebaseProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
