import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PageLoader from "./components/ui/PageLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Natalie Neysa Jessica Soesanto - Portfolio",
  description: "Portfolio website of Natalie Neysa Jessica Soesanto - Full-stack Developer. Explore my projects in Web3, organizations, and personal developments.",
  keywords: ["portfolio", "web developer", "full-stack", "React", "Next.js", "Web3", "Natalie Soesanto"],
  authors: [{ name: "Natalie Neysa Jessica Soesanto" }],
  openGraph: {
    title: "Natalie Neysa Jessica Soesanto - Portfolio",
    description: "Portfolio website showcasing my work as a full-stack developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PageLoader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
