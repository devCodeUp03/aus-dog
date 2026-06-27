import type { Metadata } from "next";
import CrazyPetsHero from "./components/Client";

export const metadata: Metadata = {
  title: "Top Dog Working Dog",
  description:
    "Shop premium working dog collars in Australia.",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Top Dog Working Dog",
    url: "https://topdogworkingdog.com",
    description:
      "Australian supplier of premium working dog collars and hunting dog collars.",
    areaServed: "Australia",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <CrazyPetsHero />
    </>
  );
}