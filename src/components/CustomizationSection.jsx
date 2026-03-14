import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlassPanel from './GlassPanel'
import { panelReveal, staggerChildren, buttonPress, killAnimations } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

const OPTIONS = [
  {
    label: 'EXTERIOR',
    title: 'Paint & Finish',
    description: 'Choose from over 60 standard colors or create your own with Mulliner\'s bespoke palette.',
    colors: ['#1A1A2E', '#2D4739', '#8B4513', '#C0C0C0', '#F5F5DC'],
  },
  {
    label: 'INTERIOR',
    title: 'Leather & Trim',
    description: 'Select from hand-stitched hides in 15 standard colors, with contrast stitching options.',
    colors: ['#3D2B1F', '#8B0000', '#1B1B1B', '#F5F5DC', '#2F4F4F'],
  },
  {
    label: 'WHEELS',
    title: 'Alloy Design',
    description: '22-inch forged alloy wheels available in 6 distinct designs with painted or polished finish.',
    colors: ['#C0C0C0', '#1A1A1A', '#4A4A4A', '#B8860B', '#2F4F4F'],
  },
]

export default function CustomizationSection() {
  const panelRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const anims = []

    const p = panelReveal(panelRef.current, { y: 60, scale: 0.96 })
    if (p) anims.push(p)

    if (headerRef.current) {
      const els = headerRef.current.querySelectorAll('.header-reveal')
      const t = gsap.fromTo(
        els,
        { y: 25, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true },
        }
      )
      anims.push(t)
    }

    const s = staggerChildren(cardsRef.current, '.custom-card', {
      y: 40, stagger: 0.15, duration: 0.8, start: 'top 80%',
    })
    if (s) anims.push(s)

    if (ctaRef.current) {
      const ct = gsap.fromTo(ctaRef.current, { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', once: true },
      })
      anims.push(ct)
    }

    return () => killAnimations(anims)
  }, [])

  const handleCardEnter = useCallback((e) => {
    gsap.to(e.currentTarget, {
      y: -6, borderColor: 'rgba(30, 215, 96, 0.3)',
      boxShadow: '0 16px 48px rgba(30,215,96,0.08)', duration: 0.35, ease: 'power2.out',
    })
  }, [])

  const handleCardLeave = useCallback((e) => {
    gsap.to(e.currentTarget, {
      y: 0, borderColor: 'rgba(34, 53, 40, 0.6)',
      boxShadow: 'none', duration: 0.35, ease: 'power2.out',
    })
  }, [])

  const handleSwatchEnter = useCallback((e) => {
    gsap.to(e.currentTarget, { scale: 1.25, borderColor: '#1ED760', duration: 0.2, ease: 'back.out(2)' })
  }, [])
  const handleSwatchLeave = useCallback((e) => {
    gsap.to(e.currentTarget, { scale: 1, borderColor: 'rgba(255,255,255,0.1)', duration: 0.2, ease: 'power2.out' })
  }, [])

  const handleCtaDown = useCallback((e) => buttonPress(e.currentTarget), [])
  const handleCtaEnter = useCallback((e) => {
    e.currentTarget.style.backgroundColor = '#1ED760'
    e.currentTarget.style.color = '#060D08'
    e.currentTarget.style.boxShadow = '0 0 40px rgba(30,215,96,0.3), 0 0 80px rgba(30,215,96,0.1)'
  }, [])
  const handleCtaLeave = useCallback((e) => {
    e.currentTarget.style.backgroundColor = 'rgba(30, 215, 96, 0.08)'
    e.currentTarget.style.color = '#FFFFFF'
    e.currentTarget.style.boxShadow = 'none'
  }, [])

  return (
    <GlassPanel ref={panelRef} glow style={{ opacity: 0, padding: '56px' }}>
      <div ref={headerRef} style={{ marginBottom: '48px' }}>
        <span className="header-reveal" style={{ display: 'block', fontSize: '13px', color: '#1ED760', textTransform: 'uppercase', letterSpacing: '0.14em', fontFamily: '"Inter", sans-serif', fontWeight: 600, marginBottom: '16px', opacity: 0 }}>
          MAKE IT YOURS
        </span>
        <h2 className="header-reveal" style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 400, color: '#FFFFFF', lineHeight: 1.1, marginBottom: '16px', opacity: 0 }}>
          Personalize Every Detail
        </h2>
        <p className="header-reveal" style={{ fontFamily: '"Inter", sans-serif', fontSize: '17px', fontWeight: 400, color: '#B6C2B7', lineHeight: 1.6, maxWidth: '520px', opacity: 0 }}>
          With virtually limitless combinations, your Bentley will be as individual as you are.
        </p>
      </div>

      <div
        ref={cardsRef}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
        className="grid-cols-1! sm:grid-cols-2! lg:grid-cols-3!"
      >
        {OPTIONS.map((option) => (
          <div
            key={option.label}
            className="custom-card"
            style={{
              backgroundColor: 'rgba(22, 39, 30, 0.4)', border: '1px solid rgba(34, 53, 40, 0.6)',
              borderRadius: '20px', padding: '28px', opacity: 0, cursor: 'pointer', willChange: 'transform',
            }}
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
          >
            <span style={{ display: 'block', fontSize: '11px', color: '#1ED760', textTransform: 'uppercase', letterSpacing: '0.14em', fontFamily: '"Inter", sans-serif', fontWeight: 600, marginBottom: '12px' }}>
              {option.label}
            </span>
            <h3 style={{ fontFamily: '"Inter", sans-serif', fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
              {option.title}
            </h3>
            <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', fontWeight: 400, color: '#B6C2B7', lineHeight: 1.6, marginBottom: '20px' }}>
              {option.description}
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {option.colors.map((color, i) => (
                <div
                  key={i}
                  style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    backgroundColor: color, border: '2px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer', willChange: 'transform',
                  }}
                  onMouseEnter={handleSwatchEnter}
                  onMouseLeave={handleSwatchLeave}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div ref={ctaRef} style={{ textAlign: 'center', marginTop: '40px', opacity: 0 }}>
        <a
          href="#"
          onMouseDown={handleCtaDown}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', height: '48px',
            padding: '0 28px', borderRadius: '12px', border: '1px solid #1ED760',
            backgroundColor: 'rgba(30, 215, 96, 0.08)', color: '#FFFFFF',
            fontSize: '14px', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.08em', fontFamily: '"Inter", sans-serif', textDecoration: 'none',
            transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer', willChange: 'transform',
          }}
          onMouseEnter={handleCtaEnter}
          onMouseLeave={handleCtaLeave}
        >
          OPEN CONFIGURATOR
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </GlassPanel>
  )
}
