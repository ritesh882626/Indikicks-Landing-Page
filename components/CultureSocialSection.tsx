'use client'

import { motion } from 'framer-motion'
import { assets } from '../lib/constants'
import SectionLabel from './SectionLabel'
import SocialCard from './SocialCard'
import { fadeUp, staggerContainer } from '../lib/motionVariants'

const socials = [
  [assets.singleShoe, 'INDIKICKS single shoe social post', 'Shoe detail post'],
  [assets.socialCombined, 'INDIKICKS combined social post grid', 'Identity in motion'],
  [assets.multiProducts, 'INDIKICKS multiple products social post', 'Culture first poster'],
  [assets.cap, 'INDIKICKS black cap detail', 'Clean product tile']
]

export default function CultureSocialSection() {
  return (
    <section id="culture" aria-label="Culture and social system" className="grain relative bg-indikicks-black text-indikicks-cloud">
      <div className="site-container section-pad">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} className="mb-12 max-w-4xl">
          <SectionLabel number="09" label="Culture / Social" dark />
          <motion.h2 variants={fadeUp} className="display-title">We move together.</motion.h2>
          <motion.p variants={fadeUp} className="body-copy mt-6 text-white/66">We build community. We spotlight real people. We move together.</motion.p>
          <motion.p variants={fadeUp} className="mt-8 inline-block border-b border-indikicks-saffron pb-2 font-display text-4xl font-black uppercase text-indikicks-saffron">#OWNYOURWALK</motion.p>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="snap-row lg:grid-cols-4">
          {socials.map(([src, alt, caption]) => <SocialCard key={caption} src={src} alt={alt} caption={caption} />)}
        </motion.div>
        <div className="mt-6 flex justify-center gap-2 lg:hidden" aria-hidden>
          {socials.map(([caption], index) => <span key={`${caption}-${index}`} className={`h-2 ${index === 0 ? 'w-7 bg-indikicks-ice' : 'w-2 bg-white/25'}`} />)}
        </div>
      </div>
    </section>
  )
}
