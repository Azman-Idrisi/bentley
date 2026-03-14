import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Icon from './Icon'
import GlassPanel from './GlassPanel'
import { panelReveal, staggerChildren, parallaxElement, buttonPress, killAnimations } from '../utils/animations'
import img2 from '../assets/2.png'
import img1 from '../assets/1.png'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  'Bespoke hand-stitched leather interiors',
  'Rare sustainable wood veneers',
  'Exclusive diamond-in-diamond quilting',
]

const imgStyle = { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }
const imgContainerStyle = {
  width: '300px',
  height: '300px',
  borderRadius: '20px',
  overflow: 'hidden',
  opacity: 0,
  border: '1px solid rgba(30, 215, 96, 0.06)',
}

export default function MullinerSection() {
  const panelRef = useRef(null)
  const imagesRef = useRef(null)
  const textRef = useRef(null)
  const featuresRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    const anims = []

    const p1 = panelReveal(panelRef.current, { y: 60, scale: 0.96 })
    if (p1) anims.push(p1)

    const s1 = staggerChildren(imagesRef.current, '.mulliner-img', {
      y: 0,
      scale: 0.88,
      stagger: 0.2,
      duration: 0.9,
      start: 'top 78%',
    })
    if (s1) anims.push(s1)

    if (imagesRef.current) {
      const px = parallaxElement(imagesRef.current, { yPercent: -8 })
      if (px) anims.push(px)
    }

    if (textRef.current) {
      const els = textRef.current.querySelectorAll('.text-reveal')
      if (els.length) {
        const t = gsap.fromTo(
          els,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
        anims.push(t)
      }
    }

    const s2 = staggerChildren(featuresRef.current, '.feature-item', {
      x: -35,
      y: 0,
      stagger: 0.12,
      duration: 0.6,
      start: 'top 82%',
    })
    if (s2) anims.push(s2)

    if (btnRef.current) {
      const bt = gsap.fromTo(
        btnRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: btnRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      )
      anims.push(bt)
    }

    return () => killAnimations(anims)
  }, [])

  const handleImgEnter = useCallback((e) => { e.currentTarget.style.transform = 'scale(1.06)' }, [])
  const handleImgLeave = useCallback((e) => { e.currentTarget.style.transform = 'scale(1)' }, [])
  const handleBtnDown = useCallback((e) => buttonPress(e.currentTarget), [])
  const handleBtnEnter = useCallback((e) => {
    e.currentTarget.style.backgroundColor = '#1ED760'
    e.currentTarget.style.color = '#060D08'
    e.currentTarget.style.boxShadow = '0 0 40px rgba(30,215,96,0.3)'
  }, [])
  const handleBtnLeave = useCallback((e) => {
    e.currentTarget.style.backgroundColor = 'rgba(30, 215, 96, 0.08)'
    e.currentTarget.style.color = '#FFFFFF'
    e.currentTarget.style.boxShadow = 'none'
  }, [])

  return (
    <GlassPanel ref={panelRef} glow style={{ opacity: 0, padding: '56px' }}>
      <div
        style={{ display: 'flex', gap: '64px', alignItems: 'center' }}
        className="flex-col lg:flex-row"
      >
        <div
          ref={imagesRef}
          style={{ display: 'flex', gap: '20px', flexShrink: 0, willChange: 'transform' }}
          className="flex-col sm:flex-row"
        >
          <div className="mulliner-img" style={imgContainerStyle}>
            <img
              src={img1}
              alt="Bespoke hand-stitched brown leather interior"
              style={imgStyle}
              loading="lazy"
              onMouseEnter={handleImgEnter}
              onMouseLeave={handleImgLeave}
            />
          </div>
          <div className="mulliner-img" style={imgContainerStyle}>
            <img
              src={img2}
              alt="Bentley engine bay with precision engineering"
              style={imgStyle}
              loading="lazy"
              onMouseEnter={handleImgEnter}
              onMouseLeave={handleImgLeave}
            />
          </div>
        </div>

        <div ref={textRef} style={{ paddingLeft: '16px' }}>
          <span
            className="text-reveal"
            style={{
              display: 'block', fontSize: '13px', color: '#1ED760', textTransform: 'uppercase',
              letterSpacing: '0.14em', fontFamily: '"Inter", sans-serif', fontWeight: 600,
              marginBottom: '16px', opacity: 0,
            }}
          >
            UNMATCHED ARTISTRY
          </span>

          <h2
            className="text-reveal"
            style={{
              fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 400,
              color: '#FFFFFF', lineHeight: 1.1, marginBottom: '20px', opacity: 0,
            }}
          >
            The Art of Mulliner
          </h2>

          <p
            className="text-reveal"
            style={{
              fontFamily: '"Inter", sans-serif', fontSize: '17px', fontWeight: 400,
              color: '#B6C2B7', lineHeight: 1.6, maxWidth: '460px', marginBottom: '28px', opacity: 0,
            }}
          >
            Every Bentley is built to your exact vision. Through the Mulliner personal commissioning service, our master craftspeople can create a vehicle that is truly unique, reflecting your personal taste in every detail.
          </p>

          <div ref={featuresRef} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
            {FEATURES.map((feature) => (
              <div key={feature} className="feature-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0 }}>
                <Icon name="checkmark" size={22} />
                <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '15px', color: '#FFFFFF' }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <a
            ref={btnRef}
            href="#"
            onMouseDown={handleBtnDown}
            style={{
              display: 'inline-flex', alignItems: 'center', height: '44px', padding: '0 22px',
              borderRadius: '12px', border: '1px solid #1ED760',
              backgroundColor: 'rgba(30, 215, 96, 0.08)', color: '#FFFFFF',
              fontSize: '14px', fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '0.08em', fontFamily: '"Inter", sans-serif', textDecoration: 'none',
              transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer', opacity: 0, willChange: 'transform',
            }}
            onMouseEnter={handleBtnEnter}
            onMouseLeave={handleBtnLeave}
          >
            DISCOVER MULLINER
          </a>
        </div>
      </div>
    </GlassPanel>
  )
}
