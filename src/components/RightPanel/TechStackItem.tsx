import type { TechOpacity, TechStackEntry } from '../../utils/types'
import ProgressBar from '../ui/ProgressBar'

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
        <span className="text-xs font-bold text-white font-headline tracking-wide">{item.name}</span>
        <span className="text-xs text-primary font-headline font-bold">PWR: {item.power}%</span>
      </div>
      <ProgressBar
        value={item.power}
        barColor={item.barColor}
        showTicks={showTicks}
        trackClassName="bg-background"
      />
    </div>
  )
}
