export type FeatureItem = {
  icon: string;
  title: string;
  description: string;
};

export type DifferentiatorItem = {
  image: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
  bullets?: string[];
};

export type ServicePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    heading: string;
    subheading: string;
    video: string;
    quote: string;
    /** Patient credited on the hero testimonial card. */
    quoteAuthor: string;
    badge?: string;
  };
  whyChoose: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: FeatureItem[];
    image: string;
  };
  different: {
    heading: string;
    items: DifferentiatorItem[];
  };
  faqs: FaqItem[];
  needHelp: string;
};

export const SERVICES: Record<string, ServicePage> = {
  "aligners-and-braces": {
    slug: "aligners-and-braces",
    title: "Aligners & Braces",
    metaTitle: "Clear Aligners & Braces in Hyderabad | Aura Dental",
    metaDescription:
      "World-class aligners, invisible braces and modern orthodontics at Aura Dental, Madinaguda. Custom digital scanning, transparent pricing and flexible payment plans.",
    hero: {
      heading: "Clear, confident, and barely noticeable",
      subheading:
        "Ideal for professionals and teens who prefer a discreet way to straighten their teeth.",
      video: "NosEryxtEjs",
      quote: "My braces treatment was really good, I'm highly satisfied.",
      quoteAuthor: "Shreyas",
      badge: "/images/invisalign-logo.svg",
    },
    whyChoose: {
      eyebrow: "Why Patients Choose",
      heading: "Aligners at Aura",
      intro:
        "At Aura Dental, you get access to world-class aligners, invisible braces, and modern orthodontics.",
      image: "/images/aligners-image.jpg",
      items: [
        {
          icon: "/images/icons-06.svg",
          title: "Custom Fit, Backed by Advanced Digital Scanning",
          description:
            "We map every tooth with precision, giving you aligners that fit better and work faster.",
        },
        {
          icon: "/images/icons-07.svg",
          title: "Metal, Ceramic & Invisible Options Under One Roof",
          description:
            "Get all options, from modern to traditional aligners, in one place with a personalized path for every age and requirement.",
        },
        {
          icon: "/images/icons-08.svg",
          title: "Transparent Pricing, No Hidden Add-Ons",
          description:
            "Receive premium orthodontic treatment at honest, and accessible pricing. Flexible monthly payments options available.",
        },
        {
          icon: "/images/icons-09.svg",
          title: "Dental Clinic in Madinaguda",
          description:
            "Located in Madeenaguda for Maximum Convenience Ideal for professionals, college students, families, and NRI visitors with easy scheduling and fast follow-up visits.",
        },
      ],
    },
    different: {
      heading: "What Makes Aura's Treatments Different?",
      items: [
        {
          image: "/images/invisible-aligners-01.jpg",
          title: "Invisible, Comfortable, Lifestyle-Friendly Options",
          description:
            "Perfect for professionals and students who want a discreet smile correction.",
        },
        {
          image: "/images/ai-treatment-02.jpg",
          title: "AI-Based Treatment Planning",
          description: "More accuracy, predictable results, and faster progress tracking.",
        },
        {
          image: "/images/global-orthodontic-standards-03.jpg",
          title: "Global Orthodontic Standards",
          description:
            "Based on advanced international certifications and clinical training.",
        },
        {
          image: "/images/payment-plans-04.jpg",
          title: "Flexible Payment Plans & Fast Start",
          description:
            "Premium orthodontic care with budget options for every family. Same-day scans, faster aligner dispatch.",
        },
      ],
    },
    faqs: [
      {
        question: "Are clear aligners better than metal braces?",
        answer: "",
        bullets: [
          "Clear aligners are invisible, removable, and more comfortable, making them ideal for professionals or students.",
          "Metal braces are more affordable and better for complex corrections.",
          "We help you choose based on your dental condition and lifestyle.",
        ],
      },
      {
        question: "How long does aligner treatment take?",
        answer: "",
        bullets: [
          "Most patients complete treatment in 6–14 months, depending on the complexity.",
          "Consistent wear (20–22 hours/day) gives faster results.",
        ],
      },
      {
        question: "What is the cost of clear aligners in Hyderabad?",
        answer: "",
        bullets: [
          "At Aura, aligners start at affordable packages, depending on case complexity.",
          "We provide EMI and flexible installment options for accessibility.",
        ],
      },
      {
        question: "Are aligners painful?",
        answer:
          "Aligners gently move teeth. You may feel mild pressure during the first 2–3 days of each new set, but it is significantly less painful than braces.",
      },
      {
        question: "Can I eat normally with aligners?",
        answer:
          "Yes! Aligners are removed while eating, so you can enjoy your regular food without restrictions.",
      },
      {
        question: "Are braces still effective for adults?",
        answer: "",
        bullets: [
          "Absolutely. Many adults choose ceramic braces or aligners for discreet treatments.",
          "There's no age limit for orthodontics.",
        ],
      },
      {
        question: "How do I know which option is right for me?",
        answer: "",
        bullets: [
          "We perform a 3D digital scan and show you a simulated result.",
          "You get a personalized plan - aligners, invisible braces, or traditional braces—based on aesthetics, budget, and dental needs.",
        ],
      },
      {
        question: "Do aligners affect speech?",
        answer: "Mild adjustment may happen for 1–3 days, but speech becomes normal quickly.",
      },
      {
        question: "What happens if I lose an aligner tray?",
        answer:
          "We can quickly replace it. You may need to continue the previous set until the replacement arrives.",
      },
      {
        question: "Is follow-up required for aligners?",
        answer: "Yes, but they are minimal, usually once every 6–8 weeks to monitor progress.",
      },
    ],
    needHelp: "Start Your Aligners Journey with Aura Dental",
  },

  "dental-implants": {
    slug: "dental-implants",
    title: "Dental Implants",
    metaTitle: "Dental Implants in Hyderabad | Aura Dental, Madinaguda",
    metaDescription:
      "Titanium dental implants with natural-looking crowns, 3D guided placement and faster healing at Aura Dental, Madinaguda. 10,000+ implants placed.",
    hero: {
      heading: "Strong, natural-looking, and built to last",
      subheading:
        "Perfect for anyone missing one or more teeth and looking for a permanent, confident, and functional replacement.",
      video: "_84y5thI760",
      quote: "I am really impressed with my treatment, got my tooth extracted without any pain.",
      quoteAuthor: "Vijay Prakash Sharma",
    },
    whyChoose: {
      eyebrow: "Why Patients Choose",
      heading: "Dental Implants at Aura",
      intro:
        "At Aura Dental, implants are crafted to restore your missing tooth with natural strength, full bite function, and a smile that feels complete again.",
      image: "/images/dental-implants-image-01.jpg",
      items: [
        {
          icon: "/images/titanium-implant.svg",
          title: "Titanium Implants Designed for Lifetime Strength",
          description:
            "Durable, biocompatible implants integrate naturally with your jawbone for long-term support and stability.",
        },
        {
          icon: "/images/natural-looking-crowns.svg",
          title: "Natural-Looking Crowns Crafted for Your Smile",
          description:
            "Each crown is shaped, shaded, and polished to match your natural teeth seamlessly.",
        },
        {
          icon: "/images/advanced-3d-scans.svg",
          title: "Advanced 3D Scans for Accurate Placement",
          description:
            "Digital imaging helps us plan the exact angle, depth, and position for a perfect and safe implant placement.",
        },
        {
          icon: "/images/faster-healing.svg",
          title: "Faster Healing With Minimally Invasive Techniques",
          description:
            "Modern implant methods reduce discomfort and promote quicker healing with minimal downtime.",
        },
      ],
    },
    different: {
      heading: "What Makes Aura's Implant Treatment Different?",
      items: [
        {
          image: "/images/precise-planning-with-guided-surgery.jpg",
          title: "Precise Planning With Guided Surgery",
          description:
            "Computer-guided placement ensures high accuracy, better integration, and safer outcomes.",
        },
        {
          image: "/images/premium-quality-implant-systems.jpg",
          title: "Premium-Quality Implant Systems",
          description:
            "We use globally trusted implant brands known for strength, reliability, and long-term success.",
        },
        {
          image: "/images/comfort-focused-experience.jpg",
          title: "Comfort-Focused Experience",
          description:
            "From anesthesia to aftercare, every step is designed to reduce pain, anxiety, and recovery time.",
        },
        {
          image: "/images/transparent-pricing.jpg",
          title: "Transparent Pricing & Clear Timelines",
          description:
            "No hidden costs. Clear treatment phases, healing expectations, and flexible payment options.",
        },
      ],
    },
    faqs: [
      {
        question: "Are dental implants the best option for missing teeth?",
        answer:
          "For most patients, yes. At Aura Dental, we use premium implants that function like natural teeth and last decades with care.",
      },
      {
        question: "How long does an implant procedure take?",
        answer: "We can recommend the time frame based on your individual treatment.",
      },
      {
        question: "When can I get the crown after implant placement?",
        answer:
          "Most patients receive their crown in 8–12 weeks. Immediate options are discussed case-by-case.",
      },
      {
        question: "Is getting an implant painful?",
        answer:
          "Not at all. With guided surgery and modern anesthesia, the procedure feels comfortable. Most patients return to their routine the same day.",
      },
      {
        question: "What is the success rate of dental implants at Aura Dental?",
        answer:
          "Our doctors have done over 10,000+ dental implants thanks to precise 3D scanning, guided placement, and global-quality implant systems.",
      },
      {
        question: "Do implants look natural?",
        answer:
          "Yes. Your final crown is custom designed to match the exact shade, shape, and polish of your natural teeth.",
      },
      {
        question: "How much do dental implants cost at Aura Dental?",
        answer:
          "Costs vary by implant system and crown type. For more payment details and options, call us.",
      },
      {
        question: "Who is a good candidate for implants?",
        answer:
          "Any patient with one or more missing teeth, sufficient bone support, and overall good oral health.",
      },
      {
        question: "How long do dental implants last?",
        answer:
          "With proper care, and the right procedure, implants last 15+ years, even last a lifetime, with proper care and hygiene.",
      },
    ],
    needHelp: "Let's make your child's first dental memory a happy one!",
  },

  "root-canal-treatment": {
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    metaTitle: "Painless Root Canal Treatment in Hyderabad | Aura Dental",
    metaDescription:
      "Single-visit, comfort-first root canal treatment at Aura Dental, Madinaguda. Advanced digital diagnostics, microscopic precision and transparent pricing.",
    hero: {
      heading: "Treat the infection, save the tooth",
      subheading:
        "Advanced root canal care that targets pain at the source and restores long-term tooth health.",
      video: "Gwt-Z5a55S4",
      quote: "I got my RCT done, and I am very happy with the comfortable treatments.",
      quoteAuthor: "Annapurna",
    },
    whyChoose: {
      eyebrow: "Why Patients Choose",
      heading: "Root Canal Treatment at Aura",
      intro:
        "Our comfort-first approach, backed by advanced technology, gives instant relief and protects your natural tooth.",
      image: "/images/root-canal-image-01.jpg",
      items: [
        {
          icon: "/images/pain-free.svg",
          title: "Pain-Free, Gentle Treatment Approach",
          description:
            "Using modern anesthesia and minimally invasive techniques, we ensure your root canal feels smooth and comfortable from start to finish.",
        },
        {
          icon: "/images/advanced-digital-diagnostics.svg",
          title: "Advanced Digital Diagnostics",
          description:
            "High-precision imaging helps identify infection accurately and treat the affected tooth with maximum precision.",
        },
        {
          icon: "/images/quick-single-visit-treatment-options.svg",
          title: "Advanced Digital Diagnostics",
          description:
            "High-precision imaging helps identify infection accurately and treat the affected tooth with maximum precision.",
        },
        {
          icon: "/images/long-term-tooth-protection.svg",
          title: "Long-Term Tooth Protection",
          description:
            "Your treated tooth is sealed and reinforced with a strong crown to restore strength, function, and durability.",
        },
      ],
    },
    different: {
      heading: "What Makes Aura's Root Canal Treatment Different?",
      items: [
        {
          image: "/images/microscopic-precision.jpg",
          title: "Microscopic Precision for Better Outcomes",
          description:
            "Enhanced visibility ensures deeper cleaning, more accuracy, and higher long-term success rates.",
        },
        {
          image: "/images/comfort-focused.jpg",
          title: "Comfort-Focused Patient Care",
          description:
            "From local anesthesia to gentle technique, every step is designed to reduce pain, anxiety, and post-treatment sensitivity.",
        },
        {
          image: "/images/global-standards.jpg",
          title: "Global-Standard Sterilization Protocols",
          description:
            "International hygiene standards ensure a safe, infection-free environment for all endodontic procedures.",
        },
        {
          image: "/images/clear-pricing.jpg",
          title: "Clear Pricing & Fast Appointments",
          description:
            "Transparent treatment costs and quick scheduling mean you get relief without delays.",
        },
      ],
    },
    faqs: [
      {
        question: "Is a root canal at Aura Dental painful?",
        answer:
          "No. At Aura Dental, Madinaguda, we use advanced anesthesia and gentle rotary technology to ensure your root canal is as comfortable as a filling.",
      },
      {
        question: "How long does a root canal take at your clinic?",
        answer:
          "Most root canals at Aura Dental are completed in one visit, depending on the severity of the infection.",
      },
      {
        question: "Do I need a crown after a root canal?",
        answer:
          "Yes, in most cases. After your treatment, our team places a custom, tooth-colored crown to protect the tooth and restore full strength.",
      },
      {
        question: "How do I know if I need a root canal?",
        answer:
          "Signs include severe tooth pain, prolonged sensitivity, swelling, or a recurring pimple on the gums. Walk into Aura Dental, Madinaguda, for a quick digital scan and diagnosis.",
      },
      {
        question: "Are root canals safe for long-term tooth health?",
        answer:
          "Absolutely. Our modern technique cleans the infection thoroughly and seals the tooth securely, ensuring long-lasting protection.",
      },
      {
        question: "Can children or teens get a root canal at Aura Dental?",
        answer:
          "Yes, our pediatric dentist handles child-friendly root canals with extra comfort and care for younger patients.",
      },
      {
        question: "What is the cost of a root canal at Aura Dental, Madinaguda?",
        answer:
          "Pricing depends on the tooth (front, premolar, molar). We maintain transparent, honest pricing and offer flexible payment options. We encourage you to call us or book a free consultation for accurate prices.",
      },
      {
        question: "How soon can I eat after the procedure?",
        answer:
          "You can eat after the numbness reduces. After your procedure our team will guide you on what to avoid until the tooth is fully restored.",
      },
    ],
    needHelp: "Let's make your child's first dental memory a happy one!",
  },

  "kids-pediatric-dentistry": {
    slug: "kids-pediatric-dentistry",
    title: "Kids Dentistry / Pediatric Dentistry",
    metaTitle: "Kids & Pediatric Dentistry in Hyderabad | Aura Dental",
    metaDescription:
      "Gentle, child-friendly pediatric dentistry at Aura Dental, Madinaguda. International safety standards, digital X-rays and a calm, home-like dental space.",
    hero: {
      heading: "Gentle care for little smiles",
      subheading:
        "Helping children feel comfortable and confident at the dentist from day one.",
      video: "8AoBZECAwEQ",
      quote: "I was scared at first, but Dr. Siva Nagini ma'am treated me very well.",
      quoteAuthor: "Likith Sai",
    },
    whyChoose: {
      eyebrow: "Why Parents Choose",
      heading: "Pediatric Dentistry at Aura",
      intro:
        "Your child's first dental visits shape how they feel about oral health for years to come.",
      image: "/images/pediatric-care-image.jpg",
      items: [
        {
          icon: "/images/icons-01.svg",
          title: "Internationally Aligned Dental Standards",
          description: "Every treatment at Aura meets international safety and quality protocols.",
        },
        {
          icon: "/images/icons-02.svg",
          title: "Child-Friendly, Comfortable Ambiance",
          description:
            "Designed to ease anxiety with gentle care, friendly staff, and a home-like dental space.",
        },
        {
          icon: "/images/icons-03.svg",
          title: "Advanced Diagnostic & Treatment Technology",
          description:
            "Digital X-rays, intraoral scanners, and the latest tools ensure precise care, minimal discomfort.",
        },
        {
          icon: "/images/icons-04.svg",
          title: "Hygiene-First Clinic",
          description:
            "International-standard sterilization protocols keep every procedure safe, clean, and fully hygienic.",
        },
        {
          icon: "/images/icons-05.svg",
          title: "Multi-Specialty Clinical Expertise in One Place",
          description:
            "From routine care to orthodontics, our trained specialists support every stage of your child's dental development.",
        },
      ],
    },
    different: {
      heading: "What Makes Aura Different",
      items: [
        {
          image: "/images/doctors-01.jpg",
          title: "Global Certifications & Clinical Training",
          description:
            "Aura's protocols are based on 30+ internationally recognized clinical certifications held within the founding team — ensuring world-class care for every family.",
        },
        {
          image: "/images/premium-care-02.jpg",
          title: "Affordable Yet Premium Care",
          description:
            "Premium materials, advanced techniques, and transparent pricing designed specifically for modern Indian families.",
        },
        {
          image: "/images/children-and-parents-03.jpg",
          title: "Designed for Kids & Parents",
          description:
            "From painless procedures to clear explanations, every visit is built around comfort and trust.",
        },
        {
          image: "/images/convinient-location-04.jpg",
          title: "Convenient Location in Madeenaguda",
          description:
            "Easy accessibility for schools, families, working professionals and NRIs returning for dependable dental care.",
        },
      ],
    },
    faqs: [
      {
        question: "When should I take my child for their first dental visit?",
        answer:
          "It's best to schedule your child's first check-up by their first birthday or within 6 months of their first tooth erupting.",
      },
      {
        question: "Are “baby teeth” really important if they eventually fall out?",
        answer:
          "Yes — primary teeth (baby teeth) are very important. They help your child chew, speak, and guide the permanent teeth into proper positions. Healthy baby teeth are a vital foundation for long-term oral development.",
      },
      {
        question: "Is it safe to get x-rays for kids?",
        answer:
          "Absolutely. We use low-radiation digital X-rays with protective measures, keeping exposure minimal and safe for children.",
      },
      {
        question: "What if my child is anxious or scared about the dentist?",
        answer:
          "We understand, many children feel nervous. That's why our paediatric team uses gentle communication, “tell-show-do” techniques, and distraction tools to make the first visit comfortable. For very anxious children, we discuss behaviour-management strategies that feel safe and child-friendly.",
      },
      {
        question: "Does Aura Dental have hospital-grade sterilization and safety protocols?",
        answer:
          "Yes. Our infection control systems follow globally recognized protocols, ensuring every space, instrument, and surface is maintained to the highest safety standards. This includes regular sterilization, single-use materials where needed, and careful hygiene procedures.",
      },
      {
        question: "What if my child loses a baby tooth too early or hurts a tooth in an accident?",
        answer:
          "We assess every situation individually. If a baby tooth is lost early, we may use space maintainers to protect alignment. For dental trauma (like a knocked-out or chipped tooth), quick action is very important, contact us immediately, and we'll guide you on the best next steps.",
      },
      {
        question: "How do you decide which treatment is best for my child?",
        answer:
          "We create fully personalized treatment plans based on: This helps us choose the most effective, least invasive treatment.",
        bullets: [
          "Developmental stage of the child's teeth",
          "Oral hygiene habits",
          "Risk of cavities / decay",
          "Behavioral comfort",
          "Long-term goals (e.g. preventing orthodontic issues)",
        ],
      },
    ],
    needHelp: "Let's make your child's first dental memory a happy one!",
  },

  "cosmetic-dentistry": {
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    metaTitle: "Cosmetic Dentistry & Smile Makeovers in Hyderabad | Aura Dental",
    metaDescription:
      "Veneers, teeth whitening, smile makeovers, contouring and gum aesthetics at Aura Dental, Madinaguda. Natural, long-lasting results designed around your face.",
    hero: {
      heading: "A confident smile that looks natural, bright, and beautifully you",
      subheading:
        "Designed for anyone looking to enhance their smile with subtle, refined cosmetic improvements.",
      video: "rGRRReOytq4",
      quote: "The treatment was fast, the response was quick. We are happy with the treatment.",
      quoteAuthor: "Madhavi",
    },
    whyChoose: {
      eyebrow: "Why Patients Choose",
      heading: "Cosmetic Dentistry At Aura",
      intro:
        "We blend precision and aesthetics to create a natural smile that fits your personality, features, and lifestyle.",
      image: "/images/cosmetic-image-01.jpg",
      items: [
        {
          icon: "/images/01.svg",
          title: "Wide Range of Cosmetic Smile Enhancements",
          description:
            "From veneers to whitening and contouring, we offer complete cosmetic solutions tailored to your specific goals.",
        },
        {
          icon: "/images/02.svg",
          title: "Natural, Long-Lasting Results",
          description:
            "Every enhancement is crafted with high-quality materials and careful detailing to ensure your smile stays bright and authentic.",
        },
        {
          icon: "/images/03.svg",
          title: "Smile Designs That Fit Your Face",
          description:
            "Our dentists analyze symmetry, proportions, and expressions to create a smile that complements your natural features.",
        },
        {
          icon: "/images/04.svg",
          title: "Digital Imaging & Predictable Planning",
          description:
            "Advanced smile previews help you visualize the outcome before treatment begins, ensuring clarity and confidence in every step.",
        },
      ],
    },
    different: {
      heading: "What Makes Aura's Cosmetic Treatments Different?",
      items: [
        {
          image: "/images/aesthetic-dentistry.jpg",
          title: "Aesthetic Dentistry Backed by Precision",
          description:
            "Expert techniques ensure cosmetic upgrades look seamless, polished, and completely natural.",
        },
        {
          image: "/images/treatment-experience.jpg",
          title: "Gentle, Comfortable Treatment Experience",
          description:
            "Every step is handled with care, minimal discomfort, clear guidance, and a supportive environment.",
        },
        {
          image: "/images/premium-materials.jpg",
          title: "Premium Materials for Long-Term Beauty",
          description:
            "We use globally trusted brands and clinically strong materials for lasting shine and durability.",
        },
        {
          image: "/images/transparent-pricing-1.jpg",
          title: "Transparent Pricing & Personalized Plans",
          description:
            "Every cosmetic treatment is explained clearly with honest pricing and tailored options for your smile goals.",
        },
      ],
    },
    faqs: [
      {
        question: "Are cosmetic dentistry treatments painful?",
        answer:
          "Most treatments are minimally invasive and performed with comfort-focused techniques; discomfort is usually very mild.",
      },
      {
        question: "Is whitening safe for sensitive teeth?",
        answer: "Yes, Aura's dentists adjust whitening formulas to ensure minimal sensitivity.",
      },
      {
        question: "How long do veneers last?",
        answer: "With good care, veneers can last 10–15 years or longer.",
      },
      {
        question: "Do cosmetic procedures damage natural teeth?",
        answer:
          "No, at Aura, we ensure the treatment preserves and enhances your tooth structure.",
      },
      {
        question: "How do I know which cosmetic treatment is right for me?",
        answer:
          "We first assess your goals, lifestyle, and tooth structure and only then recommend the best options.",
      },
    ],
    needHelp: "Let's make your child's first dental memory a happy one!",
  },
};

