import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AnimatorGeneralProvider } from '@arwes/react'
import App from './App'
import { TerminalProvider } from './context/TerminalContext'
import { NavigationProvider } from './context/NavigationContext'
import { AudioProvider } from './context/AudioContext'
import './index.css'

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
 * breaks the animator lifecycle management.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AnimatorGeneralProvider {...animatorGeneralSettings}>
      <AudioProvider>
        <TerminalProvider>
          <NavigationProvider>
            <App />
          </NavigationProvider>
        </TerminalProvider>
      </AudioProvider>
    </AnimatorGeneralProvider>
  </BrowserRouter>,
)
