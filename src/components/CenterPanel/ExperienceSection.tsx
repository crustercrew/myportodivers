import SectionHeader from '../ui/SectionHeader'
import { experiences } from '../../data/experienceData'

export default function ExperienceSection() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* ── Section Header ── */}
      <div className="px-6 py-4 border-b border-primary/20 shrink-0">
        <SectionHeader
          title="[ WORK_HISTORY ] // EXPERIENCE"
          subtitle="CHRONOLOGICAL CAREER TIMELINE & CLIENT ENGAGEMENTS"
        />
      </div>

      {/* ── Main Content Area ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="border border-primary/20 bg-surface-container/60 p-5 space-y-3 hover:border-primary/50 transition-colors"
          >
            {/* Header: Role, Client/Company, Period & Status */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-primary/15 pb-2.5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-primary/70">{exp.id} //</span>
                  <h3 className="text-sm font-bold text-white font-headline tracking-wide uppercase">
                    {exp.role}
                  </h3>
                </div>
                <p className="text-xs text-primary font-medium font-sans mt-0.5">
                  {exp.company}
                  {exp.client && (
                    <span className="text-zinc-300">
                      {' '}— Client: <span className="text-zinc-100 font-semibold">{exp.client}</span>
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <span className="text-[11px] font-mono text-zinc-300">{exp.period}</span>
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 border font-bold ${exp.status === 'ACTIVE'
                      ? 'border-success-neon text-success-neon bg-success-neon/10'
                      : 'border-primary/30 text-primary/70 bg-primary/5'
                    }`}
                >
                  [{exp.status}]
                </span>
              </div>
            </div>

            {/* Bullet Highlights */}
            <ul className="space-y-1.5">
              {exp.description.map((bullet, idx) => (
                <li key={idx} className="text-xs text-zinc-300 font-sans leading-relaxed flex items-start gap-2">
                  <span className="text-primary/70 font-mono select-none mt-0.5">›</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-primary/10">
              {exp.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono px-2 py-0.5 border border-primary/25 bg-surface-container text-primary/90"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
