import { useState } from 'react'
import type { TerminalLine } from '../utils/types'
import { getCommandResponse } from '../services/commandService'

const initialLog: TerminalLine[] = [
  { type: 'system', text: '[14:20:01] Initializing neural link...' },
  { type: 'system', text: '[14:20:03] Syncing with Fleet Command.' },
  {
    type: 'ai',
    text: 'AI: Admiral, sector 7G shows increased activity. Deployment protocols are ready for your authorization.',
  },
  { type: 'user', text: 'USER: Run diagnostic on Hyper-Drive systems.' },
  { type: 'system', text: '[14:21:45] Scanning subsystems...' },
  {
    type: 'ai',
    text: 'AI: Hyper-Drive at 98% efficiency. Minor cooling fluctuation in Coil 4 detected. Automated repair in progress.',
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
