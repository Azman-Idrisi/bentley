import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlassPanel from './GlassPanel'
import { splitTextReveal, buttonPress, parallaxElement, killAnimations } from '../utils/animations'
import heroBg from '../assets/3.png'

gsap.registerPlugin(ScrollTrigger)

const panelStyle = { minHeight: 'calc(100vh - 120px)', opacity: 0 }
const bgStyle = {
  position: 'absolute',
  inset: '-10%',
  borderRadius: '32px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  willChange: 'transform',
}
const overlayLeftStyle = {
  position: 'absolute',
  inset: 0,
  borderRadius: '32px',
  background: 'linear-gradient(to right, rgba(6,13,8,0.94) 0%, rgba(6,13,8,0.75) 35%, rgba(6,13,8,0.35) 65%, rgba(6,13,8,0.2) 100%)',
}
const overlayBottomStyle = {
  position: 'absolute',
  inset: 0,
  borderRadius: '32px',
  background: 'linear-gradient(to top, rgba(6,13,8,0.85) 0%, transparent 35%)',
}
const contentContainerStyle = {
  position: 'relative',
  zIndex: 2,
  padding: '48px',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  minHeight: 'calc(100vh - 120px)',
  paddingBottom: '64px',
  paddingTop: '120px',
}
const subtitleStyle = {
  display: 'block',
  fontSize: '13px',
  color: '#1ED760',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  fontFamily: '"Inter", sans-serif',
  fontWeight: 600,
  marginBottom: '24px',
  opacity: 0,
}
const h1Style = {
  fontFamily: '"Playfair Display", serif',
  fontSize: '60px',
  fontWeight: 700,
  color: '#FFFFFF',
  lineHeight: 1.05,
  letterSpacing: '-1px',
  marginBottom: '24px',
}
const lineStyle = { display: 'block', opacity: 0 }
const emStyle = { fontStyle: 'italic', color: '#1ED760', display: 'block' }
const subheadingStyle = {
  fontFamily: '"Inter", sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  color: '#B6C2B7',
  lineHeight: 1.6,
  maxWidth: '440px',
  marginBottom: '32px',
  opacity: 0,
}
const btnContainerStyle = { display: 'flex', gap: '16px', flexWrap: 'wrap' }
const primaryBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  height: '48px',
  padding: '0 24px',
  borderRadius: '12px',
  border: '1px solid #1ED760',
  backgroundColor: 'rgba(30, 215, 96, 0.08)',
  color: '#FFFFFF',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  fontFamily: '"Inter", sans-serif',
  textDecoration: 'none',
  transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease',
  cursor: 'pointer',
  opacity: 0,
  willChange: 'transform',
}
const secondaryBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  height: '48px',
  padding: '0 24px',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.12)',
  backgroundColor: 'rgba(255,255,255,0.04)',
  color: '#FFFFFF',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  fontFamily: '"Inter", sans-serif',
  textDecoration: 'none',
  transition: 'border-color 0.3s ease, color 0.3s ease, background-color 0.3s ease, transform 0.2s ease',
  cursor: 'pointer',
  opacity: 0,
  willChange: 'transform',
}
const statsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '28px',
}
const statLabelStyle = {
  display: 'block',
  fontSize: '11px',
  color: 'rgba(182,194,183,0.6)',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontFamily: '"Inter", sans-serif',
  marginBottom: '4px',
}
const statValueStyle = {
  fontFamily: '"Playfair Display", serif',
  fontSize: '34px',
  fontWeight: 700,
  color: '#FFFFFF',
  lineHeight: 1,
}
const statUnitStyle = {
  fontSize: '15px',
  fontWeight: 500,
  color: '#B6C2B7',
  marginLeft: '6px',
  fontFamily: '"Inter", sans-serif',
}
const scrollContainerStyle = {
  position: 'absolute',
  bottom: '24px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  zIndex: 3,
  opacity: 0,
}
const scrollBarStyle = {
  width: '2px',
  height: '24px',
  backgroundColor: '#1ED760',
  borderRadius: '1px',
}
const scrollTextStyle = {
  fontSize: '10px',
  color: 'rgba(182,194,183,0.5)',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  fontFamily: '"Inter", sans-serif',
}

const STATS = [
  { label: 'TOP SPEED', value: '208', unit: 'MPH' },
  { label: '0-60 MPH', value: '3.5', unit: 'SEC' },
  { label: 'MAX TORQUE', value: '900', unit: 'NM' },
]

