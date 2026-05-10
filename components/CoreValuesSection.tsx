'use client'

import { motion } from 'framer-motion'
import { BadgeCheck, Brush, Footprints, Globe2, Sparkles, Target, type LucideIcon } from 'lucide-react'
import SectionLabel from './SectionLabel'
import AnimatedText from './AnimatedText'
import ValueCard from './ValueCard'
import { fadeUp, staggerContainer } from '../lib/motionVariants'

const values: Array<[string, string, string, string, LucideIcon]> = [
  ['01', 'Individuality', 'Own your story.', '#C7E6F6', Sparkles],
  ['02', 'Self-Expression', 'Wear what reflects who you are.', '#E5851F', Brush],
  ['03', 'Confidence', 'Walk with intent, not validation.', '#D7262E', Target],
  ['04', 'Movement', 'Built for progress, energy, and everyday motion.', '#C7E6F6', Footprints],
  ['05', 'Authenticity', 'Real over imitation.', '#E5851F', BadgeCheck],
  ['06', 'Culture', 'Rooted in India. Global in spirit.', '#D7262E', Globe2]
]

export default function CoreValuesSection() {
  return (
    <section id="core" aria-label="Core values" className="bg-indikicks-cloud text-indikicks-black">
      <div className="site-container section-pad">
        <div className="grid gap-12 lg:grid-cols-12">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="lg:col-span-4">
            <SectionLabel number="04" label="Core Values" />
            <AnimatedText lines={['The beliefs that shape every stitch, design, and decision.']} as="h2" className="font-display text-[clamp(1.75rem,7vw,2.75rem)] font-black uppercase leading-[0.98] tracking-normal lg:text-[clamp(2rem,4.5vw,4.25rem)]" />
            <motion.p variants={fadeUp} className="body-copy mt-7">These values define how we move, create, and connect with our community.</motion.p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="grid gap-4 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {values.map(([number, title, text, accent, Icon]) => <ValueCard key={title as string} number={number as string} title={title as string} text={text as string} accent={accent as string} Icon={Icon} />)}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
