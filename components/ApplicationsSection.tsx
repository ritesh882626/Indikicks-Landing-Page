'use client'

import { motion } from 'framer-motion'
import { PanelsTopLeft } from 'lucide-react'
import { assets } from '../lib/constants'
import SectionLabel from './SectionLabel'
import ImageReveal from './ImageReveal'
import { fadeUp, staggerContainer } from '../lib/motionVariants'

const applications = [
  [assets.billboard, 'Own Your Walk billboard in the city', 'Own Your Walk Billboard'],
  [assets.metroBillboard, 'INDIKICKS metro station campaign panels', 'Transit Takeover'],
  [assets.metroInside, 'INDIKICKS metro inside hoarding poster', 'Metro Station Ads'],
  [assets.shoppingBag, 'INDIKICKS shopping bag street application', 'Street Applications']
]

export default function ApplicationsSection() {
  return (
    <section id="applications" aria-label="Street applications and outdoor presence" className="bg-indikicks-cloud text-indikicks-black">
      <div className="site-container section-pad">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mb-12 max-w-3xl">
          <SectionLabel number="08" label="Street Applications" />
          <motion.h2 variants={fadeUp} className="display-title">From streets to screens.</motion.h2>
          <motion.p variants={fadeUp} className="body-copy mt-6">Our identity lives everywhere movement happens.</motion.p>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="snap-row lg:grid-cols-2">
          {applications.map(([src, alt, caption]) => (
            <motion.article variants={fadeUp} key={caption} className="group min-w-[86vw] snap-start sm:min-w-[560px] lg:min-w-0">
              <ImageReveal src={src} alt={alt} className="aspect-[16/10] border border-black/12 bg-white" sizes="(max-width: 1024px) 88vw, 42vw" />
              <div className="mt-4 flex items-center justify-between">
                <p className="small-label inline-flex items-center gap-2"><PanelsTopLeft size={16} strokeWidth={1.4} />{caption}</p>
                <span className="h-px w-10 bg-indikicks-ice" />
              </div>
            </motion.article>
          ))}
        </motion.div>
        <div className="mt-6 flex justify-center gap-2 lg:hidden" aria-hidden>
          {applications.map(([caption], index) => <span key={`${caption}-${index}`} className={`h-2 ${index === 0 ? 'w-6 bg-indikicks-ice' : 'w-2 bg-black/18'}`} />)}
        </div>
      </div>
    </section>
  )
}
