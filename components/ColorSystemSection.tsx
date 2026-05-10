'use client'

import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import ColorCard from './ColorCard'
import { colors } from '../lib/constants'
import { fadeUp, staggerContainer } from '../lib/motionVariants'

export default function ColorSystemSection() {
  return (
    <motion.section id="color" aria-label="Color system" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.8 }} className="grain relative bg-indikicks-black text-indikicks-cloud">
      <div className="site-container section-pad">
        <div className="grid gap-10 lg:grid-cols-12">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="lg:col-span-4">
            <SectionLabel number="05" label="Color System" dark />
            <motion.h2 variants={fadeUp} className="display-title">A bold, confident palette for identity and energy.</motion.h2>
            <motion.p variants={fadeUp} className="body-copy mt-7 text-white/66">Jet Black and Cloud White lead. Ice Blue, Burnt Saffron, and Deep Energy Red appear as precision accents.</motion.p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="snap-row lg:col-span-8 lg:grid-cols-5">
            {colors.map((color) => <ColorCard key={color.hex} {...color} />)}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
