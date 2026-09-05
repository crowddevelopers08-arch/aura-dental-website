import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/data/posts";

type Props = {
  posts: Post[];
  ctaLabel: string;
};

/**
 * The /blogs and /newsletter listings. The source builds each entry as its own
 * 50px-padded `dnd-section` with the image in the left half and the copy in the
 * right — the columns never swap, so neither do ours.
 */
export default function PostList({ posts, ctaLabel }: Props) {
  return (
    <section className="bg-white px-5">
      <div className="mx-auto max-w-[1240px]">
        {posts.map((post) => (
          <article
            key={post.href}
            className="grid grid-cols-1 items-center gap-6 py-[30px] md:py-[50px] lg:grid-cols-2 lg:gap-12"
          >
            <Link href={post.href}>
              <Image
                src={post.image}
                alt={post.title}
                width={620}
                height={420}
                className="h-auto w-full"
              />
            </Link>

            {/* Centred on phones (`align-mobile-center`), left-aligned above that. */}
            <div className="text-center md:text-left">
              <h2 className="mb-[15px] text-[32px] font-semibold leading-[1.3] text-black">
                <Link href={post.href} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              {/* The brand-story entry carries a bold strapline above its excerpt. */}
              {post.kicker && (
                <p className="mb-[15px] text-[18px] leading-[1.4] font-bold text-black">
                  {post.kicker}
                </p>
              )}
              <p className="text-[18px] leading-[1.4] text-black">{post.excerpt}</p>
              <Link
                href={post.href}
                className="mt-2.5 inline-block rounded-[20px] bg-[#d3b871] px-5 py-2 text-[16px] font-semibold text-[#1d4231] transition-colors hover:bg-[#c9a95d]"
              >
                {ctaLabel}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
