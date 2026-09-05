import { youtubeThumbnail } from "@/data/youtube";

export type VideoTestimonial = {
  name: string;
  thumbnail: string;
  /** YouTube video id — the clips all live on the channel as Shorts. */
  video: string;
};

/** Order as it appears in the homepage / service-page carousel. */
export const VIDEO_TESTIMONIALS: VideoTestimonial[] = (
  [
    { name: "Amardeep (Big Boss Celebrity)", video: "2TVMvKO2d_0" },
    { name: "Anil Allam", video: "8SUBjT9T5po" },
    { name: "Apurva", video: "waPn3FoErCw" },
    { name: "Bhikshapati", video: "lD8TdVaOj6Y" },
    { name: "Madhavi", video: "rGRRReOytq4" },
    { name: "Vijay Prakash Sharma", video: "_84y5thI760" },
    { name: "Annapurna", video: "Gwt-Z5a55S4" },
    { name: "Shreyas", video: "NosEryxtEjs" },
    { name: "Likith Sai", video: "8AoBZECAwEQ" },
  ] as const
).map(({ name, video }) => ({
  name,
  video,
  thumbnail: youtubeThumbnail(video),
}));

/** The /patient-testimonials page uses the same clips in a different order. */
export const TESTIMONIALS_PAGE_ORDER: VideoTestimonial[] = [
  "Apurva",
  "Amardeep (Big Boss Celebrity)",
  "Anil Allam",
  "Madhavi",
  "Bhikshapati",
  "Annapurna",
  "Shreyas",
  "Vijay Prakash Sharma",
  "Likith Sai",
].map((name) => VIDEO_TESTIMONIALS.find((t) => t.name === name)!);
