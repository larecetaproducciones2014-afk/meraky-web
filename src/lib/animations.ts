import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export const initSmoothScroll = () => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export const fadeUpAnimation = (element: string | Element, delay = 0) =>
  gsap.fromTo(
    element,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element as Element,
        start: 'top 85%',
        once: true,
      },
    }
  )

export const fadeInAnimation = (element: string | Element, delay = 0) =>
  gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.8,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element as Element,
        start: 'top 90%',
        once: true,
      },
    }
  )

export const splitTextAnimation = (element: string | Element) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element
  if (!el) return

  const text = el.textContent || ''
  el.innerHTML = text
    .split('')
    .map((char) =>
      char === ' '
        ? '<span style="display:inline-block">&nbsp;</span>'
        : `<span style="display:inline-block">${char}</span>`
    )
    .join('')

  return gsap.fromTo(
    el.querySelectorAll('span'),
    { y: 80, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.04,
      ease: 'power3.out',
    }
  )
}

export const countUpAnimation = (element: Element, target: number, duration = 2) => {
  const obj = { value: 0 }
  return gsap.to(obj, {
    value: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toLocaleString('es-MX')
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      once: true,
    },
  })
}
