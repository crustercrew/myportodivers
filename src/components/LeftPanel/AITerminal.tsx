import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useTerminalContext } from '../../context/TerminalContext'
import type { TerminalLineType } from '../../utils/types'
import SectionHeader from '../ui/SectionHeader'

const lineStyles: Record<TerminalLineType, string> = {
  system: 'text-primary/70 font-mono',
  ai: 'text-success-neon font-mono',
  user: 'text-zinc-100 font-mono',
}

const QUICK_TACTICAL_CHIPS = [
  { label: 'QRIS MISSION', query: 'Brief me on your work with BNI Core QRIS and webMethods' },
  { label: 'STACK MATRIX', query: 'skills' },
  { label: 'RINGKASAN (ID)', query: 'Jelaskan profil dan pengalaman Bernov dalam Bahasa Indonesia' },
  { label: 'CONTACT UPLINK', query: 'contact' },
  { label: 'SYSTEM STATUS', query: 'status' },
]

interface AITerminalProps {
  onClose?: () => void
}

export default function AITerminal({ onClose }: AITerminalProps) {
  const { log, sendCommand, isStreaming, clearLog } = useTerminalContext()
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState<number>(-1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll as streaming chunks or new lines arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [log, isStreaming])

  function handleSend(textToSend?: string): void {
    const text = (textToSend ?? value).trim()
    if (!text || isStreaming) return

    setHistory((prev) => [...prev, text])
    setHistoryIdx(-1)
    sendCommand(text)
    setValue('')

    // Keep input focused
    setTimeout(() => {
      inputRef.current?.focus()
    }, 50)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1)
      setHistoryIdx(nextIdx)
      setValue(history[nextIdx] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIdx === -1) return
      const nextIdx = historyIdx + 1
      if (nextIdx >= history.length) {
        setHistoryIdx(-1)
        setValue('')
      } else {
        setHistoryIdx(nextIdx)
        setValue(history[nextIdx] || '')
      }
    }
  }

  return (
    <div className="flex-1 border border-primary/40 bg-surface-container-lowest flex flex-col overflow-hidden shadow-2xl relative">
      {/* ── Top Header / Status Bar ── */}
      <div className="bg-primary/10 px-3 py-1.5 border-b border-primary/30 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-success-neon animate-pulse" />
          <SectionHeader
            title="SES-PHOENIX // TACTICAL AI TERMINAL"
            className="text-[11px] font-mono tracking-wider text-primary"
          />
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={clearLog}
            className="text-primary/60 hover:text-primary transition-colors px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider hover:bg-primary/10"
            title="Purge terminal log (or type 'clear')"
          >
            [CLEAR]
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-primary/50 hover:text-primary transition-colors p-0.5 hover:bg-primary/10"
              title="Close terminal"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Terminal Console Output ── */}
      <div
        ref={scrollRef}
        className="flex-1 p-3 overflow-y-auto custom-scrollbar text-[11px] space-y-2.5 font-mono leading-relaxed"
      >
        {log.map((line, i) => (
          <div
            key={i}
            className={`${lineStyles[line.type]} whitespace-pre-wrap break-words selection:bg-primary/30 selection:text-white`}
          >
            {line.text}
            {/* Blinking block cursor on the active streaming AI line */}
            {isStreaming && i === log.length - 1 && line.type === 'ai' && (
              <span className="inline-block w-1.5 h-3.5 bg-success-neon ml-1 animate-pulse align-middle" />
            )}
          </div>
        ))}

        {/* Loading indicator if waiting for first token */}
        {isStreaming && log[log.length - 1]?.text === '' && (
          <div className="text-primary/70 text-[10px] flex items-center gap-1.5">
            <span className="animate-spin text-xs material-symbols-outlined">sync</span>
            <span>DECRYPTING QUANTUM STREAM...</span>
          </div>
        )}

        {!isStreaming && (
          <div className="text-primary/60 animate-pulse text-xs font-mono select-none">_</div>
        )}
      </div>

      {/* ── Tactical Quick-Action Chips ── */}
      <div className="px-2 py-1 bg-surface-container-low border-t border-primary/20 flex flex-wrap gap-1 items-center">
        <span className="text-[9px] font-mono text-primary/40 uppercase mr-1">QUICK:</span>
        {QUICK_TACTICAL_CHIPS.map((chip) => (
          <button
            key={chip.label}
            onClick={() => handleSend(chip.query)}
            disabled={isStreaming}
            className="text-[9px] font-mono px-1.5 py-0.5 border border-primary/30 bg-primary/5 text-primary/80 hover:bg-primary/20 hover:text-primary hover:border-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            &gt; {chip.label}
          </button>
        ))}
      </div>

      {/* ── Input Bar ── */}
      <div className="p-2 border-t border-primary/30 bg-surface-container">
        <div className="flex gap-2">
          <div className="relative flex-1 flex items-center">
            <span className="absolute left-2 text-primary/50 text-[10px] font-mono select-none pointer-events-none">
              &gt;
            </span>
            <input
              ref={inputRef}
              className="w-full bg-surface-container-lowest border border-primary/40 pl-6 pr-2 py-1.5 text-[11px] font-mono text-zinc-100 placeholder:text-primary/30 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
              placeholder={isStreaming ? 'TRANSMITTING STREAM...' : 'ENTER COMMAND OR QUERY...'}
              type="text"
              disabled={isStreaming}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            className={`px-3 py-1 text-[10px] font-mono font-bold tracking-wider transition-all ${
              isStreaming
                ? 'bg-primary/30 text-zinc-500 cursor-not-allowed'
                : 'bg-primary text-black hover:bg-yellow-400 active:scale-95'
            }`}
            onClick={() => handleSend()}
            disabled={isStreaming}
          >
            {isStreaming ? 'STREAMING' : 'TRANSMIT'}
          </button>
        </div>
      </div>
    </div>
  )
}
