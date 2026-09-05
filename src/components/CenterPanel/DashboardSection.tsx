import SectionHeader from '../ui/SectionHeader'
import ProgressBar from '../ui/ProgressBar'
import StatusBadge from '../ui/StatusBadge'
import { useNavigation, type SectionId } from '../../context/NavigationContext'
import { profileData } from '../../data/profileData'
import { projects } from '../../data/projects'
import { techStack } from '../../data/techStack'

export default function DashboardSection() {
  const { setActiveSection } = useNavigation()

  const navigateTo = (section: SectionId) => {
    setActiveSection(section)
  }

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* ── Top Header ── */}
      <div className="px-6 py-4 border-b border-primary/20 shrink-0">
        <SectionHeader
          title="// SYSTEM_OVERVIEW //"
          subtitle="DEVELOPER STATUS & REPOSITORY METRICS"
        />
      </div>

      {/* ── Scrollable Dashboard Grid ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        {/* Telemetry quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'TOTAL_EXP', value: '3+ YEARS', icon: 'history_edu', status: 'VERIFIED' },
            { label: 'SYS_RELIABILITY', value: '99.8%', icon: 'dns', status: 'OPTIMAL' },
            { label: 'REPOSITORIES', value: `${projects.length} PROJECTS`, icon: 'folder_code', status: 'DEPLOYED' },
            { label: 'DOMAIN_SCOPE', value: 'ENTERPRISE', icon: 'layers', status: 'PRODUCTION' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-primary/25 bg-surface-container/70 p-3.5 flex flex-col justify-between relative overflow-hidden group hover:border-primary/60 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-headline font-semibold text-primary/90 tracking-wider uppercase">
                  {stat.label}
                </span>
                <span className="material-symbols-outlined text-primary/60 text-sm">
                  {stat.icon}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-base sm:text-lg font-bold text-white font-headline tracking-wide">
                  {stat.value}
                </span>
                <span className="text-[9px] font-mono text-success-neon font-bold tracking-wider">
                  [{stat.status}]
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── 2x2 Main Summaries Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Card 1: About / Dossier Summary */}
          <div className="border border-primary/25 bg-surface-container/50 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-primary/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">person</span>
                  <h3 className="text-xs font-bold text-white font-headline tracking-wider uppercase">
                    [ DEVELOPER PROFILE ]
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-primary/70">SECTOR://ABOUT</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-3">
                {profileData.role} & Full Stack Developer with 3+ years’ experience building scalable, secure backend systems, enterprise middleware, and modern web applications.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {['Java', 'Spring Boot', 'webMethods', 'OutSystems', 'Oracle SQL', 'PostgreSQL', 'ReactJS'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 border border-primary/30 bg-primary/10 text-primary font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => navigateTo('ABOUT')}
              className="w-full mt-2 py-1.5 px-3 border border-primary/40 bg-surface-container hover:bg-primary hover:text-black text-primary font-headline text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>INSPECT FULL PROFILE</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>

          {/* Card 2: Active Projects Summary */}
          <div className="border border-primary/25 bg-surface-container/50 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-primary/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">rocket_launch</span>
                  <h3 className="text-xs font-bold text-white font-headline tracking-wider uppercase">
                    [ FEATURED PROJECTS ]
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-primary/70">SECTOR://REPOSITORIES</span>
              </div>
              <div className="space-y-2 mb-3">
                {projects.slice(0, 2).map((proj) => (
                  <div
                    key={proj.id}
                    className="flex items-center justify-between border border-primary/20 bg-surface-container/80 p-2.5"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-bold text-white font-headline tracking-wide truncate">{proj.name}</p>
                      <p className="text-[11px] text-zinc-300 font-sans truncate mt-0.5">{proj.description}</p>
                    </div>
                    <StatusBadge label={proj.status} variant={proj.statusColor} />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => navigateTo('PROJECTS')}
              className="w-full mt-2 py-1.5 px-3 border border-primary/40 bg-surface-container hover:bg-primary hover:text-black text-primary font-headline text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>VIEW ALL PROJECTS ({projects.length})</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>

          {/* Card 3: Skills / Combat Readiness Summary */}
          <div className="border border-primary/25 bg-surface-container/50 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-primary/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">code</span>
                  <h3 className="text-xs font-bold text-white font-headline tracking-wider uppercase">
                    [ TECH STACK MATRIX ]
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-primary/70">SECTOR://SKILLS</span>
              </div>
              <div className="space-y-2 mb-3">
                {techStack.slice(0, 4).map((item) => (
                  <div key={item.id} className="space-y-0.5">
                    <div className="flex justify-between text-[11px] font-headline">
                      <span className="text-zinc-200 font-medium">{item.name}</span>
                      <span className="text-primary font-bold">{item.power}%</span>
                    </div>
                    <ProgressBar
                      value={item.power}
                      barColor={item.barColor}
                      trackClassName="bg-background h-1.5"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => navigateTo('SKILLS')}
              className="w-full mt-2 py-1.5 px-3 border border-primary/40 bg-surface-container hover:bg-primary hover:text-black text-primary font-headline text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>OPEN SKILL MATRIX</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>

          {/* Card 4: Experience / Duty Record Summary */}
          <div className="border border-primary/25 bg-surface-container/50 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-primary/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">work_history</span>
                  <h3 className="text-xs font-bold text-white font-headline tracking-wider uppercase">
                    [ WORK EXPERIENCE ]
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-primary/70">SECTOR://EXPERIENCE</span>
              </div>
              <div className="space-y-2.5 mb-3">

                <div className="border-l-2 border-primary pl-2.5 py-0.5">
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-bold text-white font-headline tracking-wide">BACKEND DEVELOPER Jr.</p>
                    <span className="text-xs font-mono text-success-neon font-bold">Okt 2025 - Aug 2026</span>
                  </div>
                  <p className="text-xs text-zinc-300 font-sans mt-0.5">PT. BANK NEGARA INDONESIA (Persero) Tbk.</p>
                </div>

                <div className="border-l-2 border-primary/40 pl-2.5 py-0.5">
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-bold text-white font-headline tracking-wide">FULL STACK ENGINEER</p>
                    <span className="text-xs font-mono text-primary/70">Jan 2024 - Sep 2025</span>
                  </div>
                  <p className="text-xs text-zinc-300 font-sans mt-0.5">PT Telekomunikasi Selular / Telkomsel</p>
                </div>

                <div className="border-l-2 border-primary/40 pl-2.5 py-0.5">
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-bold text-zinc-200 font-headline tracking-wide">JUNIOR APPLICATION DEVELOPER</p>
                    <span className="text-xs font-mono text-primary/70">Jul 2023 - Sep 2025</span>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans mt-0.5">PT Mitra Integrasi Informatika (Metrodata Electronics)</p>
                </div>

              </div>
            </div>
            <button
              onClick={() => navigateTo('EXPERIENCE')}
              className="w-full mt-2 py-1.5 px-3 border border-primary/40 bg-surface-container hover:bg-primary hover:text-black text-primary font-headline text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>VIEW FULL SERVICE LOGS</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* ── Status Banner ── */}
        <div className="flex items-center justify-between border border-primary/20 bg-primary/5 px-4 py-2.5 text-xs font-headline">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-success-neon animate-pulse" />
            <span className="text-zinc-200 font-medium">ALL SUBSYSTEMS NOMINAL // STRATAGEM READY</span>
          </div>
          <span className="text-primary/70 uppercase tracking-wider font-mono text-[10px]">ENCRYPTION: 256-BIT HELLDIVER-STD</span>
        </div>
      </div>
    </div>
  )
}
