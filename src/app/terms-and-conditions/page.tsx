import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import LegalContent, { type LegalBlock } from "@/components/sections/LegalContent";
import legal from "@/data/legal.json";

export const metadata: Metadata = {
  title: "Terms and Conditions | Aura Dental",
  description:
    "The terms and conditions governing your use of the Aura Dental website and services.",
};

export default function Page() {
  return (
    <>
      <PageHero title="Terms and Conditions" />
      <LegalContent blocks={legal.terms as LegalBlock[]} />
    </>
  );
}
