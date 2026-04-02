import Navigation from '@/components/layout/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import MissionSection from '@/components/sections/MissionSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import AwardsSection from '@/components/sections/AwardsSection'
import TimelineSection from '@/components/sections/TimelineSection'
import FAQSection from '@/components/sections/FAQSection'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="bg-white dark:bg-gray-950 transition-colors duration-300">
        <HeroSection />
        <MissionSection />
        <AboutSection />
        <ProjectsSection />
        <AwardsSection />
        <TimelineSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
