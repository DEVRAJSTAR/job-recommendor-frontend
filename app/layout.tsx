import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IT Career Path - Find Your Next IT Career Based on Experience",
  description: "Discover your perfect IT career path by analyzing your past 2 years of experience. Get personalized job recommendations and trending opportunities with skill gap analysis.",
  keywords: "IT career, job recommendation, career path, tech jobs, skills analysis, IT professionals",
  authors: [{ name: "IT Career Path Platform" }],
  openGraph: {
    title: "IT Career Path - Find Your Next IT Career",
    description: "Discover your perfect IT career path with AI-powered recommendations",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
