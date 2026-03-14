import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Icon from './Icon'
import GlassPanel from './GlassPanel'
import { panelReveal, staggerChildren, killAnimations } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

const SPECIFICATIONS = [
  {
    title: 'Continental GT',
    subtitle: 'THE ESSENCE OF TOURING',
    features: ['6.0L Twin-Turbocharged', '641 Horsepower'],
    highlight: false,
  },
  {
    title: 'Continental GTC',
    subtitle: 'OPEN AIR EXHILARATION',
    features: ['Four-season soft top', 'Acoustic comfort technology'],
    highlight: false,
  },
  {
    title: 'GT Speed',
    subtitle: 'ULTIMATE PERFORMANCE',
    features: ['W12 Engine', '660 Horsepower'],
    highlight: true,
  },
]

export default function SpecificationSelector() {
  const panelRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const anims = []

    const p = panelReveal(panelRef.current, { y: 60, scale: 0.96 })
    if (p) anims.push(p)

    if (headerRef.current) {
      const els = headerRef.current.querySelectorAll('.header-reveal')
      if (els.length) {
        const t = gsap.fromTo(
          els,
          { y: 25, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true },
          }
        )
        anims.push(t)
      }
    }

    const s = staggerChildren(cardsRef.current, '.spec-card', {
      y: 40, scale: 0.94, stagger: 0.15, duration: 0.8, start: 'top 80%',
    })
    if (s) anims.push(s)

    return () => killAnimations(anims)
  }, [])

  const handleCardEnter = useCallback((e) => {
    gsap.to(e.currentTarget, {
      scale: 1.04, y: -6,
      borderColor: 'rgba(30, 215, 96, 0.5)',
      boxShadow: '0 16px 48px rgba(30,215,96,0.1), 0 0 0 1px rgba(30,215,96,0.15)',
      duration: 0.35, ease: 'power2.out',
    })
  }, [])

  const handleCardLeave = useCallback((e) => {
    const highlight = e.currentTarget.dataset.highlight === 'true'
    gsap.to(e.currentTarget, {
      scale: 1, y: 0,
      borderColor: highlight ? 'rgba(30, 215, 96, 0.4)' : 'rgba(34, 53, 40, 0.6)',
      boxShadow: 'none',
      duration: 0.35, ease: 'power2.out',
    })
  }, [])

  return (
    <GlassPanel ref={panelRef} style={{ opacity: 0, padding: '56px' }}>
      <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2
          className="header-reveal"
          style={{
            fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 400,
            color: '#FFFFFF', lineHeight: 1.1, marginBottom: '16px', opacity: 0,
          }}
        >
          Choose Your Specification
        </h2>
        <p
          className="header-reveal"
          style={{
            fontFamily: '"Inter", sans-serif', fontSize: '17px', fontWeight: 400,
            color: '#B6C2B7', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto', opacity: 0,
          }}
        >
          Select from our refined collection of Continental models, each designed with a unique personality.
        </p>
      </div>

      <div
        ref={cardsRef}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
        className="grid-cols-1! sm:grid-cols-2! lg:grid-cols-3!"
      >
        {SPECIFICATIONS.map((spec) => (
          <div
            key={spec.title}
            className="spec-card"
            data-highlight={spec.highlight}
            style={{
              backgroundColor: 'rgba(22, 39, 30, 0.5)',
              border: spec.highlight ? '1px solid rgba(30, 215, 96, 0.4)' : '1px solid rgba(34, 53, 40, 0.6)',
              borderRadius: '20px', padding: '28px', position: 'relative',
              cursor: 'pointer', opacity: 0, minHeight: '180px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              backdropFilter: 'blur(12px)', willChange: 'transform',
            }}
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
          >
            {spec.highlight && (
              <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
                <Icon name="lightning" size={20} />
              </div>
            )}
            {!spec.highlight && (
              <div style={{ position: 'absolute', top: '24px', right: '24px', color: 'rgba(182,194,183,0.5)' }}>
                <Icon name="arrowRight" size={18} />
              </div>
            )}

            <div>
              <h3 style={{ fontFamily: '"Inter", sans-serif', fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                {spec.title}
              </h3>
              <span style={{ display: 'block', fontSize: '12px', color: '#1ED760', textTransform: 'uppercase', letterSpacing: '0.14em', fontFamily: '"Inter", sans-serif', fontWeight: 600, marginBottom: '20px' }}>
                {spec.subtitle}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {spec.features.map((feature) => (
                <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M8 12l3 3 5-5" stroke="#1ED760" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.8)' }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  )
}
