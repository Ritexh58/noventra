'use client'

import { useState } from 'react'
import { useForm } from "react-hook-form"
 

export default function Portal() {
  // Initialize react-hook-form for both forms
  const { register: registerBrand, handleSubmit: handleBrandSubmit, reset: resetBrand } = useForm()
  const { register: registerCreator, handleSubmit: handleCreatorSubmit, reset: resetCreator } = useForm()

  // Keep your excellent UI status states
  const [brandStatus, setBrandStatus] = useState('') // 'loading' | 'success' | 'error'
  const [creatorStatus, setCreatorStatus] = useState('')

  // Submit brand form to API route
  const onBrandSubmit = async (data) => {
    setBrandStatus('loading')
    try {
      const response = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) throw new Error('Failed to submit brief')
      
      setBrandStatus('success')
      resetBrand() // Clears the form fields automatically
    } catch (err) {
      console.error(err)
      setBrandStatus('error')
    }
  }

  // Submit creator form to API route
  const onCreatorSubmit = async (data) => {
    setCreatorStatus('loading')
    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) throw new Error('Failed to submit application')
      
      setCreatorStatus('success')
      resetCreator() // Clears the form fields automatically
    } catch (err) {
      console.error(err)
      setCreatorStatus('error')
    }
  }

  
  // Styles
  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    padding: '12px 16px',
    fontSize: '14px',
    color: 'var(--text)',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.2s',
    marginTop: '6px'
  }

  const labelStyle = {
    fontSize: '11px',
    color: 'var(--sub)',
    fontFamily: 'var(--font-mono)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase'
  }
 

  return (
    <section style={{
      id:"portal",
      padding: '80px 60px 120px',
      position: 'relative', zIndex: 1
    }}>
      <style>{`
  @media (max-width: 768px) {
    .portal-grid {
      grid-template-columns: 1fr !important;
      padding: 40px 24px !important;
    }
  }
`}</style>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px'
      }}className="portal-grid">

        {/* ── LEFT — Brand Form ── */}
        <form 
          onSubmit={handleBrandSubmit(onBrandSubmit)}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,170,32,0.14)',
            borderRadius: '24px',
            padding: '48px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Glow */}
          <div style={{
            position: 'absolute', bottom: '-80px', left: '-80px',
            width: '300px', height: '300px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,170,32,0.08), transparent 70%)',
            pointerEvents: 'none'
          }}></div>

          <div style={{
            fontSize: '10px', fontFamily: 'var(--font-mono)',
            letterSpacing: '0.12em', color: '#FFAA20',
            textTransform: 'uppercase', marginBottom: '12px'
          }}>For Brands & Businesses</div>

          <h3 style={{
            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
            fontSize: '28px', fontWeight: '700',
            letterSpacing: '-0.02em', color: 'var(--text)',
            marginBottom: '8px'
          }}>Start a Project</h3>

          <p style={{
            fontSize: '14px', color: 'var(--sub)',
            lineHeight: '1.7', marginBottom: '32px'
          }}>Tell us about your vision. We'll respond within 2 hours.</p>

          {/* Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Brand name</label>
              <input
                {...registerBrand("brand_name", { required: true })}
                style={inputStyle}
                placeholder="Acme Studio"
                onFocus={e => e.target.style.borderColor = 'rgba(255,170,32,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </div>
            <div>
              <label style={labelStyle}>Budget range</label>
              <select
                {...registerBrand("budget")}
                style={{ ...inputStyle, cursor: 'pointer' }}
                onFocus={e => e.target.style.borderColor = 'rgba(255,170,32,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                <option value="" style={{ background: '#080810' }}>Select...</option>
                <option value="Under $1K" style={{ background: '#080810' }}>Under $1K</option>
                <option value="$1K - $5K" style={{ background: '#080810' }}>$1K – $5K</option>
                <option value="$5K - $15K" style={{ background: '#080810' }}>$5K – $15K</option>
                <option value="$15K+" style={{ background: '#080810' }}>$15K+</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Project type</label>
            <input
              {...registerBrand("project_type")}
              style={inputStyle}
              placeholder="Brand film / Podcast / Scroll"
              onFocus={e => e.target.style.borderColor = 'rgba(255,170,32,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={labelStyle}>Vision</label>
            <textarea
              {...registerBrand("vision")}
              style={{ ...inputStyle, height: '100px', resize: 'none' }}
              placeholder="We want to create..."
              onFocus={e => e.target.style.borderColor = 'rgba(255,170,32,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={brandStatus === 'loading'}
            style={{
              width: '100%', padding: '14px',
              fontSize: '13px', fontWeight: '600',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: '#000', border: 'none', cursor: 'pointer',
              borderRadius: '12px',
              background: brandStatus === 'loading'
                ? 'rgba(255,170,32,0.5)'
                : 'linear-gradient(135deg, #FFAA20, #FF8C00)',
              transition: 'opacity 0.2s, transform 0.2s',
              boxShadow: '0 8px 32px rgba(255,170,32,0.3)'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {brandStatus === 'loading' ? 'Sending...' : 'Send Project Brief →'}
          </button>

          {/* Status messages */}
          {brandStatus === 'success' && (
            <p style={{
              marginTop: '12px', fontSize: '13px',
              color: 'var(--green)', textAlign: 'center',
              fontFamily: 'var(--font-mono)'
            }}>✓ Brief received! We'll be in touch within 2 hours.</p>
          )}
          {brandStatus === 'error' && (
            <p style={{
              marginTop: '12px', fontSize: '13px',
              color: 'var(--pink)', textAlign: 'center',
              fontFamily: 'var(--font-mono)'
            }}>✗ Something went wrong. Please try again.</p>
          )}
        </form>

        {/* ── RIGHT — Creator Form ── */}
        <form 
          onSubmit={handleCreatorSubmit(onCreatorSubmit)}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(0,212,238,0.14)',
            borderRadius: '24px',
            padding: '48px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Glow */}
          <div style={{
            position: 'absolute', bottom: '-80px', right: '-80px',
            width: '300px', height: '300px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,238,0.08), transparent 70%)',
            pointerEvents: 'none'
          }}></div>

          <div style={{
            fontSize: '10px', fontFamily: 'var(--font-mono)',
            letterSpacing: '0.12em', color: '#00D4EE',
            textTransform: 'uppercase', marginBottom: '12px'
          }}>For Editors & Creators</div>

          <h3 style={{
            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
            fontSize: '28px', fontWeight: '700',
            letterSpacing: '-0.02em', color: 'var(--text)',
            marginBottom: '8px'
          }}>Join the Network</h3>

          <p style={{
            fontSize: '14px', color: 'var(--sub)',
            lineHeight: '1.7', marginBottom: '32px'
          }}>We're building a team of exceptional video artists. Show us what you've got.</p>

          {/* Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Full name</label>
              <input
                {...registerCreator("full_name", { required: true })}
                style={inputStyle}
                placeholder="Your name"
                onFocus={e => e.target.style.borderColor = 'rgba(0,212,238,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </div>
            <div>
              <label style={labelStyle}>Specialty</label>
              <input
                {...registerCreator("specialty")}
                style={inputStyle}
                placeholder="Editor / Colorist..."
                onFocus={e => e.target.style.borderColor = 'rgba(0,212,238,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Portfolio / Showreel URL</label>
            <input
              {...registerCreator("portfolio_url", { required: true })}
              style={inputStyle}
              placeholder="vimeo.com/yourwork"
              onFocus={e => e.target.style.borderColor = 'rgba(0,212,238,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={labelStyle}>Software Skills</label>
            <input
              {...registerCreator("software_skills")}
              style={inputStyle}
              placeholder="DaVinci / Premiere / Ae"
              onFocus={e => e.target.style.borderColor = 'rgba(0,212,238,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={creatorStatus === 'loading'}
            style={{
              width: '100%', padding: '14px',
              fontSize: '13px', fontWeight: '600',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: '#000', border: 'none', cursor: 'pointer',
              borderRadius: '12px',
              background: creatorStatus === 'loading'
                ? 'rgba(0,212,238,0.5)'
                : 'linear-gradient(135deg, #00D4EE, #0099AA)',
              transition: 'opacity 0.2s, transform 0.2s',
              boxShadow: '0 8px 32px rgba(0,212,238,0.3)'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {creatorStatus === 'loading' ? 'Sending...' : 'Apply to Join →'}
          </button>

          {/* Status messages */}
          {creatorStatus === 'success' && (
            <p style={{
              marginTop: '12px', fontSize: '13px',
              color: 'var(--green)', textAlign: 'center',
              fontFamily: 'var(--font-mono)'
            }}>✓ Application received! We'll review and get back to you.</p>
          )}
          {creatorStatus === 'error' && (
            <p style={{
              marginTop: '12px', fontSize: '13px',
              color: 'var(--pink)', textAlign: 'center',
              fontFamily: 'var(--font-mono)'
            }}>✗ Something went wrong. Please try again.</p>
          )}
        </form>

      </div>
    </section>
  )
}