export default function HeroSection() {
  const panelRef = useRef(null)
  const subtitleRef = useRef(null)
  const headingLineRefs = useRef([])
  const subheadingRef = useRef(null)
  const buttonsRef = useRef(null)
  const statsRef = useRef(null)
  const scrollRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const anims = []

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    anims.push(tl)

    tl.fromTo(
      panelRef.current,
      { y: 50, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 1.1 }
    )

    tl.fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.5'
    )

    headingLineRefs.current.forEach((line, i) => {
      if (!line) return
      const t = splitTextReveal(line, {
        duration: 0.8,
        stagger: 0.035,
        y: 40,
        delay: 0.15 + i * 0.12,
      })
      if (t) anims.push(t)
    })

    tl.fromTo(
      subheadingRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.8
    )

    if (buttonsRef.current?.children) {
      tl.fromTo(
        Array.from(buttonsRef.current.children),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
        1.0
      )
    }

    if (statsRef.current?.children) {
      tl.fromTo(
        Array.from(statsRef.current.children),
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out' },
        0.9
      )
    }

    tl.fromTo(
      scrollRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6 },
      1.3
    )

    const pulse = gsap.to(scrollRef.current, {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 1.4,
      ease: 'sine.inOut',
      delay: 2,
    })
    anims.push(pulse)

    if (bgRef.current) {
      const p = parallaxElement(bgRef.current, { yPercent: -10 })
      if (p) anims.push(p)
    }

    return () => killAnimations(anims)
  }, [])

  const addLineRef = useCallback((el) => {
    if (el && !headingLineRefs.current.includes(el)) {
      headingLineRefs.current.push(el)
    }
  }, [])

  const handleButtonDown = useCallback((e) => buttonPress(e.currentTarget), [])

  const handlePrimaryEnter = useCallback((e) => {
    e.currentTarget.style.backgroundColor = '#1ED760'
    e.currentTarget.style.color = '#060D08'
    e.currentTarget.style.boxShadow = '0 0 40px rgba(30,215,96,0.3), 0 0 80px rgba(30,215,96,0.1)'
  }, [])
  const handlePrimaryLeave = useCallback((e) => {
    e.currentTarget.style.backgroundColor = 'rgba(30, 215, 96, 0.08)'
    e.currentTarget.style.color = '#FFFFFF'
    e.currentTarget.style.boxShadow = 'none'
  }, [])
  const handleSecondaryEnter = useCallback((e) => {
    e.currentTarget.style.borderColor = '#1ED760'
    e.currentTarget.style.color = '#1ED760'
    e.currentTarget.style.backgroundColor = 'rgba(30, 215, 96, 0.06)'
  }, [])
  const handleSecondaryLeave = useCallback((e) => {
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
    e.currentTarget.style.color = '#FFFFFF'
    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'
  }, [])

  return (
    <GlassPanel ref={panelRef} noPadding glow style={panelStyle}>
      <div ref={bgRef} style={{ ...bgStyle, backgroundImage: `url(${heroBg})` }} />
      <div style={overlayLeftStyle} />
      <div style={overlayBottomStyle} />

      <div style={contentContainerStyle}>
        <div style={{ maxWidth: '580px' }}>
          <span ref={subtitleRef} style={subtitleStyle}>
            THE CONTINENTAL SERIES
          </span>

          <h1 style={h1Style}>
            <span ref={addLineRef} style={lineStyle}>Beyond</span>
            <span ref={addLineRef} style={lineStyle}>Luxury.</span>
            <em style={emStyle}>
              <span ref={addLineRef} style={lineStyle}>Beyond</span>
              <span ref={addLineRef} style={lineStyle}>Performance.</span>
            </em>
          </h1>

          <p ref={subheadingRef} style={subheadingStyle}>
            Experience the pinnacle of automotive craftsmanship and exhilarating power in the new Bentley Continental GT.
          </p>

          <div ref={buttonsRef} style={btnContainerStyle}>
            <a
              href="#"
              onMouseDown={handleButtonDown}
              style={primaryBtnStyle}
              onMouseEnter={handlePrimaryEnter}
              onMouseLeave={handlePrimaryLeave}
            >
              EXPLORE MODELS
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href="#"
              onMouseDown={handleButtonDown}
              style={secondaryBtnStyle}
              onMouseEnter={handleSecondaryEnter}
              onMouseLeave={handleSecondaryLeave}
            >
              BUILD YOUR BENTLEY
            </a>
          </div>
        </div>

        <div ref={statsRef} style={statsContainerStyle}>
          {STATS.map((stat) => (
            <div key={stat.label} style={{ textAlign: 'right', opacity: 0 }}>
              <span style={statLabelStyle}>{stat.label}</span>
              <span style={statValueStyle}>{stat.value}</span>
              <span style={statUnitStyle}>{stat.unit}</span>
            </div>
          ))}
        </div>
      </div>

      <div ref={scrollRef} style={scrollContainerStyle}>
        <div style={scrollBarStyle} />
        <span style={scrollTextStyle}>SCROLL</span>
      </div>
    </GlassPanel>
  )
}
