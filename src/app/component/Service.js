'use client'

import { useEffect, useRef } from 'react'

const pills = [
  { text: 'Video Editing',    color: '#9B6EFF' },
  { text: 'Colour Grading',   color: '#00D4EE' },
  { text: 'Brand Films',      color: '#FFAA20' },
  { text: 'Instagram Reels',  color: '#FF4D9E' },
  { text: 'Clips Cutting',    color: '#00EE80' },
  { text: 'Podcast Editing',  color: '#9B6EFF' },
  { text: 'Motion Graphics',  color: '#00D4EE' },
  { text: 'YouTube Shorts',   color: '#FFAA20' },
  { text: '4K Delivery',      color: '#9B6EFF' },
  { text: 'Cinematic Shoot',  color: '#00D4EE' },
  { text: 'Sound Design',     color: '#FF4D9E' },
  { text: 'Scripting',        color: '#00EE80' },
  { text: 'After Effects',    color: '#9B6EFF' },
  { text: 'Thumbnail Design', color: '#FFAA20' },
]

export default function Services() {
  const arenaRef = useRef(null)
  const pillsRef = useRef([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const animRef = useRef(null)
  const dragRef = useRef(null)

  useEffect(() => {
    const arena = arenaRef.current
    if (!arena) return

    arena.innerHTML = ''
    pillsRef.current = []

    const isMobile = window.innerWidth <= 768
    const arenaW = arena.offsetWidth
    const arenaH = arena.offsetHeight

    pills.forEach((d) => {
      const el = document.createElement('div')
      el.textContent = d.text
      el.style.cssText = `
        position: absolute;
        left: 0; top: 0;
        padding: ${isMobile ? '8px 14px' : '14px 26px'};
        border-radius: 100px;
        font-size: ${isMobile ? '11px' : '15px'};
        font-weight: 600;
        font-family: var(--font-body);
        letter-spacing: 0.02em;
        white-space: nowrap;
        cursor: grab;
        user-select: none;
        touch-action: none;
        background: rgba(255,255,255,0.05);
        border: 1.5px solid ${d.color}55;
        color: ${d.color};
        box-shadow: 0 0 24px ${d.color}33;
        transition: box-shadow 0.2s, border-color 0.2s;
      `
      arena.appendChild(el)

      const w = el.offsetWidth || 120
      const h = el.offsetHeight || 36
      const angle = Math.random() * Math.PI * 2
      const speed = 0.4 + Math.random() * 0.4

      const pill = {
        el, color: d.color,
        x: Math.random() * (arenaW - w),
        y: Math.random() * (arenaH - h),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        w, h,
        rot: (Math.random() - 0.5) * 8,
        rotV: (Math.random() - 0.5) * 0.01,
        dragging: false,
        dragOffX: 0,
        dragOffY: 0,
      }

      // Mouse drag
      el.addEventListener('mousedown', (e) => {
        e.preventDefault()
        pill.dragging = true
        dragRef.current = pill
        el.style.cursor = 'grabbing'
        el.style.zIndex = '50'
        el.style.boxShadow = `0 0 60px ${d.color}99, 0 20px 60px rgba(0,0,0,0.5)`
        el.style.borderColor = `${d.color}cc`
        const rect = arena.getBoundingClientRect()
        pill.dragOffX = e.clientX - rect.left - pill.x
        pill.dragOffY = e.clientY - rect.top - pill.y
        pill.vx = 0
        pill.vy = 0
      })

      // Touch drag
      el.addEventListener('touchstart', (e) => {
        e.preventDefault()
        const touch = e.touches[0]
        pill.dragging = true
        dragRef.current = pill
        el.style.zIndex = '50'
        el.style.boxShadow = `0 0 60px ${d.color}99`
        el.style.borderColor = `${d.color}cc`
        const rect = arena.getBoundingClientRect()
        pill.dragOffX = touch.clientX - rect.left - pill.x
        pill.dragOffY = touch.clientY - rect.top - pill.y
        pill.vx = 0
        pill.vy = 0
      }, { passive: false })

      pillsRef.current.push(pill)
    })

    // Mouse events
    const handleMouseMove = (e) => {
      const rect = arena.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      mouseRef.current = { x: mx, y: my }
      if (dragRef.current) {
        const p = dragRef.current
        const newX = mx - p.dragOffX
        const newY = my - p.dragOffY
        p.vx = (newX - p.x) * 0.6
        p.vy = (newY - p.y) * 0.6
        p.x = Math.max(0, Math.min(newX, arena.offsetWidth - p.w))
        p.y = Math.max(0, Math.min(newY, arena.offsetHeight - p.h))
      }
    }

    const handleMouseUp = () => {
      if (dragRef.current) {
        const p = dragRef.current
        p.dragging = false
        p.el.style.cursor = 'grab'
        p.el.style.zIndex = ''
        p.el.style.borderColor = `${p.color}55`
        dragRef.current = null
      }
    }

    // Touch events
    const handleTouchMove = (e) => {
      e.preventDefault()
      if (!dragRef.current) return
      const touch = e.touches[0]
      const rect = arena.getBoundingClientRect()
      const mx = touch.clientX - rect.left
      const my = touch.clientY - rect.top
      const p = dragRef.current
      const newX = mx - p.dragOffX
      const newY = my - p.dragOffY
      p.vx = (newX - p.x) * 0.6
      p.vy = (newY - p.y) * 0.6
      p.x = Math.max(0, Math.min(newX, arena.offsetWidth - p.w))
      p.y = Math.max(0, Math.min(newY, arena.offsetHeight - p.h))
    }

    const handleTouchEnd = () => {
      if (dragRef.current) {
        const p = dragRef.current
        p.dragging = false
        p.el.style.zIndex = ''
        p.el.style.borderColor = `${p.color}55`
        dragRef.current = null
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
      handleMouseUp()
    }

    arena.addEventListener('mousemove', handleMouseMove)
    arena.addEventListener('mouseup', handleMouseUp)
    arena.addEventListener('mouseleave', handleMouseLeave)
    arena.addEventListener('touchmove', handleTouchMove, { passive: false })
    arena.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('mouseup', handleMouseUp)

    function loop() {
      const W = arena.offsetWidth
      const H = arena.offsetHeight
      const REPEL_RADIUS = 100
      const REPEL_FORCE = 0.5
      const DAMPEN = 0.992
      const MAX_SPEED = 6

      pillsRef.current.forEach(p => {
        if (p.dragging) {
          p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg) scale(1.08)`
          return
        }

        if (!dragRef.current) {
          const pcx = p.x + p.w / 2
          const pcy = p.y + p.h / 2
          const dx = pcx - mouseRef.current.x
          const dy = pcy - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < REPEL_RADIUS && dist > 0) {
            const force = (REPEL_RADIUS - dist) / REPEL_RADIUS * REPEL_FORCE
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }

        pillsRef.current.forEach(q => {
          if (q === p || q.dragging) return
          const pcx = p.x + p.w / 2
          const pcy = p.y + p.h / 2
          const qcx = q.x + q.w / 2
          const qcy = q.y + q.h / 2
          const ex = pcx - qcx
          const ey = pcy - qcy
          const ed = Math.sqrt(ex * ex + ey * ey)
          const minD = (p.w + q.w) * 0.44
          if (ed < minD && ed > 0) {
            const nx = ex / ed
            const ny = ey / ed
            const relVx = p.vx - q.vx
            const relVy = p.vy - q.vy
            const dot = relVx * nx + relVy * ny
            if (dot < 0) {
              p.el.style.boxShadow = `0 0 50px ${p.color}cc`
              q.el.style.boxShadow = `0 0 50px ${q.color}cc`
              setTimeout(() => {
                p.el.style.boxShadow = `0 0 24px ${p.color}33`
                q.el.style.boxShadow = `0 0 24px ${q.color}33`
              }, 200)
              p.vx -= dot * nx
              p.vy -= dot * ny
              q.vx += dot * nx
              q.vy += dot * ny
            }
            const overlap = (minD - ed) / 2
            p.x += nx * overlap
            p.y += ny * overlap
            q.x -= nx * overlap
            q.y -= ny * overlap
          }
        })

        p.vx *= DAMPEN
        p.vy *= DAMPEN
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > MAX_SPEED) { p.vx = (p.vx / spd) * MAX_SPEED; p.vy = (p.vy / spd) * MAX_SPEED }
        if (spd < 0.05) { p.vx += (Math.random() - 0.5) * 0.06; p.vy += (Math.random() - 0.5) * 0.06 }

        p.x += p.vx
        p.y += p.vy
        p.rot += p.rotV
        p.rotV *= 0.998
        if (Math.abs(p.rotV) < 0.003) p.rotV += (Math.random() - 0.5) * 0.004

        if (p.x <= 0) { p.x = 0; p.vx = Math.abs(p.vx) * 0.8; p.rotV *= -1 }
        if (p.x + p.w >= W) { p.x = W - p.w; p.vx = -Math.abs(p.vx) * 0.8; p.rotV *= -1 }
        if (p.y <= 0) { p.y = 0; p.vy = Math.abs(p.vy) * 0.8 }
        if (p.y + p.h >= H) { p.y = H - p.h; p.vy = -Math.abs(p.vy) * 0.8 }
        if (Math.abs(p.rot) > 12) p.rotV *= -0.8

        p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`
      })

      animRef.current = requestAnimationFrame(loop)
    }

    animRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animRef.current)
      arena.removeEventListener('mousemove', handleMouseMove)
      arena.removeEventListener('mouseup', handleMouseUp)
      arena.removeEventListener('mouseleave', handleMouseLeave)
      arena.removeEventListener('touchmove', handleTouchMove)
      arena.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <section
      id="services"
      style={{ position: 'relative', zIndex: 1, padding: '120px 60px 100px', overflow: 'hidden' }}
      className="services-section"
    >
      <style>{`
        @media (max-width: 768px) {
          .services-section { padding: 80px 20px 60px !important; }
          .services-head {
            flex-direction: column !important;
            gap: 16px !important;
            margin-bottom: 40px !important;
          }
          .services-head p {
            text-align: left !important;
            max-width: 100% !important;
          }
          .float-arena { height: 600px !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginBottom: '70px'
        }} className="services-head">
          <div>
            <div style={{
              fontSize: '10px', fontFamily: 'var(--font-mono)',
              letterSpacing: '0.15em', color: 'var(--v2)',
              textTransform: 'uppercase', marginBottom: '12px'
            }}>What We Do</div>
            <h2 style={{
              fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
              fontSize: 'clamp(28px, 3vw, 42px)',
              fontWeight: '700', letterSpacing: '-0.03em',
              color: 'var(--text)', lineHeight: 1.1
            }}>Every format.<br />Every platform.</h2>
          </div>
          <p style={{
            fontSize: '14px', color: 'var(--sub)',
            lineHeight: '1.8', maxWidth: '320px', textAlign: 'right'
          }}>
            From cinematic brand films to thumb-stopping reels — we cover the full spectrum of video production.
          </p>
        </div>

        <p style={{
          fontSize: '11px', color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.1em',
          textTransform: 'uppercase', marginBottom: '16px',
          textAlign: 'center'
        }}>⟡ Drag · Throw · Smash</p>

        <div
          ref={arenaRef}
          className="float-arena"
          style={{
            position: 'relative',
            width: '100%',
            height: '460px',
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.015)',
            border: '1px solid var(--glass-border)',
            overflow: 'hidden'
          }}
        />
      </div>
    </section>
  )
}