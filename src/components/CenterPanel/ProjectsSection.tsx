import SectionHeader from '../ui/SectionHeader'
import ProjectCard from './ProjectCard'
import { projects } from '../../data/projects'

export default function ProjectsSection() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Section Header */}
      <div className="px-6 py-4 border-b border-primary/20 shrink-0">
        <SectionHeader
          title="// ACTIVE OPERATIONS //"
          subtitle="FLEET DEPLOYMENT STATUS: CRITICAL // TACTICAL PROJECTS"
        />
      </div>

      {/* Projects Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}
