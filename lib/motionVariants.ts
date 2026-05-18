export const mainEase = [0.16, 1, 0.3, 1] as const
export const wipeEase = [0.76, 0, 0.24, 1] as const

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: mainEase } },
}

export const fadeSmall = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: mainEase } },
}

export const maskReveal = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.9, ease: mainEase } },
}

export const lineReveal = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.65, ease: mainEase } },
}

export const cardReveal = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: mainEase } },
}

export const iconReveal = {
  hidden: { opacity: 0, scale: 0.75, rotate: -6 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5, ease: mainEase } },
}

export const imageReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)', scale: 1.06 },
  visible: { clipPath: 'inset(0 0% 0 0)', scale: 1, transition: { duration: 1, ease: wipeEase } },
}

export const verticalImageReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)', scale: 1.06 },
  visible: { clipPath: 'inset(0 0 0% 0)', scale: 1, transition: { duration: 1, ease: wipeEase } },
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}
