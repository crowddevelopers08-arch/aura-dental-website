import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import CaseGallery from "@/components/sections/CaseGallery";
import NeedHelpCta from "@/components/sections/NeedHelpCta";
import { STORY_DETAILS } from "@/data/storyDetails";

export function generateStaticParams() {
  return STORY_DETAILS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = STORY_DETAILS.find((s) => s.slug === slug);
  if (!story) return {};
  return { title: `${story.title} | Aura Dental`, description: story.metaDescription };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = STORY_DETAILS.find((s) => s.slug === slug);
  if (!story) notFound();

  return (
    <>
      {/* Banner */}
      <section className="bg-gradient-to-b from-[#ddd5ca] to-white px-5 pt-6 md:pt-[40px]">
        <div className="mx-auto max-w-[1240px]">
          <Image
            src={story.banner}
            alt={story.title}
            width={1240}
            height={520}
            priority
            className="h-auto w-full rounded-[20px] object-cover"
          />
        </div>
      </section>

      {/* Case write-up */}
      <section className="bg-white px-5 py-[30px] md:py-[50px]">
        <div className="mx-auto max-w-[900px]">
          <h1 className="mb-2.5 text-center text-[32px] font-semibold leading-[1.2] text-black md:text-left md:text-[40px]">
            {story.title}
          </h1>

          {story.paragraphs.map((p) => (
            <p key={p.slice(0, 50)} className="mb-4 text-[18px] leading-[1.4] text-[#444]">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Clinical photos */}
      {story.gallery && story.patient && (
        <section className="bg-white px-5 pb-[30px] md:pb-[50px]">
          <div className="mx-auto max-w-[1240px]">
            <h2 className="mb-5 text-center text-[32px] font-bold text-[#1d4231] md:text-left">
              {story.patient}
            </h2>
            <CaseGallery images={story.gallery} name={story.title} />
          </div>
        </section>
      )}

      <NeedHelpCta subheading="Start Your Aligners Journey with Aura Dental" />
    </>
  );
}
