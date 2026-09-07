import type { Metadata } from "next";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import CosmeticTreatments from "@/components/services/CosmeticTreatments";
import { SERVICES } from "@/data/services";

const service = SERVICES["cosmetic-dentistry"];

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
};

export default function Page() {
  return (
    <ServicePageTemplate service={service}>
      <CosmeticTreatments />
    </ServicePageTemplate>
  );
}
