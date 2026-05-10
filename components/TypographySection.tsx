'use client'

import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import AnimatedText from './AnimatedText'
import { fadeUp, staggerContainer } from '../lib/motionVariants'

const weights = ['Black', 'Extra Bold', 'Bold', 'Medium', 'Regular']

export default function TypographySection() {
  return (
    <section id="type" aria-label="Typography system" className="bg-white text-indikicks-black">
      <div className="site-container section-pad">
        <SectionLabel number="03" label="Typography System" />
        <div className="grid gap-5 lg:grid-cols-12">
          <motion.article variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -2 }} className="border border-black/12 p-5 lg:col-span-3">
            <motion.p initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="font-display text-8xl font-black">Aa</motion.p>
            <h3 className="mt-8 font-display text-3xl font-black uppercase">Montserrat</h3>
            <p className="small-label mt-2 text-black/45">Display / Headlines</p>
            <motion.ul variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 grid gap-2">
              {weights.map((weight) => <motion.li variants={fadeUp} key={weight} className="text-sm text-black/68">{weight}</motion.li>)}
            </motion.ul>
          </motion.article>
          <article className="border border-black/12 p-5 lg:col-span-6">
            <AnimatedText lines={['IDENTITY IN MOTION.', 'CULTURE FIRST.', 'MOVE DIFFERENT.']} as="h2" className="font-display text-[clamp(2.7rem,8vw,5.7rem)] font-black uppercase leading-[0.88]" />
            <div className="mt-8 grid gap-3">
              <span className="h-px w-28 bg-indikicks-ice" />
              <span className="h-px w-20 bg-indikicks-saffron" />
              <span className="h-px w-16 bg-indikicks-red" />
            </div>
          </article>
          <motion.article variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -2 }} className="border border-black/12 p-5 lg:col-span-3">
            <h3 className="font-display text-3xl font-black uppercase">Inter</h3>
            <p className="small-label mt-2 text-black/45">Body / UI Copy</p>
            <div className="mt-10 grid gap-5">
              <p className="text-base">Body / 16px / Own Your Walk.</p>
              <p className="text-sm font-semibold">Small / 14px / Culture-first systems.</p>
              <p className="text-xs uppercase tracking-[0.18em]">Caption / 12px / EST. 2024</p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
