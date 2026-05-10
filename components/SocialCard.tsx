'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import ImageReveal from './ImageReveal'
import { cardReveal } from '../lib/motionVariants'

export default function SocialCard({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <motion.article variants={cardReveal} whileHover={{ y: -6 }} className="group min-w-[76vw] snap-center overflow-hidden border border-white/12 bg-white/5 sm:min-w-[340px] lg:min-w-0">
      <ImageReveal src={src} alt={alt} className="aspect-square" sizes="(max-width: 768px) 80vw, 24vw" vertical />
      <div className="flex items-center justify-between p-4">
        <div>
          <p className="small-label text-white/50">@indikicks_official</p>
          <p className="mt-2 text-sm text-white/82">{caption}</p>
        </div>
        <span className="grid h-10 w-10 place-items-center border border-white/20 text-white/60 opacity-70 transition group-hover:opacity-100">
          <Play size={16} />
        </span>
      </div>
    </motion.article>
  )
}
