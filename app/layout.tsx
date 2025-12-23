import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import GridOverlay from "./components/tools/GridOverlay";
import ConditionalLoader from "./components/Loader/ConditionalLoader";
import { GSAPTimelineViewer } from "./components/tools/GSAPTimeline";
import Menu from "./components/Menu/Menu";
import LenisProvider from "./components/tools/LenisProvider";
import { LoaderProvider } from "./contexts/LoaderContext";
import { generateMetadata as generateSEOMetadata, generateStructuredData } from "./lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const benzin = localFont({
  variable: "--font-benzin",
  display: "swap",
  src: [
    // {
    //   path: "../public/fonts/Benzin/Benzin Regular.ttf",
    //   weight: "400",
    //   style: "normal",
    // },
    // {
    //   path: "../public/fonts/Benzin/Benzin Medium.ttf",
    //   weight: "500",
    //   style: "normal",
    // },
    // {
    //   path: "../public/fonts/Benzin/Benzin Semibold.ttf",
    //   weight: "600",
    //   style: "normal",
    // },
    {
      path: "../public/fonts/Benzin/Benzin Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Benzin/Benzin Extra Bold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
});

const generalSans = localFont({
  variable: "--font-general-sans",
  display: "swap",
  src: [
    {
      path: "../public/fonts/General Sans/GeneralSans-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/General Sans/GeneralSans-ExtralightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/General Sans/GeneralSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/General Sans/GeneralSans-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/General Sans/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/General Sans/GeneralSans-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/General Sans/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/General Sans/GeneralSans-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/General Sans/GeneralSans-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/General Sans/GeneralSans-SemiboldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/General Sans/GeneralSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/General Sans/GeneralSans-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
});

export const metadata = generateSEOMetadata();

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
  const structuredData = generateStructuredData();

  return (
    <html lang="it">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${benzin.variable} ${generalSans.variable} antialiased`}
      >
        <LoaderProvider>
          <LenisProvider>
            <GridOverlay />
            {/* <NavigationSimple /> */}
            {/* <Menu /> */}
            {/* <ConditionalLoader /> */}
            {children}
          
          
          {/* GSAP Timeline Viewer - Solo in development */}
          {/* {process.env.NODE_ENV === "development" && (
            <GSAPTimelineViewer 
              timelineId="loader-timeline"
            />
          )} */}
          </LenisProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
