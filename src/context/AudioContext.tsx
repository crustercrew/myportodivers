import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import { soundEngine, type SoundName } from '../utils/soundEngine'

// ── Types ─────────────────────────────────────────────────────────────────
interface AudioContextValue {
  muted: boolean
  toggleMute: () => void
  play: (sound?: SoundName) => void
  playClick: () => void
}

// ── Context ───────────────────────────────────────────────────────────────
const AudioContext = createContext<AudioContextValue>({
  muted: false,
  toggleMute: () => {},
  play: () => {},
  playClick: () => {},
})

// ── Provider ──────────────────────────────────────────────────────────────
export function AudioProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(false)

  const toggleMute = useCallback(() => {
    setMuted((prev) => !prev)
  }, [])

  const play = useCallback(
    (sound: SoundName = 'ui2') => {
      if (muted) return
      soundEngine.play(sound)
    },
    [muted]
  )

  const playClick = useCallback(() => {
    play('ui2')
  }, [play])

  // ── Global Delegated Click Listener ──────────────────────────────────────
  // Any HTML button, link, or element with `data-sound` will automatically
  // play the UI sound on click, with no extra React code required.
  // Example: <button data-sound onClick={...}>CLICK ME</button>
  // Example: <button data-sound="ui2" onClick={...}>CUSTOM SOUND</button>
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      if (muted) return
      const target = event.target as HTMLElement | null
      if (!target) return

      const soundEl = target.closest('[data-sound]') as HTMLElement | null
      if (soundEl) {
        const customSound = soundEl.getAttribute('data-sound')
        const soundToPlay = (customSound && customSound !== 'true' ? customSound : 'ui2') as SoundName
        soundEngine.play(soundToPlay)
      }
    }

    // Capture phase ensures sound triggers promptly on user gesture
    window.addEventListener('click', handleGlobalClick, { capture: true })
    return () => window.removeEventListener('click', handleGlobalClick, { capture: true })
  }, [muted])

  return (
    <AudioContext.Provider value={{ muted, toggleMute, play, playClick }}>
      {children}
    </AudioContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────────────────
export function useAudio() {
  return useContext(AudioContext)
}

export type { SoundName }
