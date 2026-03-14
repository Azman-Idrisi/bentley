import { useRef, useEffect, useState, memo, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Icon from './Icon'
import logoPng from '../assets/logo.png'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = ['Models', 'Configure', 'Ownership', 'Mulliner', 'Experience']

const NavLink = memo(function NavLink({ label, index }) {
  const underlineRef = useRef(null)
  const linkRef = useRef(null)
  const glowRef = useRef(null)

  const handleEnter = () => {
    gsap.to(linkRef.current, { color: '#1ED760', duration: 0.25, ease: 'power2.out' })
    gsap.to(underlineRef.current, { scaleX: 1, opacity: 1, duration: 0.35, ease: 'power3.out' })
    gsap.to(glowRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
  }

  const handleLeave = () => {
    gsap.to(linkRef.current, { color: 'rgba(255,255,255,0.55)', duration: 0.3, ease: 'power2.out' })
    gsap.to(underlineRef.current, { scaleX: 0, opacity: 0, duration: 0.25, ease: 'power2.in' })
    gsap.to(glowRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' })
  }

  return (
    <li
      className="nav-link-item"
      style={{ position: 'relative', opacity: 0 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <a
        ref={linkRef}
        href="#"
        style={{
          fontSize: '12.5px',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
          textDecoration: 'none',
          textTransform: 'uppercase',
          letterSpacing: '0.13em',
          fontFamily: '"Inter", sans-serif',
          padding: '6px 2px',
          display: 'block',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </a>
      {/* Underline bar */}
      <span
        ref={underlineRef}
        style={{
          position: 'absolute',
          bottom: '0px',
          left: 0,
          right: 0,
          height: '1.5px',
          backgroundColor: '#1ED760',
          borderRadius: '1px',
          transform: 'scaleX(0)',
          opacity: 0,
          transformOrigin: 'left',
          boxShadow: '0 0 10px rgba(30,215,96,0.5)',
        }}
      />
      {/* Soft glow behind text on hover */}
      <span
        ref={glowRef}
        style={{
          position: 'absolute',
          inset: '-4px -8px',
          borderRadius: '8px',
          background: 'radial-gradient(ellipse, rgba(30,215,96,0.06) 0%, transparent 70%)',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
    </li>
  )
})

const NavIconButton = memo(function NavIconButton({ children, onClick, ariaLabel }) {
  const btnRef = useRef(null)

  const handleEnter = () => {
    gsap.to(btnRef.current, {
      color: '#1ED760',
      scale: 1.18,
      filter: 'drop-shadow(0 0 8px rgba(30,215,96,0.4))',
      duration: 0.3,
      ease: 'back.out(2)',
    })
  }

  const handleLeave = () => {
    gsap.to(btnRef.current, {
      color: 'rgba(255,255,255,0.45)',
      scale: 1,
      filter: 'none',
      duration: 0.25,
      ease: 'power2.out',
    })
  }

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-label={ariaLabel}
      style={{
        background: 'transparent',
        border: 'none',
        color: 'rgba(255,255,255,0.45)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px',
        borderRadius: '8px',
        willChange: 'transform',
      }}
    >
      {children}
    </button>
  )
})

export default function Navbar() {
  const navRef = useRef(null)
  const innerRef = useRef(null)
  const logoRef = useRef(null)
  const logoIconRef = useRef(null)
  const logoTextRef = useRef(null)
  const iconsRef = useRef(null)
  const hamburgerRef = useRef(null)
  const dropdownRef = useRef(null)
  const menuTlRef = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const masterTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    masterTl.fromTo(
      nav,
      { y: -40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1 }
    )

    masterTl.fromTo(
      logoIconRef.current,
      { rotation: -180, scale: 0, opacity: 0 },
      { rotation: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)' },
      '-=0.5'
    )

    masterTl.fromTo(
      logoTextRef.current,
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5 },
      '-=0.4'
    )

    const linkItems = nav.querySelectorAll('.nav-link-item')
    if (linkItems.length) {
      masterTl.fromTo(
        linkItems,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: 'power2.out' },
        '-=0.3'
      )
    }

    if (iconsRef.current) {
      masterTl.fromTo(
        iconsRef.current,
        { x: 15, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4 },
        '-=0.2'
      )
    }

    masterTl.fromTo(
      nav,
      { borderColor: 'rgba(30, 215, 96, 0.06)' },
      { borderColor: 'rgba(30, 215, 96, 0.18)', duration: 0.6, ease: 'power2.in' },
      '-=0.1'
    )
    masterTl.to(
      nav,
      { borderColor: 'rgba(30, 215, 96, 0.06)', duration: 1.2, ease: 'power2.out' }
    )

    let lastScrolled = false
    const scrollSt = ScrollTrigger.create({
      start: 'top -60',
      onUpdate: (self) => {
        const scrolled = self.progress > 0
        if (scrolled === lastScrolled) return
        lastScrolled = scrolled

        gsap.to(nav, {
          backgroundColor: scrolled ? 'rgba(8, 18, 12, 0.8)' : 'rgba(10, 22, 15, 0.55)',
          borderColor: scrolled ? 'rgba(30, 215, 96, 0.1)' : 'rgba(30, 215, 96, 0.06)',
          boxShadow: scrolled
            ? '0 4px 32px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(255,255,255,0.04) inset, 0 1px 0 rgba(255,255,255,0.05) inset, 0 0 40px rgba(30,215,96,0.03)'
            : '0 2px 24px rgba(0,0,0,0.35), 0 0 0 0.5px rgba(255,255,255,0.03) inset, 0 1px 0 rgba(255,255,255,0.04) inset, 0 0 60px rgba(30,215,96,0.02)',
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
        })
        gsap.to(innerRef.current, {
          paddingTop: scrolled ? 0 : 4,
          paddingBottom: scrolled ? 0 : 4,
          duration: 0.4,
          ease: 'power2.inOut',
          overwrite: 'auto',
        })
      },
    })

    return () => {
      masterTl.kill()
      if (scrollSt) scrollSt.kill()
    }
  }, [])

  // Animate mobile menu open/close
  useEffect(() => {
    const dropdown = dropdownRef.current
    const hamburger = hamburgerRef.current
    const nav = navRef.current
    if (!dropdown || !hamburger) return

    if (menuTlRef.current) {
      menuTlRef.current.kill()
    }

    const links = dropdown.querySelectorAll('.mobile-link')
    const divider = dropdown.querySelector('.mobile-divider')

    if (mobileOpen) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      menuTlRef.current = tl

      // Hamburger icon rotates in
      tl.fromTo(
        hamburger,
        { rotation: 0, scale: 1 },
        { rotation: 90, scale: 1.1, duration: 0.35, ease: 'back.out(1.7)' },
        0
      )

      // Navbar pill expands border radius to accommodate dropdown
      tl.to(
        nav,
        { borderRadius: '28px', duration: 0.4, ease: 'power2.inOut' },
        0
      )

      tl.fromTo(
        dropdown,
        { maxHeight: 0, opacity: 0 },
        { maxHeight: 400, opacity: 1, duration: 0.45, ease: 'power3.out' },
        0.05
      )

      // Divider line fades in
      if (divider) {
        tl.fromTo(
          divider,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.35, ease: 'power2.out' },
          0.1
        )
      }

      // Links stagger in from below with fade
      if (links.length) {
        tl.fromTo(
          links,
          { y: 18, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.35, stagger: 0.06, ease: 'power2.out' },
          0.15
        )
      }
    } else {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.in' },
        onComplete: () => {
          gsap.set(dropdown, { maxHeight: 0, opacity: 0 })
        },
      })
      menuTlRef.current = tl

      // Hamburger rotates back
      tl.to(
        hamburger,
        { rotation: 0, scale: 1, duration: 0.3, ease: 'power2.out' },
        0
      )

      // Navbar pill restores pill shape
      tl.to(
        nav,
        { borderRadius: '100px', duration: 0.4, ease: 'power2.inOut' },
        0
      )

      // Links fade out quickly
      if (links.length) {
        tl.to(
          links,
          { y: -10, opacity: 0, duration: 0.2, stagger: 0.03 },
          0
        )
      }

      tl.to(
        dropdown,
        { maxHeight: 0, opacity: 0, duration: 0.3 },
        0.1
      )
    }

    return () => {
      if (menuTlRef.current) menuTlRef.current.kill()
    }
  }, [mobileOpen])

  return (
    <nav
      ref={navRef}
      style={{
        opacity: 0,
        position: 'sticky',
        top: '12px',
        zIndex: 100,
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
        borderRadius: '100px',
        backgroundColor: 'rgba(10, 22, 15, 0.55)',
        backdropFilter: 'blur(32px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(32px) saturate(1.4)',
        border: '1px solid rgba(30, 215, 96, 0.06)',
        boxShadow:
          '0 2px 24px rgba(0,0,0,0.35),' +
          '0 0 0 0.5px rgba(255,255,255,0.03) inset,' +
          '0 1px 0 rgba(255,255,255,0.04) inset,' +
          '0 0 60px rgba(30,215,96,0.02)',
        overflow: 'hidden',
      }}
    >
      <div
        ref={innerRef}
        style={{
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 36px',
        }}
      >
        {/* Logo */}
        <a
          ref={logoRef}
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            flexShrink: 0,
            minWidth: '120px',
          }}
        >
          <span ref={logoIconRef} style={{ display: 'inline-flex', opacity: 0 }}>
            <img src={logoPng} alt="Bentley logo" style={{ height: '60px', width: 'auto' }} />
          </span>
          <span
            ref={logoTextRef}
            style={{
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              fontFamily: '"Inter", sans-serif',
              lineHeight: 1,
              opacity: 0,
            }}
          >
            BENTLEY
          </span>
        </a>

        {/* Center nav links */}
        <ul
          className="hidden lg:flex"
          style={{
            listStyle: 'none',
            alignItems: 'center',
            gap: '40px',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <NavLink key={link} label={link} index={i} />
          ))}
        </ul>

        {/* Right icons */}
        <div
          ref={iconsRef}
          className="hidden lg:flex"
          style={{
            alignItems: 'center',
            gap: '4px',
            flexShrink: 0,
            minWidth: '120px',
            justifyContent: 'flex-end',
            opacity: 0,
          }}
        >
          <NavIconButton ariaLabel="Search">
            <Icon name="search" size={17} />
          </NavIconButton>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          className="lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.7)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
            willChange: 'transform',
          }}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <Icon name={mobileOpen ? 'close' : 'menu'} size={22} />
        </button>
      </div>

      {/* Mobile dropdown — always rendered, animated via GSAP */}
      <div
        ref={dropdownRef}
        id="mobile-menu"
        className="lg:hidden"
        style={{
          maxHeight: 0,
          opacity: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0px',
        }}
      >
        {/* Animated divider */}
        <div
          className="mobile-divider"
          style={{
            width: 'calc(100% - 48px)',
            height: '1px',
            backgroundColor: 'rgba(30, 215, 96, 0.08)',
            margin: '0 auto',
            transformOrigin: 'center',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '18px 0 24px',
            gap: '16px',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="mobile-link"
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.13em',
                fontFamily: '"Inter", sans-serif',
                padding: '6px 16px',
                borderRadius: '8px',
                willChange: 'transform, opacity',
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  color: '#1ED760',
                  backgroundColor: 'rgba(30,215,96,0.06)',
                  scale: 1.04,
                  duration: 0.25,
                  ease: 'power2.out',
                })
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  color: 'rgba(255,255,255,0.55)',
                  backgroundColor: 'transparent',
                  scale: 1,
                  duration: 0.25,
                  ease: 'power2.out',
                })
              }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
