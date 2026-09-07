import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import LegalContent, { type LegalBlock } from "@/components/sections/LegalContent";
import legal from "@/data/legal.json";

export const metadata: Metadata = {
  title: "Privacy Policy | Aura Dental",
  description:
    "How Aura Dental collects, uses and discloses your information when you use our website and services.",
};

export default function Page() {
  return (
    <>
      <PageHero title="Privacy Policy" />
      <LegalContent blocks={legal.privacy as LegalBlock[]} />
    </>
  );
}
