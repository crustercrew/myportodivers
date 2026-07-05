interface TacticalAction {
  icon: string
  label: string
}

const actions: TacticalAction[] = [
  { icon: 'rocket_launch', label: 'DEPLOY' },
  { icon: 'visibility', label: 'SCAN' },
  { icon: 'security', label: 'SECURE' },
]

export default function TacticalButtons() {
  return (
    <div className="p-4 grid grid-cols-4 gap-2 border-t border-primary/30 bg-surface-container-low">
      {actions.map((action) => (
        <button
          key={action.label}
          className="border border-primary/50 text-primary py-2 text-[10px] font-bold hover:bg-primary hover:text-black transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">{action.icon}</span> {action.label}
        </button>
      ))}
      <button className="bg-primary text-black py-2 text-[10px] font-bold flex items-center justify-center gap-2">
        <span className="material-symbols-outlined text-sm">emergency</span> ABORT
      </button>
    </div>
  )
}
