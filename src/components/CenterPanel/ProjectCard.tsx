import type { Project, StatusColor } from '../../utils/types'

const statusBadgeStyles: Record<StatusColor, string> = {
  success: 'bg-success-neon text-black',
  primary: 'bg-primary text-black blinking',
}

const barColorStyles: Record<StatusColor, string> = {
  success: 'bg-success-neon',
  primary: 'bg-primary',
}

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
          ? 'w-1/3 aspect-[3/4] border border-primary bg-surface-container/90 p-3 flex flex-col relative group cursor-pointer shadow-[0_0_15px_rgba(255,230,0,0.1)]'
          : 'w-1/3 aspect-[3/4] border border-primary/40 bg-surface-container-low/80 p-3 flex flex-col group hover:border-primary transition-all cursor-pointer'
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
        <div className={`absolute top-2 right-2 px-1.5 py-0.5 text-[8px] font-bold ${statusBadgeStyles[statusColor]}`}>
          [OP: {status}]
        </div>
      </div>

      <h3 className="text-xs font-bold text-white mb-1">{name}</h3>
      <p className="text-[9px] text-primary/60 mb-4">{description}</p>

      <div className="mt-auto pt-2 border-t border-primary/10">
        <div className="flex justify-between text-[8px] text-primary mb-1">
          <span>{metricLabel}</span>
          <span>{metricValue}%</span>
        </div>
        <div className="h-1 bg-surface-container">
          <div className={`h-full ${barColorStyles[statusColor]}`} style={{ width: `${metricValue}%` }}></div>
        </div>
      </div>
    </div>
  )
}
