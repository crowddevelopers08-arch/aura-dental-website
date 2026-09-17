export type GalleryPhoto = { src: string; label: string };

/** Grouped by area so each desktop row of three reads as one space. */
export const CLINIC_PHOTOS: GalleryPhoto[] = [
  { src: "/images/clinic-reception-1.jpg", label: "Reception & Waiting Area" },
  { src: "/images/clinic-reception-2.png", label: "Reception" },
  { src: "/images/clinic-reception-3.jpg", label: "Front Desk" },
  { src: "/images/clinic-lounge-1.png", label: "Invisalign Provider Lounge" },
  { src: "/images/clinic-lounge-2.jpg", label: "Invisalign Lounge" },
  { src: "/images/clinic-lounge-3.jpg", label: "Patient Lounge" },
  { src: "/images/clinic-treatment-1.jpg", label: "Treatment Suite" },
  { src: "/images/clinic-treatment-2.jpg", label: "Ergonomic Dental Unit" },
  { src: "/images/clinic-treatment-3.png", label: "Treatment Room" },
];

export const TEAM_PHOTOS: GalleryPhoto[] = [
  { src: "/images/aura-team-doctors-1.png", label: "Our Doctors" },
  { src: "/images/aura-team-full-1.png", label: "The Aura Dental Team" },
  { src: "/images/aura-team-invisalign.png", label: "Invisalign Provider Team" },
  { src: "/images/aura-team-full-2.png", label: "Doctors & Care Team" },
  { src: "/images/aura-team-doctors-2.png", label: "Our Dental Specialists" },
];
