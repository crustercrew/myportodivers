import { useState, useRef } from 'react'
import SectionHeader from '../ui/SectionHeader'
import { profileData } from '../../data/profileData'

// ── Types ──────────────────────────────────────────────────────────────────
type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

interface FormState {
  name: string
  email: string
  subject: string
  body: string
}

// ── Copy-to-clipboard helper ───────────────────────────────────────────────
function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <button
      onClick={handleCopy}
      title="Copy to clipboard"
      className="
        text-[10px] font-mono px-1.5 py-0.5 border border-primary/30
        text-primary/60 hover:text-primary hover:border-primary
        transition-colors flex items-center gap-1 shrink-0
      "
    >
      <span className="material-symbols-outlined text-[12px]">
        {copied ? 'check' : 'content_copy'}
      </span>
      {copied ? 'COPIED' : 'COPY'}
    </button>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    body: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  /** Opens the default mail client pre-filled — no backend required */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.body) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2500)
      return
    }

    setStatus('sending')

    const mailBody = encodeURIComponent(
      `From: ${form.name} <${form.email}>\n\n${form.body}`,
    )
    const mailSubject = encodeURIComponent(
      form.subject || `Portfolio contact from ${form.name}`,
    )
    const mailTo = profileData.email

    setTimeout(() => {
      window.location.href = `mailto:${mailTo}?subject=${mailSubject}&body=${mailBody}`
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', body: '' })
      setTimeout(() => setStatus('idle'), 3000)
    }, 600)
  }

  const isDisabled = status === 'sending' || status === 'sent'

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* ── Section Header ── */}
      <div className="px-6 py-4 border-b border-primary/20 shrink-0">
        <SectionHeader
          title="CONTACT"
          subtitle="GET IN TOUCH — AVAILABLE FOR OPPORTUNITIES & COLLABORATIONS"
        />
      </div>

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">

        {/* ══ BLOCK 1: Channel Discovery ══════════════════════════════════ */}
        <div className="border border-primary/20 bg-surface-container/40 p-5 space-y-4">

          {/* Block header */}
          <div className="flex items-center gap-2 border-b border-primary/15 pb-3">
            <span className="material-symbols-outlined text-primary text-lg">contacts</span>
            <div>
              <p className="text-[11px] font-mono text-white tracking-wider font-semibold">Contact Information</p>
              <p className="text-[10px] text-primary/60 font-mono mt-0.5">Feel free to reach out through any of the channels below.</p>
            </div>
          </div>

          {/* Direct channels */}
          <div className="space-y-2">

            {/* Email */}
            <div className="border border-primary/20 bg-surface-container/70 p-3 flex items-center justify-between gap-3 hover:border-primary/50 transition-colors group">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[10px] font-mono text-primary/60 shrink-0">[01]</span>
                <span className="material-symbols-outlined text-primary text-base shrink-0">mail</span>
                <div className="min-w-0">
                  <p className="text-[10px] font-mono text-primary/70 uppercase tracking-wider">EMAIL</p>
                  <a
                    href={`mailto:${profileData.email}`}
                    className="text-xs text-zinc-100 font-mono hover:text-primary transition-colors truncate block"
                  >
                    {profileData.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <CopyButton value={profileData.email} />
                <span className="text-[10px] font-mono text-green-400 font-bold hidden sm:inline">[ ACTIVE ]</span>
              </div>
            </div>

            {/* Phone */}
            <div className="border border-primary/20 bg-surface-container/70 p-3 flex items-center justify-between gap-3 hover:border-primary/50 transition-colors group">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[10px] font-mono text-primary/60 shrink-0">[02]</span>
                <span className="material-symbols-outlined text-primary text-base shrink-0">call</span>
                <div className="min-w-0">
                  <p className="text-[10px] font-mono text-primary/70 uppercase tracking-wider">PHONE &amp; WHATSAPP</p>
                  <a
                    href="tel:+62895420825511"
                    className="text-xs text-zinc-100 font-mono hover:text-primary transition-colors"
                  >
                    +62 895 420 825 511
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <CopyButton value="+62895420825511" />
                <span className="text-[10px] font-mono text-green-400 font-bold hidden sm:inline">[ ACTIVE ]</span>
              </div>
            </div>

            {/* Location */}
            <div className="border border-primary/20 bg-surface-container/70 p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[10px] font-mono text-primary/60 shrink-0">[03]</span>
                <span className="material-symbols-outlined text-primary text-base shrink-0">location_on</span>
                <div className="min-w-0">
                  <p className="text-[10px] font-mono text-primary/70 uppercase tracking-wider">LOCATION</p>
                  <p className="text-xs text-zinc-100 font-mono">{profileData.location}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-primary/50 hidden sm:inline">[ LOCATION ]</span>
            </div>
          </div>

          {/* Social links */}
          <div className="border-t border-primary/15 pt-4 space-y-2">
            <p className="text-[10px] font-mono text-primary/50 uppercase tracking-widest mb-3">Social Profiles</p>
            {profileData.socials.map((s) => (
              <a data-sound
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center justify-between group
                  border border-primary/15 bg-surface-container/50 px-3 py-2
                  hover:border-primary/50 transition-colors
                "
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-base shrink-0">{s.icon}</span>
                  <div>
                    <p className="text-[10px] font-mono text-primary/70 uppercase tracking-wider">{s.label}</p>
                    <p className="text-xs text-zinc-200 font-mono group-hover:text-primary transition-colors">{s.handle}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[14px] text-primary/40 group-hover:text-primary transition-colors">
                  open_in_new
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* ══ BLOCK 2: Message Form ════════════════════════════════════════ */}
        <div className="border border-primary/20 bg-surface-container/40 p-5 space-y-4">

          {/* Block header */}
          <div className="flex items-center gap-2 border-b border-primary/15 pb-3">
            <span className="material-symbols-outlined text-primary text-lg">mail</span>
            <div>
              <p className="text-[11px] font-mono text-white tracking-wider font-semibold">Send a Message</p>
              <p className="text-[10px] text-primary/60 font-mono mt-0.5">Your message will be sent directly to my email address.</p>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">

            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-primary/60 uppercase tracking-widest block">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  disabled={isDisabled}
                  className="
                    w-full bg-surface-container border border-primary/25 text-xs font-mono text-zinc-100
                    px-3 py-2 placeholder:text-zinc-600 focus:outline-none focus:border-primary
                    transition-colors disabled:opacity-40
                  "
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-primary/60 uppercase tracking-widest block">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  disabled={isDisabled}
                  className="
                    w-full bg-surface-container border border-primary/25 text-xs font-mono text-zinc-100
                    px-3 py-2 placeholder:text-zinc-600 focus:outline-none focus:border-primary
                    transition-colors disabled:opacity-40
                  "
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-primary/60 uppercase tracking-widest block">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Optional subject..."
                disabled={isDisabled}
                className="
                  w-full bg-surface-container border border-primary/25 text-xs font-mono text-zinc-100
                  px-3 py-2 placeholder:text-zinc-600 focus:outline-none focus:border-primary
                  transition-colors disabled:opacity-40
                "
              />
            </div>

            {/* Message body */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-primary/60 uppercase tracking-widest block">
                Message
              </label>
              <textarea
                name="body"
                value={form.body}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={5}
                disabled={isDisabled}
                className="
                  w-full bg-surface-container border border-primary/25 text-xs font-mono text-zinc-100
                  px-3 py-2 placeholder:text-zinc-600 focus:outline-none focus:border-primary
                  transition-colors resize-none disabled:opacity-40
                "
              />
            </div>

            {/* Submit row */}
            <div className="flex items-center justify-between pt-1">

              {/* Status feedback */}
              <div className="text-[10px] font-mono min-h-[16px]">
                {status === 'idle' && (
                  <span className="text-primary/30">All fields marked are required.</span>
                )}
                {status === 'sending' && (
                  <span className="text-primary animate-pulse">Opening mail client...</span>
                )}
                {status === 'sent' && (
                  <span className="text-green-400">Mail client opened successfully.</span>
                )}
                {status === 'error' && (
                  <span className="text-red-400">Please fill in Name, Email, and Message.</span>
                )}
              </div>

              {/* Submit button */}
              <button data-sound
                type="submit"
                disabled={isDisabled}
                className="
                  flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest
                  border border-primary/50 px-4 py-2 text-primary
                  hover:bg-primary hover:text-black hover:border-primary
                  disabled:opacity-40 disabled:cursor-not-allowed
                  transition-all duration-200
                "
              >
                <span className="material-symbols-outlined text-[14px]">
                  {status === 'sending' ? 'hourglass_top' : 'send'}
                </span>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>

        {/* ── Bottom note ── */}
        <p className="text-[10px] font-mono text-primary/25 text-center pb-2">
          I typically respond within 1–2 business days.
        </p>
      </div>
    </div>
  )
}