export type CosmeticTreatment = {
  icon: string;
  image: string;
  title: string;
  description: string;
  whyHeading: string;
  reasons: string[];
};

export const COSMETIC_TREATMENTS: CosmeticTreatment[] = [
  {
    icon: "/images/dental-veneers-1.svg",
    image: "/images/veneers-image-01.jpg",
    title: "Veneers",
    description:
      "Custom-made porcelain or composite shells designed to correct chips, stains, gaps, and uneven teeth.",
    whyHeading: "Why patients choose veneers at Aura:",
    reasons: [
      "Immediate smile transformation",
      "Natural, symmetrical look",
      "Long-lasting and stain-resistant",
    ],
  },
  {
    icon: "/images/teeth-whitening.svg",
    image: "/images/teeth-whitening-02.jpg",
    title: "Teeth Whitening",
    description: "Professional-grade whitening designed to safely brighten your smile.",
    whyHeading: "Why patients choose whitening at Aura:",
    reasons: [
      "Fast results in a single session",
      "Safe for enamel",
      "Ideal before events, photoshoots, or milestone moments",
    ],
  },
  {
    icon: "/images/smile-makeovers.svg",
    image: "/images/smile-makeovers-03.jpg",
    title: "Smile Makeovers",
    description: "A tailored combination of cosmetic treatments to redesign your entire smile.",
    whyHeading: "Why patients choose smile makeovers at Aura:",
    reasons: [
      "Fully personalized smile design",
      "Can include veneers, whitening, shaping, and more",
      "Great for anyone wanting a dramatic change",
    ],
  },
  {
    icon: "/images/tooth-contouring.svg",
    image: "/images/tooth-contouring-04.jpg",
    title: "Tooth Contouring and Bonding",
    description:
      "Minor reshaping or composite bonding to correct chips, gaps, and uneven edges.",
    whyHeading: "Why patients choose contouring/bonding at Aura:",
    reasons: [
      "Quick, painless, and affordable treatment",
      "Visible aesthetic improvement",
      "Ideal for small but noticeable imperfections",
    ],
  },
  {
    icon: "/images/gum-depigmentation.svg",
    image: "/images/gum-depigmentation-05.jpg",
    title: "Gum Depigmentation and Aesthetic Gum Recontouring",
    description: "Treatments that enhance gum appearance and improve smile balance.",
    whyHeading: "Why patients choose gum aesthetics at Aura:",
    reasons: [
      "More balanced and even gum line",
      "Better smile proportion",
      "Addresses dark or uneven gum tissue",
    ],
  },
];
