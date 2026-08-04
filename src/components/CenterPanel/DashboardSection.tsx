import SectionHeader from '../ui/SectionHeader'
import ProgressBar from '../ui/ProgressBar'
import StatusBadge from '../ui/StatusBadge'
import { useNavigation } from '../../context/NavigationContext'
import { profileData } from '../../data/profileData'
import { projects } from '../../data/projects'
import { techStack } from '../../data/techStack'

export default function DashboardSection() {
  const { setActiveSection } = useNavigation()

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* ── Top Header ── */}
      <div className="px-6 py-4 border-b border-primary/20 shrink-0">
        <SectionHeader
          title="// COMMAND_DASHBOARD //"
          subtitle="MISSION OVERVIEW & FLEET TELEMETRY"
        />
      </div>

      {/* ── Scrollable Dashboard Grid ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        {/* Telemetry quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'EXPERIENCE', value: '4+ YRS', icon: 'military_tech', status: 'ACTIVE' },
            { label: 'SUCCESS RATE', value: '99.4%', icon: 'verified', status: 'OPTIMAL' },
            { label: 'ACTIVE OPS', value: `${projects.length} MISSIONS`, icon: 'rocket_launch', status: 'DEPLOYED' },
            { label: 'CLEARANCE', value: 'LVL-3', icon: 'security', status: 'GRANTED' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-primary/20 bg-surface-container/60 p-3 flex flex-col justify-between relative overflow-hidden group hover:border-primary/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[9px] font-mono text-primary/70 tracking-widest uppercase">
                  {stat.label}
                </span>
                <span className="material-symbols-outlined text-primary/40 text-sm">
                  {stat.icon}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-base sm:text-lg font-bold text-white font-mono">
                  {stat.value}
                </span>
                <span className="text-[8px] font-mono text-success-neon tracking-wider">
                  [{stat.status}]
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── 2x2 Main Summaries Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Card 1: About / Dossier Summary */}
          <div className="border border-primary/25 bg-surface-container/40 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-primary/15">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">person</span>
                  <h3 className="text-xs font-bold text-white font-mono tracking-widest uppercase">
                    [ OPERATOR PROFILE ]
                  </h3>
                </div>
                <span className="text-[9px] font-mono text-primary/60">SECTOR://ABOUT</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed font-mono mb-3 line-clamp-3">
                {profileData.role} specialized in crafting high-impact, performant frontend architectures with React, TypeScript, and modern design systems.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {['TypeScript', 'React', 'Next.js', 'Tailwind', 'UI/UX'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono px-2 py-0.5 border border-primary/30 bg-primary/5 text-primary/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => setActiveSection('ABOUT')}
              className="w-full mt-2 py-1.5 px-3 border border-primary/40 bg-surface-container hover:bg-primary hover:text-black text-primary font-mono text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-1 transition-all"
            >
              <span>ACCESS FULL DOSSIER</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>

          {/* Card 2: Active Projects Summary */}
          <div className="border border-primary/25 bg-surface-container/40 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-primary/15">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">rocket_launch</span>
                  <h3 className="text-xs font-bold text-white font-mono tracking-widest uppercase">
                    [ ACTIVE OPERATIONS ]
                  </h3>
                </div>
                <span className="text-[9px] font-mono text-primary/60">SECTOR://PROJECTS</span>
              </div>
              <div className="space-y-2 mb-3">
                {projects.slice(0, 2).map((proj) => (
                  <div
                    key={proj.id}
                    className="flex items-center justify-between border border-primary/15 bg-surface-container p-2"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-bold text-white font-mono truncate">{proj.name}</p>
                      <p className="text-[9px] text-primary/60 font-mono truncate">{proj.description}</p>
                    </div>
                    <StatusBadge label={proj.status} variant={proj.statusColor} />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setActiveSection('PROJECTS')}
              className="w-full mt-2 py-1.5 px-3 border border-primary/40 bg-surface-container hover:bg-primary hover:text-black text-primary font-mono text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-1 transition-all"
            >
              <span>VIEW ALL MISSIONS ({projects.length})</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>

          {/* Card 3: Skills / Combat Readiness Summary */}
          <div className="border border-primary/25 bg-surface-container/40 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-primary/15">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">engineering</span>
                  <h3 className="text-xs font-bold text-white font-mono tracking-widest uppercase">
                    [ SYSTEM ARSENAL ]
                  </h3>
                </div>
                <span className="text-[9px] font-mono text-primary/60">SECTOR://SKILLS</span>
              </div>
              <div className="space-y-2 mb-3">
                {techStack.slice(0, 3).map((item) => (
                  <div key={item.id} className="space-y-0.5">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-white/80">{item.name}</span>
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
              onClick={() => setActiveSection('SKILLS')}
              className="w-full mt-2 py-1.5 px-3 border border-primary/40 bg-surface-container hover:bg-primary hover:text-black text-primary font-mono text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-1 transition-all"
            >
              <span>OPEN SKILL MATRIX</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>

          {/* Card 4: Experience / Duty Record Summary */}
          <div className="border border-primary/25 bg-surface-container/40 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-primary/15">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">work_history</span>
                  <h3 className="text-xs font-bold text-white font-mono tracking-widest uppercase">
                    [ SERVICE RECORD ]
                  </h3>
                </div>
                <span className="text-[9px] font-mono text-primary/60">SECTOR://EXPERIENCE</span>
              </div>
              <div className="space-y-2.5 mb-3">
                <div className="border-l-2 border-primary pl-2.5 py-0.5">
                  <div className="flex justify-between items-baseline">
                    <p className="text-[11px] font-bold text-white font-mono">FRONTEND ENGINEER</p>
                    <span className="text-[8px] font-mono text-success-neon">CURRENT</span>
                  </div>
                  <p className="text-[9px] text-primary/70 font-mono">Fleet Operations & Web Core</p>
                </div>
                <div className="border-l-2 border-primary/40 pl-2.5 py-0.5">
                  <div className="flex justify-between items-baseline">
                    <p className="text-[11px] font-bold text-white/80 font-mono">WEB DEVELOPER</p>
                    <span className="text-[8px] font-mono text-primary/50">2021 — 2023</span>
                  </div>
                  <p className="text-[9px] text-primary/50 font-mono">Mission Control UI Engineering</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveSection('EXPERIENCE')}
              className="w-full mt-2 py-1.5 px-3 border border-primary/40 bg-surface-container hover:bg-primary hover:text-black text-primary font-mono text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-1 transition-all"
            >
              <span>VIEW FULL SERVICE LOGS</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* ── Status Banner ── */}
        <div className="flex items-center justify-between border border-primary/20 bg-primary/5 px-4 py-2 text-[10px] font-mono">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-success-neon animate-pulse" />
            <span className="text-white/80">ALL SUBSYSTEMS NOMINAL // STRATAGEM READY</span>
          </div>
          <span className="text-primary/60 uppercase">ENCRYPTION: 256-BIT HELLDIVER-STD</span>
        </div>
      </div>
    </div>
  )
}
