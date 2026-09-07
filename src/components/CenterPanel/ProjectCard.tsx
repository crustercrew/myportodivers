import type { Project } from '../../utils/types'
import StatusBadge from '../ui/StatusBadge'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const {
    name,
    description,
    image,
    imageAlt,
    status,
    statusColor,
    highlighted,
    techStack,
    liveUrl,
    repoUrl,
  } = project

  const hasLive = Boolean(liveUrl && liveUrl.trim() !== '')
  const hasRepo = Boolean(repoUrl && repoUrl.trim() !== '')

  return (
    <div
      className={
        highlighted
          ? 'border border-primary bg-surface-container/90 p-3 flex flex-col relative group cursor-pointer shadow-[0_0_15px_rgba(255,230,0,0.1)]'
          : 'border border-primary/40 bg-surface-container-low/80 p-3 flex flex-col group hover:border-primary transition-all cursor-pointer'
      }
    >
      {/* ── Project Image ── */}
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

      {/* ── Title & Description ── */}
      <h3 className="text-sm font-bold text-white font-headline tracking-wide mb-1.5 leading-snug">{name}</h3>
      <p className="text-xs text-zinc-200 font-sans leading-relaxed mb-3.5">{description}</p>

      {/* ── Tech Stack Tags ── */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 text-[11px] font-mono font-medium tracking-wide border border-primary/40 text-primary bg-primary/10 hover:bg-primary/20 hover:border-primary transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* ── Footer: Live Demo + Repo Buttons ── */}
      <div className="mt-auto pt-2 border-t border-primary/20">
        {hasLive && hasRepo ? (
          <div className="grid grid-cols-2 gap-2">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => (!liveUrl || liveUrl === '#') && e.preventDefault()}
              className="flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold font-headline tracking-wider border border-primary text-primary bg-primary/10 hover:bg-primary hover:text-black transition-all"
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              LIVE_DEMO
            </a>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => (!repoUrl || repoUrl === '#') && e.preventDefault()}
              className="flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold font-headline tracking-wider border border-primary/50 text-primary/90 bg-surface-container/50 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all"
            >
              <span className="material-symbols-outlined text-sm">code</span>
              REPO
            </a>
          </div>
        ) : hasLive ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => (!liveUrl || liveUrl === '#') && e.preventDefault()}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold font-headline tracking-wider border border-primary text-primary bg-primary/10 hover:bg-primary hover:text-black transition-all"
          >
            <span className="material-symbols-outlined text-sm">open_in_new</span>
            LIVE_DEMO
          </a>
        ) : hasRepo ? (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => (!repoUrl || repoUrl === '#') && e.preventDefault()}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold font-headline tracking-wider border border-primary/50 text-primary/90 bg-surface-container/50 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all"
          >
            <span className="material-symbols-outlined text-sm">code</span>
            VIEW_REPOSITORY
          </a>
        ) : (
          <div className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-mono tracking-wider border border-primary/20 bg-surface-container/40 text-primary/60 select-none">
            <span className="material-symbols-outlined text-xs">lock</span>
            INTERNAL_ENTERPRISE_SYSTEM
          </div>
        )}
      </div>
    </div>
  )
}
