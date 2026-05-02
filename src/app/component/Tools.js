'use client'

const tools = [
  { abbr: 'DR', name: 'DaVinci Resolve', color: '#FFAA20' },
  { abbr: 'Pr', name: 'Premiere Pro', color: '#00D4EE' },
  { abbr: 'Ae', name: 'After Effects', color: '#FF4D9E' },
  { abbr: 'Ps', name: 'Photoshop', color: '#9B6EFF' },
  { abbr: 'Fc', name: 'Final Cut', color: '#00EE80' },
]

export default function Tools() {
  return (
    <section style={{
      padding: '80px 60px 120px',
      position: 'relative', zIndex: 1
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            fontSize: '10px', fontFamily: 'var(--font-mono)',
            letterSpacing: '0.15em', color: 'var(--v2)',
            textTransform: 'uppercase', marginBottom: '12px'
          }}>Built With</div>
          <h2 style={{
            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
            fontSize: 'clamp(24px, 3vw, 42px)',
            fontWeight: '700', letterSpacing: '-0.03em',
            color: 'var(--text)'
          }}>Industry-Standard Tools</h2>
        </div>

        <div className="tools-flex" style={{
          display: 'flex', justifyContent: 'center',
          gap: '24px', flexWrap: 'wrap'
        }}>
          {tools.map((tool, i) => (
            <div key={i} className="tool-orb" style={{
              width: '180px', height: '180px', borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, ${tool.color}22, ${tool.color}06)`,
              border: `1px solid ${tool.color}22`,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '8px', cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)'
                e.currentTarget.style.boxShadow = `0 20px 60px ${tool.color}33`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span style={{
                fontSize: '32px', fontWeight: '700',
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                color: tool.color, letterSpacing: '-0.02em'
              }}>{tool.abbr}</span>
              <span style={{
                fontSize: '11px', color: tool.color,
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.06em', opacity: 0.7,
                textAlign: 'center', padding: '0 12px'
              }}>{tool.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tools-flex { gap: 12px !important; }
          .tool-orb {
            width: 130px !important;
            height: 130px !important;
          }
        }
      `}</style>
    </section>
  )
}