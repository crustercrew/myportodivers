import ProfileCard from './ProfileCard'
import AITerminal from './AITerminal'

export default function LeftPanel() {
  return (
    <aside className="w-1/4 flex flex-col gap-2">
      <ProfileCard />
      <AITerminal />
    </aside>
  )
}
