import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import PostList from "@/components/sections/PostList";
import { NEWSLETTERS } from "@/data/posts";

export const metadata: Metadata = {
  title: "Newsletter | Aura Dental Hyderabad",
  description:
    "News and points of view from Aura Dental — the Madinaguda grand inauguration and our take on modern, experience-first dentistry.",
};

export default function Page() {
  return (
    <>
      <PageHero title="Newsletter" align="left" />
      <PostList posts={NEWSLETTERS} ctaLabel="Read Newsletter" />
    </>
  );
}
