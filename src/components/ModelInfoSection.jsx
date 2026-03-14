import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import Pagination from './Pagination'

const MODEL_DETAILS = [
  { label: 'ENGINE', value: '6.0L W12 TSI' },
  { label: '0-60 MPH', value: '3.5 SECONDS' },
]

export default function ModelInfoSection() {
  const sectionRef = useRef(null)
  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full z-50"
      style={{
        padding: '20px 40px',
        opacity: 0,
        borderTop: '1px solid rgba(30,215,96,0.06)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(to top, rgba(6,13,8,0.6), transparent)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="flex items-center justify-between gap-8 max-lg:flex-col max-lg:items-start max-lg:gap-6">
        <div className="flex flex-col">
          <span
            className="text-[20px] font-medium text-[#1ED760]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            $245,000
          </span>
          <h2
            className="text-[24px] max-sm:text-[18px] font-bold text-white"
            style={{ fontFamily: '"Playfair Display", serif', marginTop: '4px' }}
          >
            Continental GT
          </h2>
          <div className="flex flex-col" style={{ marginTop: '8px', gap: '3px' }}>
            {MODEL_DETAILS.map((detail) => (
              <span
                key={detail.label}
                className="text-[12px] uppercase"
                style={{
                  letterSpacing: '0.08em',
                  fontFamily: 'Inter, sans-serif',
                  color: 'rgba(182,194,183,0.6)',
                }}
              >
                {detail.label}: {detail.value}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center max-lg:self-end max-sm:self-center" style={{ gap: '16px' }}>
          <Pagination />
        </div>
      </div>
    </section>
  )
}
