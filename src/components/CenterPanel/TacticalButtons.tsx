import TacticalButton from '../ui/TacticalButton'

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
        <TacticalButton
          key={action.label}
          icon={action.icon}
          label={action.label}
          variant="outline"
        />
      ))}
      <TacticalButton icon="emergency" label="ABORT" variant="filled" />
    </div>
  )
}
