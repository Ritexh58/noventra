'use client'

import { useState, useEffect } from 'react'

export default function Timeline() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const tracks = [
    { label: 'Footage In',  left: '0%',  width: '12%', color: '#9B6EFF', text: 'Receive assets',       time: '0h – 2h' },
    { label: 'Edit Pass',   left: '12%', width: '28%', color: '#00D4EE', text: 'Rough cut → fine cut',  time: '2h – 10h' },
    { label: 'Color Grade', left: '38%', width: '18%', color: '#FFAA20', text: 'DaVinci Resolve',       time: '10h – 14h' },
    { label: 'Audio Mix',   left: '54%', width: '14%', color: '#FF4D9E', text: 'Mix & master',          time: '14h – 18h' },
    { label: 'Review',      left: '67%', width: '12%', color: '#9B6EFF', text: 'Client feedback',       time: '18h – 20h' },
    { label: 'Delivery',    left: '78%', width: '22%', color: '#00EE80', text: '4K export delivered',   time: '20h – 24h' },
  ]

  const markers = ['0h', '4h', '8h', '12h', '16h', '20h', '24h']

  return (
    <section style={{ padding: isMobile ? '60px 20px' : '120px 60px', position: 'relative', zIndex: 1 }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        background: 'rgba(255,255,255,0.015)',
        border: '1px solid var(--glass-border)',
        borderRadius: '24px',
        padding: isMobile ? '32px 20px' : '60px'
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '36px' : '60px' }}>
          <div style={{
            fontSize: '10px', fontFamily: 'var(--font-mono)',
            letterSpacing: '0.15em', color: 'var(--v2)',
            textTransform: 'uppercase', marginBottom: '12px'
          }}>Our Process</div>
          <h2 style={{
            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
            fontSize: 'clamp(24px, 3vw, 42px)',
            fontWeight: '700', letterSpacing: '-0.03em',
            color: 'var(--text)', marginBottom: '16px'
          }}>24-Hour Velocity Tracker</h2>
          <p style={{
            fontSize: '14px', color: 'var(--sub)',
            maxWidth: '480px', margin: '0 auto', lineHeight: '1.8'
          }}>From raw footage to final 4K delivery — every step, every hour.</p>
        </div>

        {/* MOBILE — vertical cards */}
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tracks.map((track, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${track.color}33`,
                borderRadius: '14px',
                padding: '16px 20px',
              }}>
                {/* Color dot */}
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: track.color, flexShrink: 0,
                  boxShadow: `0 0 10px ${track.color}88`
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '12px', fontWeight: '700',
                    color: track.color, fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.06em', marginBottom: '4px'
                  }}>{track.label}</div>
                  <div style={{
                    fontSize: '13px', color: 'var(--sub)',
                    fontFamily: 'var(--font-body)'
                  }}>{track.text}</div>
                </div>
                <div style={{
                  fontSize: '11px', color: 'var(--muted)',
                  fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
                  flexShrink: 0
                }}>{track.time}</div>
              </div>
            ))}
          </div>
        ) : (
          /* DESKTOP — horizontal timeline */
          <>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginBottom: '8px', paddingLeft: '120px'
            }}>
              {markers.map((m, i) => (
                <span key={i} style={{
                  fontSize: '10px', color: 'var(--muted)',
                  fontFamily: 'var(--font-mono)', letterSpacing: '0.08em'
                }}>{m}</span>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {tracks.map((track, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '104px', flexShrink: 0,
                    fontSize: '11px', color: 'var(--sub)',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.06em', textAlign: 'right'
                  }}>{track.label}</div>
                  <div style={{
                    flex: 1, height: '36px',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '6px', position: 'relative',
                    border: '1px solid rgba(255,255,255,0.04)'
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: track.left, width: track.width,
                      top: '4px', bottom: '4px',
                      borderRadius: '4px',
                      background: `linear-gradient(90deg, ${track.color}88, ${track.color}22)`,
                      border: `1px solid ${track.color}44`,
                      display: 'flex', alignItems: 'center',
                      padding: '0 10px', overflow: 'hidden'
                    }}>
                      <span style={{
                        fontSize: '10px', color: track.color,
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.04em', whiteSpace: 'nowrap'
                      }}>{track.text}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{
          marginTop: '32px', textAlign: 'right',
          fontSize: '11px', color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.08em'
        }}>◼ 08:32:14 — PLAYHEAD ACTIVE</div>

      </div>
    </section>
  )
}