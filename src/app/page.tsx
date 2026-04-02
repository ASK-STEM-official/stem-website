import Navigation from '@/components/layout/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import MissionSection from '@/components/sections/MissionSection'
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
        <AboutSection />
        <MissionSection />
        <ProjectsSection />
        <AwardsSection />
        <TimelineSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
