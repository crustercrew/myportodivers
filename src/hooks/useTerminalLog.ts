import { useState, useRef } from 'react'
import type { TerminalLine } from '../utils/types'
import {
  handleLocalCommand,
  streamAIChat,
  type ChatHistoryItem,
} from '../services/aiService'

const initialLog: TerminalLine[] = [
  { type: 'system', text: '[sys] SES Phoenix Super Destroyer Command OS v2.5 initialized.' },
  { type: 'system', text: '[net] Encrypted quantum link connected to PHOENIX-CORE (TLSv1.3)' },
  {
    type: 'ai',
    text: 'PHOENIX-AI: Greetings, Officer. Personnel dossier for Bernov is decrypted and standing by. Inquire about his Banking Middleware (QRIS), Telecom (IOMS), Tech Stack, or type "help".',
  },
]

export interface UseTerminalLogResult {
  log: TerminalLine[]
  sendCommand: (command: string) => Promise<void>
  isStreaming: boolean
  clearLog: () => void
}

/**
 * Owns the tactical AI terminal's chat log, command execution, and AI streaming telemetry.
 */
export function useTerminalLog(): UseTerminalLogResult {
  const [log, setLog] = useState<TerminalLine[]>(initialLog)
  const [isStreaming, setIsStreaming] = useState(false)
  const historyRef = useRef<ChatHistoryItem[]>([])

  function clearLog(): void {
    setLog([])
  }

  async function sendCommand(command: string): Promise<void> {
    const text = command.trim()
    if (!text || isStreaming) return

    // Append user's command
    setLog((prev) => [...prev, { type: 'user', text: `guest@ses-phoenix:~$ ${text}` }])

    // Check if it matches an instant local terminal command
    const localResult = handleLocalCommand(text)
    if (localResult) {
      if (localResult.type === 'clear') {
        clearLog()
      } else {
        setLog((prev) => [...prev, { type: 'ai', text: localResult.content }])
      }
      return
    }

    // AI Query: Initialize empty streaming AI line
    setIsStreaming(true)
    setLog((prev) => [...prev, { type: 'ai', text: '' }])

    let accumulated = ''
    try {
      const fullResponse = await streamAIChat(
        text,
        historyRef.current,
        (chunk) => {
          accumulated += chunk
          setLog((prev) => {
            if (prev.length === 0) return prev
            const lastIndex = prev.length - 1
            const updated = [...prev]
            updated[lastIndex] = {
              type: 'ai',
              text: accumulated,
            }
            return updated
          })
        }
      )

      // Store in memory for multi-turn conversation
      historyRef.current = [
        ...historyRef.current.slice(-5),
        { role: 'user', content: text },
        { role: 'model', content: fullResponse },
      ]
    } catch {
      setLog((prev) => {
        const lastIndex = prev.length - 1
        const updated = [...prev]
        updated[lastIndex] = {
          type: 'ai',
          text: '[COMM LINK FAILURE] Neural relay timed out. Query aborted.',
        }
        return updated
      })
    } finally {
      setIsStreaming(false)
    }
  }

  return { log, sendCommand, isStreaming, clearLog }
}
