'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cardReveal, staggerContainer } from '../lib/motionVariants'

export default function ColorCard({ name, hex, text }: { name: string; hex: string; text: string }) {
  const [copied, setCopied] = useState(false)
  const dark = hex === '#0A0A0A' || hex === '#D7262E'

  const copy = async () => {
    await navigator.clipboard?.writeText(hex)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1100)
  }

  return (
    <motion.button
      type="button"
      onClick={copy}
      variants={cardReveal}
      whileHover={{ y: -6 }}
      className="min-h-[280px] min-w-[74vw] snap-start border border-white/14 p-4 text-left shadow-dark transition sm:min-w-[300px] lg:min-w-0"
      style={{ background: hex, color: dark ? '#F5F5F5' : '#0A0A0A' }}
    >
      <motion.span variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="flex h-full flex-col justify-between">
        <span className="small-label opacity-70">{copied ? 'Copied' : 'Tap to copy'}</span>
        <span>
          <span className="block font-display text-2xl font-black uppercase">{name}</span>
          <span className="mt-2 block font-mono text-sm">{hex}</span>
          <span className="mt-5 block text-sm leading-6 opacity-72">{text}</span>
        </span>
      </motion.span>
    </motion.button>
  )
}
