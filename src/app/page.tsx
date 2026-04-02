import Navigation from '@/components/layout/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import MissionSection from '@/components/sections/MissionSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import AwardsSection from '@/components/sections/AwardsSection'
import TimelineSection from '@/components/sections/TimelineSection'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <MissionSection />
        <ProjectsSection />
        <AwardsSection />
        <TimelineSection />
      </main>
      <Footer />
    </>
  )
}
