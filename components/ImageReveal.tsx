'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { mainEase } from '../lib/motionVariants'

export default function ImageReveal({
  src,
  alt,
  className = '',
  sizes = '(max-width: 768px) 90vw, 50vw',
  vertical = false,
  priority = false
}: {
  src: string
  alt: string
  className?: string
  sizes?: string
  vertical?: boolean
  priority?: boolean
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: vertical ? 24 : 16, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, ease: mainEase }}
      className={`relative overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized
        className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
      />
    </motion.figure>
  )
}
