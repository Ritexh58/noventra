'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scrollToSection } from '@/app/component/utils/scroll'
import Image from 'next/image'
import logo from '../component/utils/logo.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Work', id: 'portfolio' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Join Us', id: 'portal' },
  ]

  // Scroll detection
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'portfolio', 'services', 'about', 'portal']
    const observers = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.4 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // ── Animation variants ──────────────────────────────────────
  const navVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }

  // "Lens focus" — items bloom in from blur + slight Y drop
  const itemVariants = {
    hidden: { opacity: 0, y: -10, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const mobileMenuVariants = {
    hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
    visible: {
      clipPath: 'inset(0 0 0% 0)',
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      clipPath: 'inset(0 0 100% 0)',
      opacity: 0,
      transition: { duration: 0.4, ease: [0.55, 0, 0.78, 0] },
    },
  }

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -24 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.15 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    }),
    exit: { opacity: 0, x: -16, transition: { duration: 0.2 } },
  }

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 48px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(5,5,8,0.88)' : 'rgba(5,5,8,0.55)',
          backdropFilter: 'blur(28px) saturate(180%)',
          borderBottom: '1px solid rgba(255,255,255,0.055)',
          transition: 'background 0.35s ease',
        }}
      >
        {/* ── Logo ── */}
        <motion.div
          variants={itemVariants}
          onClick={() => { scrollToSection('home'); setActive('home'); setMenuOpen(false) }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: 44,
            height: 44,
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Image
              src={logo}
              alt="Noventra Visuals"
              width={44}
              height={44}
              style={{ objectFit: 'contain', display: 'block' }}
              priority
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{
              fontSize: '15px',
              fontWeight: '800',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text)',
              lineHeight: 1,
            }}>Noventra</span>
            <span style={{
              fontSize: '8px',
              letterSpacing: '0.2em',
              color: 'var(--v2)',
              textTransform: 'uppercase',
              opacity: 0.75,
              fontFamily: 'var(--font-mono)',
              lineHeight: 1,
            }}>Visual Studio</span>
          </div>
        </motion.div>

        {/* ── Desktop Nav Links ── */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', gap: '36px' }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              link={link}
              active={active}
              onClick={() => { scrollToSection(link.id); setActive(link.id) }}
            />
          ))}
        </motion.div>

        {/* ── Desktop CTA ── */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(108,78,232,0.6)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { scrollToSection('portal'); setActive('portal') }}
          className="desktop-nav"
          style={{
            padding: '10px 24px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '30px',
            letterSpacing: '0.08em',
            background: 'linear-gradient(135deg, var(--v), var(--v2))',
            boxShadow: '0 0 24px rgba(108,78,232,0.35)',
            textTransform: 'uppercase',
          }}
        >
          Start a Project
        </motion.button>

        {/* ── Hamburger (mobile) ── */}
        <motion.button
          variants={itemVariants}
          onClick={() => setMenuOpen((p) => !p)}
          className="hamburger-btn"
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px',
            zIndex: 110,
          }}
        >
          <HamburgerIcon open={menuOpen} />
        </motion.button>
      </motion.nav>

      {/* ── Mobile Full-Screen Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(5,5,8,0.97)',
              backdropFilter: 'blur(32px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                custom={i}
                variants={mobileLinkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => {
                  scrollToSection(link.id)
                  setActive(link.id)
                  setMenuOpen(false)
                }}
                style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: active === link.id ? 'var(--v2)' : 'var(--text)',
                  cursor: 'pointer',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  width: '220px',
                  textAlign: 'center',
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </motion.div>
            ))}

            <motion.button
              custom={navLinks.length}
              variants={mobileLinkVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => {
                scrollToSection('portal')
                setActive('portal')
                setMenuOpen(false)
              }}
              style={{
                marginTop: '24px',
                padding: '14px 36px',
                fontSize: '13px',
                fontWeight: '700',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '30px',
                letterSpacing: '0.1em',
                background: 'linear-gradient(135deg, var(--v), var(--v2))',
                boxShadow: '0 0 32px rgba(108,78,232,0.5)',
                textTransform: 'uppercase',
              }}
            >
              Start a Project
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}

// ── NavLink with center-expand underline ──────────────────────
function NavLink({ link, active, onClick }) {
  const [hovered, setHovered] = useState(false)
  const isActive = active === link.id

  return (
    <motion.span
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative',
        fontSize: '13px',
        color: isActive ? 'var(--text)' : 'var(--sub)',
        cursor: 'pointer',
        letterSpacing: '0.02em',
        paddingBottom: '4px',
      }}
      animate={{ color: isActive || hovered ? 'var(--text)' : 'var(--sub)' }}
      transition={{ duration: 0.2 }}
    >
      {link.label}

      {/* Center-expanding underline */}
      <motion.span
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          height: '1px',
          background: 'linear-gradient(90deg, var(--v), var(--v2))',
          translateX: '-50%',
        }}
        animate={{ width: isActive || hovered ? '100%' : '0%' }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.span>
  )
}

// ── Animated Hamburger Icon ───────────────────────────────────
function HamburgerIcon({ open }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <motion.line
        x1="3" y1="6" x2="21" y2="6"
        stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        style={{ originX: '50%', originY: '50%' }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.line
        x1="3" y1="12" x2="21" y2="12"
        stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.line
        x1="3" y1="18" x2="21" y2="18"
        stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        style={{ originX: '50%', originY: '50%' }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  )
}