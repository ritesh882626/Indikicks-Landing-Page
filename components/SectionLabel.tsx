'use client'

import { motion } from 'framer-motion'
import { fadeSmall } from '../lib/motionVariants'
import AnimatedRule from './AnimatedRule'

export default function SectionLabel({ number, label, dark = false }: { number: string; label: string; dark?: boolean }) {
  return (
    <motion.div
      variants={fadeSmall}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="mb-8 flex items-center gap-4"
    >
      <span className={`eyebrow ${dark ? 'text-indikicks-ice' : 'text-indikicks-black/50'}`}>{number}</span>
      <AnimatedRule className={`w-12 ${dark ? 'bg-indikicks-cloud/30' : 'bg-indikicks-black/25'}`} />
      <span className={`eyebrow ${dark ? 'text-indikicks-cloud/70' : 'text-indikicks-black/55'}`}>{label}</span>
    </motion.div>
  )
}
