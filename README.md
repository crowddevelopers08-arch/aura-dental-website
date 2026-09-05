# Aura Dental — Next.js 15 replica

A pixel-and-copy replica of [auradental.ai](https://auradental.ai/) (originally a HubSpot CMS site)
rebuilt as a Next.js 15 App Router project with React 19 and Tailwind CSS v4.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export of all 28 routes
npm start
```

## Design tokens

Lifted verbatim from the source theme CSS, applied as inline Tailwind arbitrary values:

| Token           | Value                        | Used for                                     |
| --------------- | ---------------------------- | -------------------------------------------- |
| Primary green   | `#1d4231`                    | Header, footer, dark bands, headings          |
| Gold            | `#d3b871` / `#d2b770`        | Buttons, announcement bar, accents            |
| Neutral band    | `#ececec`                    | Alternating section backgrounds               |
| Hero gradient   | `#ddd5ca` → `#ffffff`        | Every page hero                               |
| Container       | `max-w-[1240px]`, `px-5`     | Matches the source `.content-wrapper`         |
| Section padding | `py-[50px]`                  | Matches the source `.dnd-section`             |
| Button          | radius 20px, 8/20px padding  | Matches the source `.hs-button`               |

### Typography

The source self-hosts two families via HubSpot's `/_hcms/googlefonts/` endpoint; both are
loaded here through `next/font/google` at the same weights.

| Role     | Family                        | Size / weight                              |
| -------- | ----------------------------- | ------------------------------------------ |
| Body, `p`| **Open Sans** 400, 700        | 18px / 1.4, `#000`                          |
| `h1`     | **EB Garamond** 400–700       | 40px / 700 — 32px below 768px               |
| `h2`     | EB Garamond                   | 32px / 700                                  |
| `h3`     | EB Garamond                   | 26px / 700                                  |
| `h4`     | EB Garamond                   | 24px / 600                                  |
| `h5`     | EB Garamond                   | 14px / 600                                  |
| `h6`     | EB Garamond                   | 12px / 500                                  |
| Buttons  | Open Sans                     | 16px / 600                                  |
| Footer   | Open Sans                     | 15px                                        |

Documented per-element overrides carried across from the source: the "Bring Out the Best Smile"
heading (`60px`), the stats row (`.home-counter h3` → `22px`), FAQ questions
(`.aw_accordion_question` → `20px`, and explicitly Open Sans rather than the heading face), the
hero review badge (16/18px), and the hero panel copy (`.dcb-center-desc` → 15px).

The source sets `html { font-size: 18px }`. This build sets that size on `body` instead, so the
root `rem` stays 16px and Tailwind's rem-based spacing scale is unaffected — rendered text size
is identical either way.

## Routes (28)

```
/                                     /blogs
/about-us                             /blogs/[slug]              × 4
/contact                              /newsletter
/aligners-and-braces                  /newsletter/[slug]         × 2
/cosmetic-dentistry                   /patient-stories
/root-canal-treatment                 /patient-stories/[slug]    × 6
/dental-implants                      /patient-testimonials
/kids-pediatric-dentistry             /privacy-policy
/dental-tourism                       /terms-and-conditions
```

## Structure

```
src/
  app/                     one folder per route, metadata + section composition only
  components/
    layout/                AnnouncementBar, Header, Footer, SocialIcons
    ui/                    Button, SectionLabel, Accordion, VideoModal, ConsultationForm
    sections/              shared bands (PageHero, VideoTestimonials, NeedHelpCta,
                           CommitmentBand, PostList, ArticleContent, LegalContent,
                           PatientStoryCard, CaseGallery)
    home/                  HomeHero, ContactFormSection, WhyAuraDental, TreatmentsOffered,
                           AboutPreview, BestSmileCta, HomeFaq
    services/              ServicePageTemplate + its five sections, CosmeticTreatments
    tourism/               TourismWhyChoose, TourismGallery
    about/                 AboutTreatments, AwardsGallery
    contact/               ContactInfoCards, LocationsSection
  data/                    all copy, image paths, FAQs and article bodies
public/images/             187 assets pulled from the live site
```

Every component styles itself with inline Tailwind utility classes — `globals.css` holds only
the Tailwind import, the smooth-scroll rule, and a scrollbar-hiding helper for the carousels.

## Behavioural parity notes

- **Hero panels** — the four treatment images expand on hover exactly as the source's
  `dcb-module` does, and are desktop-only. Mobile gets the single lifestyle image plus the
  CTA, matching the source's mobile-only widgets.
- **`#Book-Free-Consultation`** — the anchor the hero and CTA buttons scroll to, on both the
  homepage (grey band) and each service page (green band), as on the source.
- **Video testimonials** — the same nine `.webm` clips, played in a lightbox. Carousel on the
  home/service pages, grid on `/patient-testimonials` (which also uses the source's different
  ordering).
- **Before/after cards** — the circular gold arrow toggles the two images, as on the source.

## Two things that differ from the source, and why

1. **The consultation form** is a local React form. The source posts to a HubSpot form
   (portal `244098765`, form `35e3be10-1b68-4ad2-b5e9-8d953db668ae`) whose field definition is
   not publicly retrievable, so the fields here are the conventional set implied by the
   source's own CSS (a `tel` input with a `+91` prefix, a treatment select). `handleSubmit` in
   `src/components/ui/ConsultationForm.tsx` is where you wire up your own endpoint or CRM.
2. **Four hero thumbnails are 404 on the live site** (`Madhavi.jpg`, `Annapurna.jpg`,
   `Vijay Prakash Sharma.jpg`, `Likith Sai.jpg`, plus five matching `.webm` files). Those
   service-page heroes use the working `*-Aura-Dental-Customer-feedback.*` files of the same
   patients instead.

`docs/asset-map*.json` records which source URL each file in `public/images/` came from.
