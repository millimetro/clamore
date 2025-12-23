import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "../lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Manifesto",
  description: "Scopri la storia e la missione di Clamore Festival. Un progetto nato nel 2017 per valorizzare tutti i progetti musicali di Bergamo e provincia. Festival gratuito con palchi diffusi in città.",
  url: "/manifesto",
});

export default function ManifestoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

