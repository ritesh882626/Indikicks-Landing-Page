'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../lib/motionVariants'
import AnimatedText from './AnimatedText'
import SectionLabel from './SectionLabel'
import AnimatedRule from './AnimatedRule'

const storyParagraphs = [
  'INDIKICKS was created because Indian youth culture had evolved beyond traditional sportswear and generic fashion. Sneakers were no longer just footwear. They had become symbols of identity, confidence, creativity, ambition, and self-expression.',
  'For years, sneaker culture in India looked outward for inspiration. But the streets here had their own rhythm, their own energy, and their own stories. INDIKICKS exists to bridge that gap, creating sneakers and streetwear that reflect who we are, where we are from, and where we are going.',
  'This is not about fitting into global culture. This is about adding our own voice to it.'
]

const beliefs = ['Move with purpose.', 'Not to fit in.', 'But to stand apart.', 'You do not need permission to be yourself.']

export default function BrandStorySection() {
  return (
    <section
      id="story"
      aria-label="Brand story"
      className="relative overflow-hidden bg-indikicks-cloud text-indikicks-black paper"
    >
      <motion.div
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-indikicks-ice"
      />
      <div className="site-container section-pad">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="border-y border-black/12 py-10 lg:py-16"
        >
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4 lg:pr-10">
              <SectionLabel number="02" label="Brand Story" />
              <AnimatedText lines={['Born in the gap.', 'Built for our generation.']} as="h2" className="display-title" />
              <p className="small-label mt-8 inline-flex border-l-2 border-indikicks-saffron pl-3 text-indikicks-saffron">Culture gap / India 2024</p>
            </div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="border-black/12 lg:col-span-5 lg:border-x lg:px-10">
              <motion.h3 variants={fadeUp} className="font-display text-2xl font-black uppercase leading-tight sm:text-3xl">
                A brand born from the gap between global sneaker culture and authentic Indian youth identity.
              </motion.h3>
              <div className="mt-7 grid gap-5">
                {storyParagraphs.map((paragraph) => (
                  <motion.p variants={fadeUp} key={paragraph} className="text-base leading-8 text-black/70 sm:text-lg">
                    {paragraph}
                  </motion.p>
                ))}
              </div>
              <AnimatedRule className="mt-8 w-28 bg-indikicks-ice" />
            </motion.div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="grid gap-3 lg:col-span-3">
              {beliefs.map((phrase, index) => (
                <motion.article variants={fadeUp} key={phrase} className="border border-black/12 bg-white/70 p-5">
                  <span className="small-label text-black/35">0{index + 1}</span>
                  <p className="mt-8 font-display text-xl font-black uppercase leading-tight">{phrase}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
