'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { navLinks } from '../lib/constants'
import { staggerContainer, fadeUp } from '../lib/motionVariants'

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] overflow-y-auto bg-indikicks-black text-indikicks-cloud lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="site-container flex h-16 items-center justify-between">
        <span className="small-label">INDIKICKS™</span>
        <button type="button" onClick={onClose} aria-label="Close menu" className="focus-ring grid h-11 w-11 place-items-center border border-white/20">
          <X size={20} />
        </button>
      </div>
      <motion.nav variants={staggerContainer} initial="hidden" animate="visible" className="site-container mt-10 grid gap-3 pb-36">
        {navLinks.map((item) => (
          <motion.a
            variants={fadeUp}
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="focus-ring border-b border-white/12 py-4 font-display text-4xl font-black uppercase leading-none"
          >
            {item.label}
          </motion.a>
        ))}
      </motion.nav>
      <div className="site-container absolute inset-x-0 bottom-8">
        <p className="small-label text-indikicks-saffron">Own Your Walk.</p>
        <p className="mt-3 text-sm text-white/60">This is INDIKICKS.</p>
      </div>
    </motion.div>
  )
}
