import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, Menu, MoveRight, X } from 'lucide-react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from 'framer-motion'
import './styles.css'

const A = '/assets/indikicks'

const assets = {
  logo: `${A}/logo/indikicks-mark-black.png`,
  side: `${A}/shoes/indikicks-side-view.png`,
  opposite: `${A}/shoes/indikicks-opposite-side-view.png`,
  top: `${A}/shoes/indikicks-top-view.png`,
  heel: `${A}/shoes/indikicks-heel-view.png`,
  logoClose: `${A}/shoes/indikicks-logo-closeup.png`,
  sole: `${A}/shoes/indikicks-rubber-sole-closeup.png`,
  canvas: `${A}/shoes/indikicks-shoe-canvas-texture.png`,
  baggy: `${A}/lifestyle/indikicks-baggy.png`,
  shoebox: `${A}/packaging/indikicks-shoebox.png`,
  card: `${A}/packaging/indikicks-card.png`,
  tissue: `${A}/packaging/indikicks-tissue.png`
}

const ease = [0.22, 1, 0.36, 1]
const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.68, ease } }
}
const imageReveal = {
  hidden: { opacity: 0, scale: 1.02 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease } }
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}

const navLinks = [
  ['Story', 'story'],
  ['Positioning', 'positioning'],
  ['Logo', 'logo'],
  ['Colors', 'colors'],
  ['Craft', 'craft'],
  ['Packaging', 'packaging'],
  ['Voice', 'voice'],
  ['Community', 'community'],
  ['Blueprint', 'blueprint']
]

function SmartImage({ src, alt, className = '', fit = 'object-cover', loading = 'lazy' }) {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onError={(event) => {
        event.currentTarget.hidden = true
        event.currentTarget.parentElement?.classList.add('missing-image')
        event.currentTarget.parentElement?.style.setProperty('--missing-path', `"${src}"`)
      }}
      className={`h-full w-full ${fit} ${className}`}
    />
  )
}

function Section({ id, eyebrow, title, intro, dark = false, children, className = '' }) {
  return (
    <section
      id={id}
      className={`section-shell ${dark ? 'bg-indikicks-black text-indikicks-cloud' : 'bg-indikicks-cloud text-indikicks-black'} ${className}`}
    >
      <div className="deck-container">
        {(eyebrow || title || intro) && (
          <motion.header
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.32 }}
            className="section-heading"
          >
            {eyebrow && <motion.p variants={reveal} className="eyebrow">{eyebrow}</motion.p>}
            {title && <motion.h2 variants={reveal} className="section-title">{title}</motion.h2>}
            {intro && <motion.p variants={reveal} className="section-intro">{intro}</motion.p>}
          </motion.header>
        )}
        {children}
      </div>
    </section>
  )
}

function Button({ href, children, tone = 'primary', dark = false }) {
  const className = dark
    ? tone === 'primary' ? 'button-dark-primary' : 'button-dark-secondary'
    : tone === 'primary' ? 'button-primary' : 'button-secondary'
  return <a href={href} className={className}>{children}</a>
}

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-indikicks-black/10 bg-indikicks-cloud/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <a href="#hero" className="flex items-center gap-3 focus-link" aria-label="Indikicks home">
          <img src={assets.logo} alt="" className="h-6 w-12 object-contain" />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Indikicks</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map(([label, href]) => (
            <a key={href} href={`#${href}`} className="nav-link">{label}</a>
          ))}
        </nav>
        <button
          className="grid h-11 w-11 place-items-center border border-indikicks-black/15 transition duration-300 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indikicks-teal lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid max-h-[calc(100svh-4rem)] gap-1 overflow-y-auto border-t border-indikicks-black/10 bg-indikicks-cloud px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          {navLinks.map(([label, href]) => (
            <a key={href} href={`#${href}`} className="mobile-nav-link" onClick={() => setOpen(false)}>{label}</a>
          ))}
        </motion.nav>
      )}
    </header>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 95, damping: 28 })
  return <motion.div className="fixed left-0 top-0 z-[70] h-0.5 origin-left bg-indikicks-saffron" style={{ scaleX }} />
}

