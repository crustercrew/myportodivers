// ── Sci-Fi Web Audio Synthesizer & Audio Mixer ─────────────────────────────
// Supports pure Web Audio API synthesis + real-time DSP cleaning & trimming
// for UI soundboard files (ui1.mp3, ui2.mp3, helldivers-2-arrow.mp3).

export type SoundName = 'click' | 'intro' | 'type' | 'error' | 'helldivers' | 'ui1' | 'ui2'

class SoundEngine {
  private ctx: AudioContext | null = null
  private ui1Buffer: AudioBuffer | null = null
  private ui2Buffer: AudioBuffer | null = null
  private helldiversBuffer: AudioBuffer | null = null
  private isLoadingUi1 = false
  private isLoadingUi2 = false
  private isLoadingHelldivers = false

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null

    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext

      if (AudioContextClass) {
        this.ctx = new AudioContextClass()
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume()
    }

    return this.ctx
  }

  constructor() {
    if (typeof window !== 'undefined') {
      const preloadAll = () => {
        void this.preloadUi2()
      }
      window.addEventListener('click', preloadAll, { once: true })
      window.addEventListener('keydown', preloadAll, { once: true })
      window.addEventListener('pointerdown', preloadAll, { once: true })
    }
  }

  /**
   * Cleans recorded audio buffer:
   * 1. Scans PCM waveform to trim leading room noise / pre-recording dead air.
   * 2. Applies 2.5ms anti-click micro-fade envelopes.
   */
  private cleanAndTrimBuffer(ctx: AudioContext, rawBuffer: AudioBuffer): AudioBuffer {
    const numChannels = rawBuffer.numberOfChannels
    const sampleRate = rawBuffer.sampleRate
    const channelData: Float32Array[] = []

    let peak = 0
    for (let c = 0; c < numChannels; c++) {
      const data = rawBuffer.getChannelData(c)
      channelData.push(data)
      for (let i = 0; i < data.length; i++) {
        const abs = Math.abs(data[i])
        if (abs > peak) peak = abs
      }
    }

    if (peak === 0) return rawBuffer

    const threshold = peak * 0.12
    const searchLimit = Math.min(rawBuffer.length, Math.floor(sampleRate * 0.4))
    let startIndex = 0

    for (let i = 0; i < searchLimit; i++) {
      let above = false
      for (let c = 0; c < numChannels; c++) {
        if (Math.abs(channelData[c][i]) >= threshold) {
          above = true
          break
        }
      }
      if (above) {
        startIndex = Math.max(0, i - Math.floor(sampleRate * 0.002))
        break
      }
    }

    let endIndex = rawBuffer.length - 1
    const endThreshold = peak * 0.02
    for (let i = rawBuffer.length - 1; i > startIndex; i--) {
      let above = false
      for (let c = 0; c < numChannels; c++) {
        if (Math.abs(channelData[c][i]) >= endThreshold) {
          above = true
          break
        }
      }
      if (above) {
        endIndex = Math.min(rawBuffer.length, i + Math.floor(sampleRate * 0.012))
        break
      }
    }

    const trimmedLength = Math.max(1, endIndex - startIndex)
    const cleanBuffer = ctx.createBuffer(numChannels, trimmedLength, sampleRate)
    const fadeSamples = Math.floor(sampleRate * 0.0025)

    for (let c = 0; c < numChannels; c++) {
      const source = channelData[c]
      const dest = cleanBuffer.getChannelData(c)

      for (let i = 0; i < trimmedLength; i++) {
        let sample = source[startIndex + i]
        if (i < fadeSamples) {
          sample *= i / fadeSamples
        }
        if (i > trimmedLength - fadeSamples) {
          sample *= (trimmedLength - i) / fadeSamples
        }
        dest[i] = sample
      }
    }

    return cleanBuffer
  }

  private async fetchAndDecode(url: string, clean = true): Promise<AudioBuffer | null> {
    const ctx = this.getContext()
    if (!ctx) return null
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const arrayBuffer = await response.arrayBuffer()
      const rawAudioBuffer = await ctx.decodeAudioData(arrayBuffer)
      return clean ? this.cleanAndTrimBuffer(ctx, rawAudioBuffer) : rawAudioBuffer
    } catch (err) {
      console.warn(`Could not load sound asset from ${url}:`, err)
      return null
    }
  }

  async preloadUi2(): Promise<void> {
    if (this.ui2Buffer || this.isLoadingUi2) return
    this.isLoadingUi2 = true
    try {
      this.ui2Buffer = await this.fetchAndDecode('/ui2.mp3', true)
    } finally {
      this.isLoadingUi2 = false
    }
  }

  async preloadUi1(): Promise<void> {
    if (this.ui1Buffer || this.isLoadingUi1) return
    this.isLoadingUi1 = true
    try {
      this.ui1Buffer = await this.fetchAndDecode('/ui1.mp3', false)
    } finally {
      this.isLoadingUi1 = false
    }
  }

  async preloadHelldivers(): Promise<void> {
    if (this.helldiversBuffer || this.isLoadingHelldivers) return
    this.isLoadingHelldivers = true
    try {
      this.helldiversBuffer = await this.fetchAndDecode('/helldivers-2-arrow.mp3', true)
    } finally {
      this.isLoadingHelldivers = false
    }
  }

  private playBuffer(buffer: AudioBuffer, volume = 0.5, highpass = false) {
    const ctx = this.getContext()
    if (!ctx) return

    const now = ctx.currentTime
    const source = ctx.createBufferSource()
    source.buffer = buffer

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(volume, now)

    if (highpass) {
      const hp = ctx.createBiquadFilter()
      hp.type = 'highpass'
      hp.frequency.setValueAtTime(160, now)
      source.connect(hp)
      hp.connect(gain)
    } else {
      source.connect(gain)
    }

    gain.connect(ctx.destination)
    source.start(now)
  }

  private playSynthClick(volume: number, now: number, ctx: AudioContext) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(1400, now)
    osc.frequency.exponentialRampToValueAtTime(500, now + 0.045)

    gain.gain.setValueAtTime(volume * 0.8, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.055)
  }

  private playSynthIntro(volume: number, now: number, ctx: AudioContext) {
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const filter = ctx.createBiquadFilter()
    const gain = ctx.createGain()

    osc1.type = 'sawtooth'
    osc2.type = 'sine'

    osc1.frequency.setValueAtTime(150, now)
    osc1.frequency.exponentialRampToValueAtTime(750, now + 0.35)

    osc2.frequency.setValueAtTime(300, now)
    osc2.frequency.exponentialRampToValueAtTime(1500, now + 0.35)

    filter.type = 'lowpass'
    filter.Q.value = 4
    filter.frequency.setValueAtTime(300, now)
    filter.frequency.exponentialRampToValueAtTime(3500, now + 0.25)
    filter.frequency.exponentialRampToValueAtTime(800, now + 0.4)

    gain.gain.setValueAtTime(0.001, now)
    gain.gain.linearRampToValueAtTime(volume * 0.65, now + 0.08)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42)

    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc1.start(now)
    osc2.start(now)
    osc1.stop(now + 0.43)
    osc2.stop(now + 0.43)
  }

  /**
   * Play a sound effect.
   * @param sound Sound to play ('ui2' | 'ui1' | 'click' | 'intro' | 'type' | 'error' | 'helldivers')
   * @param volume Master gain multiplier (0 to 1)
   */
  play(sound: SoundName, volume = 0.45): void {
    const ctx = this.getContext()
    if (!ctx) return

    const now = ctx.currentTime

    switch (sound) {
      case 'ui2':
      case 'click': {
        if (this.ui2Buffer) {
          this.playBuffer(this.ui2Buffer, volume * 0.9, true)
        } else {
          void this.preloadUi2().then(() => {
            if (this.ui2Buffer) this.playBuffer(this.ui2Buffer, volume * 0.9, true)
          })
          this.playSynthClick(volume, now, ctx)
        }
        break
      }

      case 'ui1':
      case 'intro': {
        if (this.ui1Buffer) {
          this.playBuffer(this.ui1Buffer, volume * 0.85, false)
        } else {
          void this.preloadUi1().then(() => {
            if (this.ui1Buffer) this.playBuffer(this.ui1Buffer, volume * 0.85, false)
          })
          this.playSynthIntro(volume, now, ctx)
        }
        break
      }

      case 'helldivers': {
        if (this.helldiversBuffer) {
          this.playBuffer(this.helldiversBuffer, volume * 0.95, true)
        } else {
          void this.preloadHelldivers().then(() => {
            if (this.helldiversBuffer) this.playBuffer(this.helldiversBuffer, volume * 0.95, true)
          })
          this.playSynthClick(volume, now, ctx)
        }
        break
      }

      case 'type': {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(2200, now)
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.02)

        gain.gain.setValueAtTime(volume * 0.5, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now)
        osc.stop(now + 0.03)
        break
      }

      case 'error': {
        const pulse = (offset: number) => {
          const t = now + offset
          const osc1 = ctx.createOscillator()
          const osc2 = ctx.createOscillator()
          const gain = ctx.createGain()

          osc1.type = 'sawtooth'
          osc2.type = 'square'

          osc1.frequency.setValueAtTime(160, t)
          osc2.frequency.setValueAtTime(172, t)

          gain.gain.setValueAtTime(volume * 0.6, t)
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08)

          osc1.connect(gain)
          osc2.connect(gain)
          gain.connect(ctx.destination)

          osc1.start(t)
          osc2.start(t)
          osc1.stop(t + 0.085)
          osc2.stop(t + 0.085)
        }

        pulse(0)
        pulse(0.1)
        break
      }
    }
  }
}

export const soundEngine = new SoundEngine()
