import SectionHeader from '../ui/SectionHeader'
import { profileData } from '../../data/profileData'

export default function ContactSection() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Section Header */}
      <div className="px-6 py-4 border-b border-primary/20 shrink-0">
        <SectionHeader
          title="[ COMMS_CHANNEL ] // CONTACT"
          subtitle="SUB-SPACE DIRECT FREQUENCY & SECURE RELAYS"
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        <div className="border border-primary/20 bg-surface-container/40 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-primary animate-pulse">satellite_alt</span>
            <div>
              <h3 className="text-sm font-bold text-white font-mono tracking-widest uppercase">
                ESTABLISH SECURE LINK
              </h3>
              <p className="text-[10px] text-primary/60 font-mono">
                BROADCAST DIRECT MESSAGE TO OPERATOR TERMINAL
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-primary/20 my-2" />

          <div className="space-y-3">
            <div className="border border-primary/15 bg-surface-container p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary/60 text-base">mail</span>
                <div>
                  <p className="text-[9px] text-primary/50 uppercase tracking-widest font-mono">EMAIL RELAY</p>
                  <a
                    href={`mailto:${profileData.email}`}
                    className="text-xs text-white/90 font-mono hover:text-primary transition-colors"
                  >
                    {profileData.email}
                  </a>
                </div>
              </div>
              <span className="text-[9px] font-mono text-success-neon">[DIRECT]</span>
            </div>

            <div className="border border-primary/15 bg-surface-container p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary/60 text-base">location_on</span>
                <div>
                  <p className="text-[9px] text-primary/50 uppercase tracking-widest font-mono">CURRENT BASE</p>
                  <p className="text-xs text-white/90 font-mono">{profileData.location}</p>
                </div>
              </div>
              <span className="text-[9px] font-mono text-primary/60">[PLANETARY]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