function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-indikicks-cloud text-indikicks-black">
      <motion.img
        src={assets.side}
        alt="Indikicks canvas sneaker side view"
        className="pointer-events-none absolute left-1/2 bottom-0 z-0 hidden h-[52svh] w-[118vw] -translate-x-1/2 select-none object-contain object-bottom md:inset-0 md:block md:h-full md:w-full md:translate-x-0 md:object-cover md:object-center"
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-indikicks-cloud via-indikicks-cloud/80 to-indikicks-cloud/10 md:bg-gradient-to-r md:from-indikicks-cloud/80 md:via-indikicks-cloud/35 md:to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1320px] flex-col justify-center px-6 py-24 md:px-12 md:py-0">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[650px]">
          <motion.p variants={reveal} className="eyebrow text-indikicks-black/70">INDIKICKS / BRAND IDENTITY</motion.p>
          <motion.h1 variants={reveal} className="hero-title">Own Your Walk.</motion.h1>
          <motion.p variants={reveal} className="mt-7 max-w-[620px] text-base leading-7 text-indikicks-concrete/75 sm:text-lg sm:leading-8">
            Sneakers for a generation that moves with identity, confidence, and self-expression.
          </motion.p>
          <motion.p variants={reveal} className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-indikicks-teal">
            Born in India. Built for the streets ahead.
          </motion.p>
          <motion.div variants={reveal} className="mt-9 flex w-full max-w-[320px] flex-col gap-3 min-[520px]:max-w-none min-[520px]:flex-row">
            <Button href="#tension">Explore Identity <ArrowRight size={16} /></Button>
            <Button href="#logo" tone="secondary">View Logo System</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function BrandTensionSection() {
  const cards = [
    ['Global brands gave us aspiration.', 'But not our identity.'],
    ['Local brands gave us access.', 'But not enough culture.'],
    ['Indikicks gives young India', 'a walk of its own.']
  ]

  return (
    <Section id="tension" eyebrow="01 / Brand Tension" title="The gap was never just product. It was ownership.">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.22 }} className="mobile-snap-row md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {cards.map(([line, close], index) => (
          <motion.article variants={reveal} whileHover={{ y: -4 }} key={line} className="quiet-card snap-card md:min-w-0">
            <div className="mb-16 flex items-center justify-between">
              <MoveRight className="h-5 w-5 text-indikicks-saffron" />
              <span className="caption text-indikicks-concrete/45">0{index + 1}</span>
            </div>
            <h3 className="card-title">{line}</h3>
            <p className="mt-3 text-[17px] leading-7 text-indikicks-concrete/70">{close}</p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}

function BrandStorySection() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [18, -18])

  return (
    <Section id="story" eyebrow="02 / Brand Story" title="Modern Indian Motion">
      <div ref={ref} className="grid items-center gap-14 lg:grid-cols-[0.86fr_1.14fr]">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.34 }} className="max-w-[620px]">
          {[
            'Indikicks was created for a generation that does not want to simply wear products. It wants to wear identity.',
            'Young India is no longer waiting for global culture to define its taste. It is walking through campuses, streets, studios, metros, and digital spaces with its own rhythm.',
            'Indikicks turns that movement into footwear: clean, expressive, accessible sneakers built for people who walk differently because they think differently.'
          ].map((copy) => <motion.p variants={reveal} key={copy} className="body-copy mb-5">{copy}</motion.p>)}
        </motion.div>
        <motion.figure style={{ y: imageY }} variants={imageReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="image-frame min-h-[360px] lg:min-h-[640px]">
          <SmartImage src={assets.heel} alt="Heel view of Indikicks sneakers with rear branding" fit="object-contain" className="p-4 sm:p-8" />
        </motion.figure>
      </div>
    </Section>
  )
}

function PositioningSection() {
  const lines = ['Accessible street-premium sneakers', 'for young India’s self-expression.']

  return (
    <Section id="positioning" dark className="relative">
      <img src={assets.logo} alt="" aria-hidden className="pointer-events-none absolute right-[-6rem] top-16 h-80 w-80 object-contain opacity-[0.04] sm:right-10 sm:h-[32rem] sm:w-[32rem]" />
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.46 }} className="max-w-5xl py-4">
        <motion.div variants={reveal} className="mb-10 h-px w-24 bg-indikicks-saffron" />
        <motion.p variants={reveal} className="eyebrow text-indikicks-saffron opacity-100">03 / Positioning</motion.p>
        <blockquote className="max-w-5xl text-[36px] font-bold leading-[1.08] tracking-normal text-indikicks-cloud sm:text-[52px] lg:text-[68px]">
          {lines.map((line) => <motion.span variants={reveal} className="block" key={line}>{line}</motion.span>)}
        </blockquote>
        <motion.p variants={reveal} className="mt-9 max-w-[660px] text-base leading-8 text-indikicks-cloud/70 sm:text-lg">
          Not performance-first. Not hype-only. Not fake luxury. A culture-first sneaker label built around identity, movement, and confidence.
        </motion.p>
      </motion.div>
    </Section>
  )
}

