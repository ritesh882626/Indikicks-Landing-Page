'use client'

import { motion } from 'framer-motion'
import { lineReveal } from '../lib/motionVariants'

export default function AnimatedRule({ className = '' }: { className?: string }) {
  return (
    <motion.span
      variants={lineReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className={`block h-px origin-left ${className}`}
    />
  )
}
