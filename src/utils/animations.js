import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function panelReveal(element, { delay = 0, y = 60, scale = 0.96, duration = 1, start = 'top 85%' } = {}) {
  if (!element) return null
  const tween = gsap.fromTo(
    element,
    { y, opacity: 0, scale },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start,
        once: true,
      },
    }
  )
  return tween
}

export function staggerChildren(container, selector, {
  y = 40,
  x = 0,
  scale = 1,
  opacity = 0,
  duration = 0.7,
  stagger = 0.15,
  start = 'top 80%',
  delay = 0,
} = {}) {
  if (!container) return null
  const children = container.querySelectorAll(selector)
  if (!children?.length) return null
  const tween = gsap.fromTo(
    children,
    { y, x, scale, opacity },
    {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start,
        once: true,
      },
    }
  )
  return tween
}

export function parallaxElement(element, { yPercent = -15, start = 'top bottom', end = 'bottom top' } = {}) {
  if (!element) return null
  const tween = gsap.to(element, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: 1.5,
    },
  })
  return tween
}

export function floatingLoop(element, { y = 8, duration = 3, rotation = 1.5 } = {}) {
  if (!element) return null
  const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } })
  tl.to(element, { y, rotation, duration })
  return tl
}

export function buttonPress(element) {
  if (!element) return
  gsap.to(element, {
    scale: 0.95,
    duration: 0.1,
    ease: 'power2.in',
    onComplete: () => {
      gsap.to(element, { scale: 1, duration: 0.2, ease: 'back.out(2)' })
    },
  })
}

export function splitTextReveal(container, { duration = 1, stagger = 0.04, y = 30, delay = 0 } = {}) {
  if (!container) return null

  const text = container.textContent
  container.textContent = ''
  container.style.opacity = '1'

  const words = text.split(' ')
  words.forEach((word, wi) => {
    const wordSpan = document.createElement('span')
    wordSpan.style.display = 'inline-block'
    wordSpan.style.whiteSpace = 'nowrap'

    ;[...word].forEach((char) => {
      const charSpan = document.createElement('span')
      charSpan.textContent = char
      charSpan.style.display = 'inline-block'
      charSpan.style.opacity = '0'
      charSpan.style.transform = `translateY(${y}px)`
      charSpan.classList.add('split-char')
      wordSpan.appendChild(charSpan)
    })

    container.appendChild(wordSpan)
    if (wi < words.length - 1) {
      const space = document.createElement('span')
      space.innerHTML = '&nbsp;'
      space.style.display = 'inline-block'
      container.appendChild(space)
    }
  })

  const chars = container.querySelectorAll('.split-char')
  return gsap.to(chars, {
    opacity: 1,
    y: 0,
    duration,
    stagger,
    delay,
    ease: 'power3.out',
  })
}

/**
 * Extracts the ScrollTrigger instance from a GSAP tween, if it has one.
 */
export function getScrollTrigger(tween) {
  if (!tween) return null
  return tween.scrollTrigger || null
}

/**
 * Kills an array of tweens/timelines and their associated ScrollTriggers.
 */
export function killAnimations(animations) {
  if (!animations) return
  const list = Array.isArray(animations) ? animations : [animations]
  list.forEach((anim) => {
    if (!anim) return
    if (anim.scrollTrigger) anim.scrollTrigger.kill()
    anim.kill()
  })
}
