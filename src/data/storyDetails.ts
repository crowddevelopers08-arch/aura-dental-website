export type StoryDetail = {
  slug: string;
  title: string;
  metaDescription: string;
  banner: string;
  thumbnail: string;
  paragraphs: string[];
  patient?: string;
  gallery?: string[];
};

export const STORY_DETAILS: StoryDetail[] = [
  {
    slug: "partial-denture-case",
    title: "Partial Denture Case",
    metaDescription:
      "Fixed partial denture for a 45-year-old patient with missing upper and lower anterior teeth, treated at Aura Dental, Madinaguda.",
    banner: "/images/partial-denture-case.webp",
    thumbnail: "/images/partial-denture-case-thumbnail.webp",
    paragraphs: [
      "A 45-year-old male patient named Karimul has come to the department with the chief complaint of missing teeth in the upper and the lower anterior region for 4 months. The fixed partial denture was planned in both arches. Tooth preparation, cord packing and master impressions were done followed by cementation of the fixed partial prosthesis. High points were marked and corrected on periodic recall.",
    ],
    patient: "Name: Karimul / Age: 45",
    gallery: [
      "/images/karimul-2.png",
      "/images/karimul-3.png",
      "/images/karimul-4.png",
      "/images/karimul-5.png",
      "/images/karimul-6.png",
      "/images/karimul-7.png",
      "/images/karimul-8.png",
      "/images/karimul-9.png",
      "/images/karimul-10.png",
      "/images/karimul-11.png",
      "/images/karimul-12.png",
      "/images/karimul-13.png",
      "/images/karimul-14.png",
    ],
  },
  {
    slug: "fixed-partial-denture",
    title: "Fixed partial denture",
    metaDescription:
      "Fixed Partial Prosthesis for a 60-year-old patient with uncontrolled diabetes, restoring chewing ability and confidence at Aura Dental.",
    banner: "/images/implant-case.webp",
    thumbnail: "/images/implant-case-thumbnail.webp",
    paragraphs: [
      "Mr. Somasundaram, a 60-year-old patient, visited our clinic with concerns about missing teeth in multiple areas of both the upper and lower jaws for over six months.",
      "After a thorough medical and dental evaluation, implant treatment was ruled out due to uncontrolled diabetes. Keeping his overall health as the top priority, our dental team recommended a Fixed Partial Prosthesis (FPP) as a safe and effective alternative.",
      "The treatment involved careful tooth preparation, followed by cord packing and a detailed dental impression to ensure accurate fitting. Once ready, the prosthesis was securely cemented in place. Mr. Somasundaram was then placed on a structured follow-up plan for six months to monitor comfort, function, and oral health.",
      "With his new prosthesis, he now enjoys improved chewing ability and a renewed sense of confidence.",
    ],
    patient: "Name: Somasundaram / Age: 60",
    gallery: [
      "/images/name-somasundaram-age-60-2.png",
      "/images/name-somasundaram-age-60-3.png",
      "/images/name-somasundaram-age-60-4.png",
      "/images/name-somasundaram-age-60-5.png",
      "/images/name-somasundaram-age-60-6.png",
      "/images/name-somasundaram-age-60-7.png",
      "/images/name-somasundaram-age-60-8.png",
      "/images/name-somasundaram-age-60-9.png",
      "/images/name-somasundaram-age-60-10.png",
      "/images/name-somasundaram-age-60-11.png",
      "/images/name-somasundaram-age-60-12.png",
      "/images/name-somasundaram-age-60-13.png",
    ],
  },
  {
    slug: "dental-implant-prosthesis",
    title: "Dental implant prosthesis",
    metaDescription:
      "Fixed Partial Prosthesis restoring missing upper-jaw teeth for a 23-year-old patient at Aura Dental, Madinaguda.",
    banner: "/images/implant-case.webp",
    thumbnail: "/images/implant-case-thumbnail.webp",
    paragraphs: [
      "Selvi, a 23-year-old patient, visited our clinic with concerns about missing teeth in the upper jaw that had been affecting her for the past six months, both in appearance and comfort.",
      "After a detailed examination, our dental team recommended a Fixed Partial Prosthesis (FPP) as a long-term solution to restore her smile and chewing function.",
      "The treatment involved careful tooth preparation, followed by cord packing and a precise dental impression to ensure a perfect fit. Once the prosthesis was ready, it was cemented securely in place. Selvi was closely monitored over the next six months through regular follow-up visits to ensure proper healing, comfort, and performance.",
      "She is now enjoying a complete, natural-looking smile and improved oral function.",
    ],
    patient: "Name: Selvi / Age: 23",
    gallery: [
      "/images/name-selvi-age-23-3.png",
      "/images/name-selvi-age-23-4.png",
      "/images/name-selvi-age-23-5.png",
      "/images/name-selvi-age-23-6.png",
      "/images/name-selvi-age-23-7.png",
      "/images/name-selvi-age-23-8.png",
      "/images/name-selvi-age-23-9.png",
      "/images/name-selvi-age-23-10.png",
      "/images/name-selvi-age-23-11.png",
      "/images/name-selvi-age-23-12.png",
      "/images/name-selvi-age-23-13.png",
      "/images/name-selvi-age-23-14.png",
    ],
  },
  {
    slug: "the-problem-which-kavitha-was-facing-diastema",
    title: "Closing the Gap with Metal Braces",
    metaDescription:
      "Kavitha, 21, closed the gap between her upper front teeth with metal braces at Aura Dental after a diastema diagnosis.",
    banner: "/images/the-problem-which-kavitha-was-facing-diastema.webp",
    thumbnail: "/images/the-problem-which-kavitha-was-facing-diastema-thumbnail.webp",
    paragraphs: [
      "Kavitha, a 21-year-old college student, visited Dr. Siva Nagini feeling self-conscious about her smile. The gap between her upper front teeth made her uncomfortable, and she found it difficult to smile confidently in public.",
      "After a thorough consultation, our dental team patiently listened to her concerns and made sure she felt at ease throughout the visit. A detailed examination, including X-rays, confirmed that she had diastema, a gap between the teeth.",
      "Based on the diagnosis, orthodontic treatment was recommended. Kavitha was advised to go ahead with metal braces to gradually align her teeth and close the gap over time. The treatment plan was explained clearly, and she was guided through what to expect during the one-year process.",
      "Kavitha felt relieved and confident after the consultation, happy to begin her journey toward a healthier, more confident smile.",
    ],
  },
  {
    slug: "the-problem-which-venkatesh-was-facing-tooth-decay",
    title: "Treating Advanced Tooth Decay",
    metaDescription:
      "Tooth-coloured resin fillings restored Venkatesh's decayed second molars at Aura Dental, Madinaguda.",
    banner: "/images/the-problem-which-venkatesh-was-facing-tooth-decay-1.jpg",
    thumbnail: "/images/the-problem-which-venkatesh-was-facing-tooth-decay-thumbnail-1.jpg",
    paragraphs: [
      "Venkatesh, a teenager who hadn't visited a dentist in several years, came in with persistent toothache and consulted with Dr. Siva Nagini for a thorough evaluation.",
      "During the examination, soft areas were detected in his teeth, and dental X-rays were taken for further assessment. The scans revealed cavities in his second molars on both the upper and lower jaws. Poor oral hygiene was identified as the primary cause of the decay.",
      "Since the cavities had progressed beyond the early stage, Dental Fillings were recommended. The procedure was done under local anesthesia to ensure comfort. All decayed portions were carefully removed, and the teeth were restored using tooth-colored resin fillings that matched the natural shade of his molars. Medication was also prescribed to manage any post-treatment discomfort.",
      "Venkatesh was happy with the treatment outcome and was advised to improve his oral hygiene habits to prevent future issues.",
    ],
  },
  {
    slug: "the-problem-which-priya-was-facing-advanced-dentistry",
    title: "Full Smile Rehabilitation with Advanced Dentistry",
    metaDescription:
      "3D intraoral scanning, laser-assisted procedures and microscopic dentistry restored Mrs. Priya's smile at Aura Dental.",
    banner: "/images/the-problem-which-priya-was-facing-advanced-dentistry-1.webp",
    thumbnail: "/images/the-problem-which-priya-was-facing-advanced-dentistry-thumbnail-1.webp",
    paragraphs: [
      "Mrs. Priya, a resident of Hyderabad, visited our clinic with severely decayed front and back teeth that had been affecting her ability to eat comfortably. This was her first dental visit, as she had long avoided treatment due to a childhood fear of dental procedures.",
      "From the very first consultation, Dr. Siva Nagini took the time to understand her concerns and gently walk her through the diagnosis. After a detailed examination, a personalised treatment plan was created, assuring Mrs. Priya that her teeth could be restored and that she would soon be able to enjoy her favourite foods again.",
      "With Mrs. Priya's consent, treatment began using modern dental technology including 3D intraoral scanning, laser-assisted procedures, and microscopic dentistry to ensure accurate, gentle, and effective care. Throughout the process, Dr. Siva Nagini made sure Mrs. Priya felt calm, informed, and supported at every step.",
      "By the end of her treatment, Mrs. Priya regained not just her smile, but her comfort and confidence, allowing her to enjoy meals once again with her family.",
    ],
  },
];
