export default function ProfileCard() {
  return (
    <div className="bg-surface-container-low p-4 border-l-4 border-primary">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="relative w-20 h-20 shrink-0">
            <div className="absolute inset-0 hex-frame bg-primary/10 flex items-center justify-center overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="A futuristic portrait of a high-ranking military commander in a sleek black and yellow carbon fiber tactical suit."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXHJvxWXtK7VZSvtKpDE00e1OU5o3sPHLDgKaVtZ40td8STh3iDXkAIARaDR68bWOjJT8SZM6VDQNT_UX3bt5pXuz5H9Hn_3tutTo5qpa1321xEEkQnsq5wFzLgHd_qS8HTlsy45tQfB9bIEnW3GAiMLc2K4PUSF3nqoPHbzfzvBvBKb1gDMQ8TtrilIKgrGH7_Q0PrI9o4MFS6IWCZqO1L524jIynKFCu2b2mE6W8MBa_NbxiFA2v"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest opacity-70">
              Welcome to Command Center
            </p>
            <h2 className="text-lg font-bold text-white leading-tight">FLEET ADMIRAL</h2>
            <p className="text-xs text-primary font-bold">ID: SES-PHOENIX-77</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="border border-primary/20 p-1 bg-surface-container">
            <p className="text-[8px] text-primary/50 uppercase">Security Clearance</p>
            <p className="text-[10px] text-primary">LEVEL ALPHA-9</p>
          </div>
          <div className="border border-primary/20 p-1 bg-surface-container">
            <p className="text-[8px] text-primary/50 uppercase">Bio-Status</p>
            <p className="text-[10px] text-success-neon">OPTIMAL</p>
          </div>
        </div>
      </div>
    </div>
  )
}
