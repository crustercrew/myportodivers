import StatusIndicator from '../ui/StatusIndicator'
import { useNavigation, type SectionId } from '../../context/NavigationContext'

const navItems: { icon: string; label: SectionId }[] = [
  { icon: 'dashboard', label: 'DASHBOARD' },
  { icon: 'person', label: 'ABOUT' },
  { icon: 'work_history', label: 'EXPERIENCE' },
  { icon: 'rocket_launch', label: 'PROJECTS' },
  { icon: 'engineering', label: 'SKILLS' },
  { icon: 'satellite_alt', label: 'CONTACT' },
]

export default function Header() {
  const { activeSection, setActiveSection } = useNavigation()

  return (
    <header className="flex items-center justify-between border border-primary px-3 sm:px-6 py-2 bg-surface-container-lowest mb-2 min-h-[56px] shrink-0 gap-2 sm:gap-4">
      {/* ── Left: Title / Ship Branding ── */}
      <div className="flex items-center gap-2 shrink-0">
        {/* <span className="material-symbols-outlined text-primary text-base hidden sm:inline">
          people
        </span> */}
        <h1 className="font-headline-lg text-xs sm:text-base uppercase tracking-widest sm:tracking-[0.2em] text-primary font-bold whitespace-nowrap">
          [SES CRUSTERCREW]
        </h1>
      </div>

      {/* ── Center: Navigation Menu ── */}
      <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto custom-scrollbar py-1 px-1 justify-start md:justify-center flex-1 min-w-0">
        {navItems.map((item) => {
          const isActive = activeSection === item.label
          return (
            <button
              key={item.label}
              onClick={() => setActiveSection(item.label)}
              className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-bold font-mono tracking-widest border whitespace-nowrap shrink-0 transition-all cursor-pointer ${isActive
                ? 'bg-primary text-black border-primary shadow-[0_0_10px_rgba(255,230,0,0.3)]'
                : 'text-primary/70 border-primary/30 bg-surface-container/30 hover:bg-primary hover:text-black hover:border-primary'
                }`}
            >
              <span className="material-symbols-outlined text-xs sm:text-sm">{item.icon}</span>
              <span className="hidden md:inline">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* ── Right: Status Indicator ── */}
      <div className="shrink-0 flex items-center">
        <StatusIndicator label="SYSTEM: ONLINE" />
      </div>
    </header>
  )
}
