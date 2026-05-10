'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { cardReveal } from '../lib/motionVariants'

export default function PosterCard({ title, accent, index, active = false }: { title: string; accent: string; index: string; active?: boolean }) {
  const lines = title.split(' ')
  return (
    <motion.article
      data-poster-card
      variants={cardReveal}
      animate={{ scale: active ? 1 : 0.96 }}
      whileHover={{ y: -5 }}
      className="group relative min-h-[360px] min-w-[82vw] snap-center overflow-hidden border border-white/12 bg-indikicks-concrete p-5 text-white sm:min-w-[430px] lg:min-w-[440px]"
    >
      <div className="absolute inset-0 opacity-[0.08] paper transition duration-300 group-hover:scale-[1.04]" />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="small-label text-white/55">{index}</span>
          <motion.span initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <Plus size={20} style={{ color: accent }} />
          </motion.span>
        </div>
        <h3 className="font-display text-[clamp(2.35rem,12vw,4.8rem)] font-black uppercase leading-[0.86] tracking-normal transition duration-300 group-hover:-translate-y-1">
          {lines.map((line) => <span className="block" key={line}>{line}</span>)}
        </h3>
        <span className="h-px w-16 origin-left bg-current transition duration-300 group-hover:w-28" style={{ color: accent }} />
      </div>
    </motion.article>
  )
}
