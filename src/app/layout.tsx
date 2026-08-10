import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Loader from "@/components/ui/Loader";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PageTransition from "@/components/ui/PageTransition";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/ui/ChatWidget";
import { getProductHierarchy, getFeaturedSubSeries } from "@/lib/products";
import { getCircuitBreakerCategories } from "@/lib/circuit-breakers";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

// Loaded as the true variable font (not a fixed weight list) so headings
// using `[font-stretch:114%]` get real width-axis glyph data instead of the
// browser faking the stretch by scaling static letterforms — which is what
// was causing the soft/blurry edges on bold display text.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_TITLE = `${SITE_NAME} — Switches, Sockets & Control Panels`;
const SITE_DESCRIPTION =
  "AULMO Electric International (AULMO BD): switches, sockets and control panels built to a single 86mm module — glass, wood, antique bronze and high-gloss finishes for contemporary architecture. Showroom in Dhaka, Bangladesh.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "AULMO",
    "AULMO BD",
    "AULMO Bangladesh",
    "AULMO Electric",
    "AULMO Electric International",
    "AULMO Switch",
    "AULMO Socket",
    "switch Bangladesh",
    "socket Bangladesh",
    "luxury switch Bangladesh",
    "switches Bangladesh",
    "sockets Bangladesh",
    "electrical switches Dhaka",
  ],
  // No blanket `alternates.canonical` here on purpose: Next.js does not deep-merge
  // `alternates` between layout and page, so a fixed value here would silently
  // become every page's canonical unless a page explicitly overrides it. Every
  // route below sets its own correct self-referencing canonical instead.
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/marketing/products-overview-banner.png",
        width: 1823,
        height: 863,
        alt: "AULMO switch and socket range",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/marketing/products-overview-banner.png"],
  },
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "AULMO Electric International",
  alternateName: ["AULMO BD", "AULMO Bangladesh", "AULMO Electric Bangladesh"],
  url: SITE_URL,
  logo: `${SITE_URL}/brand/aulmo-logo.png`,
  image: `${SITE_URL}/marketing/products-overview-banner.png`,
  telephone: "+8801720310552",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Khaza Electric Market, 153 Nawabpur Rd",
    addressLocality: "Dhaka",
    postalCode: "1100",
    addressCountry: "BD",
  },
  sameAs: ["https://www.facebook.com/aulmoepbd2020/"],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [series, featured, circuitBreakerCategories] = await Promise.all([
    getProductHierarchy(),
    getFeaturedSubSeries(),
    getCircuitBreakerCategories(),
  ]);

  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full bg-ink text-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
        />
        <Loader />
        <ScrollProgress />
        <CustomCursor />
        <Navbar series={series} featured={featured} circuitBreakerCategories={circuitBreakerCategories} />
        <PageTransition>{children}</PageTransition>
        <Footer series={series} />
        <ChatWidget />
      </body>
    </html>
  );
}
