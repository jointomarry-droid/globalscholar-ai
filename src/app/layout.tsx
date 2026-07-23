import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "GlobalScholar AI - From Admission to Global Career | AI-Powered Education Ecosystem",
    template: "%s | GlobalScholar AI",
  },
  description:
    "GlobalScholar AI is the trusted AI-powered global education ecosystem helping students discover 500,000+ scholarships from 50,000+ universities across 200+ countries.",
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
