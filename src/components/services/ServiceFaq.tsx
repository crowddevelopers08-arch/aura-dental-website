import Accordion from "@/components/ui/Accordion";
import IconHeading from "@/components/ui/IconHeading";
import type { FaqItem } from "@/data/services";

export default function ServiceFaq({ items }: { items: FaqItem[] }) {
  return (
    <section className="bg-white px-5 py-[30px] md:py-[50px]">
      <div className="mx-auto max-w-[900px]">
        {/* One centred `.media-content-section`: icon + <h2>FAQ</h2> */}
        <IconHeading
          icon="/images/faq-costumer-service-1.svg"
          iconAlt="faq-costumer-service 1"
          heading="FAQ"
          align="center"
          className="mb-5 md:mb-8"
        />
        <Accordion items={items} tone="light" defaultOpen={null} />
      </div>
    </section>
  );
}
