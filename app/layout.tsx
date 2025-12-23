import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import GridOverlay from "./components/tools/GridOverlay";
import ConditionalLoader from "./components/Loader/ConditionalLoader";
import { GSAPTimelineViewer } from "./components/tools/GSAPTimeline";
import Menu from "./components/Menu/Menu";
import NavigationSimple from "./components/NavigationSimple";
import LenisProvider from "./components/tools/LenisProvider";
import { LoaderProvider } from "./contexts/LoaderContext";

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

export const metadata: Metadata = {
  title: "Clamore",
  description: "Clamore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${benzin.variable} antialiased`}
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
