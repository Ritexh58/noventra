'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0
    let animationFrame

    // Track actual mouse movement
    const onMouseMove = (e) => {
      mx = e.clientX
      my = e.clientY
      cursor.style.left = mx + 'px'
      cursor.style.top = my + 'px'
    }

    // Smooth trailing physics for the outer ring
    const animateRing = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      animationFrame = requestAnimationFrame(animateRing)
    }

    window.addEventListener('mousemove', onMouseMove)
    animateRing()

    // Event delegation for hover states (buttons, links, inputs)
    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, input, select, textarea, .hover-target')) {
        cursor.style.width = '18px'
        cursor.style.height = '18px'
        ring.style.width = '46px'
        ring.style.height = '46px'
      }
    }

    const handleMouseOut = (e) => {
      if (e.target.closest('button, a, input, select, textarea, .hover-target')) {
        cursor.style.width = '10px'
        cursor.style.height = '10px'
        ring.style.width = '32px'
        ring.style.height = '32px'
      }
    }

    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} style={{
        width: '10px', height: '10px', background: '#9B6EFF', borderRadius: '50%',
        position: 'fixed', pointerEvents: 'none', zIndex: 9999,
        transform: 'translate(-50%,-50%)',
        transition: 'width .15s, height .15s, background .2s',
        mixBlendMode: 'screen'
      }}></div>
      <div ref={ringRef} style={{
        width: '32px', height: '32px', border: '1.5px solid rgba(155,110,255,0.45)', borderRadius: '50%',
        position: 'fixed', pointerEvents: 'none', zIndex: 9998,
        transform: 'translate(-50%,-50%)',
        transition: 'width .2s, height .2s'
      }}></div>
    </>
  )
}