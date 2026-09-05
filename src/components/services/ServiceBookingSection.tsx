import EnquiryForm from "@/components/ui/EnquiryForm";

/** Green booking band that sits under the hero on every service page. */
export default function ServiceBookingSection() {
  return (
    <section className="bg-[#1d4231] px-5 py-[30px] md:py-[50px]">
      <div className="mx-auto max-w-[1240px]">
        <h2
          id="Book-Free-Consultation"
          className="mb-5 md:mb-8 text-center text-[32px] font-bold leading-[1.3] text-white"
        >
          Book Free Consultation
        </h2>
        <EnquiryForm />
      </div>
    </section>
  );
}
