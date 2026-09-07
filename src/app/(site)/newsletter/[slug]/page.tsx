import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import ArticleContent, { type ArticleBlock } from "@/components/sections/ArticleContent";
import NeedHelpCta from "@/components/sections/NeedHelpCta";
import { NEWSLETTERS } from "@/data/posts";
import content from "@/data/posts-content.json";

const CONTENT = content as Record<string, ArticleBlock[]>;

export function generateStaticParams() {
  return NEWSLETTERS.map((p) => ({ slug: p.href.split("/").pop()! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = NEWSLETTERS.find((p) => p.href.endsWith(`/${slug}`));
  if (!post) return {};
  return { title: `${post.title} | Aura Dental`, description: post.excerpt };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = NEWSLETTERS.find((p) => p.href.endsWith(`/${slug}`));
  const blocks = CONTENT[slug];
  if (!post || !blocks) notFound();

  return (
    <>
      <PageHero title={post.title} />
      <ArticleContent blocks={blocks} />
      <NeedHelpCta subheading="Start Your Smile Journey with Aura Dental" />
    </>
  );
}
