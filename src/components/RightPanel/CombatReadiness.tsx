import TechStackItem from './TechStackItem'
import { techStack } from '../../data/techStack'
import SectionHeader from '../ui/SectionHeader'
import ProgressBar from '../ui/ProgressBar'

const READINESS_PERCENT = 88

export default function CombatReadiness() {
  return (
    <div className="flex-1 border border-primary/30 bg-surface-container-low flex flex-col min-h-0">
      <div className="p-4 border-b border-primary/30">
        <SectionHeader title="COMBAT READINESS" />
        <div className="flex items-center gap-2 mt-1">
          <ProgressBar
            value={READINESS_PERCENT}
            className="flex-1"
          />
          <span className="text-xs text-primary font-bold">{READINESS_PERCENT}%</span>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4">
        <p className="text-xs text-primary font-bold tracking-wider mb-2 font-headline">SYSTEM ARSENAL</p>
        <div className="space-y-4">
          {techStack.map((item, i) => (
            <TechStackItem key={item.id} item={item} showTicks={i === 0} />
          ))}
        </div>
      </div>

      <div className="p-3 bg-primary text-black font-bold text-xs font-headline flex justify-between items-center tracking-wider">
        <span>SECTOR: 0X-DELTA</span>
        <span className="blinking">STABLE</span>
      </div>
    </div>
  )
}
