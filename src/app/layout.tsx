import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Loader from "@/components/ui/Loader";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PageTransition from "@/components/ui/PageTransition";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProductHierarchy, getFeaturedSubSeries } from "@/lib/products";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_NAME = "Aulmo Bangladesh";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — A Century of Specialized Switches`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "AULMO Electric International: switches, sockets and control panels built to a single 86mm module — glass, wood, antique bronze and high-gloss finishes for contemporary architecture.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [series, featured] = await Promise.all([getProductHierarchy(), getFeaturedSubSeries()]);

  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full bg-ink text-paper">
        <Loader />
        <ScrollProgress />
        <CustomCursor />
        <Navbar series={series} featured={featured} />
        <PageTransition>{children}</PageTransition>
        <Footer series={series} />
      </body>
    </html>
  );
}
