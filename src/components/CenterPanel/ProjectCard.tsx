import type { Project } from '../../utils/types'
import StatusBadge from '../ui/StatusBadge'
import ProgressBar from '../ui/ProgressBar'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { name, description, image, imageAlt, status, statusColor, metricLabel, metricValue, highlighted } =
    project

  return (
    <div
      className={
        highlighted
          ? 'w-full lg:w-1/3 lg:aspect-[3/4] border border-primary bg-surface-container/90 p-3 flex flex-col relative group cursor-pointer shadow-[0_0_15px_rgba(255,230,0,0.1)]'
          : 'w-full lg:w-1/3 lg:aspect-[3/4] border border-primary/40 bg-surface-container-low/80 p-3 flex flex-col group hover:border-primary transition-all cursor-pointer'
      }
    >
      <div className="w-full h-32 mb-3 border border-primary/20 overflow-hidden relative">
        <img
          className={
            highlighted
              ? 'w-full h-full object-cover'
              : 'w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500'
          }
          alt={imageAlt}
          src={image}
        />
        <StatusBadge
          label={`[OP: ${status}]`}
          variant={statusColor}
          className="absolute top-2 right-2"
        />
      </div>

      <h3 className="text-xs font-bold text-white mb-1">{name}</h3>
      <p className="text-[9px] text-primary/60 mb-4">{description}</p>

      <div className="mt-auto pt-2 border-t border-primary/10">
        <ProgressBar
          value={metricValue}
          barColor={statusColor}
          label={metricLabel}
          showValue
        />
      </div>
    </div>
  )
}
