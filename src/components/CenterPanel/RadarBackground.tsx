// Purely decorative, absolutely-positioned radar rings that sit behind the
// content overlay (see CenterPanel, which provides the relative wrapper).
export default function RadarBackground() {
  return (
    <>
      <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[500px] h-[500px] border border-primary/20 rounded-full flex items-center justify-center">
          <div className="w-[350px] h-[350px] border border-primary/20 rounded-full flex items-center justify-center">
            <div className="w-[200px] h-[200px] border border-primary/20 rounded-full flex items-center justify-center">
              <div className="radar-sweep"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(circle at center, transparent 30%, #0B0C10 100%)' }}
      ></div>
    </>
  )
}
