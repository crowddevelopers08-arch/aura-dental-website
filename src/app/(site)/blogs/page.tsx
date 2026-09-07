import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import PostList from "@/components/sections/PostList";
import { BLOGS } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blogs | Aura Dental Hyderabad",
  description:
    "Guides on clear aligners, dental implants, gum health and modern dentistry from the specialists at Aura Dental, Madinaguda.",
};

export default function Page() {
  return (
    <>
      <PageHero title="Blogs" align="left" />
      <PostList posts={BLOGS} ctaLabel="Read Blog" />
    </>
  );
}
