import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlassPanel from './GlassPanel'
import { panelReveal, staggerChildren, killAnimations } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    quote: 'The Continental GT is not merely a car — it is an experience that transcends ordinary luxury. Every journey feels like the first.',
    name: 'James Thornton',
    title: 'Owner, Continental GT Speed',
    initials: 'JT',
  },
  {
    quote: 'Mulliner understood my vision perfectly. The bespoke interior they created is a masterpiece of craftsmanship that I never tire of admiring.',
    name: 'Victoria Chen',
    title: 'Owner, Mulliner Commission',
    initials: 'VC',
  },
  {
    quote: 'Nothing compares to the feeling of open-air motoring in the Continental GTC. It combines raw power with absolute refinement.',
    name: 'Alexander Müller',
    title: 'Owner, Continental GTC',
    initials: 'AM',
  },
]

export default function TestimonialsSection() {
  const panelRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const anims = []

    const p = panelReveal(panelRef.current, { y: 60, scale: 0.96 })
    if (p) anims.push(p)

    if (headerRef.current) {
      const els = headerRef.current.querySelectorAll('.header-reveal')
      const t = gsap.fromTo(els, { y: 25, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true },
      })
      anims.push(t)
    }

    const s = staggerChildren(cardsRef.current, '.testimonial-card', {
      y: 35, stagger: 0.18, duration: 0.8, start: 'top 80%',
    })
    if (s) anims.push(s)

    return () => killAnimations(anims)
  }, [])

  const handleCardEnter = useCallback((e) => {
    gsap.to(e.currentTarget, {
      y: -5, borderColor: 'rgba(30, 215, 96, 0.3)',
      boxShadow: '0 12px 40px rgba(30,215,96,0.06)', duration: 0.35, ease: 'power2.out',
    })
  }, [])
  const handleCardLeave = useCallback((e) => {
    gsap.to(e.currentTarget, {
      y: 0, borderColor: 'rgba(34, 53, 40, 0.6)',
      boxShadow: 'none', duration: 0.35, ease: 'power2.out',
    })
  }, [])

  return (
    <GlassPanel ref={panelRef} style={{ opacity: 0, padding: '56px' }}>
      <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="header-reveal" style={{ display: 'block', fontSize: '13px', color: '#1ED760', textTransform: 'uppercase', letterSpacing: '0.14em', fontFamily: '"Inter", sans-serif', fontWeight: 600, marginBottom: '16px', opacity: 0 }}>
          OWNER STORIES
        </span>
        <h2 className="header-reveal" style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 400, color: '#FFFFFF', lineHeight: 1.1, opacity: 0 }}>
          Voices of Distinction
        </h2>
      </div>

      <div
        ref={cardsRef}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
        className="grid-cols-1! lg:grid-cols-3!"
      >
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="testimonial-card"
            style={{
              backgroundColor: 'rgba(22, 39, 30, 0.4)', border: '1px solid rgba(34, 53, 40, 0.6)',
              borderRadius: '20px', padding: '32px', opacity: 0,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              willChange: 'transform',
            }}
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
          >
            <div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '20px', opacity: 0.3 }}>
                <path d="M10 8c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h2l-2 3v1h4v-1l-2-3h2c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2h-4zm-8 0c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h2l-2 3v1h4v-1L2 16h2c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2H2z" fill="#1ED760" />
              </svg>
              <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '17px', fontWeight: 400, fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: '28px' }}>
                {t.quote}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(30, 215, 96, 0.12)', border: '1px solid rgba(30, 215, 96, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', fontWeight: 700, color: '#1ED760' }}>{t.initials}</span>
              </div>
              <div>
                <span style={{ display: 'block', fontFamily: '"Inter", sans-serif', fontSize: '15px', fontWeight: 600, color: '#FFFFFF' }}>{t.name}</span>
                <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '13px', fontWeight: 400, color: 'rgba(182,194,183,0.6)' }}>{t.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  )
}
