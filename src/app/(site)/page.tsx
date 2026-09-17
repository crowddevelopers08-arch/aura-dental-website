import HomeHero from "@/components/home/HomeHero";
import ContactFormSection from "@/components/home/ContactFormSection";
import WhyAuraDental from "@/components/home/WhyAuraDental";
import TreatmentsOffered from "@/components/home/TreatmentsOffered";
import AboutPreview from "@/components/home/AboutPreview";
import BestSmileCta from "@/components/home/BestSmileCta";
import VideoTestimonials from "@/components/sections/VideoTestimonials";
import HomeFaq from "@/components/home/HomeFaq";
import LaunchOfferCta from "@/components/home/LaunchOfferCta";
import ClinicGallery from "@/components/sections/ClinicGallery";
import { TEAM_PHOTOS } from "@/data/galleryPhotos";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ContactFormSection />
      <WhyAuraDental />
      <TreatmentsOffered />
      <AboutPreview />
      <ClinicGallery heading="Meet Our Team" photos={TEAM_PHOTOS} tone="dark" captions={false} />
      <ClinicGallery />
      <BestSmileCta />
      <VideoTestimonials />
      <HomeFaq />
      <LaunchOfferCta />
    </>
  );
}
