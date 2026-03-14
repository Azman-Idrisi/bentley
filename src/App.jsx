import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import HeroStage from './components/HeroStage'
import ModelInfoSection from './components/ModelInfoSection'
import MullinerSection from './components/MullinerSection'
import SpecificationSelector from './components/SpecificationSelector'
import CustomizationSection from './components/CustomizationSection'
import TestimonialsSection from './components/TestimonialsSection'
import Footer from './components/Footer'
import GlassPanel from './components/GlassPanel'

gsap.registerPlugin(ScrollTrigger)

const ORB_STYLES = [
  {
    position: 'absolute',
    top: '10%',
    left: '8%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(30,215,96,0.05) 0%, transparent 70%)',
    filter: 'blur(80px)',
    willChange: 'transform',
  },
  {
    position: 'absolute',
    top: '40%',
    right: '3%',
    width: '650px',
    height: '650px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(30,215,96,0.035) 0%, transparent 70%)',
    filter: 'blur(100px)',
    willChange: 'transform',
  },
  {
    position: 'absolute',
    bottom: '15%',
    left: '25%',
    width: '450px',
    height: '450px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(30,215,96,0.04) 0%, transparent 70%)',
    filter: 'blur(80px)',
    willChange: 'transform',
  },
]

const orbsContainerStyle = { position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }
const contentContainerStyle = {
  position: 'relative',
  zIndex: 1,
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '16px 24px 40px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}
const glassPanelStyle = { height: 'calc(100vh - 80px)', minHeight: '600px' }

function App() {
  const orbsRef = useRef(null)
  const [loading, setLoading] = useState(true)

  const handleLoaderComplete = useCallback(() => {
    setLoading(false)
    ScrollTrigger.refresh()
  }, [])

  useEffect(() => {
    if (!orbsRef.current) return

    const tweens = []
    const orbs = orbsRef.current.querySelectorAll('.glow-orb')
    orbs.forEach((orb, i) => {
      tweens.push(
        gsap.to(orb, {
          yPercent: -30 - i * 10,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2 + i * 0.5,
          },
        })
      )

      tweens.push(
        gsap.to(orb, {
          scale: 1.2,
          opacity: 0.7,
          repeat: -1,
          yoyo: true,
          duration: 6 + i * 2,
          ease: 'sine.inOut',
        })
      )
    })

    return () => {
      tweens.forEach((t) => {
        if (t.scrollTrigger) t.scrollTrigger.kill()
        t.kill()
      })
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {loading && <Loader onComplete={handleLoaderComplete} />}
      <div ref={orbsRef} style={orbsContainerStyle}>
        {ORB_STYLES.map((style, i) => (
          <div key={i} className="glow-orb" style={style} />
        ))}
      </div>

      <div style={contentContainerStyle}>
        <Navbar />
        <HeroSection />

        <GlassPanel noPadding glow style={glassPanelStyle}>
          <HeroStage />
          <ModelInfoSection />
        </GlassPanel>

        <MullinerSection />
        <SpecificationSelector />
        <CustomizationSection />
        <TestimonialsSection />
        <Footer />
      </div>
    </div>
  )
}

export default App
