'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { assets, navLinks } from '../lib/constants'
import AnimatedText from './AnimatedText'
import SectionLabel from './SectionLabel'
import { fadeUp, staggerContainer } from '../lib/motionVariants'

export default function FooterSection() {
  return (
    <motion.footer id="contact" aria-label="Closing footer" initial={{ opacity: 0.85 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="grain relative bg-indikicks-black text-indikicks-cloud">
      <div className="site-container section-pad text-center">
        <SectionLabel number="10" label="Closing" dark />
        <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mx-auto mb-10 flex justify-center">
          <Image src={assets.markWhite} alt="INDIKICKS mark" width={96} height={48} className="h-12 w-24 object-contain" />
        </motion.div>
        <AnimatedText lines={['OWN YOUR WALK.']} as="h2" className="font-display text-[clamp(3.2rem,14vw,10rem)] font-black uppercase leading-[0.82]" />
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/70">
          Crafted in Movement. Driven by Culture. Built in India.
        </motion.p>
        <motion.a variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} href="https://indikicks.com" className="focus-ring group mx-auto mt-10 inline-flex min-h-12 items-center gap-3 text-xs font-black uppercase tracking-[0.16em] text-indikicks-ice">
          <ArrowRight size={18} className="transition group-hover:translate-x-1" />
          INDIKICKS.COM
        </motion.a>
        <motion.nav variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} aria-label="Footer navigation" className="mt-16 flex flex-wrap justify-center gap-x-5 gap-y-3">
          {navLinks.map((link) => (
            <motion.a variants={fadeUp} key={link.href} href={link.href} className="focus-ring text-xs font-bold uppercase tracking-[0.16em] text-white/55 transition hover:text-white">
              {link.label}
            </motion.a>
          ))}
        </motion.nav>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/12 pt-6 text-xs uppercase tracking-[0.16em] text-white/42 sm:flex-row">
          <span>© INDIKICKS 2024. All rights reserved.</span>
          <span>Culture First. Movement Always.</span>
        </div>
      </div>
    </motion.footer>
  )
}