function LogoSystemSection() {
  const rules = ['One mark.', 'No extra lines.', 'No decorative additions.', 'No unnecessary effects.', 'Built into the product, not pasted on top.']

  return (
    <Section id="logo" className="bg-indikicks-cloud">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.42 }} className="mx-auto grid min-h-[62vh] max-w-5xl place-items-center text-center">
        <motion.img
          variants={{ hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1, transition: { duration: 0.92, ease } } }}
          src={assets.logo}
          alt="Indikicks Forward Mark logo symbol"
          className="h-24 w-60 object-contain sm:h-36 sm:w-[25rem]"
        />
        <motion.div variants={reveal} className="mt-12">
          <p className="eyebrow text-indikicks-teal opacity-100">04 / Logo System</p>
          <h2 className="section-title mx-auto">The Forward Mark</h2>
          <p className="section-intro mx-auto">A single directional symbol for movement, ambition, and self-expression.</p>
        </motion.div>
        <motion.div variants={stagger} className="mt-10 grid w-full gap-3 sm:grid-cols-5">
          {rules.map((rule) => (
            <motion.div variants={reveal} key={rule} className="border border-indikicks-black/10 bg-indikicks-white px-4 py-5 text-sm leading-6 text-indikicks-concrete/75">
              {rule}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  )
}

function ColorSystemSection() {
  const groups = [
    ['Foundation', [
      ['Jet Black', '#000000', 'Primary contrast'],
      ['Cloud White', '#F5F5F2', 'Main brand field'],
      ['Pure White', '#FFFFFF', 'Product focus']
    ]],
    ['Urban Neutrality', [
      ['Concrete Grey', '#2E2E2E', 'Urban depth'],
      ['Stone', '#CFCAC2', 'Material warmth'],
      ['Ash Grey', '#A8A8A8', 'Quiet dividers']
    ]],
    ['Controlled Energy', [
      ['Deep Teal', '#285C4D', 'Strategic accent'],
      ['Burnt Saffron', '#C56A2D', 'Warm signal'],
      ['Deep Energy Red', '#8E1F1F', 'Rare emphasis'],
      ['Ice Blue', '#DCEBFF', 'Soft highlight']
    ]]
  ]

  return (
    <Section id="colors" eyebrow="05 / Color System" title="80% restraint. 20% signal.">
      <div className="space-y-10">
        {groups.map(([group, colors]) => (
          <div key={group}>
            <p className="caption mb-4 text-indikicks-teal">{group}</p>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }} className="mobile-snap-row md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-4">
              {colors.map(([name, hex, role]) => {
                const dark = ['#000000', '#2E2E2E', '#285C4D', '#8E1F1F'].includes(hex)
                return (
                  <motion.article
                    variants={reveal}
                    whileHover={{ y: -4, scale: 1.01 }}
                    key={hex}
                    className={`color-swatch snap-card ${dark ? 'text-indikicks-cloud' : 'text-indikicks-black'}`}
                    style={{ backgroundColor: hex }}
                  >
                    <p className="caption opacity-70">{name}</p>
                    <p className="mt-2 font-mono text-xs opacity-60">{hex}</p>
                    <p className="mt-auto max-w-36 text-sm leading-6 opacity-72">{role}</p>
                  </motion.article>
                )
              })}
            </motion.div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function CraftsmanshipSection() {
  const details = [
    ['01', 'Stitched Side Mark', assets.logoClose, 'The logo is integrated into the shoe, not printed.', 'Deep Teal'],
    ['02', 'Canvas Texture', assets.canvas, 'Everyday material elevated through clean construction.', 'Burnt Saffron'],
    ['03', 'Rubber Foxing', assets.sole, 'Classic streetwear utility with bold black striping.', 'Deep Teal'],
    ['04', 'Heel Identity', assets.heel, 'Small details that make the product recognizable from every angle.', 'Burnt Saffron']
  ]

  return (
    <Section id="craft" className="bg-indikicks-white text-indikicks-black" eyebrow="06 / Craftsmanship" title="Built to feel considered.">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.16 }} className="mobile-snap-row lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
        {details.map(([number, title, image, copy, accent]) => (
          <motion.article variants={reveal} key={title} className="craft-card snap-card lg:min-w-0">
            <div className="aspect-[4/5] overflow-hidden bg-indikicks-cloud">
              <SmartImage src={image} alt={`${title} detail of Indikicks sneaker`} className="transition duration-700 hover:scale-[1.025]" />
            </div>
            <div className="p-5">
              <p className={`caption ${accent === 'Deep Teal' ? 'text-indikicks-teal' : 'text-indikicks-saffron'}`}>{number} / {accent}</p>
              <h3 className="mt-5 text-xl font-bold tracking-normal">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-indikicks-concrete/70">{copy}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}

function PackagingSection() {
  const bullets = ['Matte black structure', 'Centered Forward Mark', 'Tonal logo-pattern tissue', '“Own Your Walk” thank-you card', 'QR-linked campaign story', 'Sticker/decal system for community sharing']

  return (
    <Section id="packaging" className="bg-indikicks-white text-indikicks-black" eyebrow="07 / Packaging" title="Not just a box. The first touchpoint of the culture.">
      <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.figure variants={imageReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.24 }} className="image-frame bg-indikicks-cloud p-3 shadow-xl shadow-indikicks-black/10">
          <SmartImage src={assets.shoebox} alt="Indikicks matte black shoebox packaging" className="aspect-[4/3]" />
        </motion.figure>
        <div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.24 }} className="grid gap-4 sm:grid-cols-2">
            <motion.figure variants={reveal} className="image-frame bg-indikicks-cloud p-2">
              <SmartImage src={assets.card} alt="Indikicks Own Your Walk thank-you card" className="aspect-[4/3]" />
            </motion.figure>
            <motion.figure variants={reveal} className="image-frame bg-indikicks-cloud p-2">
              <SmartImage src={assets.tissue} alt="Indikicks tonal logo-pattern tissue paper" className="aspect-[4/3]" />
            </motion.figure>
          </motion.div>
          <motion.ul variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.26 }} className="mt-6 grid gap-3">
            {bullets.map((item) => (
              <motion.li variants={reveal} key={item} className="flex items-center gap-4 border border-indikicks-black/10 bg-indikicks-cloud px-5 py-4 text-sm font-semibold">
                <span className="h-1.5 w-1.5 bg-indikicks-saffron" />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </Section>
  )
}

function BrandVoiceSection() {
  const lines = ['You were never meant to blend in.', 'Same streets. Different walk.', 'Move different. Stay yourself.', 'Culture starts with how you move.', 'Built for those who walk their own way.']
  const principles = ['Speak in movement.', 'Keep lines short.', 'Confidence, not hype.', 'Indian without overexplaining India.', 'Emotional, not motivational.']

  return (
    <Section id="voice" dark eyebrow="08 / Brand Voice" title="Own Your Walk.">
      <div className="grid gap-10 lg:grid-cols-[0.36fr_0.64fr]">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.24 }} className="space-y-3">
          <motion.figure variants={reveal} className="image-frame border-indikicks-cloud/10 bg-indikicks-concrete p-2">
            <SmartImage src={assets.card} alt="Indikicks campaign card with Own Your Walk message" className="aspect-[4/3]" />
          </motion.figure>
          {principles.map((principle) => <motion.p variants={reveal} key={principle} className="border-b border-indikicks-cloud/10 pb-4 text-sm leading-6 text-indikicks-cloud/70">{principle}</motion.p>)}
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mobile-snap-row lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-0">
          {lines.map((line, index) => (
            <motion.article variants={reveal} whileHover={{ y: -4, scale: 1.01 }} key={line} className="poster-card snap-card lg:min-w-0">
              <span className="caption text-indikicks-saffron">0{index + 1}</span>
              <p className="mt-12 font-display text-[26px] font-bold leading-tight tracking-normal sm:text-[34px]">{line}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

function CommunitySection() {
  const cards = [
    ['First Walk Club', 'Early customers from the first drop.'],
    ['Campus Walks', 'College ambassador-led styling and movement moments.'],
    ['City Routes', 'Photo walks through Indian streets, metro stations, campuses, and creative districts.'],
    ['Walk Stories', 'Short reels asking real people: “What does owning your walk mean to you?”'],
    ['Custom Lace Days', 'Offline customization pop-ups and community styling events.']
  ]

  return (
    <Section id="community" eyebrow="09 / Community / Culture" title="From customers to culture." intro="The brand does not grow through hype alone. It grows through people who make the sneaker part of their own walk.">
      <div className="grid gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <motion.figure variants={imageReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="image-frame min-h-[440px] bg-indikicks-white lg:min-h-[680px]">
          <SmartImage src={assets.baggy} alt="Indikicks sneakers styled with baggy jeans in an editorial streetwear crop" />
        </motion.figure>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }} className="mobile-snap-row sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0">
          {cards.map(([title, copy], index) => (
            <motion.article variants={reveal} key={title} className="quiet-card snap-card sm:min-w-0">
              <div className="flex items-center justify-between">
                <span className="caption text-indikicks-teal">0{index + 1}</span>
                <MoveRight className="h-4 w-4 text-indikicks-saffron" />
              </div>
              <h3 className="mt-12 text-xl font-bold tracking-normal">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-indikicks-concrete/70">{copy}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

function LaunchDropSection() {
  const points = ['1 focused hero model', '4 color variants', 'First customer identity card', 'Launch sticker', 'QR campaign story', 'Early supporter access']

  return (
    <Section id="launch" dark eyebrow="10 / Launch Drop" title="The First Walk Drop" intro="The first 2,000 pairs are not just inventory. They are the beginning of the Indikicks community.">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.figure variants={imageReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.24 }} className="image-frame border-indikicks-cloud/10 bg-indikicks-cloud p-4">
          <SmartImage src={assets.top} alt="Top view of the first Indikicks sneaker drop pair" fit="object-contain" className="aspect-[4/3]" />
        </motion.figure>
        <div>
          <motion.figure variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.24 }} className="mb-6 hidden border border-indikicks-cloud/10 bg-indikicks-concrete p-3 sm:block">
            <SmartImage src={assets.opposite} alt="Opposite side view of Indikicks canvas sneaker" fit="object-contain" className="aspect-[16/10]" />
          </motion.figure>
          <motion.ul variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.24 }} className="grid gap-px overflow-hidden border border-indikicks-cloud/10 bg-indikicks-cloud/10">
            {points.map((point, index) => (
              <motion.li variants={reveal} key={point} className="flex min-h-16 items-center justify-between bg-indikicks-black px-5 text-sm font-semibold text-indikicks-cloud/75">
                {point}
                <span className="caption text-indikicks-saffron">0{index + 1}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </Section>
  )
}

function BrandBlueprintSection() {
  const tiles = [
    ['Brand idea', 'Own Your Walk.'],
    ['Category', 'Accessible street-premium sneakers.'],
    ['Audience', 'Young expressive India.'],
    ['Emotion', 'Self-expression with self-possession.'],
    ['Visual world', 'Cinematic streetwear minimalism.'],
    ['Signature asset', 'Stitched Forward Mark.'],
    ['Community idea', 'First Walk Club.']
  ]

  return (
    <Section id="blueprint" dark eyebrow="11 / Final Brand Blueprint" title="The complete identity, reduced to what matters.">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid gap-px overflow-hidden border border-indikicks-cloud/10 bg-indikicks-cloud/10 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map(([label, value]) => (
          <motion.article variants={reveal} key={label} className="min-h-[190px] bg-indikicks-concrete p-6">
            <p className="caption text-indikicks-cloud/50">{label}</p>
            <p className="mt-11 max-w-sm text-xl font-bold leading-tight tracking-normal text-indikicks-cloud">{value}</p>
          </motion.article>
        ))}
      </motion.div>
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.36 }} className="mt-6 grid min-h-[420px] place-items-center border border-indikicks-cloud/10 bg-indikicks-black text-center">
        <div>
          <motion.img variants={{ hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease } } }} src={assets.logo} alt="Indikicks Forward Mark" className="mx-auto h-16 w-40 object-contain" />
          <motion.p variants={reveal} className="mx-auto mt-10 max-w-3xl text-[32px] font-bold leading-tight tracking-normal text-indikicks-cloud sm:text-[48px]">You do not need to look elsewhere to move forward.</motion.p>
        </div>
      </motion.div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="bg-indikicks-black px-5 py-10 text-indikicks-cloud sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-8 border-t border-indikicks-cloud/10 pt-8 md:flex-row md:items-center md:justify-between">
        <a href="#hero" className="group flex items-center gap-4 focus-link">
          <img src={assets.logo} alt="" className="h-8 w-16 object-contain transition-transform duration-500 group-hover:translate-x-1" />
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em]">Indikicks</p>
            <p className="mt-1 text-sm text-indikicks-cloud/70">Built here. Moving everywhere.</p>
          </div>
        </a>
        <nav className="flex max-w-3xl flex-wrap gap-x-5 gap-y-3 text-sm text-indikicks-cloud/70" aria-label="Footer">
          {navLinks.map(([label, href]) => (
            <a key={href} className="transition duration-300 hover:text-indikicks-saffron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indikicks-saffron" href={`#${href}`}>{label}</a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection />
        <BrandTensionSection />
        <BrandStorySection />
        <PositioningSection />
        <LogoSystemSection />
        <ColorSystemSection />
        <CraftsmanshipSection />
        <PackagingSection />
        <BrandVoiceSection />
        <CommunitySection />
        <LaunchDropSection />
        <BrandBlueprintSection />
      </main>
      <Footer />
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
