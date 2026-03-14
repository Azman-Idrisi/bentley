import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Icon from './Icon'
import GlassPanel from './GlassPanel'
import { panelReveal, killAnimations } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

const FOOTER_LINKS = [
  { heading: 'PURCHASE', links: ['Find a Retailer', 'Configurator', 'Financing'] },
  { heading: 'COMPANY', links: ['Careers', 'News', 'Sustainability'] },
  { heading: 'SUPPORT', links: ['Contact Us', 'Ownership', 'Legal'] },
]

const linkStyle = {
  fontFamily: '"Inter", sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: 'rgba(182,194,183,0.7)',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
}

export default function Footer() {
  const panelRef = useRef(null)
  const logoRef = useRef(null)
  const descRef = useRef(null)
  const colsRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    const anims = []

    const p = panelReveal(panelRef.current, { y: 40, scale: 0.97, start: 'top 92%' })
    if (p) anims.push(p)

    const elements = [logoRef.current, descRef.current].filter(Boolean)
    const t1 = gsap.fromTo(
      elements,
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: panelRef.current, start: 'top 88%', once: true },
      }
    )
    anims.push(t1)

    if (colsRef.current) {
      const cols = colsRef.current.querySelectorAll('.footer-col')
      const t2 = gsap.fromTo(
        cols,
        { y: 25, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: colsRef.current, start: 'top 88%', once: true },
        }
      )
      anims.push(t2)
    }

    if (bottomRef.current) {
      const t3 = gsap.fromTo(
        bottomRef.current,
        { y: 15, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: bottomRef.current, start: 'top 95%', once: true },
        }
      )
      anims.push(t3)
    }

    return () => killAnimations(anims)
  }, [])

  const handleLinkEnter = useCallback((e) => { e.currentTarget.style.color = '#1ED760' }, [])
  const handleLinkLeave = useCallback((e) => { e.currentTarget.style.color = 'rgba(182,194,183,0.7)' }, [])
  const handleSocialEnter = useCallback((e) => {
    e.currentTarget.style.color = '#1ED760'
    e.currentTarget.style.transform = 'scale(1.15)'
  }, [])
  const handleSocialLeave = useCallback((e) => {
    e.currentTarget.style.color = 'rgba(182,194,183,0.5)'
    e.currentTarget.style.transform = 'scale(1)'
  }, [])

  return (
    <GlassPanel ref={panelRef} style={{ opacity: 0, padding: '48px 56px 36px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '48px', marginBottom: '40px' }}>
        <div style={{ maxWidth: '300px' }}>
          <div ref={logoRef} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', opacity: 0 }}>
            <Icon name="logo" size={22} />
            <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.08em', color: '#FFFFFF', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif' }}>
              BENTLEY
            </span>
          </div>
          <p ref={descRef} style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', fontWeight: 400, color: 'rgba(182,194,183,0.7)', lineHeight: 1.7, opacity: 0 }}>
            Bentley Motors is the most sought after luxury car brand in the world. The company's headquarters in Crewe is home to all its operations including design, R&D, engineering, and production.
          </p>
        </div>

        <div ref={colsRef} style={{ display: 'flex', gap: '56px', flexWrap: 'wrap' }}>
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading} className="footer-col" style={{ opacity: 0 }}>
              <h4 style={{ fontFamily: '"Inter", sans-serif', fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                {col.heading}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={linkStyle}
                      onMouseEnter={handleLinkEnter}
                      onMouseLeave={handleLinkLeave}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={bottomRef}
        style={{
          borderTop: '1px solid rgba(34, 53, 40, 0.5)', paddingTop: '20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '16px', opacity: 0,
        }}
      >
        <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: 400, color: 'rgba(182,194,183,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          &copy; 2024 BENTLEY MOTORS. ALL RIGHTS RESERVED.
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {['instagram', 'facebook', 'twitter'].map((social) => (
            <a
              key={social}
              href="#"
              aria-label={social}
              style={{ color: 'rgba(182,194,183,0.5)', transition: 'color 0.3s ease, transform 0.2s ease', display: 'inline-flex' }}
              onMouseEnter={handleSocialEnter}
              onMouseLeave={handleSocialLeave}
            >
              <Icon name={social} size={18} />
            </a>
          ))}
        </div>
      </div>
    </GlassPanel>
  )
}
