// scroll.js

let scrollRafId = null

// Kill animation if user manually scrolls
if (typeof window !== 'undefined') {
  const killScroll = () => {
    if (scrollRafId) {
      cancelAnimationFrame(scrollRafId)
      scrollRafId = null
    }
  }
  window.addEventListener('wheel', killScroll, { passive: true })
  window.addEventListener('touchstart', killScroll, { passive: true })
}

export function smoothScrollTo(targetY, duration = 750) {
  if (scrollRafId) {
    cancelAnimationFrame(scrollRafId)
    scrollRafId = null
  }

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  const clampedTarget = Math.max(0, Math.min(targetY, maxScroll))
  const startY = window.scrollY
  const diff = clampedTarget - startY

  if (Math.abs(diff) < 1) return

  // ✅ First jump synchronously — zero perceived delay
  window.scrollTo(0, startY + diff * 0.01)

  let startTime = null

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)

    window.scrollTo(0, startY + diff * easeOutExpo(progress))

    if (progress < 1) {
      scrollRafId = requestAnimationFrame(step)
    } else {
      // Force exact final position — eliminates last-frame drift
      window.scrollTo(0, clampedTarget)
      scrollRafId = null
    }
  }

  scrollRafId = requestAnimationFrame(step)
}

export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return

  const NAV_HEIGHT = 72

  // Walk offsetParent chain — true document position,
  // immune to viewport shifts and sticky navbar reflow
  let offsetTop = 0
  let current = el
  while (current) {
    offsetTop += current.offsetTop
    current = current.offsetParent
  }

  const targetY = offsetTop - NAV_HEIGHT
  smoothScrollTo(targetY)
}