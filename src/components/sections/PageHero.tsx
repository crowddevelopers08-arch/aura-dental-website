import Button from "@/components/ui/Button";

type Props = {
  title: string;
  intro?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** The listing pages (/blogs, /newsletter) run their title flush left. */
  align?: "center" | "left";
  children?: React.ReactNode;
};

/** Beige-to-white hero band shared by the interior pages. */
export default function PageHero({
  title,
  intro,
  ctaLabel,
  ctaHref,
  align = "center",
  children,
}: Props) {
  // Less bottom padding than top: the gradient already fades to white, so a
  // deep bottom pad just stacks more white on the section below.
  const left = align === "left";
  return (
    <section
      className={`bg-gradient-to-b from-[#ddd5ca] to-white px-5 ${
        left ? "pt-6 pb-0 md:pt-[50px]" : "pt-6 pb-5 md:pt-[60px] md:pb-10"
      }`}
    >
      <div className={`mx-auto max-w-[1240px] ${left ? "text-left" : "text-center"}`}>
        <h1
          className={`text-[32px] font-semibold leading-[1.2] text-black md:text-[40px] ${
            left ? "" : "mx-auto max-w-[900px]"
          }`}
        >
          {title}
        </h1>
        {/* `whitespace-pre-line`: an intro can force its own line breaks */}
        {intro && (
          <p className="mx-auto mt-5 max-w-[800px] whitespace-pre-line text-[20px] leading-[1.4] text-[#333]">
            {intro}
          </p>
        )}
        {ctaLabel && ctaHref && (
          <div className="mt-5 md:mt-8">
            <Button href={ctaHref}>{ctaLabel}</Button>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
