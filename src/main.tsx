import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {
  AnimatorGeneralProvider,
  BleepsProvider,
} from '@arwes/react'
import App from './App'
import { TerminalProvider } from './context/TerminalContext'
import { NavigationProvider } from './context/NavigationContext'
import './index.css'

/**
 * Arwes Bleeps configuration.
 *
 * Each named bleep points at a free-to-use sound hosted on the Arwes CDN.
 * Swap the `src` URLs for your own assets whenever you like.
 * Use `useBleeps()` in any component to play them, e.g.
 *   const bleeps = useBleeps();
 *   bleeps.click?.play();
 */
const bleepsSettings = {
  master: { volume: 0.8 },
  common: { preload: true, disabled: false },
  bleeps: {
    click: {
      sources: [
        { src: 'https://arwes.dev/assets/sounds/click.mp3', type: 'audio/mpeg' },
      ],
      category: 'interaction' as const,
    },
    intro: {
      sources: [
        { src: 'https://arwes.dev/assets/sounds/intro.mp3', type: 'audio/mpeg' },
      ],
      category: 'transition' as const,
    },
    type: {
      sources: [
        { src: 'https://arwes.dev/assets/sounds/type.mp3', type: 'audio/mpeg' },
      ],
      category: 'interaction' as const,
    },
    error: {
      sources: [
        { src: 'https://arwes.dev/assets/sounds/error.mp3', type: 'audio/mpeg' },
      ],
      category: 'notification' as const,
    },

  },
}

/**
 * AnimatorGeneralProvider sets the default enter/exit durations
 * for every <Animator> in the tree (override per-component as needed).
 */
const animatorGeneralSettings = {
  duration: { enter: 0.3, exit: 0.3 },
}

/*
 * NOTE: <React.StrictMode> has been intentionally removed.
 * Arwes doesn't support Strict Mode — it double-invokes effects which
 * breaks the animator and bleep lifecycle management.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AnimatorGeneralProvider {...animatorGeneralSettings}>
      <BleepsProvider {...bleepsSettings}>
        <TerminalProvider>
          <NavigationProvider>
            <App />
          </NavigationProvider>
        </TerminalProvider>
      </BleepsProvider>
    </AnimatorGeneralProvider>
  </BrowserRouter>,
)
