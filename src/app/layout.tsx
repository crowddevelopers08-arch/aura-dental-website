import type { Metadata } from "next";
import { EB_Garamond, Open_Sans } from "next/font/google";
import "./globals.css";

/*
 * The source site self-hosts exactly these two families through HubSpot's
 * /_hcms/googlefonts/ endpoint:
 *   Open Sans   400, 700          -> body copy
 *   EB Garamond 400, 500, 600, 700 -> every h1-h6
 */
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-open-sans",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-eb-garamond",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://auradental.ai"),
  title: "Aura Dental Hyderabad | Comfort-First Dental Clinic in Madinaguda",
  description:
    "A Premium dental care clinic that blending expertise, luxury & warmth. Located in Madeenaguda, Aura Dental is your go-to clinic led by Dr. Siva Nagini. Discover your smile Aura at Aura Dental.",
  icons: { icon: "/images/favicon.ico" },
  openGraph: {
    title: "Aura Dental Hyderabad | Comfort-First Dental Clinic in Madinaguda",
    description:
      "A Premium dental care clinic that blending expertise, luxury & warmth. Located in Madeenaguda, Aura Dental is your go-to clinic led by Dr. Siva Nagini. Discover your smile Aura at Aura Dental.",
    url: "https://auradental.ai",
    images: [{ url: "/images/home.jpg", width: 1201, height: 631, alt: "home" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura Dental Hyderabad | Comfort-First Dental Clinic in Madinaguda",
    description:
      "A Premium dental care clinic that blending expertise, luxury & warmth. Located in Madeenaguda, Aura Dental is your go-to clinic led by Dr. Siva Nagini. Discover your smile Aura at Aura Dental.",
    images: ["/images/home.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${openSans.variable} ${ebGaramond.variable}`}>
      {/* Chrome lives in `(site)/layout.tsx`; this layout only carries the
          document shell, fonts and site-wide metadata. */}
      <body className="bg-white antialiased">{children}</body>
    </html>
  );
}


// hijj