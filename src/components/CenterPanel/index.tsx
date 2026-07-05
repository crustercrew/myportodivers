import RadarBackground from './RadarBackground'
import ProjectCard from './ProjectCard'
import TacticalButtons from './TacticalButtons'
import { projects } from '../../data/projects'

export default function CenterPanel() {
  return (
    <section className="w-1/2 flex flex-col gap-2">
      <div className="flex-1 flex flex-col border border-primary/30 bg-surface-container-lowest relative overflow-hidden">
        <RadarBackground />

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="px-6 py-4">
            <h2 className="text-2xl font-headline-lg font-bold text-white tracking-widest">
              // ACTIVE OPERATIONS //
            </h2>
            <p className="text-[10px] text-primary/70">FLEET DEPLOYMENT STATUS: CRITICAL</p>
          </div>

          <div className="flex-1 flex items-center justify-center px-4 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <TacticalButtons />
        </div>
      </div>
    </section>
  )
}
