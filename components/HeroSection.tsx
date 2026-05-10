'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Plus } from 'lucide-react'
import AnimatedText from './AnimatedText'
import SectionLabel from './SectionLabel'
import { fadeUp, staggerContainer } from '../lib/motionVariants'

export default function HeroSection() {
  return (
    <section id="hero" aria-label="Hero introduction" className="grain relative min-h-[100svh] overflow-hidden bg-indikicks-black text-indikicks-cloud">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} transition={{ duration: 1.2 }} className="absolute inset-0 paper" />
      <div className="site-container relative flex min-h-[100svh] flex-col justify-center pt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel number="01" label="19.0760° N / 72.8777° E / INDIA" dark />
            <motion.div initial={{ scale: 1.015 }} animate={{ scale: 1 }} transition={{ duration: 1.2, delay: 0.9 }}>
              <AnimatedText lines={['OWN', 'YOUR', 'WALK.']} as="h1" className="font-display text-[clamp(4rem,18vw,11rem)] font-black uppercase leading-[0.78] tracking-normal" />
            </motion.div>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-4 lg:pb-5">
            <motion.p variants={fadeUp} className="body-copy max-w-md text-white/72">
              INDIKICKS is more than sneakers. We are a movement born in India, built for those who move with purpose and stand apart.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-6 text-xl font-semibold leading-snug text-white">You do not need permission to be yourself.</motion.p>
            <motion.a variants={fadeUp} href="#story" className="focus-ring group mt-10 inline-flex min-h-12 items-center gap-3 text-xs font-black uppercase tracking-[0.12em] text-indikicks-ice">
              <ArrowRight size={18} className="-translate-x-2 transition group-hover:translate-x-0" />
              This is INDIKICKS.
              <span className="absolute mt-8 h-px w-32 origin-left scale-x-0 bg-indikicks-saffron transition duration-300 group-hover:scale-x-100" />
            </motion.a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.8, rotate: -8 }} animate={{ opacity: 0.6, scale: 1, rotate: 0 }} transition={{ delay: 1, duration: 0.6 }} className="absolute bottom-8 right-5 hidden text-white/40 sm:block">
          <Plus size={28} />
        </motion.div>
      </div>
    </section>
  )
}
