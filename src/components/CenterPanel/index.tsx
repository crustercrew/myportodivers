// import RadarBackground from '../ui/RadarBackground'
import DashboardSection from './DashboardSection'
import AboutSection from './AboutSection'
import ExperienceSection from './ExperienceSection'
import ProjectsSection from './ProjectsSection'
import SkillsSection from './SkillsSection'
import ContactSection from './ContactSection'
import { useNavigation } from '../../context/NavigationContext'

export default function CenterPanel() {
  const { activeSection } = useNavigation()

  return (
    <section className="w-full flex-1 flex flex-col gap-2 min-h-[500px] lg:min-h-0 shrink-0">
      <div className="flex-1 flex flex-col border border-primary/30 bg-surface-container-lowest relative overflow-hidden">
        {/* <RadarBackground /> */}

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col h-full min-h-0">
          {activeSection === 'DASHBOARD' && <DashboardSection />}
          {activeSection === 'ABOUT' && <AboutSection />}
          {activeSection === 'EXPERIENCE' && <ExperienceSection />}
          {activeSection === 'PROJECTS' && <ProjectsSection />}
          {activeSection === 'SKILLS' && <SkillsSection />}
          {activeSection === 'CONTACT' && <ContactSection />}
        </div>
      </div>
    </section>
  )
}
