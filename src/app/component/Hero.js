'use client'

import { motion } from 'framer-motion'
import { scrollToSection } from '@/app/component/utils/scroll'

// Shared easing
const ease = [0.22, 1, 0.36, 1]

// Stagger container
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

// Blur + slide up — "lens focus" matches navbar
const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } }
}

// Right card slides in from right
const cardVariant = {
  hidden: { opacity: 0, x: 60, filter: 'blur(12px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease, delay: 0.35 } }
}

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '100px 60px 80px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        minHeight: '520px',
        position: 'relative',
      }}
    >
      {/* ── Left Side ── */}
      <motion.div variants={container} initial="hidden" animate="visible">

        {/* Available tag */}
        <motion.div variants={item} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(108,78,232,0.1)', border: '1px solid rgba(108,78,232,0.25)',
          borderRadius: '100px', padding: '6px 16px', marginBottom: '28px',
          fontSize: '10px', fontFamily: 'var(--font-mono)',
          letterSpacing: '0.12em', color: 'var(--v2)', textTransform: 'uppercase'
        }}>
          <span style={{
            width: '5px', height: '5px', borderRadius: '50%',
            background: 'var(--green)', boxShadow: '0 0 8px var(--green)',
            animation: 'pulse 2s ease infinite', display: 'inline-block'
          }} />
          Available
        </motion.div>

        {/* Heading */}
        <motion.h1 variants={item} style={{
          fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
          fontSize: 'clamp(36px, 4.2vw, 54px)',
          fontWeight: '700', lineHeight: '1.0',
          letterSpacing: '-0.03em',
          color: 'var(--text)', marginBottom: '10px', margin: 0
        }}>
          Every Frame
        </motion.h1>

        {/* Gradient italic */}
        <motion.span variants={item} style={{
          display: 'block',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(40px, 4.6vw, 58px)',
          fontWeight: '300',
          background: 'linear-gradient(100deg, var(--cyan) 0%, var(--v2) 50%, var(--pink) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundSize: '200%',
          animation: 'shimmer 5s ease infinite alternate',
          marginBottom: '20px',
          letterSpacing: '-0.01em'
        }}>
          has a story.
        </motion.span>

        {/* Subtext */}
        <motion.p variants={item} style={{
          fontSize: '15px', color: 'var(--sub)',
          lineHeight: '1.85', marginBottom: '36px',
          maxWidth: '380px', fontWeight: '300'
        }}>
          Noventra is a{' '}
          <strong style={{ color: 'var(--text)', fontWeight: '500' }}>
            premium video production studio
          </strong>{' '}
          — crafting brand films, scroll content, and podcast visuals that make
          audiences stop and feel something.
        </motion.p>

        {/* Buttons */}
        <motion.div variants={item} style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>

          {/* Primary CTA — uses fixed scroll */}
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 14px 44px rgba(108,78,232,0.55)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection('portal')}
            style={{
              padding: '14px 32px', fontSize: '13px', fontWeight: '600',
              color: '#fff', border: 'none', cursor: 'pointer',
              borderRadius: '12px', letterSpacing: '0.05em',
              background: 'linear-gradient(135deg, var(--v), var(--v2))',
              boxShadow: '0 8px 32px rgba(108,78,232,0.4)',
              textTransform: 'uppercase', fontFamily: 'var(--font-display)'
            }}
          >
            Start a Project
          </motion.button>

          {/* Secondary */}
          <motion.button
            whileHover={{ color: 'var(--text)', borderColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection('portfolio')}
            style={{
              padding: '13px 28px', fontSize: '13px', fontWeight: '400',
              color: 'var(--sub)', cursor: 'pointer', borderRadius: '12px',
              letterSpacing: '0.02em', background: 'transparent',
              border: '1px solid var(--glass-border)',
              fontFamily: 'var(--font-body)'
            }}
          >
            Watch Reel ↓
          </motion.button>

        </motion.div>
      </motion.div>

      {/* ── Right Side — Reel Card ── */}
      <motion.div
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        whileHover={{
          y: -8,
          boxShadow: '0 44px 100px rgba(0,0,0,0.8), 0 0 70px rgba(108,78,232,0.18)',
          transition: { duration: 0.4, ease }
        }}
        style={{
          background: 'var(--glass)',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(20px) saturate(150%)',
          borderRadius: '24px', overflow: 'hidden',
          aspectRatio: '16/10', position: 'relative',
          boxShadow: '0 24px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
          perspective: '1000px',         // ✅ fixes rotateX not rendering
        }}
      >
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)',
          backgroundSize: '32px 32px', pointerEvents: 'none'
        }} />

        {/* Glow */}
        <div style={{
          position: 'absolute', width: '220px', height: '220px',
          borderRadius: '50%', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(108,78,232,0.18), transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Play button */}
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          height: '100%', gap: '14px'
        }}>
          <motion.div
            whileHover={{ scale: 1.12, background: 'rgba(108,78,232,0.28)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.18)',
              backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 0 48px rgba(108,78,232,0.35)',
            }}
          >
            <div style={{
              width: 0, height: 0,
              borderTop: '11px solid transparent',
              borderBottom: '11px solid transparent',
              borderLeft: '18px solid white',
              marginLeft: '4px'
            }} />
          </motion.div>

          <span style={{
            fontSize: '10px', color: 'var(--sub)',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)'
          }}>Showreel 2025</span>
        </div>

        {/* REC pill */}
        <div style={{
          position: 'absolute', top: '14px', left: '14px',
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)',
          border: '1px solid var(--glass-border)', borderRadius: '100px',
          padding: '4px 12px', fontSize: '9px', color: 'var(--sub)',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.08em'
        }}>● REC</div>

        {/* Duration pill */}
        <div style={{
          position: 'absolute', bottom: '14px', right: '14px',
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)',
          border: '1px solid var(--glass-border)', borderRadius: '100px',
          padding: '4px 12px', fontSize: '9px', color: 'var(--sub)',
          fontFamily: 'var(--font-mono)'
        }}>2:47</div>

        {/* Color dots */}
        <div style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', gap: '5px' }}>
          {['#6C4EE8', '#00D4EE', '#00EE80'].map((color, i) => (
            <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: color }} />
          ))}
        </div>
      </motion.div>

      {/* ── CSS Animations ── */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 0% }
          100% { background-position: 200% }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1 }
          50%       { opacity: 0.3 }
        }
        @media (max-width: 768px) {
          section#home {
            grid-template-columns: 1fr !important;
            padding: 60px 24px 60px !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}