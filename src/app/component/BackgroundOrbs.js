export default function BackgroundOrbs() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {/* Noise Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        opacity: 0.022,
      }}></div>

      {/* Orbs */}
      <div className="orb orb-1" style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.6, width: '700px', height: '700px', top: '-300px', left: '-200px', background: 'radial-gradient(circle, rgba(108,78,232,0.18), transparent 70%)', animation: 'orbFloat 20s ease-in-out infinite' }}></div>
      <div className="orb orb-2" style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.6, width: '500px', height: '500px', top: '30%', right: '-180px', background: 'radial-gradient(circle, rgba(0,212,238,0.10), transparent 70%)', animation: 'orbFloat 25s ease-in-out infinite reverse' }}></div>
      <div className="orb orb-3" style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.6, width: '450px', height: '450px', bottom: '5%', left: '15%', background: 'radial-gradient(circle, rgba(255,77,158,0.07), transparent 70%)', animation: 'orbFloat 18s ease-in-out infinite 5s' }}></div>
      
      {/* Inline styles for the animation if it's not in your global CSS */}
      <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-50px) scale(1.06); }
        }
      `}</style>
    </div>
  )
}