"use client"

import VideoMain from "./components/VideoMain"
import Hero from "./components/Hero"
import FloatingCardsSection from "./components/floater-cards/FloatingCardsSection"
import VisionMissionSection from "./components/VisionMission"
import TestimonialsCarousel from "./components/TestimonialsSection"
import FAQ from "./components/Faq"
import Footer from "./components/Footer"
import VacationDestinations from "./components/package-carousel/PackageCards"
import RoadmapTimeline from "./components/RoadMap/RoadMap"
import CoverflowCarousel from "./components/package-carousel/CarouselCards"
import TopPackages from "./components/TopPackages"

export default function HomePage() {

  return (
<>
      <VideoMain />
      <Hero />
      {/* <FloatingCardsSection /> */}
      {/* Keep below carousel cards */}
        <CoverflowCarousel/>
        <TopPackages/>

      <VacationDestinations />
      {/* <CriticalServices /> */}
      {/* <VisionMissionSection /> */}
      {/* <TeamSectionNew /> */}
      <TestimonialsCarousel />
      <RoadmapTimeline/>
      {/* <PrivacyPolicy /> */}
      <FAQ />
      <Footer />
      </>
  )
}