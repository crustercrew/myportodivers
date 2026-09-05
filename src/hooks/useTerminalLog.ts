import { useState } from 'react'
import type { TerminalLine } from '../utils/types'
import { getCommandResponse } from '../services/commandService'

const initialLog: TerminalLine[] = [
  { type: 'system', text: '[sys] Linux kernel 6.8.9-fedora initialized.' },
  { type: 'system', text: '[net] Connected to bernov.dev runtime daemon (TLSv1.3)' },
  {
    type: 'ai',
    text: 'bernov@dev:~$ Ready. Type "help", "skills", "projects", or "contact" for quick telemetry.',
  },
  { type: 'user', text: 'guest@terminal:~$ ./fetch_profile.sh --summary' },
  { type: 'system', text: '[sys] Loading enterprise middleware & banking systems...' },
  {
    type: 'ai',
    text: 'bernov@dev:~$ Profile verified: Application Developer with 3+ YRS experience in Java, Spring Boot, webMethods, & OutSystems.',
  },
]

export interface UseTerminalLogResult {
  log: TerminalLine[]
  sendCommand: (command: string) => void
}

/** Owns the tactical AI terminal's chat log and the logic for sending a command. */
export function useTerminalLog(): UseTerminalLogResult {
  const [log, setLog] = useState<TerminalLine[]>(initialLog)

  function sendCommand(command: string): void {
    const text = command.trim()
    if (!text) return

    setLog((prev) => [...prev, { type: 'user', text: `USER: ${text}` }])

    getCommandResponse(text).then((responseText) => {
      setLog((prev) => [...prev, { type: 'ai', text: responseText }])
    })
  }

  return { log, sendCommand }
}
