export default function Footer() {
  return (
    <footer className="h-6 flex justify-between items-center px-4 mt-2">
      <div className="flex gap-4 text-[8px] text-primary/40 font-mono">
        <span>BIT-RATE: 1.2 GB/S</span>
        <span>LATENCY: 4MS</span>
        <span>ENCRYPT: AES-256-QW</span>
      </div>
      <div className="flex gap-1 h-2">
        <div className="w-8 bg-primary"></div>
        <div className="w-4 bg-primary/40"></div>
        <div className="w-2 bg-primary/20"></div>
      </div>
    </footer>
  )
}
