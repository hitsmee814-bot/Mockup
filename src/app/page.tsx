import CriticalServices from "./components/CriticalServices";
import FAQ from "./components/Faq";
import FeaturesSection from "./components/FeaturesSection";
import FloatingCardsSection from "./components/floater-cards/FloatingCardsSection";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import CoverflowCarousel from "./components/package-carousel/CarouselCards";
import PrivacyPolicy from "./components/Privacy";
import TeamSectionNew from "./components/TeamSection/TeamSection";
import TestimonialsCarousel from "./components/TestimonialsSection";
import VideoMain from "./components/VideoMain";
import VisionMissionSection from "./components/VisionMission";

export default function HomePage() {

  return (
    <>
      <VideoMain />
      <Hero />
      <FloatingCardsSection />
      <CoverflowCarousel />
      <CriticalServices />
      <VisionMissionSection/>
      <TeamSectionNew/>
      <TestimonialsCarousel/>
      <PrivacyPolicy/>
      <FAQ />
      <Footer />
    </>
  );
}
