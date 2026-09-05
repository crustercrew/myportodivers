export default function Footer() {
  return (
    <footer className="flex sm:h-6 justify-between items-center px-4 mt-2 mb-2 sm:mb-0">
      <div className="flex flex-wrap gap-2 sm:gap-4 text-[10px] text-primary/70 font-mono font-medium">
        <span>BIT-RATE: 1.2 GB/S</span>
        <span>LATENCY: 4MS</span>
        <span className="hidden sm:inline">ENCRYPT: AES-256-QW</span>
      </div>
      <div className="flex gap-1 h-2 shrink-0">
        <div className="w-8 bg-primary"></div>
        <div className="w-4 bg-primary/40"></div>
        <div className="w-2 bg-primary/20"></div>
      </div>
    </footer>
  )
}
