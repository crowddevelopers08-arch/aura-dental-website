export const SITE = {
  name: "Aura Dental",
  logo: "/images/aura-dental-logo.png",
  email: "contact@auradental.ai",
  emergencyPhone: "+91 9963262774",
  primaryPhone: "+91 7842871414",
  copyright: "© 2026 Aura Dental",
};

export const LOCATIONS = [
  {
    name: "Madinaguda",
    address: "Swathi Plaza, Viswaswara Nagar Colony, Madinaguda, Hyderabad - 49, TS, India",
    phone: "+91 7842871414",
    tel: "tel:+917842871414",
    map: "https://maps.app.goo.gl/JhzsPSCMk49nHjkH6",
  },
  {
    name: "Kondapur",
    address:
      "473/c, 474 C, 2nd floor, C block, Aura Dental Clinic, Kondapur, Raghavendra Colony, Hyderabad - 84, TS, India",
    phone: "+91 9963262774",
    tel: "tel:+919963262774",
    map: "https://maps.app.goo.gl/9MmEEkXKP2ob5zcq8",
  },
];

export const SERVICE_LINKS = [
  { label: "Aligners & Braces", href: "/aligners-and-braces" },
  { label: "Cosmetic Dentistry", href: "/cosmetic-dentistry" },
  { label: "Root Canal Treatment", href: "/root-canal-treatment" },
  { label: "Dental Implants", href: "/dental-implants" },
  { label: "Kids Dentistry/Pediatric Dentistry", href: "/kids-pediatric-dentistry" },
  { label: "Dental Tourism", href: "/dental-tourism" },
];

/**
 * Choices in the enquiry forms' "Services" dropdown, in the source site's order.
 * Deliberately separate from `SERVICE_LINKS`: that list drives navigation and so
 * only covers treatments that have their own page, whereas this one is what a
 * patient can ask about.
 */
export const TREATMENT_OPTIONS = [
  "Kids / Paediatric Dentistry",
  "Aligners",
  "Root Canal Treatment (RCT)",
  "Dental Implants / Teeth Implants",
  "Cosmetic Dentistry",
  "Dental Braces",
  "Dentures",
  "Dental Crowns",
  "Dental Bridges",
  "Laser Dentistry",
  "Dental Fillings / Teeth Fillings",
  "Wisdom Teeth Removal",
  "Preventive Dentistry",
  "Advanced Gum Treatment",
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#", children: SERVICE_LINKS },
  { label: "About Us", href: "/about-us" },
  { label: "Testimonials", href: "/patient-testimonials" },
  { label: "Contact Us", href: "/contact" },
];

export const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact" },
  { label: "NewsLetter", href: "/newsletter" },
  { label: "Blogs", href: "/blogs" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cancellation & Refund Policy", href: "/cancellation-and-refund-policy" },
];

export const OPENING_HOURS = [
  { day: "Monday - Saturday", time: "9:00 AM to 9:00 PM" },
  { day: "Sunday", time: "10:00 AM to 5:00 PM" },
  { day: "Personal", time: "7:00 PM - 9:00 PM" },
];

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61582220911067", icon: "facebook" },
  { label: "X", href: "https://x.com/AuraDental_ai", icon: "x" },
  { label: "Instagram", href: "https://www.instagram.com/auradental.ai", icon: "instagram" },
  { label: "YouTube", href: "https://youtube.com/@auradentalai", icon: "youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/auradental-ai/", icon: "linkedin" },
] as const;
