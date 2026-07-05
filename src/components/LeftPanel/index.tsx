import ProfileCard from './ProfileCard'
import AITerminal from './AITerminal'

export default function LeftPanel() {
  return (
    <aside className="w-full lg:w-1/4 flex flex-col gap-2 shrink-0">
      <ProfileCard />
      <AITerminal />
    </aside>
  )
}
