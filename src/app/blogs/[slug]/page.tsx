import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle, { type BlogBlock } from "@/components/blog/BlogArticle";
import { BLOGS } from "@/data/posts";
import content from "@/data/blog-content.json";

const CONTENT = content as unknown as Record<string, BlogBlock[]>;

export function generateStaticParams() {
  return BLOGS.map((p) => ({ slug: p.href.split("/").pop()! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOGS.find((p) => p.href.endsWith(`/${slug}`));
  if (!post) return {};
  return { title: `${post.title} | Aura Dental`, description: post.excerpt };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOGS.find((p) => p.href.endsWith(`/${slug}`));
  const blocks = CONTENT[slug];
  if (!post || !blocks) notFound();

  // The post title ships as the first block (the source renders it as the
  // grey `.blog-heading` band inside the article, not as a page hero).
  return <BlogArticle blocks={blocks} />;
}
