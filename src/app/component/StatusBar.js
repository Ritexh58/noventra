'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { num: 120, suffix: '+', label: 'Projects Delivered' },
  { num: 80, suffix: '+', label: 'Happy Clients' },
  { num: 4, suffix: 'K', label: 'Hours Edited' },
  { num: 24, suffix: 'H', label: 'Turnaround Time' },
]

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const step = target / (2000 / 16)
        const timer = setInterval(() => {
          start += step
          if (start >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(start))
        }, 16)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} style={{
      fontSize: 'clamp(24px, 5vw, 32px)',
      fontWeight: '700',
      fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
      background: 'linear-gradient(135deg, var(--text), var(--sub))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '-0.04em',
      display: 'block', marginBottom: '5px'
    }}>
      {count}{suffix}
    </span>
  )
}

export default function StatsBar() {
  return (
    <div className="stats-grid" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      borderTop: '1px solid rgba(255,255,255,0.055)',
      borderBottom: '1px solid rgba(255,255,255,0.055)',
      background: 'rgba(8,8,16,0.75)',
      backdropFilter: 'blur(24px)',
      position: 'relative', zIndex: 1
    }}>
      {stats.map((stat, i) => (
        <div key={i} style={{
          textAlign: 'center', padding: '28px 16px',
          position: 'relative',
          borderRight: i < stats.length - 1
            ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'background 0.2s'
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--glass)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <CountUp target={stat.num} suffix={stat.suffix} />
          <span style={{
            fontSize: '10px', color: 'var(--muted)',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)'
          }}>{stat.label}</span>
        </div>
      ))}

      <style>{`
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  )
}