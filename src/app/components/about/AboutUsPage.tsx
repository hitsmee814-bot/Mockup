import AboutClosing from "./AboutClosing"
import AboutCraft from "./AboutCraft"
import AboutHero from "./AboutHero"
import AboutTeam from "./AboutTeam"
import AscendusSection from "./AscendusSection"
import FounderNote from "./FounderNote"
import VisionSection from "./VisionSection"
import WhyDifferent from "./WhyDifferent"

export default function AboutUsPage() {
    return (
        <main>
            <AboutHero />
            <WhyDifferent />
            <FounderNote />
            <AboutTeam />
            <AboutCraft />
            <AscendusSection />
            <VisionSection />
            <AboutClosing />
        </main>
    )
}