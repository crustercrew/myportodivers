import CombatReadiness from './CombatReadiness'

export default function RightPanel() {
  return (
    <aside className="w-full lg:w-1/4 flex flex-col gap-2 min-h-0 overflow-hidden">
      <CombatReadiness />
    </aside>
  )
}
