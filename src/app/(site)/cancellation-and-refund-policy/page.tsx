import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import LegalContent, { type LegalBlock } from "@/components/sections/LegalContent";
import legal from "@/data/legal.json";

export const metadata: Metadata = {
  title: "Cancellation and Refund Policy | Aura Dental",
  description:
    "How to reschedule or cancel an appointment with Aura Dental, and when amounts paid to us are refundable.",
};

export default function Page() {
  return (
    <>
      <PageHero title="Cancellation and Refund Policy" />
      <LegalContent blocks={legal.cancellation as LegalBlock[]} />
    </>
  );
}
