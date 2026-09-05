import SectionHeader from '../ui/SectionHeader'

export default function AboutSection() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Section heading */}
      <div className="px-6 py-4 border-b border-primary/20 shrink-0">
        <SectionHeader
          title="[ DEVELOPER_PROFILE ] // ABOUT ME"
          subtitle="COMPLETE DOSSIER & PROFESSIONAL CREDENTIALS"
        />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-6 pt-4 space-y-6">
        {/* ── Bio Block ── */}
        <div className="border border-primary/25 bg-surface-container/60 p-5">
          <p className="text-sm text-zinc-200 leading-relaxed font-sans">
            Application & Full Stack Developer with 3+ years’ experience building scalable, secure web and backend systems. Skilled in Java (Spring Boot), Node.js/TypeScript, React, PHP (Laravel/CodeIgniter), webMethods/OutSystems, and PostgreSQL/Oracle; experienced in RESTful API design, performance optimization, Docker deployments, and implementing onboarding and audit solutions to improve reliability and operational efficiency.
          </p>
        </div>

        {/* ── Objective ── */}
        <div className="border-l-2 border-primary bg-surface-container/40 px-5 py-4">
          <h3 className="text-xs font-bold text-primary tracking-wider uppercase mb-2 font-headline">
            [ OBJECTIVE ]
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            Deliver robust, secure, and scalable enterprise architecture. Seeking high-impact engineering roles where deep backend integration, financial switching compliance, and modern full-stack development meet.
          </p>
        </div>

        {/* ── Core Competencies ── */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-primary/80 tracking-wider uppercase font-headline">
            [ CORE_COMPETENCIES ]
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'SPECIALIZATION', value: 'Enterprise Middleware & Backend' },
              { label: 'PRIMARY LANG', value: 'Java / SQL / TypeScript / PHP' },
              { label: 'FRAMEWORKS', value: 'Spring Boot / webMethods / OutSystems / React' },
              { label: 'DATABASES', value: 'Oracle SQL / PostgreSQL / MySQL' },
              { label: 'TOOLS & TESTING', value: 'Docker / Apache JMeter / Postman / Git' },
              { label: 'STANDARDS', value: 'QRIS / REST APIs / CAPEX-OPEX Budgeting' },
            ].map((item) => (
              <div
                key={item.label}
                className="border border-primary/20 bg-surface-container/70 p-3 group hover:border-primary/50 transition-colors"
              >
                <p className="text-[10px] text-primary/80 uppercase font-headline font-semibold tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-xs text-zinc-200 font-sans font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Personal Intel ── */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-primary/80 tracking-wider uppercase font-headline">
            [ PERSONAL_INTEL ]
          </h3>
          <div className="border border-primary/20 bg-surface-container/50 p-4 space-y-3.5">
            {[
              {
                icon: 'language',
                title: 'LANGUAGES',
                desc: 'Indonesian (Native) · English (Professional)',
              },
              {
                icon: 'school',
                title: 'EDUCATION',
                desc: 'Bachelor of Informatics Engineering — Bhayangkara University Surabaya (GPA 3.54)',
              },
              {
                icon: 'location_on',
                title: 'BASE OF OPERATIONS',
                desc: 'Kemiri Indah A1/18, Sidoarjo, Indonesia',
              },
              {
                icon: 'call',
                title: 'COMMUNICATION FREQUENCY',
                desc: '+62 89 542 082 5511 · fahrealbernov@gmail.com',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                  {item.icon}
                </span>
                <div>
                  <p className="text-[10px] text-primary/80 tracking-wider uppercase font-headline font-semibold">
                    {item.title}
                  </p>
                  <p className="text-xs text-zinc-200 font-sans mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Transmission End ── */}
        <div className="flex items-center gap-3 pt-2 pb-4">
          <div className="flex-1 h-px bg-primary/20" />
          <span className="text-[10px] text-primary/50 tracking-widest uppercase font-mono">
            END OF DOSSIER
          </span>
          <div className="flex-1 h-px bg-primary/20" />
        </div>
      </div>
    </div>
  )
}
