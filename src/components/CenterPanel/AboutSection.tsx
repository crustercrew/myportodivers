import SectionHeader from '../ui/SectionHeader'

export default function AboutSection() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Section heading */}
      <div className="px-6 py-4">
        <SectionHeader
          title="[ OPERATOR_LOG ] // ABOUT ME"
          subtitle="PERSONAL DOSSIER — CLASSIFICATION: PUBLIC"
        />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-6 space-y-6">
        {/* ── Bio Block ── */}
        <div className="border border-primary/20 bg-surface-container/60 p-5">
          <p className="text-sm text-white/90 leading-relaxed font-mono">
            Frontend developer with 4+ years shipping performant, accessible web applications.
            Focused on design systems, TypeScript, and turning ambiguous requirements into calm,
            usable interfaces. Passionate about creating immersive digital experiences that feel
            alive and responsive.
          </p>
        </div>

        {/* ── Objective ── */}
        <div className="border-l-2 border-primary bg-surface-container/40 px-5 py-4">
          <h3 className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase mb-2 font-mono">
            [ OBJECTIVE ]
          </h3>
          <p className="text-xs text-white/80 leading-relaxed font-mono">
            Join a product-driven engineering team to ship user-facing features that measurably
            improve activation and retention. Looking for opportunities where craft and impact
            intersect.
          </p>
        </div>

        {/* ── Core Competencies ── */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-primary/70 tracking-[0.3em] uppercase font-mono">
            [ CORE_COMPETENCIES ]
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'SPECIALIZATION', value: 'Frontend Architecture' },
              { label: 'PRIMARY LANG', value: 'TypeScript / JavaScript' },
              { label: 'FRAMEWORK', value: 'React / Next.js' },
              { label: 'STYLING', value: 'Tailwind / CSS-in-JS' },
              { label: 'TOOLS', value: 'Git / Figma / Vite' },
              { label: 'METHODOLOGY', value: 'Agile / Scrum' },
            ].map((item) => (
              <div
                key={item.label}
                className="border border-primary/15 bg-surface-container p-3 group hover:border-primary/40 transition-colors"
              >
                <p className="text-[8px] text-primary/50 uppercase tracking-widest mb-1 font-mono">
                  {item.label}
                </p>
                <p className="text-[11px] text-white/80 font-mono">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Personal Intel ── */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-primary/70 tracking-[0.3em] uppercase font-mono">
            [ PERSONAL_INTEL ]
          </h3>
          <div className="border border-primary/15 bg-surface-container/40 p-4 space-y-3">
            {[
              {
                icon: 'language',
                title: 'LANGUAGES',
                desc: 'Indonesian (Native) · English (Professional)',
              },
              {
                icon: 'school',
                title: 'EDUCATION',
                desc: 'Bachelor of Computer Science',
              },
              {
                icon: 'location_on',
                title: 'BASE OF OPERATIONS',
                desc: 'Indonesia',
              },
              {
                icon: 'interests',
                title: 'INTERESTS',
                desc: 'UI/UX Design · Open Source · Gaming · Sci-Fi',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary/50 text-base mt-0.5">
                  {item.icon}
                </span>
                <div>
                  <p className="text-[9px] text-primary/60 tracking-widest uppercase font-mono">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-white/80 font-mono">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Transmission End ── */}
        <div className="flex items-center gap-3 pt-2 pb-4">
          <div className="flex-1 h-px bg-primary/20" />
          <span className="text-[9px] text-primary/30 tracking-[0.3em] uppercase font-mono">
            END OF DOSSIER
          </span>
          <div className="flex-1 h-px bg-primary/20" />
        </div>
      </div>
    </div>
  )
}
