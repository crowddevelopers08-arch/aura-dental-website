import type { Metadata } from "next";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { SERVICES } from "@/data/services";

const service = SERVICES["root-canal-treatment"];

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
};

export default function Page() {
  return <ServicePageTemplate service={service} />;
}
