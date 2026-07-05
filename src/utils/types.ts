export type StatusColor = 'success' | 'primary'

export interface Project {
  id: string
  name: string
  description: string
  image: string
  imageAlt: string
  status: string
  statusColor: StatusColor
  metricLabel: string
  metricValue: number
  highlighted: boolean
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
