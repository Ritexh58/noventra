'use client'



export default function Footer() {

  <style>{`
  @media (max-width: 768px) {
    .footer-inner {
      flex-direction: column !important;
      padding: 40px 24px !important;
      gap: 32px !important;
    }
    .footer-links {
      flex-wrap: wrap !important;
      gap: 16px !important;
    }
  }
`}</style>

  const links = ['Work', 'Services', 'About', 'Join Us', 'Blog']
  const socials = [
    { label: 'IG', url: 'https://instagram.com' },
    { label: 'YT', url: 'https://youtube.com' },
    { label: 'LI', url: 'https://linkedin.com' },
    { label: 'BE', url: 'https://behance.net' },
  ]

  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.055)',
      padding: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '32px',
      position: 'relative',
      zIndex: 1,
      background: 'rgba(5,5,8,0.8)',
      backdropFilter: 'blur(20px)'
    }}className="footer-inner">

      {/* Brand */}
      <div  className="footer-links">
        <div style={{
          fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
          fontSize: '18px', fontWeight: '700',
          letterSpacing: '-0.02em', color: 'var(--text)',
          marginBottom: '6px'
        }}>Noventra Visuals</div>
        <div style={{
          fontSize: '12px', color: 'var(--muted)',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic', letterSpacing: '0.04em'
        }}>Every frame has a story.</div>
      </div>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        {links.map((link, i) => (
          <span key={i} style={{
            fontSize: '13px', color: 'var(--sub)',
            cursor: 'pointer', letterSpacing: '0.02em',
            transition: 'color 0.2s',
            fontFamily: 'var(--font-body)'
          }}
            onMouseEnter={e => e.target.style.color = 'var(--text)'}
            onMouseLeave={e => e.target.style.color = 'var(--sub)'}
          >{link}</span>
        ))}
      </div>

      {/* Socials */}
      <div style={{ display: 'flex', gap: '12px' }}>
        {socials.map((s, i) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
            style={{
              width: '40px', height: '40px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: '600',
              color: 'var(--sub)', textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.04em',
              transition: 'background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(108,78,232,0.15)'
              e.currentTarget.style.borderColor = 'rgba(108,78,232,0.4)'
              e.currentTarget.style.color = 'var(--v2)'
              e.currentTarget.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.color = 'var(--sub)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >{s.label}</a>
        ))}
      </div>

      {/* Bottom copyright */}
      <div style={{
        width: '100%',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        paddingTop: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <span style={{
          fontSize: '11px', color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.06em'
        }}>© 2025 Noventra Visuals. All rights reserved.</span>
        <span style={{
          fontSize: '11px', color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.06em'
        }}>Crafted with precision. Delivered with speed.</span>
      </div>

    </footer>
  )
}