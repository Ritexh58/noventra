'use client'

import { useState } from 'react'
import { useForm } from "react-hook-form"

export default function Portal() {
  const { register: registerBrand, handleSubmit: handleBrandSubmit, reset: resetBrand, watch: watchBrand, formState: { errors: brandErrors } } = useForm()
  const { register: registerCreator, handleSubmit: handleCreatorSubmit, reset: resetCreator, formState: { errors: creatorErrors } } = useForm()

  const [brandStatus, setBrandStatus] = useState('')
  const [creatorStatus, setCreatorStatus] = useState('')
  const [brandCurrency, setBrandCurrency] = useState('USD')

  const brandEmail = watchBrand('email')
  const brandPhone = watchBrand('phone')

  const onBrandSubmit = async (data) => {
    setBrandStatus('loading')
    try {
      const response = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, currency: brandCurrency }),
      })
      if (!response.ok) throw new Error('Failed')
      setBrandStatus('success')
      resetBrand()
    } catch (err) {
      setBrandStatus('error')
    }
  }

  const onCreatorSubmit = async (data) => {
    setCreatorStatus('loading')
    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed')
      setCreatorStatus('success')
      resetCreator()
    } catch (err) {
      setCreatorStatus('error')
    }
  }

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
    marginTop: '6px',
    boxSizing: 'border-box'
  }

  const labelStyle = {
    fontSize: '11px',
    color: 'var(--sub)',
    fontFamily: 'var(--font-mono)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase'
  }

  const errorStyle = {
    fontSize: '11px',
    color: '#ff6b6b',
    marginTop: '4px',
    fontFamily: 'var(--font-mono)'
  }

  return (
    <section style={{ padding: '80px 60px 120px', position: 'relative', zIndex: 1 }}>
      <style>{`
        @media (max-width: 768px) {
          .portal-grid {
            grid-template-columns: 1fr !important;
            padding: 40px 24px !important;
          }
        }
        .portal-form-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .portal-fields {
          flex: 1;
        }
      `}</style>

      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        alignItems: 'stretch'
      }} className="portal-grid">

        {/* ── LEFT — Brand Form ── */}
        <form
          onSubmit={handleBrandSubmit(onBrandSubmit)}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,170,32,0.14)',
            borderRadius: '24px',
            padding: '48px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{
            position: 'absolute', bottom: '-80px', left: '-80px',
            width: '300px', height: '300px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,170,32,0.08), transparent 70%)',
            pointerEvents: 'none'
          }} />

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

          <div className="portal-fields">
            {/* Row 1 — Brand name + Budget */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Brand name *</label>
                <input
                  {...registerBrand("brand_name", { required: "Brand name is required" })}
                  style={inputStyle}
                  placeholder="Acme Studio"
                  onFocus={e => e.target.style.borderColor = 'rgba(255,170,32,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
                {brandErrors.brand_name && <p style={errorStyle}>{brandErrors.brand_name.message}</p>}
              </div>

              {/* Budget with currency toggle */}
              <div>
                <label style={labelStyle}>Budget</label>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  {/* Currency toggle */}
                  <div style={{ display: 'flex', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
                    {['USD', 'INR'].map(cur => (
                      <button
                        key={cur}
                        type="button"
                        onClick={() => setBrandCurrency(cur)}
                        style={{
                          padding: '12px 12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          fontFamily: 'var(--font-mono)',
                          border: 'none',
                          cursor: 'pointer',
                          background: brandCurrency === cur ? '#FFAA20' : 'rgba(255,255,255,0.04)',
                          color: brandCurrency === cur ? '#000' : 'var(--sub)',
                          transition: 'all 0.2s'
                        }}
                      >{cur}</button>
                    ))}
                  </div>
                  <input
                    {...registerBrand("budget")}
                    style={{ ...inputStyle, marginTop: 0, flex: 1 }}
                    placeholder={brandCurrency === 'USD' ? 'e.g. 5000' : 'e.g. 50000'}
                    onFocus={e => e.target.style.borderColor = 'rgba(255,170,32,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                </div>
              </div>
            </div>

            {/* Project type */}
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

            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Email {!brandPhone && '*'}</label>
              <input
                {...registerBrand("email", {
                  validate: (val) => {
                    const phone = watchBrand('phone')
                    if (!val && !phone) return "Provide email or phone"
                    if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Invalid email format"
                    return true
                  }
                })}
                style={inputStyle}
                placeholder="you@example.com"
                type="email"
                onFocus={e => e.target.style.borderColor = 'rgba(255,170,32,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
              {brandErrors.email && <p style={errorStyle}>{brandErrors.email.message}</p>}
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Phone {!brandEmail && '*'}</label>
              <input
                {...registerBrand("phone", {
                  validate: (val) => {
                    const email = watchBrand('email')
                    if (!val && !email) return "Provide email or phone"
                    if (val && !/^\d{10}$/.test(val)) return "Phone must be 10 digits"
                    return true
                  }
                })}
                style={inputStyle}
                placeholder="10-digit number"
                type="tel"
                maxLength={10}
                onFocus={e => e.target.style.borderColor = 'rgba(255,170,32,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
              {brandErrors.phone && <p style={errorStyle}>{brandErrors.phone.message}</p>}
            </div>

            {/* Vision */}
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
          </div>

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
              background: brandStatus === 'loading' ? 'rgba(255,170,32,0.5)' : 'linear-gradient(135deg, #FFAA20, #FF8C00)',
              transition: 'opacity 0.2s, transform 0.2s',
              boxShadow: '0 8px 32px rgba(255,170,32,0.3)'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {brandStatus === 'loading' ? 'Sending...' : 'Send Project Brief →'}
          </button>

          {brandStatus === 'success' && <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--green)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>✓ Brief received! We'll be in touch within 2 hours.</p>}
          {brandStatus === 'error' && <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--pink)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>✗ Something went wrong. Please try again.</p>}
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
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{
            position: 'absolute', bottom: '-80px', right: '-80px',
            width: '300px', height: '300px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,238,0.08), transparent 70%)',
            pointerEvents: 'none'
          }} />

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

          <div className="portal-fields" style={{ flex: 1 }}>
            {/* Row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Full name *</label>
                <input
                  {...registerCreator("full_name", { required: "Full name is required" })}
                  style={inputStyle}
                  placeholder="Your name"
                  onFocus={e => e.target.style.borderColor = 'rgba(0,212,238,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
                {creatorErrors.full_name && <p style={errorStyle}>{creatorErrors.full_name.message}</p>}
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

            {/* Portfolio */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Portfolio / Showreel URL *</label>
              <input
                {...registerCreator("portfolio_url", { required: "Portfolio URL is required" })}
                style={inputStyle}
                placeholder="vimeo.com/yourwork"
                onFocus={e => e.target.style.borderColor = 'rgba(0,212,238,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
              {creatorErrors.portfolio_url && <p style={errorStyle}>{creatorErrors.portfolio_url.message}</p>}
            </div>

            {/* Software skills */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Software Skills</label>
              <input
                {...registerCreator("software_skills")}
                style={inputStyle}
                placeholder="DaVinci / Premiere / Ae"
                onFocus={e => e.target.style.borderColor = 'rgba(0,212,238,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Email *</label>
              <input
                {...registerCreator("email", {
                  validate: (val) => {
                    const phone = document.querySelector('input[name="creator_phone"]')?.value
                    if (!val && !phone) return "Provide email or phone"
                    if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Invalid email format"
                    return true
                  }
                })}
                style={inputStyle}
                placeholder="you@example.com"
                type="email"
                onFocus={e => e.target.style.borderColor = 'rgba(0,212,238,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
              {creatorErrors.email && <p style={errorStyle}>{creatorErrors.email.message}</p>}
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '28px' }}>
              <label style={labelStyle}>Phone *</label>
              <input
                {...registerCreator("phone", {
                  validate: (val) => {
                    const email = document.querySelector('input[type="email"]')?.value
                    if (!val && !email) return "Provide email or phone"
                    if (val && !/^\d{10}$/.test(val)) return "Phone must be 10 digits"
                    return true
                  }
                })}
                style={inputStyle}
                placeholder="10-digit number"
                type="tel"
                maxLength={10}
                name="creator_phone"
                onFocus={e => e.target.style.borderColor = 'rgba(0,212,238,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
              {creatorErrors.phone && <p style={errorStyle}>{creatorErrors.phone.message}</p>}
            </div>
          </div>

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
              background: creatorStatus === 'loading' ? 'rgba(0,212,238,0.5)' : 'linear-gradient(135deg, #00D4EE, #0099AA)',
              transition: 'opacity 0.2s, transform 0.2s',
              boxShadow: '0 8px 32px rgba(0,212,238,0.3)'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {creatorStatus === 'loading' ? 'Sending...' : 'Apply to Join →'}
          </button>

          {creatorStatus === 'success' && <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--green)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>✓ Application received! We'll review and get back to you.</p>}
          {creatorStatus === 'error' && <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--pink)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>✗ Something went wrong. Please try again.</p>}
        </form>
      </div>
    </section>
  )
}