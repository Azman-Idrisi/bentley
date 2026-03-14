import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const FONT = '"JetBrains Mono", monospace'
const TEXT_COLOR = 'rgba(255,255,255,0.9)'
const TEXT_STYLE = {
  fontFamily: FONT,
  fontSize: '12px',
  letterSpacing: '0.15em',
  color: TEXT_COLOR,
  textTransform: 'uppercase',
  lineHeight: 1,
}

export default function Loader({ onComplete }) {
  const containerRef = useRef(null)
  const topPanelRef = useRef(null)
  const bottomPanelRef = useRef(null)
  const percentRef = useRef(null)
  const lineLeftRef = useRef(null)
  const lineRightRef = useRef(null)
  const labelsRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onComplete?.()
      },
    })

    const labels = labelsRef.current?.querySelectorAll('.loader-label')
    if (labels?.length) {
      tl.fromTo(
        labels,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        0
      )
    }

    tl.fromTo(
      percentRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
      0.3
    )

    const counter = { value: 0 }
    tl.to(
      counter,
      {
        value: 100,
        duration: 2.5,
        ease: 'power2.out',
        onUpdate: () => {
          const v = counter.value / 100
          if (percentRef.current) {
            percentRef.current.textContent = Math.floor(counter.value) + '%'
          }
          if (lineLeftRef.current) {
            lineLeftRef.current.style.transform = `scaleX(${v})`
          }
          if (lineRightRef.current) {
            lineRightRef.current.style.transform = `scaleX(${v})`
          }
        },
      },
      0.5
    )

    // Fade out percentage text and labels
    tl.to(percentRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.25,
      ease: 'power2.in',
    }, '+=0.2')

    if (labels?.length) {
      tl.to(labels, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      }, '<')
    }

    // Door open — panels slide away, lines split apart with them
    const doorLabel = 'doors'

    tl.addLabel(doorLabel, '+=0.1')

    tl.to(
      topPanelRef.current,
      { yPercent: -100, duration: 1.2, ease: 'power4.inOut' },
      doorLabel
    )
    tl.to(
      bottomPanelRef.current,
      { yPercent: 100, duration: 1.2, ease: 'power4.inOut' },
      doorLabel
    )

    // Left line goes up with the top panel
    tl.to(
      lineLeftRef.current,
      { y: '-50vh', duration: 1.2, ease: 'power4.inOut' },
      doorLabel
    )
    // Right line goes down with the bottom panel
    tl.to(
      lineRightRef.current,
      { y: '50vh', duration: 1.2, ease: 'power4.inOut' },
      doorLabel
    )

    tl.to(
      containerRef.current,
      { opacity: 0, duration: 0.3, ease: 'power2.out' },
      '-=0.3'
    )

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label="Loading website"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      {/* Top panel */}
      <div
        ref={topPanelRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50vh',
          backgroundColor: '#000',
          willChange: 'transform',
        }}
      />

      {/* Bottom panel */}
      <div
        ref={bottomPanelRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50vh',
          backgroundColor: '#000',
          willChange: 'transform',
        }}
      />

      {/* Corner labels */}
      <div
        ref={labelsRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <span
          className="loader-label"
          style={{ ...TEXT_STYLE, position: 'absolute', top: '32px', left: '40px', opacity: 0 }}
        >
          Crewe, England
        </span>
        <span
          className="loader-label"
          style={{ ...TEXT_STYLE, position: 'absolute', top: '32px', right: '40px', opacity: 0 }}
        >
          Bentley Motors
        </span>
        <span
          className="loader-label"
          style={{ ...TEXT_STYLE, position: 'absolute', bottom: '32px', left: '40px', opacity: 0 }}
        >
          W12 Engine
        </span>
        <span
          className="loader-label"
          style={{ ...TEXT_STYLE, position: 'absolute', bottom: '32px', right: '40px', opacity: 0 }}
        >
          Max Speed 333 Km/H
        </span>
      </div>

      {/* Left line — grows from center toward left edge, then splits upward */}
      <div
        ref={lineLeftRef}
        style={{
          position: 'absolute',
          top: '50%',
          right: '50%',
          left: 0,
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          transformOrigin: 'right center',
          transform: 'scaleX(0)',
          willChange: 'transform',
        }}
      />

      {/* Right line — grows from center toward right edge, then splits downward */}
      <div
        ref={lineRightRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          right: 0,
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          willChange: 'transform',
        }}
      />

      {/* Percentage counter */}
      <span
        ref={percentRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: FONT,
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '0.15em',
          color: TEXT_COLOR,
          opacity: 0,
          willChange: 'transform, opacity',
          zIndex: 1,
          padding: '0 12px',
          backgroundColor: '#000',
        }}
      >
        0%
      </span>
    </div>
  )
}
