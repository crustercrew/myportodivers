import StatusIndicator from '../ui/StatusIndicator'
import { useNavigation, type SectionId } from '../../context/NavigationContext'
import { useAudio } from '../../context/AudioContext'
import ScrambleText from '../ui/ScrambleText'

// ── Nav config ──────────────────────────────────────────────────────────────
// All navigation tabs use ui2.mp3 for soundboard clicks
const navItems: { icon: string; label: SectionId }[] = [
  { icon: 'dashboard',    label: 'DASHBOARD'  },
  { icon: 'person',       label: 'ABOUT'      },
  { icon: 'work_history', label: 'EXPERIENCE' },
  { icon: 'rocket_launch',label: 'PROJECTS'   },
  { icon: 'engineering',  label: 'SKILLS'     },
  { icon: 'satellite_alt',label: 'CONTACT'    },
]

export default function Header() {
  const { activeSection, setActiveSection } = useNavigation()
  const { muted, toggleMute, playClick } = useAudio()

  const handleTabClick = (label: SectionId) => {
    playClick()
    setActiveSection(label)
  }

  const handleToggleMute = () => {
    if (muted) {
      toggleMute()
      setTimeout(() => playClick(), 30)
    } else {
      toggleMute()
    }
  }

  return (
    <header className="flex items-center justify-between border border-primary px-3 sm:px-6 py-2 bg-surface-container-lowest mb-2 min-h-[56px] shrink-0 gap-2 sm:gap-4">
      {/* ── Left: Title / Terminal Branding ── */}
      <div className="flex items-center gap-2 shrink-0">
        <h1 className="font-headline-lg text-xs sm:text-base uppercase tracking-widest sm:tracking-[0.2em] text-primary font-bold whitespace-nowrap">
          [<ScrambleText text="SES CRUSTERCREW" duration={1000} delay={100} className="hidden sm:inline" />]
          <ScrambleText text="CREW" duration={600} delay={100} className="sm:hidden" />
        </h1>
      </div>

      {/* ── Center: Navigation Tabs (Using ui2.mp3) ── */}
      <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto custom-scrollbar py-1 px-1 justify-start md:justify-center flex-1 min-w-0">
        {navItems.map((item) => {
          const isActive = activeSection === item.label
          return (
            <button
              key={item.label}
              id={`nav-${item.label.toLowerCase()}`}
              title={item.label}
              onClick={() => handleTabClick(item.label)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-xs font-bold font-headline tracking-wider border whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary text-black border-primary shadow-[0_0_10px_rgba(255,230,0,0.3)]'
                  : 'text-primary/80 border-primary/30 bg-surface-container/30 hover:bg-primary hover:text-black hover:border-primary'
              }`}
            >
              <span className="material-symbols-outlined text-xs sm:text-sm">{item.icon}</span>
              <span className="hidden md:inline">
                {isActive
                  ? <ScrambleText key={item.label} text={item.label} duration={500} />
                  : item.label
                }
              </span>
            </button>
          )
        })}
      </nav>

      {/* ── Right: Mute Toggle + Status ── */}
      <div className="shrink-0 flex items-center gap-2 sm:gap-3">
        {/* Audio mute toggle */}
        <button
          id="audio-mute-toggle"
          onClick={handleToggleMute}
          title={muted ? 'Unmute sounds' : 'Mute sounds'}
          className={`flex items-center gap-1 text-[10px] font-mono border px-2 py-1 transition-all cursor-pointer ${
            muted
              ? 'border-primary/20 text-primary/30 bg-transparent hover:border-primary/50 hover:text-primary/60'
              : 'border-primary/40 text-primary hover:border-primary hover:shadow-[0_0_6px_rgba(255,230,0,0.2)]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">
            {muted ? 'volume_off' : 'volume_up'}
          </span>
          <span className="hidden sm:inline">{muted ? 'MUTED' : 'SFX ON'}</span>
        </button>

        <StatusIndicator label="SYSTEM: ONLINE" />
      </div>
    </header>
  )
}
