import { useClock } from '../../hooks/useClock'
import PhoenixIcon from '../icons/PhoenixIcon'

export default function Header() {
  const time = useClock()

  return (
    <header className="flex items-center justify-between border border-primary px-6 py-2 bg-surface-container-lowest mb-2 h-14 shrink-0">
      <div className="flex items-center gap-4">
        <span className="text-primary text-xs font-bold tracking-widest">[SYSTEM STATUS: ONLINE]</span>
        <div className="h-2 w-2 bg-success-neon rounded-full blinking"></div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-6 h-6 text-primary">
          <PhoenixIcon />
        </div>
        <h1 className="font-headline-lg text-lg uppercase tracking-[0.2em] text-primary">
          [SES PHOENIX OF CODE]
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="font-bold text-primary tracking-tighter text-lg">{time}</div>
        <div className="text-[10px] text-primary/50 leading-none">
          COORD: 34.05
          <br />
          ALT: 12.4KM
        </div>
      </div>
    </header>
  )
}
