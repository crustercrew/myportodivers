import profileImg from "../../assets/helldivers2.jpg";
import InfoCell from '../ui/InfoCell'
import { profileData } from '../../data/profileData'

interface ProfileCardProps {
  /** When true the terminal is hidden and the card stretches with extra content. */
  expanded?: boolean
}

export default function ProfileCard({ expanded = false }: ProfileCardProps) {
  return (
    <div
      className={`bg-surface-container-low p-4 border-l-4 border-primary flex flex-col transition-all duration-300 ${expanded ? 'flex-1' : ''
        }`}
    >
      <div className="flex flex-col gap-4">
        {/* ── Profile Header ── */}
        <div className="flex items-start gap-4">
          <div className="relative w-20 h-20 shrink-0">
            <div className="absolute inset-0 hex-frame overflow-hidden">
              <img
                className="absolute inset-0 hex-frame bg-primary/10 flex items-center justify-center overflow-hidden"
                alt="Profile portrait"
                src={profileImg}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-white leading-tight">{profileData.name}</h2>
            <p className="text-xs text-primary font-bold">{profileData.email}</p>
          </div>
        </div>

        {/* ── Info Cells (always visible) ── */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <InfoCell label="Security Clearance" value="LEVEL ALPHA-9" />
          <InfoCell label="Bio-Status" value="OPTIMAL" valueClassName="text-success-neon" />
        </div>

        {/* ── Expanded Content (visible when terminal is closed) ── */}
        {expanded && (
          <div className="flex flex-col gap-4 mt-2 animate-fade-in">
            {/* Placeholder image — replace with your own */}
            <div className="w-full aspect-video border border-primary/20 bg-surface-container flex items-center justify-center overflow-hidden">
              <div className="flex flex-col items-center gap-2 text-primary/30">
                <span className="material-symbols-outlined text-3xl">image</span>
                <span className="text-[9px] font-bold tracking-widest uppercase">Image Placeholder</span>
              </div>
            </div>

            {/* Extra stats grid */}
            <div className="grid grid-cols-2 gap-2">
              <InfoCell label="Clearance" value="LVL-3" />
              <InfoCell label="Missions" value="3 ACTIVE" valueClassName="text-success-neon" />
              <InfoCell label="Service" value="4+ YRS" />
              <InfoCell label="Status" value="AVAILABLE" valueClassName="text-success-neon" />
            </div>

            {/* Social / contact icon row */}
            <div className="grid grid-cols-4 gap-2">
              {['mail', 'code', 'work', 'chat'].map((icon) => (
                <button
                  key={icon}
                  className="border border-primary/30 bg-surface-container py-2 flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-base">{icon}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
