export type Post = {
  title: string;
  excerpt: string;
  image: string;
  href: string;
  kicker?: string;
};

export const BLOGS: Post[] = [
  {
    title: "Clear Aligners in Hyderabad",
    excerpt:
      "If you've ever felt the need to hold back a smile because of tooth gaps or misaligned teeth, you are not alone. Continue reading this guide to get answers to some of the most frequently asked questions on aligners and how you can make the best clear aligners treatment in Hyderabad.",
    image: "/images/clear-aligners-in-hyderabad.jpg",
    href: "/blogs/clear-aligners-in-hyderabad",
  },
  {
    title: "Dental Implants in Hyderabad: Complete Cost, Procedure & Recovery Guide",
    excerpt:
      "Planning to get dental implants in Hyderabad? Learn about treatment costs, procedure steps, recovery time, and what to expect for a successful outcome.",
    image: "/images/dental-implants-in-hyderabad.jpg",
    href: "/blogs/dental-implants-in-hyderabad-complete-cost-procedure-recovery-guide",
  },
  {
    title: "The Silent Trap of Smoking: Hidden Effects on Gums, Teeth & Dental Implants",
    excerpt:
      "Think your gums are healthy because they don't bleed? Smoking may be masking serious gum disease. Learn the hidden risks to your teeth, gums, and dental implants.",
    image: "/images/the-silent-trap-of-smoking.jpg",
    href: "/blogs/the-hidden-threat-to-your-smile-a-dentist-explains-the-silent-trap-of-smoking",
  },
  {
    title: "Aura Dental Brand Story",
    kicker: "Why Your Dental Care Should Feel Like Self-Care",
    excerpt:
      "Most people fear the dentist. The hum of the drill, the clinical smell, the feeling of being judged for neglecting a vital part of your health. For too long, we've treated dental care as a painkiller, a reactive, last-resort necessity to stop an ache.",
    image: "/images/aura-dental-brand-story.png",
    href: "/blogs/aura-dental-brand-story",
  },
];

export const NEWSLETTERS: Post[] = [
  {
    title: "The Grand Inauguration",
    excerpt:
      "Get a glimpse in to Aura Dental, Madinaguda Inauguration celebration. Aura Dental strives to deliver elevated patient experience in a nurturing, client-first clinical environment.",
    image: "/images/the-grand-inauguration-6.jpg",
    href: "/newsletter/the-grand-inaugration",
  },
  {
    title: "Modern Dentistry vs Traditional, Aura POV, AI, Experience-first Care",
    excerpt:
      "Traditional dentistry has long focused on solving problems. Modern dentistry, as we see it, must also solve experiences. Aura was established from actively listening to how people talk about dentistry. The conversations were rarely about treatments or technology.",
    image: "/images/dental-newsletter-copy.png",
    href: "/newsletter/modern-dentistry-vs-traditional-aura-pov-ai-experience-first-care",
  },
];
