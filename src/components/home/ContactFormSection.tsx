import EnquiryForm from "@/components/ui/EnquiryForm";

/**
 * Grey band directly under the hero. Its heading carries the
 * `#Book-Free-Consultation` anchor that every "Book Your Free Consultation"
 * button on the homepage scrolls to.
 */
export default function ContactFormSection() {
  return (
    <section className="bg-[#ececec] px-5 py-[30px] md:py-[50px]">
      <div className="mx-auto max-w-[1240px]">
        <h2
          id="Book-Free-Consultation"
          className="mb-7 text-center text-[32px] font-bold leading-[1.2] text-black"
        >
          Contact Us
        </h2>
        <EnquiryForm />
      </div>
    </section>
  );
}
