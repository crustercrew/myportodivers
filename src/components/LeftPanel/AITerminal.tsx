import { useRef, useState, type KeyboardEvent } from 'react'
import { useTerminalContext } from '../../context/TerminalContext'
import type { TerminalLineType } from '../../utils/types'

const lineStyles: Record<TerminalLineType, string> = {
  system: 'text-primary/70',
  ai: 'text-success-neon',
  user: 'text-white',
}

export default function AITerminal() {
  const { log, sendCommand } = useTerminalContext()
  const [value, setValue] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  function handleSend(): void {
    if (!value.trim()) return
    sendCommand(value)
    setValue('')

    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    }, 600)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div className="flex-1 border border-primary/30 bg-surface-container-lowest flex flex-col overflow-hidden">
      <div className="bg-primary/10 px-3 py-1 border-b border-primary/30 flex justify-between items-center">
        <span className="text-[10px] font-bold text-primary tracking-widest">TACTICAL AI ASSISTANT</span>
        <span className="material-symbols-outlined text-sm text-primary">terminal</span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 p-3 overflow-y-auto custom-scrollbar text-[11px] space-y-3 font-mono"
      >
        {log.map((line, i) => (
          <div key={i} className={lineStyles[line.type]}>
            {line.text}
          </div>
        ))}
        <div className="text-primary/70 animate-pulse text-xs">_</div>
      </div>

      <div className="p-2 border-t border-primary/30 bg-surface-container">
        <div className="flex gap-2">
          <input
            className="w-full bg-transparent border border-primary/50 px-2 py-1 text-[10px] text-primary focus:outline-none focus:border-primary placeholder:text-primary/30"
            placeholder="ENTER COMMAND..."
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="bg-primary text-black px-2 py-1 text-[10px] font-bold" onClick={handleSend}>
            SEND
          </button>
        </div>
      </div>
    </div>
  )
}
