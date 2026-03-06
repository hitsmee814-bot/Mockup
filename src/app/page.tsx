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

export default function HomePage() {

  return (
<>
      <VideoMain />
      <Hero />
      {/* <FloatingCardsSection /> */}
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