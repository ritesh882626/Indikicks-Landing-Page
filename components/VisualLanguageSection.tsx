'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'
import SectionLabel from './SectionLabel'
import PosterCard from './PosterCard'
import { fadeUp, staggerContainer } from '../lib/motionVariants'

const posters = [
  ['OWN YOUR WALK.', '#C7E6F6'],
  ['IDENTITY IN MOTION.', '#E5851F'],
  ['CULTURE FIRST.', '#D7262E'],
  ['MOVE DIFFERENT.', '#C7E6F6'],
  ['NOT MADE TO FIT IN.', '#E5851F']
]

export default function VisualLanguageSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const handleScroll = () => {
    const node = ref.current
    if (!node) return
    const card = node.querySelector<HTMLElement>('[data-poster-card]')
    if (!card) return
    const step = card.offsetWidth + 16
    setActive(Math.min(posters.length - 1, Math.max(0, Math.round(node.scrollLeft / step))))
  }

  return (
    <section id="visual" aria-label="Visual language" className="bg-indikicks-cloud text-indikicks-black paper">
      <div className="site-container section-pad">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }} className="mb-12 max-w-3xl">
          <SectionLabel number="06" label="Visual Language" />
          <motion.h2 variants={fadeUp} className="display-title">Raw. Real. Relentless.</motion.h2>
          <motion.p variants={fadeUp} className="body-copy mt-6">High contrast. Bold typography. Movement in every frame.</motion.p>
        </motion.div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-indikicks-cloud to-transparent lg:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-indikicks-cloud to-transparent lg:block" />
          <div className="mb-4 hidden justify-end gap-2 text-black/45 lg:flex" aria-hidden>
            <ArrowLeft size={18} strokeWidth={1.4} />
            <ArrowRight size={18} strokeWidth={1.4} />
          </div>
          <motion.div
            ref={ref}
            onScroll={handleScroll}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-5 px-5 pb-3 sm:-mx-8 sm:scroll-pl-8 sm:px-8 lg:mx-0 lg:px-0"
          >
            {posters.map(([title, accent], index) => <PosterCard key={title} title={title} accent={accent} index={`0${index + 1}`} active={active === index} />)}
          </motion.div>
          <div className="mt-6 flex justify-center gap-2" aria-label="Visual language carousel position">
            {posters.map(([title], index) => (
              <button
                key={title}
                type="button"
                aria-label={`Go to visual language card ${index + 1}`}
                onClick={() => {
                  const node = ref.current
                  const card = node?.querySelector<HTMLElement>('[data-poster-card]')
                  if (!node || !card) return
                  node.scrollTo({ left: index * (card.offsetWidth + 16), behavior: 'smooth' })
                }}
                className={`h-2 transition-all ${active === index ? 'w-7 bg-indikicks-ice' : 'w-2 bg-black/25'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
