import { profileData } from '../data/profileData'
import { projects } from '../data/projects'
import { techStack } from '../data/techStack'

/**
 * Handles terminal commands in realistic Linux developer format.
 */
export function getCommandResponse(command: string): Promise<string> {
  const cmd = command.trim().toLowerCase()

  return new Promise((resolve) => {
    setTimeout(() => {
      if (cmd === 'help' || cmd === '--help' || cmd === '-h') {
        resolve(`Commands: whoami | skills | projects | experience | contact | clear | uname -a`)
      } else if (cmd === 'whoami') {
        resolve(`${profileData.name} — ${profileData.role} (${profileData.location})`)
      } else if (cmd === 'skills') {
        const topSkills = techStack.map((s) => s.name).join(', ')
        resolve(`Stack: ${topSkills}`)
      } else if (cmd === 'projects') {
        resolve(`Active Repositories (${projects.length}): Core QRIS (BNI), IOMS (Telkomsel), Pickme Talent, ForzaAPI...`)
      } else if (cmd === 'experience') {
        resolve(`Work: Application Developer @ PT Mitra Integrasi Informatika (Metrodata) [Sep 2023 - Present]`)
      } else if (cmd === 'contact') {
        resolve(`Email: ${profileData.email} | Location: ${profileData.location}`)
      } else if (cmd.startsWith('uname') || cmd === 'neofetch') {
        resolve(`Linux bernov-fedora 6.8.9-300.fc40.x86_64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`)
      } else {
        resolve(`bash: command not found: ${command}. Type "help" for available commands.`)
      }
    }, 250)
  })
}
