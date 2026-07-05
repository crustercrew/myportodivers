import { useCountdown } from '../../hooks/useCountdown'
import PhoenixIcon from '../icons/PhoenixIcon'

export default function Header() {
  const countdown = useCountdown()

  return (
    <header className="flex items-center justify-between border border-primary px-6 py-2 bg-surface-container-lowest mb-2 h-14 shrink-0">
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline text-primary text-xs font-bold tracking-widest">[SYSTEM STATUS: ONLINE]</span>
        <div className="h-2 w-2 bg-success-neon rounded-full blinking"></div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-5 h-5 sm:w-6 sm:h-6 text-primary">
          <PhoenixIcon />
        </div>
        <h1 className="font-headline-lg text-base sm:text-lg uppercase tracking-widest sm:tracking-[0.2em] text-primary">
          [SES PHOENIX OF CODE]
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="font-bold text-primary tracking-tighter text-base sm:text-lg">
          <span className="text-primary/50 text-xs sm:text-sm">T-MINUS </span>{countdown}
        </div>
      </div>
    </header>
  )
}
