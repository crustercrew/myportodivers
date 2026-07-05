import { createContext, useContext, type ReactNode } from 'react'
import { useTerminalLog, type UseTerminalLogResult } from '../hooks/useTerminalLog'

const TerminalContext = createContext<UseTerminalLogResult | undefined>(undefined)

export function TerminalProvider({ children }: { children: ReactNode }) {
  const terminal = useTerminalLog()
  return <TerminalContext.Provider value={terminal}>{children}</TerminalContext.Provider>
}

/** Access the shared tactical AI terminal log/sendCommand from any component. */
export function useTerminalContext(): UseTerminalLogResult {
  const ctx = useContext(TerminalContext)
  if (!ctx) {
    throw new Error('useTerminalContext must be used within a <TerminalProvider>')
  }
  return ctx
}
