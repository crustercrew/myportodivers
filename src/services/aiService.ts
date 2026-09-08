import { profileData } from '../data/profileData'
import { projects } from '../data/projects'
import { techStack } from '../data/techStack'

export interface ChatHistoryItem {
  role: 'user' | 'model'
  content: string
}

export type LocalCommandResult =
  | { type: 'text'; content: string }
  | { type: 'clear' }
  | null

/**
 * Checks if the user input matches an instant local terminal command.
 * Returns null if it should be delegated to the AI LLM.
 */
export function handleLocalCommand(command: string): LocalCommandResult {
  const cmd = command.trim().toLowerCase()

  if (cmd === 'clear' || cmd === 'cls') {
    return { type: 'clear' }
  }

  if (cmd === 'help' || cmd === '--help' || cmd === '-h') {
    return {
      type: 'text',
      content:
        'AVAILABLE COMMANDS:\n' +
        '  whoami      - Officer dossier overview\n' +
        '  skills      - Battle-tested weapon systems (Tech Stack)\n' +
        '  projects    - Active mission deployments & repositories\n' +
        '  experience  - Deployment chronology & corporate battle honors\n' +
        '  contact     - Encrypted comms channels & uplinks\n' +
        '  status      - SES Phoenix ship systems telemetry\n' +
        '  clear       - Purge terminal display cache\n' +
        '\nOr ask ANY tactical question in natural language (e.g. "What did Bernov build for BNI QRIS?" or "Tell me about his OutSystems experience").',
    }
  }

  if (cmd === 'whoami') {
    return {
      type: 'text',
      content: `[IDENT CONFIRMED] ${profileData.name} — ${profileData.role} (${profileData.location}) | Callsign: SES-PHOENIX-77`,
    }
  }

  if (cmd === 'skills') {
    const topSkills = techStack.map((s) => `${s.name} [${s.power}%]`).join('\n  - ')
    return {
      type: 'text',
      content: `[ARSENAL / TECH MATRIX]\n  - ${topSkills}`,
    }
  }

  if (cmd === 'projects') {
    const list = projects
      .map((p) => `[${p.status}] ${p.name} — ${p.techStack.slice(0, 3).join(', ')}`)
      .join('\n  • ')
    return {
      type: 'text',
      content: `[ACTIVE DEPLOYMENTS (${projects.length})]\n  • ${list}`,
    }
  }

  if (cmd === 'experience') {
    return {
      type: 'text',
      content:
        '[DEPLOYMENT CHRONOLOGY]\n' +
        '  1. PT Bank Negara Indonesia (BNI) — Backend Developer Jr. (Core QRIS & Middleware)\n' +
        '  2. PT Telkomsel — Fullstack Engineer (IOMS Budgeting & SIMPLE Mobile Hub)\n' +
        '  3. PT Mitra Integrasi Informatika (Metrodata) — Application Developer Jr. / Consultant\n' +
        '  4. PT Berca Hardayaperkasa — Infrastructure Support Engineer (BSI)\n' +
        '  5. PT SBG Solusi Bisnis — PHP Web Developer',
    }
  }

  if (cmd === 'contact') {
    return {
      type: 'text',
      content:
        `[TRANSMISSION FREQUENCIES]\n` +
        `  Email:    ${profileData.email}\n` +
        `  LinkedIn: ${profileData.socials.find((s) => s.label === 'LINKEDIN')?.url}\n` +
        `  GitHub:   ${profileData.socials.find((s) => s.label === 'GITHUB')?.url}\n` +
        `  WhatsApp: ${profileData.socials.find((s) => s.label === 'WHATSAPP')?.url}`,
    }
  }

  if (cmd === 'status' || cmd === 'telemetry') {
    return {
      type: 'text',
      content:
        '[SES PHOENIX TELEMETRY REPORT]\n' +
        '  VESSEL: Super Destroyer SES Phoenix\n' +
        '  CORE: Tactical Cognitive Sub-Routine v2.5\n' +
        '  STATUS: ONLINE / COMBAT READY\n' +
        '  SHIELD INTEGRITY: 100%\n' +
        '  HELLPOD RESERVES: OPTIMAL\n' +
        '  DEMOCRACY COEFFICIENT: 100%',
    }
  }

  if (cmd.startsWith('uname') || cmd === 'neofetch') {
    return {
      type: 'text',
      content: 'Linux ses-phoenix-core 6.8.9-300.fc40.x86_64 #1 SMP PREEMPT_DYNAMIC x86_64 SuperEarth/Linux',
    }
  }

  if (cmd === 'sudo hire bernov' || cmd === 'hire') {
    return {
      type: 'text',
      content:
        '[AUTHORIZATION GRANTED: LEVEL 5 CLEARANCE]\n' +
        'Recruitment directive acknowledged. Transmitting priority signal to Officer Bernov...\n' +
        `Direct uplink email: ${profileData.email}\n` +
        'Prepare your squad for deployment.',
    }
  }

  if (cmd === 'democracy' || cmd === 'helldivers') {
    return {
      type: 'text',
      content: 'FOR SUPER EARTH! Spread Managed Democracy across the galaxy! ⬆️➡️⬇️⬇️⬇️ (500KG Bomb deployed)',
    }
  }

  return null
}

/**
 * Streams a response from the serverless /api/chat endpoint.
 */
export async function streamAIChat(
  message: string,
  history: ChatHistoryItem[],
  onChunk: (chunk: string) => void
): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
    })

    if (!response.ok) {
      const errText = await response.text()
      const errorMsg = `[COMM ERROR ${response.status}] ${errText || 'Uplink unreachable'}`
      onChunk(errorMsg)
      return errorMsg
    }

    if (!response.body) {
      const fallback = '[UPLINK EMPTY] No transmission received from ship core.'
      onChunk(fallback)
      return fallback
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let fullResponse = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      fullResponse += chunk
      onChunk(chunk)
    }

    return fullResponse
  } catch (error: any) {
    const errorNotice = `[COMM LINK FAILURE: ${error?.message || 'Connection lost'}]. Check network or environment configuration.`
    onChunk(errorNotice)
    return errorNotice
  }
}
