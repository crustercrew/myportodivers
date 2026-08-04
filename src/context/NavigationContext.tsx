import { createContext, useContext, useState, type ReactNode } from 'react'

export type SectionId = 'DASHBOARD' | 'ABOUT' | 'EXPERIENCE' | 'PROJECTS' | 'SKILLS' | 'CONTACT'

interface NavigationContextType {
  activeSection: SectionId
  setActiveSection: (section: SectionId) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionId>('DASHBOARD')
  return (
    <NavigationContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation(): NavigationContextType {
  const ctx = useContext(NavigationContext)
  if (!ctx) {
    throw new Error('useNavigation must be used within a <NavigationProvider>')
  }
  return ctx
}
