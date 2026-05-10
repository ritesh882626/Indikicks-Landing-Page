'use client'

import { motion } from 'framer-motion'
import { maskReveal, staggerContainer } from '../lib/motionVariants'

export default function AnimatedText({
  lines,
  className = '',
  as: Tag = 'div'
}: {
  lines: string[]
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'div'
}) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
      <Tag className={className}>
        {lines.map((line) => (
          <span key={line} className="block overflow-hidden">
            <motion.span variants={maskReveal} className="block">
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  )
}
