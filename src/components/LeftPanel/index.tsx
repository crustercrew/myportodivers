import { useState } from 'react'
import ProfileCard from './ProfileCard'
import AITerminal from './AITerminal'

export default function LeftPanel() {
  const [terminalOpen, setTerminalOpen] = useState(false)

  return (
    <aside className="w-full lg:w-1/4 flex flex-col gap-2 min-h-0 overflow-y-auto custom-scrollbar">
      <ProfileCard expanded={!terminalOpen} />
      {terminalOpen ? (
        <AITerminal onClose={() => setTerminalOpen(false)} />
      ) : (
        <button
          className="border border-primary/40 bg-surface-container-lowest px-3 py-2 flex items-center justify-center gap-2 text-xs font-headline font-bold text-primary tracking-wider hover:bg-primary/10 transition-colors shrink-0 cursor-pointer"
          onClick={() => setTerminalOpen(true)}
        >
          <span className="material-symbols-outlined text-sm">terminal</span>
          OPEN AI TERMINAL
        </button>
      )}
    </aside>
  )
}
