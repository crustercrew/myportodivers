import SectionHeader from '../ui/SectionHeader'

export default function ExperienceSection() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Section Header */}
      <div className="px-6 py-4 border-b border-primary/20 shrink-0">
        <SectionHeader
          title="[ SERVICE_RECORD ] // EXPERIENCE"
          subtitle="HISTORICAL DEPLOYMENT & CAMPAIGN LOGS"
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        {/* Placeholder / Template Layout */}
        <div className="border border-primary/20 bg-surface-container/40 p-6 flex flex-col items-center justify-center text-center py-12 relative overflow-hidden">
          {/* Subtle grid pattern / background cue */}
          <div className="w-16 h-16 border-2 border-dashed border-primary/40 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-3xl text-primary animate-pulse">work_history</span>
          </div>

          <h3 className="text-sm font-bold text-white tracking-[0.2em] uppercase font-mono mb-2">
            [ DEPLOYMENT ARCHIVES UNDER CLASSIFICATION REVIEW ]
          </h3>
          <p className="text-xs text-primary/60 max-w-md font-mono mb-6">
            Detailed mission campaigns, past squadron records, and engineering service logs are currently being compiled.
          </p>

          <div className="flex items-center gap-2 border border-primary/30 bg-primary/10 px-4 py-2">
            <span className="inline-block w-2 h-2 rounded-full bg-success-neon animate-ping" />
            <span className="text-[10px] font-mono text-primary tracking-widest uppercase">
              STATUS: READY FOR DATA ENTRY
            </span>
          </div>
        </div>

        {/* Tactical blueprint mockup preview */}
        <div className="space-y-3 opacity-60">
          <h4 className="text-[10px] font-bold text-primary/70 tracking-[0.3em] uppercase font-mono">
            // SERVICE TIMELINE BLUEPRINT //
          </h4>
          <div className="space-y-3">
            {[
              { role: 'SENIOR FRONTEND ENGINEER', unit: 'FLEET OPERATIONS', period: '2023 — PRESENT', badge: 'ACTIVE' },
              { role: 'WEB SYSTEMS DEVELOPER', unit: 'TACTICAL COMMAND HQ', period: '2021 — 2023', badge: 'COMPLETED' },
            ].map((item, idx) => (
              <div key={idx} className="border-l-2 border-primary/50 bg-surface-container/30 p-4 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-white font-mono">{item.role}</p>
                  <p className="text-[10px] text-primary/60 font-mono">{item.unit}</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-mono text-primary/40 block">{item.period}</span>
                  <span className="text-[8px] font-mono text-success-neon">[{item.badge}]</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
