export type StatusColor = 'success' | 'primary'

export interface Project {
  id: string
  name: string
  description: string
  image: string
  imageAlt: string
  status: string
  statusColor: StatusColor
  highlighted: boolean
  techStack: string[]
  liveUrl?: string
  repoUrl?: string
}

export type BarColor = 'primary' | 'success-neon'
export type TechOpacity = 100 | 80 | 60

export interface TechStackEntry {
  id: string
  name: string
  power: number
  opacity: TechOpacity
  barColor: BarColor
}

export type TerminalLineType = 'system' | 'ai' | 'user'

export interface TerminalLine {
  type: TerminalLineType
  text: string
}

export interface SocialLink {
  label: string
  handle: string
  url: string
  icon: string
}

export interface ProfileData {
  id: string
  name: string
  role: string
  email: string
  location: string
  socials: SocialLink[]
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  client?: string
  period: string
  status: 'ACTIVE' | 'COMPLETED'
  description: string[]
  techStack: string[]
}

export interface skills {
  id: string
  title: string
  subtitle: string
  skills: string[]
}
