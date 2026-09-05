import profileImg from "../../assets/helldivers2.jpg";
import InfoCell from '../ui/InfoCell'
import { profileData } from '../../data/profileData'
import { projects } from '../../data/projects'
import { useNavigation, type SectionId } from '../../context/NavigationContext'
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface ProfileCardProps {
  /** When true the terminal is hidden and the card stretches with extra content. */
  expanded?: boolean
}

export default function ProfileCard({ expanded = true }: ProfileCardProps) {
  const { setActiveSection } = useNavigation()

  const navigateTo = (section: SectionId) => {
    setActiveSection(section)
  }

  return (
    <div
      className={`bg-surface-container-low p-4 border-l-4 border-primary flex flex-col transition-all duration-300 ${expanded ? 'flex-1' : ''
        }`}
    >
      {/* ── Top Bar: ID + Live Status (always visible) ── */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-mono text-primary/80 tracking-wider">
          USER://bernov-dev
        </span>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-success-neon animate-pulse" />
          <span className="text-[10px] font-bold text-success-neon tracking-widest font-mono">
            ONLINE
          </span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          EXPANDED layout (terminal closed) — vertical, centered
          ═══════════════════════════════════════════════════════ */}
      {expanded && (
        <div className="flex flex-col gap-0 animate-fade-in">
          {/* Avatar Frame — centered */}
          <div className="flex flex-col items-center">
            <div className="relative w-36 h-36 mb-3">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/60" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/60" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/60" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/60" />

              {/* Avatar image */}
              <div className="absolute inset-3 border border-primary/30 bg-surface-container overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Profile portrait"
                  src={profileImg}
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-primary/20 mb-3" />

          {/* Name + Role + Location */}
          <div className="space-y-1">
            <h2 className="text-base font-bold text-white font-headline tracking-wider uppercase leading-tight">
              {profileData.name}
            </h2>
            <p className="text-xs text-primary font-bold font-headline tracking-widest uppercase">
              {profileData.role}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="material-symbols-outlined text-primary/70 text-sm">location_on</span>
              <span className="text-xs text-zinc-300 font-sans">
                {profileData.location}
              </span>
            </div>
          </div>

          {/* Extra stats grid */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <InfoCell label="Domain" value="ENTERPRISE" />
            <InfoCell label="Projects" value={`${projects.length} COMPLETED`} valueClassName="text-success-neon" />
            <InfoCell label="Experience" value="3+ YEARS" />
            <InfoCell label="Availability" value="OPEN TO WORK" valueClassName="text-success-neon" />
          </div>

          {/* Social / contact icon row */}
          <div className="grid grid-cols-4 gap-2 mt-2">
            <a
              href={`mailto:${profileData.email}`}
              title="Send Email"
              className="border border-primary/30 bg-surface-container py-2 flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary transition-colors"
            >
              <MdEmail className="text-primary w-5 h-5" />
            </a>
            <button
              onClick={() => window.open('https://github.com/crustercrew', '_blank')}
              title="Github"
              className="border border-primary/30 bg-surface-container py-2 flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary transition-colors cursor-pointer"
            >
              {/* <span className="material-symbols-outlined text-base">code</span> */}
              <FaGithub className="text-primary w-5 h-5" />
            </button>
            <button
              onClick={() => window.open('https://www.linkedin.com/in/muhammad-fahreal-60535a24a/', '_blank')}
              title="LinkedIn"
              className="border border-primary/30 bg-surface-container py-2 flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary transition-colors cursor-pointer"
            >
              <FaLinkedin className="text-primary w-5 h-5" />
            </button>
            <button
              onClick={() => window.open('/CV.pdf', '_blank')}
              title="Download CV"
              className="border border-primary/30 bg-surface-container py-2 flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary transition-colors cursor-pointer"
            >
              <FaFileDownload className="text-primary w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          COLLAPSED layout (terminal open) — horizontal, compact
          ═══════════════════════════════════════════════════════ */}
      {!expanded && (
        <div className="grid grid-cols-[auto_1fr] gap-4 items-center animate-fade-in">
          {/* Avatar — left column, bigger */}
          <div className="relative w-20 h-20 shrink-0">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/60" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/60" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/60" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/60" />

            <div className="absolute inset-2 border border-primary/30 bg-surface-container overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Profile portrait"
                src={profileImg}
              />
            </div>
          </div>

          {/* Right column — info */}
          <div className="min-w-0 flex flex-col gap-1">
            <h2 className="text-lg font-bold text-white font-headline tracking-wider uppercase leading-tight truncate">
              {profileData.name}
            </h2>
            <p className="text-sm text-primary font-bold font-headline tracking-widest uppercase">
              {profileData.role}
            </p>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary/70 text-sm">location_on</span>
              <span className="text-xs text-zinc-300 font-sans tracking-wide">
                {profileData.location}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
