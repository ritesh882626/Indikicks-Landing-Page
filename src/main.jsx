import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, CircleDot, Menu, MoveRight, X } from 'lucide-react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from 'framer-motion'
import './styles.css'

const A = '/assets/indikicks'

const assets = {
  logoWhite: `${A}/logo/indikicks-mark-white.png`,
  logoBlack: `${A}/logo/indikicks-mark-black.png`,
  logoSymbol: `${A}/logo/indikicks-symbol-transparent.png`,
  canvasSide: `${A}/shoes/canvas-side-view.png`,
  canvasBack: `${A}/shoes/canvas-back-pair.png`,
  stitch: `${A}/shoes/stiched-logo-closeup.png`,
  shoebox: `${A}/packaging/shoebox-black-premium.png`
}

const ease = [0.22, 1, 0.36, 1]
const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } }
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}

function Section({ id, eyebrow, title, intro, dark = false, children, className = '' }) {
  return (
    <section id={id} className={`section-shell ${dark ? 'bg-jet text-cloud' : 'bg-cloud text-jet'} ${className}`}>
      <div className="deck-container">
        {(eyebrow || title || intro) && (
          <motion.header
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.34 }}
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

function LogoMark({ tone = 'white', className = '' }) {
  return (
    <img
      src={tone === 'black' ? assets.logoBlack : assets.logoWhite}
      alt="Indikicks logo mark"
      className={`object-contain ${className}`}
    />
  )
}

function Image({ src, alt, className = '', fit = 'object-cover' }) {
  return <img src={src} alt={alt} loading="lazy" className={`h-full w-full ${fit} ${className}`} />
}

function IntroScreen() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[90] grid place-items-center bg-jet text-cloud"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transition: { delay: 1.65, duration: 0.75, ease } }}
    >
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="flex flex-col items-center gap-7">
        <LogoMark className="h-14 w-36" />
        <motion.div className="h-px w-64 origin-left bg-cloud" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.8, ease }} />
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-white/70">Forward, From Here.</p>
      </motion.div>
    </motion.div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = [
    ['Story', 'story'],
    ['Positioning', 'positioning'],
    ['Logo', 'logo'],
    ['Colors', 'color'],
    ['Craft', 'craft'],
    ['Packaging', 'packaging'],
    ['Voice', 'voice'],
    ['Community', 'community'],
    ['Blueprint', 'blueprint']
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-cloud/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <a href="#hero" className="flex items-center gap-3 text-jet" aria-label="Indikicks home">
          <LogoMark tone="black" className="h-6 w-14" />
          <span className="text-sm font-black lowercase tracking-tight">indikicks</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={`#${href}`} className="nav-link">{label}</a>
          ))}
        </nav>
        <button className="grid h-11 w-11 place-items-center border border-black/15 transition active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jet md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>
      {open && (
        <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="grid max-h-[calc(100svh-4rem)] gap-1 overflow-y-auto border-t border-black/10 bg-cloud px-5 py-4 md:hidden">
          {links.map(([label, href]) => (
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
  return <motion.div className="fixed left-0 top-0 z-[70] h-0.5 origin-left bg-saffron" style={{ scaleX }} />
}

function CursorSpotlight() {
  const reduce = useReducedMotion()
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)

  useEffect(() => {
    if (reduce) return
    const onMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, x, y])

  if (reduce) return null
  return <motion.div aria-hidden className="cursor-spotlight hidden lg:block" style={{ x, y }} />
}

function HeroSection() {
  const words = ['Forward,', 'From', 'Here.']

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-cloud pt-16 text-black">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.25, ease }}
      >
        <Image src={assets.canvasSide} alt="Indikicks canvas side-view sneaker" fit="object-cover object-[58%_bottom] sm:object-center" />
      </motion.div>
      <div className="absolute inset-0 bg-white/42" />
      <div className="absolute inset-0 bg-gradient-to-r from-cloud/92 via-cloud/60 to-white/14" />
      <div className="absolute inset-0 bg-gradient-to-t from-cloud/28 via-transparent to-cloud/16" />
      <div className="deck-container relative flex min-h-[calc(100svh-4rem)] items-end pb-14 pt-24 sm:items-center sm:py-20 lg:py-24">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[640px] rounded-none bg-cloud/58 backdrop-blur-[1px] sm:bg-transparent sm:backdrop-blur-0">
          <motion.p variants={reveal} className="eyebrow text-black opacity-70">INDIKICKS / BRAND IDENTITY</motion.p>
          <h1 className="hero-title">
            {words.map((word) => (
              <motion.span variants={reveal} className="block" key={word}>{word}</motion.span>
            ))}
          </h1>
          <motion.p variants={reveal} className="mt-7 max-w-[620px] text-[17px] leading-8 text-black/70 sm:text-lg">
            Sneakers for India&apos;s forward generation - clean, confident, and built to move without asking permission.
          </motion.p>
          <motion.div variants={reveal} className="mt-9 flex w-full max-w-[320px] flex-col gap-3 min-[480px]:max-w-none min-[480px]:flex-row">
            <a href="#tension" className="button-primary">Explore the Identity <ArrowRight size={17} /></a>
            <a href="#logo" className="button-secondary">View Logo System</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function BrandTensionSection() {
  const cards = [
    ['Global Status', 'Global brands offer status, but not Indian cultural ownership.'],
    ['Loud Locality', 'Many homegrown brands become too loud or literal.'],
    ['Premium Restraint', 'Indikicks owns a sharper space: modern Indian confidence with control.']
  ]

  return (
    <Section id="tension" eyebrow="01 / Brand Tension" title="A cleaner lane for Indian sneaker culture.">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mobile-snap-row md:grid md:grid-cols-3 md:overflow-visible">
        {cards.map(([title, body], index) => (
          <motion.article variants={reveal} whileHover={{ y: -4 }} key={title} className="quiet-card snap-card md:min-w-0">
            <div className="mb-16 flex items-center justify-between text-black/40">
              <MoveRight className="h-5 w-5 text-saffron" />
              <span className="caption">0{index + 1}</span>
            </div>
            <h3 className="card-title">{title}</h3>
            <p className="mt-4 text-[15px] leading-7 text-black/60">{body}</p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}

function BrandStorySection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [12, -12])

  return (
    <Section
      id="story"
      eyebrow="02 / Brand Story"
      title="Modern Indian Motion"
    >
      <div ref={ref} className="grid items-center gap-14 lg:grid-cols-[0.88fr_1.12fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.75, ease }} className="max-w-[620px]">
          <p className="body-copy">
            Indikicks is built for a generation that does not need to choose between local roots and global ambition. The brand represents movement, self-possession, and the confidence of young India without turning identity into costume.
          </p>
          <div className="mt-10 grid gap-4 border-t border-black/10 pt-8 sm:grid-cols-3">
            {['Movement', 'Self-possession', 'Restraint'].map((item) => (
              <div key={item}>
                <p className="caption text-black/40">Brand cue</p>
                <p className="mt-2 font-bold">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.figure style={{ y: imageY }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.85, ease }} className="image-frame min-h-[360px] lg:min-h-[680px]">
          <Image src={assets.canvasBack} alt="Indikicks heel and back-view sneaker pair" fit="object-contain" className="p-5 sm:p-10" />
        </motion.figure>
      </div>
    </Section>
  )
}

function PositioningSection() {
  const lines = ['Clean, confident sneakers', 'for India’s forward generation.']
  return (
    <Section id="positioning" dark className="bg-jet">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.45 }} className="mx-auto max-w-5xl py-10 text-center">
        <motion.p variants={reveal} className="eyebrow text-saffron opacity-100">03 / Positioning</motion.p>
        <blockquote className="mx-auto max-w-4xl text-[38px] font-black leading-[1.05] tracking-tight text-cloud sm:text-5xl lg:text-[60px]">
          {lines.map((line) => <motion.span variants={reveal} className="block" key={line}>{line}</motion.span>)}
        </blockquote>
        <motion.p variants={reveal} className="mt-8 text-lg text-white/60">Indian by instinct. Global by design.</motion.p>
      </motion.div>
    </Section>
  )
}

function LogoSystemSection() {
  const rules = [
    'Keep the mark pure.',
    'No extra lines.',
    'No decorative additions.',
    'No unnecessary effects.',
    'Let negative space do the work.'
  ]

  return (
    <Section id="logo" dark className="logo-system-section">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.45 }}
        className="mx-auto grid min-h-[56vh] max-w-4xl place-items-center text-center sm:min-h-[70vh]"
      >
        <motion.img
          variants={{
            hidden: { opacity: 0, scale: 0.96 },
            show: { opacity: 1, scale: 1, transition: { duration: 0.95, ease } }
          }}
          src={assets.logoSymbol}
          alt="Indikicks forward-motion logo symbol"
          className="h-20 w-56 object-contain sm:h-36 sm:w-[24rem]"
        />
        <motion.div variants={reveal} className="mt-12">
          <p className="eyebrow text-saffron opacity-100">04 / Logo System</p>
          <h2 className="section-title mx-auto text-cloud">The Forward Mark</h2>
          <p className="section-intro mx-auto text-white/62">
            A single directional symbol for movement, ambition, and modern Indian confidence.
          </p>
        </motion.div>
        <motion.div variants={stagger} className="mt-10 grid w-full gap-3 sm:grid-cols-5">
          {rules.map((rule) => (
            <motion.div variants={reveal} key={rule} className="border border-white/10 bg-white/[0.035] px-4 py-5 text-sm leading-6 text-white/66">
              {rule}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  )
}

function ColorSystemSection() {
  const colors = [
    ['Jet Black', '#000000', 'Primary contrast'],
    ['Cloud White', '#F5F5F2', 'Main brand field'],
    ['Concrete Grey', '#2E2E2E', 'Urban depth'],
    ['Stone', '#CFCAC2', 'Material warmth'],
    ['Ash Grey', '#A8A8A8', 'Quiet dividers'],
    ['Deep Teal', '#285C4D', 'Controlled city accent'],
    ['Burnt Saffron', '#C56A2D', 'Warm Indian accent'],
    ['Deep Red', '#8E1F1F', 'Rare emphasis']
  ]

  return (
    <Section id="color" eyebrow="05 / Color System" title="80% neutral restraint. 20% controlled accent.">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mobile-snap-row border-black/10 bg-black/10 lg:grid lg:grid-cols-8 lg:gap-px lg:overflow-hidden lg:border">
        {colors.map(([name, hex, role]) => (
          <motion.div variants={reveal} whileHover={{ minHeight: 220 }} key={hex} className="group min-h-[220px] min-w-[72vw] snap-start bg-white p-4 transition-all duration-500 ease-out sm:min-w-[260px] lg:min-h-[420px] lg:min-w-0" style={{ backgroundColor: hex, color: ['#000000', '#2E2E2E', '#285C4D', '#8E1F1F'].includes(hex) ? '#fff' : '#000' }}>
            <p className="caption opacity-65">{name}</p>
            <p className="mt-2 font-mono text-xs opacity-55">{hex}</p>
            <p className="mt-10 max-w-32 text-sm leading-6 opacity-70 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-70">{role}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

function CraftsmanshipSection() {
  const details = ['Stitched logo', 'Canvas texture', 'Rubber foxing', 'Metal eyelets', 'Heel branding', 'Packaging finish']

  return (
    <Section
      id="craft"
      dark
      eyebrow="06 / Craftsmanship"
      title="Quality is shown in the small decisions."
      intro="The logo should feel integrated into construction: stitched, molded, appliqued, and materially present."
    >
      <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
        <motion.figure initial={{ opacity: 0, scale: 0.985 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, ease }} className="relative min-h-[360px] overflow-hidden border border-white/10 bg-white lg:min-h-[560px]">
          <Image src={assets.stitch} alt="Indikicks stitched logo detail on canvas sneaker" fit="object-contain" className="p-4" />
          {['stitched mark', 'metal eyelets', 'rubber foxing'].map((label, index) => (
            <span key={label} className={`detail-label ${index === 0 ? 'left-[42%] top-[53%]' : index === 1 ? 'left-[42%] top-[40%]' : 'left-[15%] top-[72%]'}`}>{label}</span>
          ))}
        </motion.figure>
        <div className="mobile-snap-row lg:grid lg:content-center lg:gap-3 lg:overflow-visible">
          {details.map((detail, index) => (
            <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} key={detail} className="flex min-w-[68vw] snap-start items-center justify-between border border-white/10 bg-white/[0.035] p-5 lg:min-w-0 lg:border-x-0 lg:border-t-0 lg:bg-transparent lg:py-5">
              <span className="text-lg font-bold">{detail}</span>
              <span className="caption text-white/40">0{index + 1}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function PackagingSection() {
  const principles = ['Matte black box', 'White motion mark', 'Minimal side label', 'Subtle accent details', 'Logo-patterned tissue paper']

  return (
    <Section id="packaging" className="bg-white text-black" eyebrow="07 / Packaging" title="The system extends beyond the shoe.">
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.figure initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.85, ease }} className="relative order-2 overflow-hidden border border-black/10 bg-neutral-50 p-3 shadow-xl shadow-black/10 lg:order-1">
          <Image src={assets.shoebox} alt="Indikicks premium black shoebox packaging" fit="object-cover" className="aspect-[4/3]" />
        </motion.figure>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="order-1 space-y-3 lg:order-2">
          {principles.map((item, index) => (
            <motion.div variants={reveal} key={item} className="flex items-center justify-between border border-black/10 bg-neutral-50 p-5 text-black">
              <span className="font-bold text-black">{item}</span>
              <span className="caption text-black/60">0{index + 1}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

function BrandVoiceSection() {
  const principles = ['Speak in movement.', 'Keep lines short.', 'Confidence, not hype.', 'Indian without overexplaining India.']
  const lines = ['Forward, From Here.', 'No Permission Needed.', 'Quiet Design. Loud Intent.', 'Built Here. Moving Everywhere.', 'For Streets That Do Not Stand Still.']

  return (
    <Section id="voice" eyebrow="08 / Brand Voice" title="Short lines. Clear intent. No borrowed hype.">
      <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr]">
        <div className="space-y-3">
          {principles.map((principle) => <p key={principle} className="border-b border-black/10 pb-4 text-black/60">{principle}</p>)}
        </div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mobile-snap-row lg:block lg:space-y-3 lg:overflow-visible">
          {lines.map((line) => (
            <motion.div variants={reveal} whileHover={{ y: -3 }} key={line} className="poster-line min-w-[82vw] snap-start lg:min-w-0">{line}</motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

function CommunitySection() {
  const ideas = ['Campus drops', 'City walks', 'Young creator collaborations', 'Street photography', 'Custom lacing', 'Design-led releases', 'Local music collaborations']

  return (
    <Section id="community" eyebrow="09 / Community & Culture" title="Culture grows through movement, not noise.">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mobile-snap-row sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
        {ideas.map((idea, index) => (
          <motion.article variants={reveal} whileHover={{ y: -4 }} key={idea} className="quiet-card min-h-[190px] min-w-[80vw] snap-start sm:min-w-0">
            <CircleDot className="h-4 w-4 text-saffron" />
            <h3 className="mt-10 text-xl font-black tracking-tight">{idea}</h3>
            <p className="mt-4 text-sm leading-6 text-black/50">A local activation designed around real routes, creators, and product-first documentation.</p>
            <span className="caption absolute bottom-5 right-5 text-black/30">0{index + 1}</span>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}

function BrandBlueprintSection() {
  const tiles = [
    ['Brand idea', 'Modern Indian Motion'],
    ['Emotion', 'Self-possession'],
    ['Positioning', 'Premium sneakers for India’s forward generation'],
    ['Tagline', 'Forward, From Here.'],
    ['Logo', 'Direction, movement, ambition'],
    ['Product role', 'Everyday sneakers with cultural confidence']
  ]

  return (
    <Section id="blueprint" dark eyebrow="10 / Final Brand Blueprint" title="The system in one view.">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map(([label, value]) => (
          <motion.div variants={reveal} key={label} className="min-h-[210px] bg-jet p-6">
            <p className="caption text-white/40">{label}</p>
            <p className="mt-12 max-w-sm text-2xl font-black tracking-tight text-cloud">{value}</p>
          </motion.div>
        ))}
      </motion.div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.9 }} className="mt-6 grid min-h-[520px] place-items-center border border-white/10 bg-white/[0.035] text-center">
        <div>
          <LogoMark className="mx-auto h-16 w-40" />
          <p className="mx-auto mt-10 max-w-3xl text-[36px] font-black leading-tight tracking-tight sm:text-5xl">You don&apos;t have to look elsewhere to move forward.</p>
        </div>
      </motion.div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="bg-jet px-5 py-10 text-cloud sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-8 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
        <a href="#hero" className="group flex items-center gap-4">
          <LogoMark className="h-7 w-16 transition-transform duration-500 group-hover:translate-x-1" />
          <div>
            <p className="font-black lowercase">indikicks</p>
            <p className="text-sm text-white/50">Built here. Moving everywhere.</p>
          </div>
        </a>
        <nav className="flex flex-wrap gap-4 text-sm text-white/50">
          <a href="#logo">Identity</a>
          <a href="#color">Colors</a>
          <a href="#craft">Craft</a>
          <a href="#packaging">Packaging</a>
        </nav>
      </div>
    </footer>
  )
}

function App() {
  const sections = useMemo(
    () => [
      HeroSection,
      BrandTensionSection,
      BrandStorySection,
      PositioningSection,
      LogoSystemSection,
      ColorSystemSection,
      CraftsmanshipSection,
      PackagingSection,
      BrandVoiceSection,
      CommunitySection,
      BrandBlueprintSection,
      Footer
    ],
    []
  )

  return (
    <>
      <IntroScreen />
      <ScrollProgress />
      <CursorSpotlight />
      <Header />
      <main>
        {sections.map((Component, index) => <Component key={index} />)}
      </main>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
