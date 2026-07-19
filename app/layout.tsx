import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "./fonts/inter-var-latin.woff2",
  weight: "100 900",
  variable: "--font-sans",
  display: "swap",
});

const sourceSerif = localFont({
  src: "./fonts/source-serif-4-var-latin.woff2",
  weight: "200 900",
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Todd Dong | Computer Science @ Carnegie Mellon",
  description:
    "Computer science at Carnegie Mellon, varsity swimmer, and photographer. I build software with an athlete's discipline.",
  openGraph: {
    title: "Todd Dong | Computer Science @ Carnegie Mellon",
    description:
      "Computer science at Carnegie Mellon, varsity swimmer, and photographer. I build software with an athlete's discipline.",
    url: "https://todddong.com",
    siteName: "Todd Dong",
    images: [
      {
        url: "/media/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pittsburgh skyline",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Todd Dong | Computer Science @ Carnegie Mellon",
    description:
      "Computer science at Carnegie Mellon, varsity swimmer, and photographer. I build software with an athlete's discipline.",
    images: ["/media/og-image.jpg"],
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${sourceSerif.variable} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}",
          }}
        />
        {children}
      </body>
    </html>
  );
}
