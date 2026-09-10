import { useState, useEffect, useCallback, useRef } from 'react'
import { soundEngine } from '../../utils/soundEngine'
import ScrambleText from './ScrambleText'

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

interface TerminalEntryScreenProps {
  onUnlock: () => void
  sequence?: Direction[]
}

const DEFAULT_SEQUENCE: Direction[] = ['UP', 'RIGHT', 'DOWN', 'DOWN', 'UP']

function HD2Arrow({
  direction,
  className = '',
}: {
  direction: Direction
  className?: string
}) {
  const rotation = {
    UP: 'rotate-0',
    RIGHT: 'rotate-90',
    DOWN: 'rotate-180',
    LEFT: '-rotate-90',
  }[direction]

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      className={`w-7 h-7 md:w-9 md:h-9 transition-transform duration-100 ${rotation} ${className}`}
      aria-hidden="true"
    >
      {/* Authentic Helldivers 2 Stratagem Arrow Path */}
      <path d="M 12 2.5 L 21.5 12 H 15.5 V 21.5 H 8.5 V 12 H 2.5 Z" />
    </svg>
  )
}

// ── Inside TerminalEntryScreen ───────────────────────────────────────────────


export default function TerminalEntryScreen({
  onUnlock,
  sequence = DEFAULT_SEQUENCE,
}: TerminalEntryScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isErrorShake, setIsErrorShake] = useState(false)
  const [statusMessage, setStatusMessage] = useState('AWAITING STRATAGEM INPUT...')
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    void soundEngine.preloadUi1()
  }, [])

  const handleUnlock = useCallback(() => {
    setIsSuccess(true)
    setStatusMessage('// ACCESS GRANTED // TERMINAL ONLINE')
    soundEngine.play('ui1')
    // Wait for the CRT scanline surge & flash animation to play
    setTimeout(() => {
      onUnlock()
    }, 450)
  }, [onUnlock])

  const handleBypass = useCallback(() => {
    soundEngine.play('ui1')
    handleUnlock()
  }, [handleUnlock])

  const handleInput = useCallback(
    (inputDir: Direction) => {
      if (isSuccess) return

      const expected = sequence[currentStep]

      if (inputDir === expected) {
        // Correct step — play ui1.mp3!
        const nextStep = currentStep + 1
        soundEngine.play('ui1')

        // Optional haptic vibration on mobile devices
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate(20)
          } catch {
            // Ignore unsupported haptic errors
          }
        }

        if (nextStep >= sequence.length) {
          setCurrentStep(nextStep)
          handleUnlock()
        } else {
          setCurrentStep(nextStep)
          setStatusMessage(`INPUT ACCEPTED // STEP [0${nextStep + 1}/0${sequence.length}]`)
        }
      } else {
        // Error step!
        soundEngine.play('error')
        setIsErrorShake(true)
        setStatusMessage('ERR: SEQUENCE MISMATCH // RETRYING...')

        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate([50, 40, 50])
          } catch {
            // Ignore
          }
        }

        setTimeout(() => {
          setIsErrorShake(false)
          setCurrentStep(0)
          setStatusMessage('AWAITING STRATAGEM INPUT...')
        }, 400)
      }
    },
    [currentStep, isSuccess, sequence, handleUnlock]
  )

  // ── Keyboard Listener (WASD + Arrow Keys) ──────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if modifier keys are held
      if (e.ctrlKey || e.altKey || e.metaKey) return

      let dir: Direction | null = null

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          dir = 'UP'
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          dir = 'DOWN'
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          dir = 'LEFT'
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          dir = 'RIGHT'
          break
        case 'Enter':
        case ' ':
          // Enter / Space quick enters
          e.preventDefault()
          handleBypass()
          return
        case 'Escape':
          handleBypass()
          return
        default:
          return
      }

      if (dir) {
        e.preventDefault()
        handleInput(dir)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleInput, handleBypass])

  // ── Mobile Swipe Handlers ──────────────────────────────────────────────────
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return
    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)
    const minSwipeDist = 32

    if (Math.max(absX, absY) >= minSwipeDist) {
      if (absX > absY) {
        handleInput(deltaX > 0 ? 'RIGHT' : 'LEFT')
      } else {
        handleInput(deltaY > 0 ? 'DOWN' : 'UP')
      }
    }

    touchStartRef.current = null
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`fixed inset-0 z-50 bg-[#0b0c10]/95 backdrop-blur-md flex flex-col items-center justify-center p-3 md:p-6 select-none transition-all duration-300 ${isSuccess ? 'animate-crt-glitch opacity-0 pointer-events-none' : 'opacity-100'
        }`}
    >
      {/* Main Terminal Frame */}
      <div
        className={`relative w-full max-w-xl border border-primary/50 bg-[#0d0e12]/90 p-5 md:p-8 flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-transform duration-150 ${isErrorShake ? 'translate-x-[-6px] border-error text-error shadow-[0_0_20px_rgba(255,80,80,0.4)]' : ''
          }`}
      >
        {/* Stepped Corner Brackets (matching SciFiCard design) */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-primary" />
        <div aria-hidden="true" className="pointer-events-none absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-primary" />
        <div aria-hidden="true" className="pointer-events-none absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-amber-400" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-primary/60" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-primary/60" />

        {/* ── Header: Super Earth Terminal Protocol ── */}
        <div className="flex items-center justify-between border-b border-primary/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-primary animate-pulse" />
            <span className="text-[11px] md:text-xs font-mono font-bold tracking-widest text-primary uppercase">
              // SUPER EARTH COMMAND // TERMINAL ACCESS
            </span>
          </div>
          <span className="text-[10px] font-mono text-primary/70 tracking-wider hidden sm:inline">
            SEC_LEVEL: 05
          </span>
        </div>

        {/* ── Subtitle / Mission Target ── */}
        <div className="text-center mb-6">
          <h2 className="text-lg md:text-2xl font-headline font-black text-primary tracking-wider uppercase mb-1">
            <ScrambleText text="AUTHENTICATE TERMINAL HUD" duration={500} />
          </h2>
          <p className="text-xs font-mono text-on-surface-variant tracking-wider">
            VESSEL: [SES CRUSTERCREW] // OPERATOR: FACHREAL BERNOV
          </p>
        </div>

        {/* ── The Stratagem Sequence Arrows Display ── */}
        <div className="flex items-center justify-center gap-2 md:gap-3.5 mb-6">
          {sequence.map((dir, idx) => {
            const isDone = idx < currentStep
            const isActive = idx === currentStep && !isSuccess

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (isActive) handleInput(dir)
                }}
                className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border transition-all duration-150 cursor-pointer ${isDone
                    ? 'bg-primary border-primary text-black shadow-[0_0_16px_rgba(255,230,0,0.85)] scale-105'
                    : isActive
                      ? 'border-2 border-primary bg-primary/20 text-primary animate-pulse shadow-[0_0_12px_rgba(255,230,0,0.5)] scale-100'
                      : 'border border-primary/25 bg-surface-container/30 text-primary/35 opacity-70'
                  }`}
                title={`Step ${idx + 1}: ${dir}`}
              >
                <HD2Arrow direction={dir} />
              </button>
            )
          })}
        </div>

        {/* ── Status Message Telemetry ── */}
        <div className="text-center mb-5 h-6 flex items-center justify-center">
          <span
            className={`text-xs font-mono font-bold tracking-widest ${isSuccess
                ? 'text-success-neon drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]'
                : isErrorShake
                  ? 'text-error animate-pulse'
                  : 'text-primary/90'
              }`}
          >
            {statusMessage}
          </span>
        </div>

        {/* ── Input Controls Telemetry Hint ── */}
        <div className="text-center mb-6">
          <p className="text-[10px] font-mono tracking-widest text-on-surface-variant uppercase">
            CONTROLS: [W A S D] / [ARROWS] OR TAP ARROWS TO INPUT
          </p>
        </div>

        {/* ── Footer: 1-Tap Bypass / Direct Access ── */}
        <div className="pt-3 border-t border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[10px] font-mono text-on-surface-variant tracking-wider text-center sm:text-left">
            AUDIO TELEMETRY SUBSYSTEMS ARMED
          </span>

          <button
            type="button"
            onClick={handleBypass}
            className="w-full sm:w-auto px-4 py-2 border border-primary/40 bg-primary/10 hover:bg-primary hover:text-black transition-all duration-200 text-xs font-mono font-bold tracking-widest text-primary flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>⚡ BYPASS PROTOCOL</span>
            <span className="text-[10px] opacity-75">[ENTER]</span>
          </button>
        </div>
      </div>
    </div>
  )
}
