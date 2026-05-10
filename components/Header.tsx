'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { assets, navLinks } from '../lib/constants'
import MobileMenu from './MobileMenu'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${scrolled ? 'border-b border-white/10 bg-indikicks-black/80 text-white backdrop-blur-xl' : 'text-white'}`}>
        <div className="site-container flex h-16 items-center justify-between lg:h-20">
          <motion.a
            href="#hero"
            aria-label="INDIKICKS home"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="focus-ring flex items-center gap-3"
          >
            <Image src={assets.markWhite} alt="" width={48} height={24} className="h-6 w-12 object-contain" priority />
            <span className="small-label">INDIKICKS</span>
          </motion.a>
          <motion.nav
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } }, hidden: {} }}
            aria-label="Primary navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {navLinks.map((item) => (
              <motion.a
                variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                key={item.href}
                href={item.href}
                className="focus-ring group relative px-3 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/72 transition hover:text-white"
              >
                {item.label}
                <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-indikicks-ice transition duration-300 group-hover:scale-x-100" />
              </motion.a>
            ))}
          </motion.nav>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="focus-ring grid h-11 w-11 place-items-center border border-white/20 lg:hidden"
          >
            <motion.span initial={{ width: 0 }} animate={{ width: 20 }} transition={{ duration: 0.45 }} className="relative block h-3">
              <span className="absolute left-0 top-0 h-px w-full bg-white" />
              <span className="absolute bottom-0 left-0 h-px w-full bg-white" />
            </motion.span>
            <Menu className="sr-only" />
          </button>
        </div>
      </header>
      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  )
}
