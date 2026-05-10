'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { cardReveal, iconReveal } from '../lib/motionVariants'

export default function ValueCard({ number, title, text, accent, Icon }: { number: string; title: string; text: string; accent: string; Icon: LucideIcon }) {
  return (
    <motion.article
      variants={cardReveal}
      whileHover={{ y: -4, borderColor: accent }}
      className="group relative min-h-[210px] border border-black/12 bg-white p-5 transition duration-300 sm:p-6"
    >
      <div className="flex items-start justify-between">
        <motion.span variants={iconReveal} className="grid h-10 w-10 place-items-center border border-black/15" style={{ color: accent }}>
          <Icon size={18} strokeWidth={1.45} />
        </motion.span>
        <span className="small-label text-black/38">{number}</span>
      </div>
      <h3 className="mt-10 font-display text-[0.95rem] font-black uppercase leading-tight tracking-[0.03em] transition sm:text-[1.08rem]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-black/62">{text}</p>
      <span className="absolute inset-x-5 bottom-5 h-px origin-left bg-current transition duration-300 group-hover:scale-x-110" style={{ color: accent }} />
    </motion.article>
  )
}
