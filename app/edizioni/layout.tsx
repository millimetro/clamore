import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "../lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Edizioni",
  description: "Esplora tutte le edizioni di Clamore Festival dal 2017 ad oggi. Scopri la storia del festival attraverso gli anni.",
  url: "/edizioni",
});

export default function EdizioniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
