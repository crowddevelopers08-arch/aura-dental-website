export type PatientStory = {
  title: string;
  description: string;
  before: string;
  after: string;
  href: string;
};

export const PATIENT_STORIES: PatientStory[] = [
  {
    title: "Partial Denture",
    description: "Tooth preparation, cord packing and master impressions",
    before: "/images/images-01.jpg",
    after: "/images/aligners-nov-25-2025-12-57-29-4908-pm.jpg",
    href: "/patient-stories/partial-denture-case",
  },
  {
    title: "Fixed Partial Denture",
    description: "Toothpreparation, cord packing followed by master impression",
    before: "/images/images-02.jpg",
    after: "/images/laser-dentistry.jpg",
    href: "/patient-stories/fixed-partial-denture",
  },
  {
    title: "Dental Implant Prosthesis",
    description: "Missing teeth in the upperanterior- posterior teeth region of jaw",
    before: "/images/images-03.jpg",
    after: "/images/dental-implants.png",
    href: "/patient-stories/dental-implant-prosthesis",
  },
  {
    title: "Diastema",
    description: "Experts about how it bothers her and is not confident about smiling openly.",
    before: "/images/images-04.jpg",
    after: "/images/cosmetic-dentistry.jpeg",
    href: "/patient-stories/the-problem-which-kavitha-was-facing-diastema",
  },
  {
    title: "Tooth Decay",
    description: "Second Lower Molar on each side and Second Upper Molar on each side.",
    before: "/images/images-05.jpg",
    after: "/images/multiple-tooth-filling.jpg",
    href: "/patient-stories/the-problem-which-venkatesh-was-facing-tooth-decay",
  },
  {
    title: "Advanced Dentistry",
    description: "She had a childhood fear of dental treatments and tools.",
    before: "/images/images-06.jpg",
    after: "/images/root-canal-treatment.jpg",
    href: "/patient-stories/the-problem-which-priya-was-facing-advanced-dentistry",
  },
];
