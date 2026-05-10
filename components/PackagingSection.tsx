'use client'

import { motion } from 'framer-motion'
import { Badge, Box, Landmark, Leaf } from 'lucide-react'
import { assets } from '../lib/constants'
import SectionLabel from './SectionLabel'
import ImageReveal from './ImageReveal'
import { fadeUp, staggerContainer } from '../lib/motionVariants'

const details = [
  [Badge, 'Premium Materials', 'Thoughtfully sourced. Built to last.'],
  [Box, 'Minimal & Iconic', 'Clean design. Instant recognition.'],
  [Landmark, 'Authentic Indian Made', 'Designed in India. Crafted with pride.'],
  [Leaf, 'Sustainable Approach', 'Better for people. Better for planet.']
]

export default function PackagingSection() {
  return (
    <section id="packaging" aria-label="Packaging and details" className="grain relative bg-indikicks-black text-indikicks-cloud">
      <div className="site-container section-pad">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionLabel number="07" label="Packaging & Details" dark />
            <h2 className="display-title">Every touchpoint carries the culture.</h2>
            <p className="body-copy mt-6 text-white/68">Every detail. Every touchpoint. Made to represent the culture.</p>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} className="mt-10 grid gap-4">
              {details.map(([Icon, title, text]) => (
                <motion.div variants={fadeUp} key={title as string} className="flex gap-4 border-t border-white/12 pt-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-white/18 text-indikicks-saffron">
                    <Icon size={17} />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-black uppercase">{title as string}</span>
                    <span className="mt-1 block text-sm leading-6 text-white/58">{text as string}</span>
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="grid gap-4 lg:col-span-7 lg:grid-cols-5">
            <ImageReveal src={assets.packagingBox} alt="INDIKICKS black and white shoe boxes with burnt saffron label system" className="group aspect-[16/10] border border-white/12 lg:col-span-5" sizes="(max-width: 1024px) 90vw, 55vw" vertical />
            <ImageReveal src={assets.shoppingBag} alt="INDIKICKS shopping bag carried in an urban setting" className="group aspect-[16/10] border border-white/12 lg:col-span-3" sizes="(max-width: 1024px) 90vw, 34vw" />
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-2 border border-white/12 bg-white p-5 text-indikicks-black">
              <p className="small-label text-black/45">Product Spec</p>
              <h3 className="mt-8 font-display text-3xl font-black uppercase leading-none">INDIKICKS V1</h3>
              <div className="mt-8 grid gap-2 text-xs uppercase tracking-[0.14em]">
                <span>Core Edition</span>
                <span>Made in India</span>
                <span>Batch 2024-OWW</span>
                <span className="mt-3 h-10 bg-[repeating-linear-gradient(90deg,#0A0A0A_0_2px,transparent_2px_5px,#0A0A0A_5px_8px,transparent_8px_12px)]" aria-hidden />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
