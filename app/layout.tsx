import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Todd Dong | Computer Science @ Carnegie Mellon",
  description: "Building high-performance systems — in code and in competition.",
  openGraph: {
    title: "Todd Dong | Computer Science @ Carnegie Mellon",
    description: "Building high-performance systems — in code and in competition.",
    url: "https://todddong.com",
    siteName: "Todd Dong",
    images: [
      {
        url: "/media/headshot.PNG",
        width: 1200,
        height: 630,
        alt: "Todd Dong - Computer Science @ Carnegie Mellon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Todd Dong | Computer Science @ Carnegie Mellon",
    description: "Building high-performance systems — in code and in competition.",
    images: ["/media/headshot.PNG"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}

