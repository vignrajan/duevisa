import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://duevisa.com"),

  title: {
    default: "DueVisa — Immigration Deadline Tracker",
    template: "%s | DueVisa",
  },
  description:
    "DueVisa tracks every visa, permit, and immigration document — and reminds you before deadlines hit. Never miss an H-1B, EAD, green card, or passport renewal.",
  keywords: [
    "immigration deadline tracker",
    "visa expiry reminder",
    "H-1B renewal",
    "EAD renewal",
    "green card renewal",
    "F-1 OPT tracker",
    "immigration document tracker",
  ],
  authors: [{ name: "DueVisa" }],
  creator: "DueVisa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://duevisa.com",
    siteName: "DueVisa",
    title: "DueVisa — Know exactly when to act.",
    description:
      "Track every visa, permit, and immigration deadline. Get reminded at 180, 90, 60, 30, and 7 days before expiry.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DueVisa — Immigration Deadline Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DueVisa — Immigration Deadline Tracker",
    description: "Track every visa, permit, and immigration deadline.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-syne antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="duevisa-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
