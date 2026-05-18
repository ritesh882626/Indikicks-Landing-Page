type Gsap = typeof import('gsap').gsap

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function fadeUp(gsap: Gsap, target: Parameters<Gsap['fromTo']>[0], delay = 0) {
  return gsap.fromTo(
    target,
    { autoAlpha: 0, y: 34 },
    { autoAlpha: 1, y: 0, delay, duration: 0.9, ease: 'power3.out' },
  )
}

export function splitTextReveal(gsap: Gsap, target: Parameters<Gsap['fromTo']>[0], delay = 0) {
  return gsap.fromTo(
    target,
    { autoAlpha: 0, yPercent: 110 },
    { autoAlpha: 1, yPercent: 0, delay, duration: 1, stagger: 0.08, ease: 'power4.out' },
  )
}

export function imageMaskReveal(gsap: Gsap, target: Parameters<Gsap['fromTo']>[0]) {
  return gsap.fromTo(
    target,
    { clipPath: 'inset(0 100% 0 0)', scale: 1.08 },
    { clipPath: 'inset(0 0% 0 0)', scale: 1, duration: 1.1, ease: 'power4.out' },
  )
}

export function staggerCards(gsap: Gsap, target: Parameters<Gsap['fromTo']>[0]) {
  return gsap.fromTo(
    target,
    { autoAlpha: 0, y: 38 },
    { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
  )
}

export function parallaxImage(gsap: Gsap, target: Parameters<Gsap['to']>[0], amount = 12) {
  return gsap.to(target, {
    yPercent: amount,
    ease: 'none',
    scrollTrigger: {
      trigger: target as Element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

export function gridLineAnimation(gsap: Gsap, target: Parameters<Gsap['fromTo']>[0]) {
  return gsap.fromTo(
    target,
    { scaleX: 0, transformOrigin: 'left center' },
    { scaleX: 1, duration: 1.2, stagger: 0.04, ease: 'power2.out' },
  )
}

export function marqueeLoop(gsap: Gsap, target: Parameters<Gsap['to']>[0]) {
  return gsap.to(target, {
    xPercent: -50,
    duration: 24,
    ease: 'none',
    repeat: -1,
  })
}
