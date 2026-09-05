import SectionHeader from '../ui/SectionHeader'

export default function SkillsSection() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Section Header */}
      <div className="px-6 py-4 border-b border-primary/20 shrink-0">
        <SectionHeader
          title="[ SYSTEM_ARSENAL ] // SKILLS"
          subtitle="TECHNICAL LOADOUT & COMBAT PROFICIENCIES"
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        {/* Placeholder / Template Layout */}
        <div className="border border-primary/20 bg-surface-container/40 p-6 flex flex-col items-center justify-center text-center py-12 relative overflow-hidden">
          <div className="w-16 h-16 border-2 border-dashed border-primary/40 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-3xl text-primary animate-pulse">engineering</span>
          </div>

          <h3 className="text-sm font-bold text-white tracking-wider uppercase font-headline mb-2">
            [ SKILL MATRIX CALIBRATION IN PROGRESS ]
          </h3>
          <p className="text-xs text-zinc-300 max-w-md font-sans mb-6 leading-relaxed">
            Arsenal power ratings, tech stratagems, framework proficiency indexes, and tactical toolings are awaiting configuration.
          </p>

          <div className="flex items-center gap-2 border border-primary/30 bg-primary/10 px-4 py-2">
            <span className="inline-block w-2 h-2 rounded-full bg-success-neon animate-ping" />
            <span className="text-[10px] font-headline font-bold text-primary tracking-wider uppercase">
              STATUS: READY FOR DATA ENTRY
            </span>
          </div>
        </div>

        {/* Blueprint preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 opacity-80">
          {[
            { category: 'CORE BACKEND', items: ['Java / Spring Boot', 'Software AG webMethods', 'OutSystems / .NET', 'PHP / Laravel'] },
            { category: 'DATABASES & CACHE', items: ['Oracle SQL', 'PostgreSQL', 'MySQL', 'Redis Caching'] },
            { category: 'TOOLS & STANDARDS', items: ['Apache JMeter', 'Docker', 'QRIS Payment Standards', 'REST APIs'] },
          ].map((cat, i) => (
            <div key={i} className="border border-primary/20 bg-surface-container/50 p-4">
              <h5 className="text-[11px] font-bold text-primary tracking-wider font-headline mb-2">
                // {cat.category}
              </h5>
              <ul className="space-y-1">
                {cat.items.map((it) => (
                  <li key={it} className="text-xs font-sans text-zinc-300 flex items-center gap-1.5">
                    <span className="text-primary/70">▸</span> {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
