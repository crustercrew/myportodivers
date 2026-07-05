import type { BarColor, TechOpacity, TechStackEntry } from '../../utils/types'

const barColorClasses: Record<BarColor, string> = {
  primary: 'bg-primary',
  'success-neon': 'bg-success-neon',
}

// Tailwind's JIT scanner needs literal class strings, so opacity values are
// mapped here rather than interpolated (e.g. `opacity-${n}` would not work).
const opacityClasses: Record<TechOpacity, string> = {
  100: '',
  80: 'opacity-80',
  60: 'opacity-60',
}

interface TechStackItemProps {
  item: TechStackEntry
  showTicks?: boolean
}

export default function TechStackItem({ item, showTicks = false }: TechStackItemProps) {
  return (
    <div className={`border-l-2 border-primary bg-surface-container p-2 flex flex-col gap-2 ${opacityClasses[item.opacity]}`}>
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-white tracking-widest">{item.name}</span>
        <span className="text-[10px] text-primary">PWR: {item.power}%</span>
      </div>
      <div className="h-1 bg-background relative">
        <div className={`h-full ${barColorClasses[item.barColor]}`} style={{ width: `${item.power}%` }}></div>
        {showTicks && (
          <div className="absolute inset-0 flex justify-between px-2">
            <div className="w-px h-full bg-white/10"></div>
            <div className="w-px h-full bg-white/10"></div>
            <div className="w-px h-full bg-white/10"></div>
          </div>
        )}
      </div>
    </div>
  )
}
