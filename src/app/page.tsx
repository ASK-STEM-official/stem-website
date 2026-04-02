import Navigation from '@/components/layout/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import MissionSection from '@/components/sections/MissionSection'
import AboutSection from '@/components/sections/AboutSection'
import StemSection from '@/components/sections/StemSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import AwardsSection from '@/components/sections/AwardsSection'
import TimelineSection from '@/components/sections/TimelineSection'
import FAQSection from '@/components/sections/FAQSection'
import DotParticleCanvas from '@/components/ui/DotParticleCanvas'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <main className="relative bg-white dark:bg-gray-950 transition-colors duration-300">
        <MissionSection />
        <AboutSection />
        <StemSection />
        <ProjectsSection />
        <AwardsSection />
        <TimelineSection />
        <FAQSection />
        {/* Canvas on top of content; pointer-events-none lets clicks pass through */}
        <DotParticleCanvas className="absolute inset-0 w-full h-full z-30 pointer-events-none" />
      </main>
      <Footer />
    </>
  )
}
