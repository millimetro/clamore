import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clamore.bergamo.it";
const siteName = "Clamore Festival";
const defaultDescription = "Clamore Festival è un progetto ideato, organizzato e promosso da Ink Club APS in collaborazione con diverse realtà di Bergamo. Festival musicale gratuito per valorizzare i progetti musicali della città e della provincia.";
const defaultImage = `${siteUrl}/logo/logo.svg`;

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  noindex?: boolean;
}

export function generateMetadata({
  title,
  description = defaultDescription,
  image = defaultImage,
  url,
  type = "website",
  noindex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const canonicalUrl = url || siteUrl;

  return {
    title: fullTitle,
    description,
    keywords: [
      "Clamore Festival",
      "Festival musicale Bergamo",
      "Musica Bergamo",
      "Festival gratuito Bergamo",
      "Ink Club APS",
      "Eventi musicali Bergamo",
      "Musica dal vivo Bergamo",
      "Festival musica originale",
    ],
    authors: [{ name: "Ink Club APS" }],
    creator: "Ink Club APS",
    publisher: "Ink Club APS",
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
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
    openGraph: {
      type,
      locale: "it_IT",
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@clamorefestival",
    },
    alternates: {
      canonical: canonicalUrl,
    },
    metadataBase: new URL(siteUrl),
    verification: {
      // Add your verification codes here when available
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
    },
  };
}

export function generateStructuredData({
  type = "Organization",
  name = siteName,
  url = siteUrl,
  logo = defaultImage,
  description = defaultDescription,
  sameAs = [
    "https://www.instagram.com/clamore.festival/",
    "https://www.facebook.com/clamorebergamo/",
  ],
}: {
  type?: "Organization" | "Event" | "MusicEvent";
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
} = {}) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
    name,
    url,
    logo,
    description,
    sameAs,
  };

  if (type === "Organization") {
    return {
      ...baseData,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bergamo",
        addressRegion: "Lombardia",
        addressCountry: "IT",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "clamore.bergamo@gmail.com",
        contactType: "customer service",
      },
    };
  }

  return baseData;
}

