import TechStackItem from './TechStackItem'
import { techStack } from '../../data/techStack'

const READINESS_PERCENT = 88

export default function CombatReadiness() {
  return (
    <div className="flex-1 border border-primary/30 bg-surface-container-low flex flex-col">
      <div className="p-4 border-b border-primary/30">
        <h2 className="text-lg font-headline-lg text-white font-bold tracking-widest">COMBAT READINESS</h2>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-1 flex-1 bg-surface-container">
            <div className="h-full bg-primary" style={{ width: `${READINESS_PERCENT}%` }}></div>
          </div>
          <span className="text-xs text-primary font-bold">{READINESS_PERCENT}%</span>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4">
        <p className="text-[10px] text-primary font-bold tracking-wider mb-2">SYSTEM ARSENAL</p>
        <div className="space-y-4">
          {techStack.map((item, i) => (
            <TechStackItem key={item.id} item={item} showTicks={i === 0} />
          ))}
        </div>
      </div>

      <div className="p-3 bg-primary text-black font-bold text-[10px] flex justify-between items-center">
        <span>SECTOR: 0X-DELTA</span>
        <span className="blinking">STABLE</span>
      </div>
    </div>
  )
}
