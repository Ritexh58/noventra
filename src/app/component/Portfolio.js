'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../../lib/supabase'

const tabs = [
  { label: 'Cinematic & Brand', icon: '🎬', color: '#00D4EE' },
  { label: 'Podcast & Long-Form', icon: '🎙️', color: '#FF4D9E' },
  { label: 'Scroll Content', icon: '📱', color: '#FFAA20' },
]
const { data, error } = await supabase
  .from('portfolio_items')
  .select('*')
  .order('sort_order', { ascending: true })

const ease = [0.22, 1, 0.36, 1]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease } },
  exit: { opacity: 0, y: -12, filter: 'blur(4px)', transition: { duration: 0.25, ease } }
}

const headerVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease } }
}

export default function Portfolio() {
  const [active, setActive] = useState(0)
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPortfolio() {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) console.error('Error fetching portfolio:', error)
      else setVideos(data || [])
      setIsLoading(false)
    }
    fetchPortfolio()
  }, [])

  const activeTab = tabs[active]
  const filteredVideos = videos.filter(vid => vid.category === activeTab.label)

  return (
    <section
      id="portfolio"
      style={{ padding: '120px 60px', position: 'relative', zIndex: 1 }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{ marginBottom: '60px' }}
        >
          <div style={{
            fontSize: '10px', fontFamily: 'var(--font-mono)',
            letterSpacing: '0.15em', color: 'var(--v2)',
            textTransform: 'uppercase', marginBottom: '12px'
          }}>Our Work</div>
          <h2 style={{
            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
            fontSize: 'clamp(28px, 3vw, 42px)',
            fontWeight: '700', letterSpacing: '-0.03em',
            color: 'var(--text)', lineHeight: 1.1, margin: 0
          }}>Selected Projects</h2>
        </motion.div>

        {/* ── Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          style={{
            display: 'flex', gap: '4px', marginBottom: '40px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            overflowX: 'auto',
          }}
        >
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                position: 'relative',
                padding: '12px 22px',
                fontSize: '13px', fontWeight: '500',
                fontFamily: 'var(--font-body)',
                background: 'transparent', border: 'none',
                cursor: 'pointer', whiteSpace: 'nowrap',
                color: active === i ? 'var(--text)' : 'var(--sub)',
                transition: 'color 0.2s',
                marginBottom: '-1px',
                paddingBottom: '14px',
              }}
            >
              {tab.icon} {tab.label}

              {/* Animated tab underline */}
              {active === i && (
                <motion.div
                  layoutId="tab-underline"
                  style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: '2px',
                    background: tab.color,
                    borderRadius: '2px 2px 0 0'
                  }}
                  transition={{ duration: 0.3, ease }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* ── Loading Skeletons ── */}
        {isLoading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px'
          }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                background: 'var(--glass)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px', overflow: 'hidden',
                animation: 'skeletonPulse 1.6s ease infinite'
              }}>
                <div style={{ aspectRatio: '16/9', background: 'rgba(255,255,255,0.04)' }} />
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ height: '14px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', width: '70%' }} />
                  <div style={{ height: '10px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', width: '40%' }} />
                </div>
              </div>
            ))}
          </div>

        ) : filteredVideos.length === 0 ? (
          /* ── Empty State ── */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center', padding: '80px 0',
              color: 'var(--sub)', fontFamily: 'var(--font-mono)',
              fontSize: '13px', letterSpacing: '0.08em'
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '16px', opacity: 0.4 }}>🎞️</div>
            No projects in this category yet.
          </motion.div>

        ) : (
          /* ── Video Grid ── */
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px'
              }}
            >
              {filteredVideos.map((vid) => (
                <VideoCard key={vid.id} vid={vid} activeTab={activeTab} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <style>{`
        @keyframes skeletonPulse {
          0%, 100% { opacity: 1 }
          50% { opacity: 0.5 }
        }
        @media (max-width: 1024px) {
          #portfolio > div > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          #portfolio {
            padding: 80px 24px !important;
          }
          #portfolio > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

// ── Video Card ────────────────────────────────────────────────
function VideoCard({ vid, activeTab }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -6,
        boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${activeTab.color}22`,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
      }}
      style={{
        background: 'var(--glass)',
        border: '1px solid var(--glass-border)',
        borderRadius: '16px', overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      {/* Thumbnail */}
      <div style={{
        aspectRatio: '16/9', position: 'relative',
        background: 'rgba(255,255,255,0.03)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: `1px solid ${activeTab.color}22`,
        overflow: 'hidden'
      }}>
        {/* Actual thumbnail if available */}
        {vid.thumbnail_url && (
          <img
            src={vid.thumbnail_url}
            alt={vid.title}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', opacity: 0.8
            }}
          />
        )}

        {/* Accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '2px',
          background: `linear-gradient(90deg, ${activeTab.color}, transparent)`,
          zIndex: 2
        }} />

        {/* Play button */}
        <motion.div
          whileHover={{ scale: 1.15, background: `${activeTab.color}44` }}
          style={{
            position: 'relative', zIndex: 2,
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.09)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 24px ${activeTab.color}33`
          }}
        >
          <div style={{
            width: 0, height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderLeft: '14px solid white',
            marginLeft: '3px'
          }} />
        </motion.div>
      </div>

      {/* Info */}
      <div style={{ padding: '16px' }}>
        <div style={{
          fontSize: '14px', fontWeight: '500',
          color: 'var(--text)', marginBottom: '8px'
        }}>{vid.title}</div>
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{
            fontSize: '12px', color: 'var(--sub)',
            fontFamily: 'var(--font-mono)'
          }}>{vid.duration}</span>
          <span style={{
            fontSize: '10px', padding: '3px 10px',
            borderRadius: '100px',
            border: `1px solid ${activeTab.color}33`,
            color: activeTab.color,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.06em'
          }}>{vid.tag}</span>
        </div>
      </div>
    </motion.div>
  )
}