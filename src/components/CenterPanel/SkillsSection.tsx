import SectionHeader from '../ui/SectionHeader'
import { skillsData } from '../../data/skills'

export default function SkillsSection() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* ── Section Header ── */}
      <div className="px-6 py-4 border-b border-primary/20 shrink-0">
        <SectionHeader
          title="[ SKILL_MATRIX ] // TECHNICAL QUALIFICATIONS"
          subtitle="PROGRAMMING LANGUAGES, FRAMEWORKS, DATA ENGINES & TOOLCHAIN"
        />
      </div>

      {/* ── Skills Grid ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillsData.map((category) => (
            <div
              key={category.id}
              className="border border-primary/20 bg-surface-container/60 p-5 space-y-3 hover:border-primary/50 transition-colors"
            >
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-primary/15 pb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-primary/70">{category.id} //</span>
                    <h3 className="text-sm font-bold text-white font-headline tracking-wide uppercase">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-xs text-primary font-medium font-sans mt-0.5">
                    {category.subtitle}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-zinc-300">
                  {category.skills.length} MODULES
                </span>
              </div>

              {/* Skills Tags matching ExperienceSection chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-mono px-2 py-0.5 border border-primary/25 bg-surface-container text-primary/90 hover:border-primary hover:text-primary transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
