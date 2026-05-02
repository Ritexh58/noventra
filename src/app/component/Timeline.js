'use client'

export default function Timeline() {
  const tracks = [
    { label: 'Footage In',  left: '0%',  width: '12%', color: '#9B6EFF', text: 'Receive assets' },
    { label: 'Edit Pass',   left: '12%', width: '28%', color: '#00D4EE', text: 'Rough cut → fine cut' },
    { label: 'Color Grade', left: '38%', width: '18%', color: '#FFAA20', text: 'DaVinci Resolve' },
    { label: 'Audio Mix',   left: '54%', width: '14%', color: '#FF4D9E', text: 'Mix & master' },
    { label: 'Review',      left: '67%', width: '12%', color: '#9B6EFF', text: 'Client feedback' },
    { label: 'Delivery',    left: '78%', width: '22%', color: '#00EE80', text: '4K export delivered' },
  ]

  const markers = ['0h', '4h', '8h', '12h', '16h', '20h', '24h']

  return (
    <section style={{
      padding: '120px 60px',
      position: 'relative', zIndex: 1
    }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        background: 'rgba(255,255,255,0.015)',
        border: '1px solid var(--glass-border)',
        borderRadius: '24px',
        padding: '60px'
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            fontSize: '10px', fontFamily: 'var(--font-mono)',
            letterSpacing: '0.15em', color: 'var(--v2)',
            textTransform: 'uppercase', marginBottom: '12px'
          }}>Our Process</div>
          <h2 style={{
            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
            fontSize: 'clamp(28px, 3vw, 42px)',
            fontWeight: '700', letterSpacing: '-0.03em',
            color: 'var(--text)', marginBottom: '16px'
          }}>24-Hour Velocity Tracker</h2>
          <p style={{
            fontSize: '15px', color: 'var(--sub)',
            maxWidth: '480px', margin: '0 auto', lineHeight: '1.8'
          }}>From raw footage to final 4K delivery — every step, every hour.</p>
        </div>

        {/* Ruler */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
          paddingLeft: '120px'
        }}>
          {markers.map((m, i) => (
            <span key={i} style={{
              fontSize: '10px', color: 'var(--muted)',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.08em'
            }}>{m}</span>
          ))}
        </div>

        {/* Tracks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {tracks.map((track, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '16px'
            }}>
              {/* Label */}
              <div style={{
                width: '104px', flexShrink: 0,
                fontSize: '11px', color: 'var(--sub)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.06em', textAlign: 'right'
              }}>{track.label}</div>

              {/* Track */}
              <div style={{
                flex: 1, height: '36px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '6px',
                position: 'relative',
                border: '1px solid rgba(255,255,255,0.04)'
              }}>
                {/* Clip */}
                <div style={{
                  position: 'absolute',
                  left: track.left,
                  width: track.width,
                  top: '4px', bottom: '4px',
                  borderRadius: '4px',
                  background: `linear-gradient(90deg, ${track.color}88, ${track.color}22)`,
                  border: `1px solid ${track.color}44`,
                  display: 'flex', alignItems: 'center',
                  padding: '0 10px',
                  overflow: 'hidden'
                }}>
                  <span style={{
                    fontSize: '10px', color: track.color,
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap'
                  }}>{track.text}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timecode */}
        <div style={{
          marginTop: '32px', textAlign: 'right',
          fontSize: '11px', color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.08em'
        }}>◼ 08:32:14 — PLAYHEAD ACTIVE</div>

      </div>
    </section>
  )
}